"use client";

import { useState } from "react";

/** Admin login — API route sets the cookie, then full navigation. */
export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", { method: "POST", body: fd });
    const data = (await res.json().catch(() => ({ ok: false }))) as {
      ok?: boolean;
      error?: string;
    };
    if (data.ok) {
      window.location.href = "/admin";
    } else {
      setError(data.error ?? "Login failed");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-cool bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <div className="flex min-h-screen items-center justify-center bg-ice px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-cool bg-surface p-8 shadow-sm">
          <p className="font-display text-xl font-extrabold tracking-tight text-heading">
            Clean <span className="text-brand">UP</span> Admin
          </p>
          <p className="mt-1 text-sm text-ink-muted">Sign in to manage your website.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-heading">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-heading">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputCls}
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
