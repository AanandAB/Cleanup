import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTA } from "@/components/sections/CTA";
import { locationPages } from "@/content/locations";
import { serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Cleaning Service Areas in Kannur | Clean UP" },
  description:
    "Clean UP provides cleaning services across Kannur, Kuthuparamba, Thalassery and nearby areas. Free estimate and site visit.",
};

export default function LocationsPage() {
  const extraAreas = serviceAreas.filter(
    (a) => !locationPages.some((l) => l.name === a),
  );

  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        title="Cleaning Service Areas"
        intro="From our base around Kuthuparamba, Clean UP covers Kannur and the surrounding areas."
      />

      <section className="py-16 md:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {locationPages.map((l) => (
            <SpotlightCard key={l.slug} className="flex h-full flex-col p-6">
              <MapPin className="h-6 w-6 text-brand" />
              <h2 className="mt-4 font-display text-xl font-bold text-navy">{l.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{l.intro}</p>
              <Link
                href={`/locations/${l.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand transition-all hover:gap-2.5"
              >
                Cleaning in {l.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SpotlightCard>
          ))}
        </Container>

        {extraAreas.length > 0 && (
          <Container className="mt-12">
            <p className="text-sm font-medium text-ink-muted">
              Also serving:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {extraAreas.map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-1.5 rounded-full border border-cool bg-surface px-4 py-2 text-sm font-semibold text-ink"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  {a}
                </span>
              ))}
            </div>
          </Container>
        )}
      </section>

      <CTA />
    </SiteShell>
  );
}
