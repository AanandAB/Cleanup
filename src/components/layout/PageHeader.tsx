import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/** Sub-page hero: breadcrumb + H1 + optional intro. */
export function PageHeader({
  crumbs,
  title,
  intro,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-cool/70 bg-gradient-to-b from-white to-ice pb-12 pt-16 md:pb-16 md:pt-24">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted"
        >
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-muted/60" />}
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-brand">
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</p>
        )}
      </Container>
    </section>
  );
}
