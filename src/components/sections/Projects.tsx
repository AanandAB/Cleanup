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
            subtitle="A sample of the kind of jobs we take on across Kannur — homes, offices and commercial spaces."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy-deep to-brand/50">
                  {p.images && p.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white">
                      <Sparkles className="h-8 w-8 opacity-80" />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
                  <MapPin className="h-3.5 w-3.5" />
                  {p.location}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-heading">{p.title}</h3>
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
