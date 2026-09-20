import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSecret } from "@/lib/env";

// Edge-safe auth: PBKDF2-SHA256 password hashing + HMAC-SHA256 signed
// session cookie. No Node-only libs (no bcrypt on Workers).

const ITER = 100_000;
const KEYLEN = 32;
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days
const COOKIE_NAME = "admin_session";

export interface Session {
  userId: string;
  username: string;
  role: "admin";
  exp: number;
}

// ── base64url helpers (consistent url-safe encoding for payload + sig) ──

function bytesToB64url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function authSecret(): string {
  return getSecret("AUTH_SECRET") ?? "dev-secret-change-me-in-prod";
}

// ── password hashing ──

async function derive(pw: string, salt: Uint8Array, iter: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pw),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as unknown as BufferSource, iterations: iter, hash: "SHA-256" },
    key,
    KEYLEN * 8,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(pw: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await derive(pw, salt, ITER);
  return `pbkdf2$${ITER}$${bytesToB64url(salt)}$${bytesToB64url(key)}`;
}

export async function verifyPassword(pw: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iter = Number(parts[1]);
  const salt = b64urlToBytes(parts[2]);
  const expected = b64urlToBytes(parts[3]);
  const key = await derive(pw, salt, iter);
  if (key.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < key.length; i++) diff |= key[i] ^ expected[i];
  return diff === 0;
}

// ── session (HMAC-SHA256 signed cookie) ──

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return bytesToB64url(new Uint8Array(sig));
}

export async function createSession(userId: string, username: string, role: "admin"): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL;
  const payload = bytesToB64url(new TextEncoder().encode(JSON.stringify({ userId, username, role, exp })));
  const sig = await hmac(payload, authSecret());
  const token = `${payload}.${sig}`;
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const dot = token.indexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmac(payload, authSecret());
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload))) as Session;
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000) return null;
    return data;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  (await cookies()).set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
}

/** Require an admin session or redirect to login. */
export async function requireAdmin(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
