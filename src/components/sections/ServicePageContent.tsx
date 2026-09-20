import { Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { CTA } from "@/components/sections/CTA";
import { processSteps } from "@/content/home";

interface ServiceContent {
  name: string;
  whatWeClean: string[];
  included: string[];
  faqs: { q: string; a: string }[];
}

/** Full body of a service detail page (shared across all services). */
export function ServicePageContent({ service }: { service: ServiceContent }) {
  return (
    <>
      {/* What we clean */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="What We Clean"
            title={`What ${service.name} Covers`}
            align="left"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {service.whatWeClean.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-cool bg-surface px-4 py-3 text-sm font-medium text-ink"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-brand" />
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="What's Included"
            title="A Complete Checklist"
            align="left"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-cool bg-ice p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-fresh" />
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Process"
            title="Simple, From Start to Finish"
            align="left"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-cool bg-surface p-5">
                <span className="font-display text-sm font-bold text-brand">{s.n}</span>
                <h3 className="mt-2 font-display text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 md:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title={`${service.name} Questions`}
            align="left"
          />
          <div className="mt-8">
            <Accordion items={service.faqs} />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
