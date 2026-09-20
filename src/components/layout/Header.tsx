"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { navItems, siteConfig, telLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Scroll-aware header: transparent at the top, then a compact
 * glass-blur sticky bar once the user scrolls.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-cool/70 bg-surface/80 shadow-sm backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-electric to-brand-light text-white shadow-md shadow-brand/30 transition-transform duration-200 group-hover:scale-105">
            <SparkleIcon />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-tight text-navy">
              CLEAN <span className="text-brand">UP</span>
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-ink-muted">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-cool/60 hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telLink()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-navy transition-colors hover:text-brand"
            aria-label="Call Clean UP"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">Call</span>
          </a>
          <Button href="/get-estimate" size="sm">
            Free Estimate
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-cool/60 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-cool/70 bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-cool/60 hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-cool/70 pt-4">
              <Button href="/get-estimate" className="w-full">
                Free Estimate
              </Button>
              <Button href={telLink()} variant="outline" className="w-full">
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

/** Small sparkle mark for the logo. */
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2z" />
      <path d="M19 14l.9 2.6L22.5 17l-2.6.9L19 20l-.9-2.6L15.5 17l2.6-.9L19 14z" opacity="0.7" />
    </svg>
  );
}
