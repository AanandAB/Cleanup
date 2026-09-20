import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { stats, whyUs } from "@/content/home";

export function WhyUs() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Clean UP"
            title="Professional Cleaning Without the Hassle."
            subtitle="A local team that shows up prepared, cleans thoroughly and makes booking easy."
          />
        </Reveal>

        {/* honest counts (derived from what's on the page, not fake stats) */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-cool bg-ice p-6 text-center"
            >
              <div className="font-display text-3xl font-extrabold text-brand sm:text-4xl">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06} className="h-full">
              <SpotlightCard className="h-full p-6">
                <c.icon className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
