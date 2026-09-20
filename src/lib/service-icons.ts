import { Home, LayoutGrid, Sparkles, type LucideIcon } from "lucide-react";

// Icon mapping for services. Icons are React components and can't live in
// D1, so they're keyed by slug here. Unknown slugs fall back to Sparkles.
export const serviceIcons: Record<string, LucideIcon> = {
  "house-deep-cleaning": Home,
  "glass-cleaning": Sparkles,
  "interlock-cleaning": LayoutGrid,
};

export function iconForSlug(slug: string): LucideIcon {
  return serviceIcons[slug] ?? Sparkles;
}
