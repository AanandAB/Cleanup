import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { whyUs } from "@/content/home";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Clean UP | Cleaning Company in Kannur" },
  description:
    "Clean UP is a professional cleaning company based around Kuthuparamba, serving Kannur and nearby areas with house deep cleaning, glass and interlock cleaning.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="Your Cleaning Partner"
        intro={`${siteConfig.name} is a professional cleaning company based around ${siteConfig.address.locality}, serving ${siteConfig.address.region} and the surrounding areas. We focus on thorough, detailed cleaning — and on making booking easy.`}
      />

      <section className="py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="Local. Thorough. Professional."
              align="left"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-muted">
              <p>
                Clean UP started with a simple idea: cleaning should feel like a
                professional service, not a chore you hand off and hope for the best.
                We bring trained people, the right equipment, and a consistent process
                to every job.
              </p>
              <p>
                From house deep cleaning and glass cleaning to interlock pressure
                washing, we work across homes, offices and commercial spaces. Every job
                starts with a free site visit so the quote matches the actual work.
              </p>
              <p>
                We&apos;re proud to be local — based around Kuthuparamba and covering
                Kannur, Thalassery, Mattannur, Iritty, Taliparamba, Payyannur and
                Panoor.
              </p>
            </div>
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-2">
            {whyUs.slice(0, 4).map((c) => (
              <SpotlightCard key={c.title} className="p-5">
                <c.icon className="h-5 w-5 text-brand" />
                <h3 className="mt-3 font-display text-base font-bold text-heading">{c.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{c.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
