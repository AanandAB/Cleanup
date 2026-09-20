import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { getPublicServiceBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getPublicServiceBySlug(slug);
  if (!s) return {};
  return {
    title: { absolute: `${s.name} in Kannur | Clean UP` },
    description: s.short,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getPublicServiceBySlug(slug);
  if (!service) notFound();

  const content = {
    name: service.name,
    whatWeClean: service.whatWeClean ?? [],
    included: service.included ?? [],
    faqs: service.faqs ?? [],
  };

  return (
    <SiteShell>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        title={`${service.name} Services in Kannur`}
        intro={service.short}
      />
      <ServicePageContent service={content} />
    </SiteShell>
  );
}
