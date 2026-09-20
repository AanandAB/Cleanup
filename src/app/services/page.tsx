import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTA } from "@/components/sections/CTA";
import { getPublicServices } from "@/lib/queries";
import { iconForSlug } from "@/lib/service-icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Cleaning Services in Kannur | Clean UP" },
  description:
    "House deep cleaning, glass cleaning and interlock cleaning across Kannur from Clean UP. Free estimate and site visit available.",
};

export default async function ServicesPage() {
  const services = await getPublicServices();

  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title="Professional Cleaning Services"
        intro="Core cleaning services — each with the right equipment and a consistent process."
      />

      <section className="py-16 md:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = iconForSlug(s.slug);
            return (
              <SpotlightCard key={s.slug} className="flex h-full flex-col p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-electric to-brand-light text-white shadow-lg shadow-brand/25">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-xl font-bold text-heading">{s.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.short}</p>
                <ul className="mt-4 space-y-2">
                  {(s.features ?? []).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink/80">
                      <Check className="h-4 w-4 shrink-0 text-fresh" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/services/${s.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand transition-all hover:gap-2.5"
                >
                  View Service
                  <ArrowRight className="h-4 w-4" />
                </a>
              </SpotlightCard>
            );
          })}
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
