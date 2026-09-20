import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { projects } from "@/content/home";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.title} in ${p.location} | Clean UP` },
    description: `${p.type} project completed by Clean UP in ${p.location}, Kannur.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((x) => x.slug === slug);
  if (!project) notFound();

  return (
    <SiteShell>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
        title={`${project.title} in ${project.location}`}
        intro={`${project.type} — ${project.location}, Kannur.`}
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <div className="rounded-3xl border border-cool bg-white p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand">
              <MapPin className="h-4 w-4" />
              {project.location} · {project.type}
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-cool bg-ice p-8 text-center text-sm text-ink-muted">
              Full case study coming soon — before/after photos, services
              performed, equipment used and the final result. This content is
              editable in the CMS (Phase 6).
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
