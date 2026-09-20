import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { defaultWaMessage, siteConfig, telLink, waLink } from "@/lib/site";

/** Final conversion band — dark navy with a soft brand glow. */
export function CTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(800px circle at 70% 20%, rgba(71,116,246,0.35), transparent 60%)",
        }}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your Space Could Be Next.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Get a free estimate and site visit from {siteConfig.name}. We&apos;ll
            assess the job and send you a clear quote.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/get-estimate" size="lg">
              Get Free Estimate
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={waLink(defaultWaMessage())} external variant="whatsapp" size="lg">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Clean UP
            </Button>
            <Button
              href={telLink()}
              variant="outline"
              size="lg"
              className="border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
