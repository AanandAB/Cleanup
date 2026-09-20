import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await clearSession();
  // 302 (not 307) so the POST doesn't re-fire against the login page.
  return NextResponse.redirect(new URL("/admin/login", req.url), 302);
}
