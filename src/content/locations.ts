// ────────────────────────────────────────────────────────────
// Location page content — local source of truth for Phase 3.
// Moves to D1 in Phase 6. Only areas Clean UP genuinely serves.
// ────────────────────────────────────────────────────────────

export interface LocationPage {
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  faqs: { q: string; a: string }[];
}

export const locationPages: LocationPage[] = [
  {
    slug: "kannur",
    name: "Kannur",
    h1: "Professional Cleaning Services in Kannur",
    seoTitle: "Cleaning Services in Kannur | Clean UP",
    metaDescription:
      "Professional cleaning services in Kannur from Clean UP. House deep cleaning, glass cleaning and interlock cleaning. Free estimate and site visit.",
    intro:
      "Clean UP provides professional house deep cleaning, glass cleaning and interlock cleaning across Kannur — for homes, apartments, offices and commercial spaces.",
    faqs: [
      {
        q: "Which areas of Kannur do you cover?",
        a: "We cover Kannur town and the surrounding areas, including Kuthuparamba, Thalassery, Mattannur, Iritty, Taliparamba, Payyannur and Panoor. Message us to confirm your location.",
      },
      {
        q: "Do you offer free site visits in Kannur?",
        a: "Yes — every estimate starts with a free site visit so we can assess the job and give you an accurate quote.",
      },
    ],
  },
  {
    slug: "kuthuparamba",
    name: "Kuthuparamba",
    h1: "Professional Cleaning Services in Kuthuparamba",
    seoTitle: "Cleaning Services in Kuthuparamba | Clean UP",
    metaDescription:
      "Professional cleaning services in Kuthuparamba from Clean UP. House deep cleaning, glass cleaning and interlock cleaning with a free site visit.",
    intro:
      "Clean UP is based around Kuthuparamba and provides professional house deep cleaning, glass cleaning and interlock cleaning for homes and businesses across the area.",
    faqs: [
      {
        q: "Are you based in Kuthuparamba?",
        a: "Yes — Clean UP operates from around Kuthuparamba, which means quick response times and free site visits across the local area.",
      },
      {
        q: "Do you serve nearby towns from Kuthuparamba?",
        a: "Yes — from our Kuthuparamba base we cover Kannur, Thalassery, Mattannur, Iritty, Taliparamba, Payyannur and Panoor.",
      },
    ],
  },
  {
    slug: "thalassery",
    name: "Thalassery",
    h1: "Professional Cleaning Services in Thalassery",
    seoTitle: "Cleaning Services in Thalassery | Clean UP",
    metaDescription:
      "Professional cleaning services in Thalassery from Clean UP. House deep cleaning, glass cleaning and interlock cleaning with a free site visit.",
    intro:
      "Clean UP provides professional house deep cleaning, glass cleaning and interlock cleaning across Thalassery — for homes, offices and commercial spaces.",
    faqs: [
      {
        q: "Do you clean homes and offices in Thalassery?",
        a: "Yes — we cover residential and commercial cleaning in Thalassery, including house deep cleaning, glass and interlock work.",
      },
      {
        q: "How do I book a cleaning in Thalassery?",
        a: "Message us on WhatsApp or fill the free estimate form. We'll arrange a site visit in Thalassery and send you a clear quote.",
      },
    ],
  },
];

export function getLocationPage(slug: string): LocationPage | undefined {
  return locationPages.find((l) => l.slug === slug);
}
