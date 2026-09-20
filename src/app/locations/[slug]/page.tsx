import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocationPageContent } from "@/components/sections/LocationPageContent";
import { getLocationPage } from "@/content/locations";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocationPage(slug);
  if (!l) return {};
  return { title: { absolute: l.seoTitle }, description: l.metaDescription };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationPage(slug);
  if (!location) notFound();

  return (
    <SiteShell>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: location.name },
        ]}
        title={location.h1}
        intro={location.intro}
      />
      <LocationPageContent location={location} />
    </SiteShell>
  );
}
