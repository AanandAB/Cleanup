import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPublicServices } from "@/lib/queries";
import { iconForSlug } from "@/lib/service-icons";

export async function Services() {
  const services = await getPublicServices();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="One Team. Every Surface."
            subtitle="Flagship services — each with the right equipment and a consistent process."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconForSlug(s.slug);
            return (
              <Reveal key={s.slug} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand via-electric to-brand-light text-white shadow-lg shadow-brand/25">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-heading">{s.name}</h3>
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
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2.5"
                  >
                    Explore Service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
