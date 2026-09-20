import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTA } from "@/components/sections/CTA";
import { getPublicProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Recent Cleaning Projects in Kannur | Clean UP" },
  description:
    "Recent cleaning projects by Clean UP — house deep cleaning, interlock pressure cleaning and glass cleaning across Kannur.",
};

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title="Recent Work"
        intro="A sample of the kind of jobs we take on across Kannur. Full case studies with before/after photos coming soon."
      />

      <section className="py-16 md:py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <SpotlightCard key={p.slug} className="flex h-full flex-col p-6">
              <div className="flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-navy-deep to-brand/50 text-white">
                <Sparkles className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
                <MapPin className="h-3.5 w-3.5" />
                {p.location}
              </div>
              <h2 className="mt-2 font-display text-lg font-bold text-navy">{p.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{p.type}</p>
              <Link
                href={`/projects/${p.slug}`}
                className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand transition-all hover:gap-2"
              >
                View Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </SpotlightCard>
          ))}
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
