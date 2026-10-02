import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-electric to-brand-light text-white">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="mt-6 font-display text-5xl font-extrabold tracking-tight text-heading">404</p>
        <h1 className="mt-2 font-display text-xl font-bold text-heading">
          This page has been cleaned away
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
          back to a spotless start.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-105"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-cool bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
