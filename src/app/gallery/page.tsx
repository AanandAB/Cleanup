import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
import { getPublicGallery } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Photo & Video Gallery | Clean UP" },
  description:
    "Photos and videos of Clean UP's cleaning work across Kannur — house deep cleaning, glass and interlock cleaning.",
  keywords: [
    "cleaning photos Kannur",
    "cleaning videos Kannur",
    "before after cleaning photos",
    "cleaning gallery Kannur",
  ],
};

function VideoEmbed({ url }: { url: string }) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${yt[1]}`}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <video src={url} controls className="aspect-video w-full object-cover" />;
}

export default async function GalleryPage() {
  const items = await getPublicGallery();

  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        title="Our Work"
        intro="Photos and videos from recent cleaning jobs across Kannur."
      />

      <section className="py-16 md:py-20">
        <Container>
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-cool p-12 text-center text-sm text-ink-muted">
              Gallery coming soon.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((g) => (
                <figure
                  key={g.id}
                  className="overflow-hidden rounded-2xl border border-cool bg-surface"
                >
                  {g.kind === "video" ? (
                    <VideoEmbed url={g.url ?? ""} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={g.url ?? ""}
                      alt={g.title ?? "Cleaning work by Clean UP"}
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  {g.title && (
                    <figcaption className="px-4 py-3 text-sm font-medium text-heading">
                      {g.title}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTA />
    </SiteShell>
  );
}
