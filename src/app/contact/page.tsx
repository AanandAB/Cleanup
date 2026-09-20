import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { defaultWaMessage, siteConfig, telLink, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact Clean UP | Cleaning Services in Kannur" },
  description:
    "Contact Clean UP for house deep cleaning, glass and interlock cleaning in Kannur. Call, WhatsApp or request a free estimate.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contact Clean UP"
        intro="The fastest way to book is WhatsApp or a phone call. We'll arrange a free site visit and send you a clear quote."
      />

      <section className="py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          {/* Contact methods */}
          <div className="space-y-4">
            <SpotlightCard className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C7E]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-navy">WhatsApp</p>
                  <p className="mt-0.5 text-sm text-ink-muted">Fastest — send us a message and we reply quickly.</p>
                  <a href={waLink(defaultWaMessage())} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand">
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-navy">Phone</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{siteConfig.hours}</p>
                  <a href={telLink()} className="mt-2 inline-block text-sm font-semibold text-brand">
                    Call now →
                  </a>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-navy">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-0.5 block text-sm text-ink-muted transition-colors hover:text-brand">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-navy">Location</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{siteConfig.addressLine}</p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-navy">Hours</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{siteConfig.hours}</p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* CTA panel */}
          <div className="flex flex-col justify-center rounded-[32px] bg-gradient-to-br from-navy via-navy-deep to-brand/60 p-8 text-white md:p-12">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Ready to book?
            </h2>
            <p className="mt-3 text-white/75">
              Tell us what you need and we&apos;ll arrange a free site visit — then send
              you a clear, no-obligation quote.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/get-estimate" size="lg">
                Get a Free Estimate
              </Button>
              <Button
                href={waLink(defaultWaMessage())}
                external
                variant="outline"
                size="lg"
                className="border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10 hover:text-white"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
