import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/home";

export function Process() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="Cleaning Should Be Simple."
            subtitle="Five steps from your first message to a finished, inspected job."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
          {/* connecting line (desktop) */}
          <div
            className="absolute inset-x-8 top-6 hidden h-0.5 bg-cool md:block"
            aria-hidden="true"
          />
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-electric font-display text-sm font-bold text-white shadow-lg shadow-brand/25">
                  {s.n}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
