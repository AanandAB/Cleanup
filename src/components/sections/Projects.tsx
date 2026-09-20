import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { getPublicProjects } from "@/lib/queries";

export async function Projects() {
  const projects = await getPublicProjects();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Recent Work"
            title="Recent Clean UP Transformations"
            subtitle="A sample of the kind of jobs we take on. Full case studies with before/after photos coming soon."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-navy-deep to-brand/50 text-white">
                  <Sparkles className="h-8 w-8 opacity-80" />
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
                  <MapPin className="h-3.5 w-3.5" />
                  {p.location}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{p.type}</p>
                <a
                  href={`/projects/${p.slug}`}
                  className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand transition-all hover:gap-2"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
