import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTA } from "@/components/sections/CTA";
import { getPublicServices } from "@/lib/queries";
import { iconForSlug } from "@/lib/service-icons";
import { serviceAreas } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { LocationPage } from "@/content/locations";

/** Full body of a location page (shared across all areas). */
export async function LocationPageContent({ location }: { location: LocationPage }) {
  const services = await getPublicServices();

  return (
    <>
      {/* Services available here */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title={`Cleaning Services in ${location.name}`}
            align="left"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((s) => {
              const Icon = iconForSlug(s.slug);
              return (
                <SpotlightCard key={s.slug} className="flex h-full flex-col p-6">
                  <Icon className="h-6 w-6 text-brand" />
                  <h3 className="mt-4 font-display text-lg font-bold text-heading">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.short}</p>
                  <a
                    href={`/services/${s.slug}`}
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand transition-all hover:gap-2"
                  >
                    Explore Service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </SpotlightCard>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Coverage */}
      <section className="bg-surface py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="Coverage" title="Where We Work" align="left" />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {serviceAreas.map((a) => (
              <span
                key={a}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold",
                  a === location.name
                    ? "border-brand bg-brand text-white"
                    : "border-cool bg-surface text-ink",
                )}
              >
                <MapPin className="h-3.5 w-3.5" />
                {a}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title={`${location.name} Questions`}
            align="left"
          />
          <div className="mt-8">
            <Accordion items={location.faqs} />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
