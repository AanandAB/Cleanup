import { ArrowRight, MessageCircle } from "lucide-react";
import { defaultWaMessage, siteConfig, waLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Centered hero — copy-first, with soft brand glow orbs behind it.
 * (The 3D "swipe to clean" scene was removed; the hero is now a clean,
 * premium full-width layout.)
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface via-ice to-ice pt-16 md:pt-20">
      {/* decorative glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-80 w-[38rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[6%] h-72 w-72 rounded-full bg-electric/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[4%] h-56 w-56 rounded-full bg-fresh/10 blur-3xl"
      />

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center py-16 text-center md:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-fresh" />
          {siteConfig.tagline}
        </span>

        <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Professional Cleaning Services in{" "}
          <span className="bg-gradient-to-br from-brand via-electric to-brand-light bg-clip-text text-transparent">
            Kannur
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg font-semibold text-ink sm:text-xl">
          We don&apos;t just clean. We bring spaces back to life.
        </p>

        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
          {siteConfig.description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/get-estimate" size="lg">
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={waLink(defaultWaMessage())} external variant="whatsapp" size="lg">
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </Button>
        </div>

        <p className="mt-8 text-sm font-medium text-ink-muted">
          Trusted for homes &middot; offices &middot; commercial spaces
        </p>
      </Container>
    </section>
  );
}
