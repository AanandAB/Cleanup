import { Home, LayoutGrid, Sparkles, type LucideIcon } from "lucide-react";

// ────────────────────────────────────────────────────────────
// Service page content — full detail for each flagship service.
// Local source of truth for Phase 3; moves to D1 in Phase 6.
// ────────────────────────────────────────────────────────────

export interface ServicePage {
  slug: string;
  icon: LucideIcon;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  heroDesc: string;
  whatWeClean: string[];
  included: string[];
  faqs: { q: string; a: string }[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "house-deep-cleaning",
    icon: Home,
    name: "House Deep Cleaning",
    h1: "House Deep Cleaning Services in Kannur",
    seoTitle: "House Deep Cleaning Services in Kannur | Clean UP",
    metaDescription:
      "Professional house deep cleaning in Kannur from Clean UP. Deep cleaning for homes, apartments and villas. Free estimate and site visit available.",
    heroDesc:
      "A thorough, top-to-bottom deep clean for homes, apartments and villas across Kannur — focused on the difficult areas a routine clean misses.",
    whatWeClean: [
      "Kitchen",
      "Bedrooms",
      "Living room",
      "Windows",
      "Floors",
      "Fans",
      "Fixtures",
      "Furniture exterior",
    ],
    included: [
      "Full surface dusting, top to bottom",
      "Kitchen deep clean — counters, sink and cabinet exteriors",
      "Floor sweeping, washing and mopping",
      "Window and glass cleaning",
      "Fan and light-fixture cleaning",
      "Furniture exterior cleaning",
      "Cobweb removal and skirting detail",
    ],
    faqs: [
      {
        q: "How long does a house deep clean take?",
        a: "Most homes take from a few hours to a full day, depending on size and condition. After a free site visit we give you a clear time estimate before we start.",
      },
      {
        q: "Do I need to provide cleaning supplies?",
        a: "No — our team brings professional equipment and supplies. If you have a preferred product for a specific surface, tell us and we'll work with it.",
      },
      {
        q: "Can you deep clean before I move into a new home?",
        a: "Yes — move-in and move-out deep cleans are common. We clean before your belongings arrive so you start with a genuinely clean space.",
      },
    ],
  },
  {
    slug: "glass-cleaning",
    icon: Sparkles,
    name: "Glass Cleaning",
    h1: "Professional Glass Cleaning in Kannur",
    seoTitle: "Glass Cleaning Services in Kannur | Clean UP",
    metaDescription:
      "Professional glass cleaning in Kannur from Clean UP. Streak-free windows, partitions and facades for homes and offices. Free estimate available.",
    heroDesc:
      "Streak-free glass, windows and facades for homes, offices and commercial spaces — finished to a clear, polished standard.",
    whatWeClean: [
      "Windows",
      "Glass partitions",
      "Glass facades",
      "Office glass",
      "Showroom glass",
      "Mirrors",
    ],
    included: [
      "Window washing — interior and exterior",
      "Glass facade and partition cleaning",
      "Frame and track cleaning",
      "Hard-water stain removal",
      "Mirror polishing",
      "Streak-free final finish",
    ],
    faqs: [
      {
        q: "Do you clean high-rise or exterior glass?",
        a: "We handle exterior glass that is safely reachable with our equipment. During the site visit we assess access and confirm what can be cleaned safely.",
      },
      {
        q: "How often should office glass be cleaned?",
        a: "For a professional look, most offices schedule glass cleaning monthly or quarterly. High-traffic storefronts often benefit from more frequent cleaning.",
      },
      {
        q: "Will the cleaning leave streaks?",
        a: "No — we use the right tools and technique for a streak-free finish, including treating hard-water marks that ordinary wiping leaves behind.",
      },
    ],
  },
  {
    slug: "interlock-cleaning",
    icon: LayoutGrid,
    name: "Interlock Cleaning",
    h1: "Professional Interlock Cleaning in Kannur",
    seoTitle: "Interlock Cleaning & Pressure Washing in Kannur | Clean UP",
    metaDescription:
      "Professional interlock cleaning and pressure washing in Kannur from Clean UP. Remove moss, algae and embedded dirt from pavements and driveways.",
    heroDesc:
      "Pressure washing that removes moss, algae and embedded dirt from interlock pavements and driveways, restoring the surface's original look.",
    whatWeClean: [
      "Moss removal",
      "Algae removal",
      "Embedded dirt",
      "Driveway stains",
      "Pavement",
      "Pressure washing",
    ],
    included: [
      "Surface assessment before cleaning",
      "Moss and algae treatment",
      "Pressure washing at the right pressure",
      "Stain and embedded-dirt removal",
      "Rinse and clean finish",
    ],
    faqs: [
      {
        q: "Does pressure washing damage interlock tiles?",
        a: "No — we assess the surface first and use the appropriate pressure and technique so the tiles are cleaned without being damaged or dislodged.",
      },
      {
        q: "How do you stop moss and algae coming back?",
        a: "We remove the growth and treat the surface. To reduce regrowth we can advise on drainage and spacing so the area stays cleaner for longer.",
      },
      {
        q: "Do you clean driveways and pavements only, or also patios?",
        a: "Any interlock or paved outdoor surface — driveways, pavements, patios and walkways. Tell us about your space and we'll assess it during the site visit.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
