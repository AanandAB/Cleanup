import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * FAQ accordion built on native <details>/<summary> — zero JS,
 * keyboard-accessible, opens one at a time by default.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-cool overflow-hidden rounded-3xl border border-cool bg-surface">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-navy transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
