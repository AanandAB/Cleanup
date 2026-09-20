import { ArrowRight, MessageCircle } from "lucide-react";
import { defaultWaMessage, siteConfig, waLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroScene } from "@/components/sections/HeroScene";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-ice to-ice pt-16 md:pt-20">
      <Container className="relative grid min-h-[calc(100svh-5rem)] items-center gap-12 py-14 md:grid-cols-2 md:py-20">
        {/* ── Copy ── */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-fresh" />
            {siteConfig.tagline}
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Professional Cleaning Services in{" "}
            <span className="bg-gradient-to-br from-brand via-electric to-brand-light bg-clip-text text-transparent">
              Kannur
            </span>
          </h1>

          <p className="mt-4 text-lg font-semibold text-ink sm:text-xl">
            We don&apos;t just clean. We bring spaces back to life.
          </p>

          <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
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

          <p className="mt-6 text-sm font-medium text-ink-muted">
            Trusted for homes &middot; offices &middot; commercial spaces
          </p>
        </div>

        {/* ── 3D scene ── */}
        <div className="relative h-[340px] overflow-hidden rounded-[32px] border border-cool/70 bg-gradient-to-br from-navy via-navy-deep to-brand/40 shadow-2xl shadow-navy/10 sm:h-[420px] md:h-[520px]">
          <HeroScene />
        </div>
      </Container>
    </section>
  );
}
