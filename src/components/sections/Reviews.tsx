import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { defaultWaMessage, waLink } from "@/lib/site";

/**
 * Reviews — honest placeholder. We do NOT fabricate testimonials
 * (spec §31); genuine Google reviews are wired in once the client
 * provides them (CMS, Phase 6).
 */
export function Reviews() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="Trusted by Homes & Businesses"
            subtitle="We feature genuine customer reviews. If we've worked together, we'd love your feedback."
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-3xl border border-cool bg-ice p-8 text-center">
            <div className="flex justify-center gap-1 text-fresh">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="mt-4 font-display text-lg font-bold text-navy">
              Your review could be here
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Genuine Google reviews will appear here as customers share their
              experience. In the meantime, message us and we&apos;ll share examples of
              recent work.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                href={waLink("Hi Clean UP, I'd like to see examples of your recent work.")}
                external
                variant="whatsapp"
              >
                See Recent Work
              </Button>
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
