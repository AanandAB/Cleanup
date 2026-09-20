import { cn } from "@/lib/utils";

/**
 * Consistent section heading: eyebrow pill + display title +
 * optional subtitle, left- or center-aligned.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}
