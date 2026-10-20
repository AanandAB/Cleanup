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
  /** Body paragraphs rendered under the intro (unique, non-duplicate copy). */
  content: string[];
  faqs: { q: string; a: string }[];
}

export const locationPages: LocationPage[] = [
  {
    slug: "kannur",
    name: "Kannur",
    h1: "Professional Cleaning Services in Kannur",
    seoTitle: "Cleaning Services in Kannur | Clean UP",
    metaDescription:
      "Professional cleaning services in Kannur from Clean UP — house deep cleaning, glass cleaning and interlock cleaning with a free site visit and upfront quote. Serving Kannur city and nearby towns.",
    intro:
      "Clean UP provides professional house deep cleaning, glass cleaning and interlock cleaning across Kannur — from Kannur city to the surrounding towns of Kuthuparamba, Thalassery and Mattannur. Free estimate and site visit.",
    content: [
      "Kannur is a fast-growing city and its homes, apartments and offices need cleaning that matches. Our house deep cleaning clears dust, grime and stains from every corner, our glass cleaning leaves windows and facades streak-free, and our interlock cleaning pressure-washes driveways and courtyards free of moss, algae and embedded dirt.",
      "We serve all of Kannur — the city centre, Talap, Thavakkara, South Bazar, Chirakkal, Payyambalam and the towns around it. Because we operate from nearby Kuthuparamba, we can reach any part of Kannur quickly and schedule free site visits without long waits.",
      "Every job starts with a free site visit. We assess your space, confirm exactly what you need, and give you a clear, upfront price before any work begins — no hidden charges, no surprises.",
    ],
    faqs: [
      {
        q: "Which areas of Kannur do you cover?",
        a: "We cover Kannur town and the surrounding areas, including Kuthuparamba, Thalassery, Mattannur, Iritty, Taliparamba, Payyannur and Panoor. Message us to confirm your location.",
      },
      {
        q: "How much does cleaning cost in Kannur?",
        a: "Pricing depends on the size of the space and the type of cleaning. Every job starts with a free site visit and an upfront quote — message us on WhatsApp or use the estimate form.",
      },
      {
        q: "Do you clean offices and commercial spaces in Kannur?",
        a: "Yes — we handle commercial cleaning for offices, shops, clinics and apartment complexes, not just homes. See our Projects page for recent commercial work.",
      },
      {
        q: "How quickly can you reach Kannur?",
        a: "We operate from nearby Kuthuparamba, so we can usually schedule a free site visit across Kannur within a day or two.",
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
    content: [
      "Clean UP is based in and around Kuthuparamba, which means the fastest response times and free site visits across the local area. We know the homes, apartments and commercial spaces here and clean them to a professional standard.",
      "From house deep cleaning to glass and interlock work, every job begins with a free site visit and a clear, upfront quote before any work starts.",
    ],
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
    content: [
      "We serve Thalassery and its surrounding areas with house deep cleaning, glass cleaning and interlock cleaning. From apartments and villas to shops and offices, we deliver a spotless finish with a free site visit and an upfront quote.",
    ],
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
