import { NextResponse } from "next/server";
import { getAdminByUsername } from "@/lib/admin";
import { createSession, verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Simple in-memory rate limiter against credential stuffing. Per-isolate on
// Workers; for a globally-shared limit, enable Cloudflare WAF rate limiting
// on the /api/auth/login route in the dashboard.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: Request) {
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for") ??
    "unknown";
  const now = Date.now();

  const entry = attempts.get(ip);
  if (entry && now < entry.resetAt && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  const fd = await req.formData();
  const username = String(fd.get("username") ?? "").trim();
  const password = String(fd.get("password") ?? "");

  const admin = await getAdminByUsername(username);
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    if (!entry || now >= entry.resetAt) {
      attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    } else {
      entry.count += 1;
    }
    return NextResponse.json(
      { ok: false, error: "Invalid username or password" },
      { status: 401 },
    );
  }

  attempts.delete(ip);
  await createSession(admin.id, admin.username, admin.role);
  return NextResponse.json({ ok: true });
}
