import { NextResponse } from "next/server";
import { getAdminByUsername } from "@/lib/admin";
import { createSession, verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const fd = await req.formData();
  const username = String(fd.get("username") ?? "").trim();
  const password = String(fd.get("password") ?? "");

  const admin = await getAdminByUsername(username);
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json(
      { ok: false, error: "Invalid username or password" },
      { status: 401 },
    );
  }

  await createSession(admin.id, admin.username, admin.role);
  return NextResponse.json({ ok: true });
}
