import {
  Building2,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";

const items = [
  { icon: MapPin, label: "Free Site Visit" },
  { icon: ShieldCheck, label: "Professional Team" },
  { icon: Sparkles, label: "Deep Cleaning" },
  { icon: Home, label: "Residential" },
  { icon: Building2, label: "Commercial" },
  { icon: Users, label: "Kannur & Nearby" },
];

/** Trust strip directly under the hero — an infinite marquee ticker. */
export function TrustStrip() {
  return (
    <section
      aria-label="Why choose Clean UP"
      className="border-y border-cool/70 bg-surface py-6"
    >
      <Marquee speed={28}>
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="mx-8 flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-navy">
              {label}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
