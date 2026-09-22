import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { getPublicProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPublicProjectBySlug(slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.title} in ${p.location} | Clean UP` },
    description: `${p.type} project completed by Clean UP in ${p.location}, Kannur.`,
    keywords: [
      `${p.type} ${p.location}`,
      `cleaning ${p.location}`,
      `${p.title} cleaning`,
      "cleaning projects Kannur",
    ],
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
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
          <div className="rounded-3xl border border-cool bg-surface p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand">
              <MapPin className="h-4 w-4" />
              {project.location} · {project.type}
            </div>

            {project.description ? (
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                {project.description}
              </p>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-cool bg-ice p-6 text-center text-sm text-ink-muted">
                Full case study coming soon — add a description and before/after
                photos in the admin.
              </p>
            )}

            {(project.beforeImage || project.afterImage) && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.beforeImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.beforeImage}
                    alt={`${project.title} — before`}
                    className="aspect-video w-full rounded-xl border border-cool object-cover"
                  />
                )}
                {project.afterImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.afterImage}
                    alt={`${project.title} — after`}
                    className="aspect-video w-full rounded-xl border border-cool object-cover"
                  />
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
