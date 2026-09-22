import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navItems, serviceAreas, services, siteConfig } from "@/lib/site";
import { getPublicSettings } from "@/lib/queries";
import { Container } from "@/components/ui/Container";

/**
 * Large premium footer. Contact details are CMS-driven (D1 settings)
 * with siteConfig as the fallback; service/area/nav lists are static.
 */
export async function Footer() {
  const s = await getPublicSettings();
  const phone = s.phone || siteConfig.phone;
  const whatsapp = s.whatsapp || siteConfig.whatsapp;
  const email = s.email || siteConfig.email;
  const addressLine = s.address_line || siteConfig.addressLine;

  const telHref = `tel:+91${phone}`;
  const waHref = `https://wa.me/${whatsapp}`;

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            CLEAN <span className="text-brand-light">UP</span>
          </p>
          <p className="mt-1 text-sm font-medium text-white/70">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {siteConfig.secondaryTagline} Professional residential and commercial
            cleaning across {siteConfig.address.region} and nearby areas.
          </p>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Services
          </p>
          <ul className="mt-4 space-y-2.5">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link href={svc.href} className="text-sm text-white/75 transition-colors hover:text-white">
                  {svc.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="text-sm text-white/75 transition-colors hover:text-white">
                All Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Service areas */}
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Service Areas
          </p>
          <ul className="mt-4 space-y-2.5">
            {serviceAreas.slice(0, 6).map((area) => (
              <li key={area}>
                <Link
                  href={`/locations/${area.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {area}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + contact */}
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Company
          </p>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2.5 text-sm text-white/75">
            <a href={telHref} className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-4 w-4 text-brand-light" /> Call Us
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-4 w-4 text-brand-light" /> WhatsApp
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-brand-light" /> {email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-light" /> {addressLine}
            </span>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 pb-24 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-white">Sitemap</Link>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
