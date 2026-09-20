import { serviceAreas, siteConfig } from "@/lib/site";

// Structured data (JSON-LD) for Google. Structured data must match the
// visible on-page content — no fake ratings/reviews/prices (spec §56).
//
// ⚠️ `telephone` uses the PLACEHOLDER phone until launch — replace in
// siteConfig.ts (single source of truth) and this updates automatically.

const address = {
  "@type": "PostalAddress",
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.state,
  addressCountry: siteConfig.address.country,
  postalCode: siteConfig.address.postalCode,
};

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    image: `${siteConfig.url}/og.png`,
    logo: `${siteConfig.url}/icon.png`,
    address,
    areaServed: serviceAreas,
    openingHours: "Mo-Sa 08:00-19:00",
    priceRange: "₹₹",
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    address,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.phone}`,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

/** BreadcrumbList for a page with the given crumb trail. */
export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${siteConfig.url}${c.href}` : `${siteConfig.url}`,
    })),
  };
}
