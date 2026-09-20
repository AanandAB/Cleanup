import {
  Building2,
  Home,
  LayoutGrid,
  ListChecks,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// ────────────────────────────────────────────────────────────
// Homepage content — local source of truth for Phase 2.
// Moves to D1 (admin-editable) in Phase 6. Shapes stay stable.
//
// ⚠️  Reviews are intentionally NOT fabricated (spec §31). The
// `reviews` array below is EMPTY by design — wire genuine Google
// reviews here once the client provides them.
// ────────────────────────────────────────────────────────────

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  name: string;
  short: string;
  features: string[];
  href: string;
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "house-deep-cleaning",
    icon: Home,
    name: "House Deep Cleaning",
    short: "Thorough top-to-bottom cleaning for homes, apartments and villas.",
    features: ["Kitchen deep clean", "Floors, fans & fixtures", "Windows & furniture"],
    href: "/services/house-deep-cleaning",
  },
  {
    slug: "glass-cleaning",
    icon: Sparkles,
    name: "Glass Cleaning",
    short: "Streak-free glass, windows and facades for homes and offices.",
    features: ["Windows & partitions", "Glass facades", "Office glass"],
    href: "/services/glass-cleaning",
  },
  {
    slug: "interlock-cleaning",
    icon: LayoutGrid,
    name: "Interlock Cleaning",
    short: "Pressure washing that removes moss, algae and embedded dirt.",
    features: ["Moss & algae removal", "Pressure washing", "Driveway & pavement"],
    href: "/services/interlock-cleaning",
  },
];

export const processSteps = [
  { n: "01", title: "Tell Us What You Need", desc: "Message us on WhatsApp or fill the free estimate form." },
  { n: "02", title: "Free Estimate & Site Visit", desc: "We visit, assess the space and understand the job." },
  { n: "03", title: "Get Your Quote", desc: "Clear scope and transparent pricing — no surprises." },
  { n: "04", title: "We Clean", desc: "Our professional team completes the job to standard." },
  { n: "05", title: "Final Inspection", desc: "You confirm the work before we consider it done." },
];

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const whyUs: FeatureCard[] = [
  { icon: MapPin, title: "Free Site Visit", desc: "We understand the job before we quote." },
  { icon: Users, title: "Trained Team", desc: "A consistent, professional cleaning process." },
  { icon: Wrench, title: "Professional Equipment", desc: "The right equipment for every surface." },
  { icon: Building2, title: "Residential + Commercial", desc: "Homes, offices and business spaces." },
  { icon: ListChecks, title: "Detailed Cleaning", desc: "We focus on difficult areas, not just visible surfaces." },
  { icon: MessageCircle, title: "Easy Booking", desc: "Reach us on WhatsApp or by phone." },
];

export const beforeAfterCategories = ["House", "Glass", "Interlock", "Commercial"] as const;

export interface Project {
  slug: string;
  title: string;
  location: string;
  type: string;
}

// Placeholder example projects (from the spec's suggested slugs) —
// replace with real completed jobs + photos via the CMS.
export const projects: Project[] = [
  { slug: "3bhk-deep-cleaning-kuthuparamba", title: "3 BHK Deep Cleaning", location: "Kuthuparamba", type: "House Deep Cleaning" },
  { slug: "interlock-pressure-cleaning-kannur", title: "Interlock Pressure Cleaning", location: "Kannur", type: "Interlock Cleaning" },
  { slug: "office-glass-cleaning-thalassery", title: "Office Glass Cleaning", location: "Thalassery", type: "Glass Cleaning" },
];

export const faqs = [
  {
    q: "Do you provide cleaning services across Kannur?",
    a: "Yes. Clean UP is based around Kuthuparamba and serves Kannur, Thalassery, Mattannur, Iritty, Taliparamba, Payyannur, Panoor and nearby areas. If you're unsure whether we cover your location, message us — we'll confirm quickly.",
  },
  {
    q: "Do you offer free site visits?",
    a: "Yes — every estimate starts with a free site visit. We assess the space and scope so your quote reflects the actual job, not a guess.",
  },
  {
    q: "What does house deep cleaning include?",
    a: "A full top-to-bottom clean: kitchens, bedrooms, living areas, floors, fans, fixtures, windows and furniture exteriors. We focus on the difficult areas a routine clean misses.",
  },
  {
    q: "Do you clean interlock tiles?",
    a: "Yes. We remove moss, algae and embedded dirt from interlock pavements and driveways using pressure washing, restoring the original look of the surface.",
  },
  {
    q: "Do you provide commercial glass cleaning?",
    a: "Yes — we clean glass for offices, shops, showrooms and other commercial spaces, including windows, partitions and facades.",
  },
  {
    q: "How can I get a cleaning quotation?",
    a: "The quickest way is to message us on WhatsApp or fill the free estimate form. We'll arrange a site visit and send you a clear quote.",
  },
  {
    q: "How long does house deep cleaning take?",
    a: "It depends on the size and condition of the home — most houses take from a few hours to a full day. After the site visit we'll give you a clear time estimate.",
  },
];

/** Honest counts that appear on the page (not fabricated stats). */
export const stats = [
  { value: 3, suffix: "", label: "Core services" },
  { value: 8, suffix: "+", label: "Service areas" },
  { value: 5, suffix: "", label: "Simple steps" },
  { value: 100, suffix: "%", label: "Free site visit" },
];
