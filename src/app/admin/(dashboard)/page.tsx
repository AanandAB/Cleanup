import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  { href: "/admin/settings", title: "Settings", desc: "Contact info, phone, WhatsApp, email, social links." },
  { href: "/admin/services", title: "Services", desc: "Edit house deep cleaning, glass and interlock content." },
  { href: "/admin/projects", title: "Projects", desc: "Add case studies with before/after photos." },
  { href: "/admin/gallery", title: "Gallery & Media", desc: "Upload photos and videos for the site." },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Manage your Clean UP website content. Changes go live immediately.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl border border-cool bg-surface p-6 transition-all hover:border-brand/40 hover:shadow-sm"
          >
            <h2 className="font-display text-lg font-bold text-navy">{c.title}</h2>
            <p className="mt-1 text-sm text-ink-muted">{c.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-all group-hover:gap-2">
              Manage <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
