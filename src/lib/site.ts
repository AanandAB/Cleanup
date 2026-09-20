// ────────────────────────────────────────────────────────────
// Clean UP — site configuration (single source of truth).
//
// In Phase 6 this moves to D1 (admin-editable CMS). Keep the
// shapes here stable so the swap is a data-source change, not a
// rewrite of every page.
//
// ⚠️  CONTACT PLACEHOLDERS — REPLACE BEFORE LAUNCH:
// `phone` / `whatsapp` are obviously-fake placeholders. The
// client has two real numbers (9074807315 and 7034026295) and
// will confirm which is primary call vs WhatsApp before go-live.
// `url` is also a placeholder domain (not yet purchased).
// ────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Clean UP",
  tagline: "Your Cleaning Partner",
  secondaryTagline: "Let's Make Your Space Shine.",
  description:
    "Clean UP provides professional house deep cleaning, glass cleaning and interlock cleaning across Kannur and nearby areas. Free estimate and site visit.",

  // ── Contact (placeholders — see note above) ──
  phone: "910000000000", // primary call number (PLACEHOLDER)
  whatsapp: "910000000000", // WhatsApp number (PLACEHOLDER)
  email: "cleanupcleanit@gmail.com",

  address: {
    locality: "Kuthuparamba",
    region: "Kannur",
    state: "Kerala",
    country: "IN",
    postalCode: "670643",
  },
  addressLine: "Kuthuparamba, Kannur, Kerala",

  url: "https://cleanup.example.com", // PLACEHOLDER — replace with real domain
  hours: "Mon – Sat · 8:00 AM – 7:00 PM",

  social: {
    instagram: "https://www.instagram.com/", // PLACEHOLDER
    facebook: "https://www.facebook.com/", // PLACEHOLDER
  },

  seo: {
    title: "Professional Cleaning Services in Kannur | Clean UP",
    description:
      "Clean UP provides professional house deep cleaning, glass cleaning and interlock cleaning across Kannur and nearby areas. Free estimate and site visit.",
    keywords: [
      "cleaning services Kannur",
      "house deep cleaning Kannur",
      "glass cleaning Kannur",
      "interlock cleaning Kannur",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

// ── Helpers ────────────────────────────────────────────────

/** WhatsApp deep link with an optional prefilled message. */
export function waLink(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsapp}${text}`;
}

/** tel: link (assumes the stored number already carries the +91 prefix). */
export function telLink(): string {
  return `tel:+${siteConfig.phone}`;
}

/** Default WhatsApp greeting used across CTAs. */
export function defaultWaMessage(): string {
  return `Hi ${siteConfig.name}, I'd like a free estimate for cleaning services.`;
}

// ── Navigation ─────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Locations", href: "/locations" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Services (flagship three; more added in later phases) ──

export interface Service {
  slug: string;
  name: string;
  short: string;
  href: string;
}

export const services: Service[] = [
  {
    slug: "house-deep-cleaning",
    name: "House Deep Cleaning",
    short: "Thorough top-to-bottom cleaning for homes, apartments and villas.",
    href: "/services/house-deep-cleaning",
  },
  {
    slug: "glass-cleaning",
    name: "Glass Cleaning",
    short: "Streak-free glass, windows and facades for homes and offices.",
    href: "/services/glass-cleaning",
  },
  {
    slug: "interlock-cleaning",
    name: "Interlock Cleaning",
    short: "Pressure washing that removes moss, algae and embedded dirt.",
    href: "/services/interlock-cleaning",
  },
];

// ── Service areas (only places Clean UP genuinely serves) ──

export const serviceAreas: string[] = [
  "Kuthuparamba",
  "Kannur",
  "Thalassery",
  "Mattannur",
  "Iritty",
  "Taliparamba",
  "Payyannur",
  "Panoor",
];

/** Areas that have a dedicated landing page in Phase 3. */
export const locationPages = [
  { slug: "kannur", name: "Kannur" },
  { slug: "kuthuparamba", name: "Kuthuparamba" },
  { slug: "thalassery", name: "Thalassery" },
];
