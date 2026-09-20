import {
  Building2,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: MapPin, label: "Free Site Visit" },
  { icon: ShieldCheck, label: "Professional Team" },
  { icon: Sparkles, label: "Deep Cleaning" },
  { icon: Home, label: "Residential" },
  { icon: Building2, label: "Commercial" },
  { icon: Users, label: "Kannur & Nearby" },
];

/** Trust strip directly under the hero (spec §21). */
export function TrustStrip() {
  return (
    <section aria-label="Why choose Clean UP" className="border-y border-cool/70 bg-surface">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-5 py-7 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-semibold text-navy">{label}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}
