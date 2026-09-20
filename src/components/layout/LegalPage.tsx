import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

/** Shared wrapper for legal/info pages (privacy, terms, refund). */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <SiteShell>
      <PageHeader crumbs={[{ label: "Home", href: "/" }, { label: title }]} title={title} />
      <section className="py-12 md:py-16">
        <Container className="max-w-3xl">
          <p className="text-sm text-ink-muted/70">Last updated: {updated}</p>
          <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-ink-muted">
            {children}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
