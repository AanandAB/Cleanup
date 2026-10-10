"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { navItems, siteConfig, telLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Floating pill navigation (Begood-style): a centered glass pill that floats
 * at the top, morphing into a solid glass bar once the page scrolls.
 * Mobile: full-screen animated menu with numbered links.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-[1180px] items-center justify-between rounded-full border py-2 pl-4 pr-2 transition-all duration-500",
            scrolled
              ? "border-cool/70 bg-surface/90 text-heading shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "border-cool/40 bg-surface/50 text-heading backdrop-blur-lg",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 pl-1"
            aria-label={`${siteConfig.name} home`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.jpeg"
              alt={`${siteConfig.name} logo`}
              className="h-8 w-auto object-contain"
            />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-base font-extrabold tracking-tight text-heading">
                CLEAN <span className="text-brand">UP</span>
              </span>
              <span className="block text-[10px] font-medium tracking-wide text-ink-muted">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-semibold text-ink/80 transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href={telLink()}
              aria-label="Call Clean UP"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-heading transition-colors hover:bg-cool/60 lg:flex"
            >
              <Phone className="h-4 w-4" />
            </a>
            <Button href="/get-estimate" size="sm" className="hidden lg:inline-flex">
              Free Estimate
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-heading transition-colors hover:bg-cool/60 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-surface text-heading lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpeg"
                  alt={`${siteConfig.name} logo`}
                  className="h-8 w-auto object-contain"
                />
                <span className="font-display text-base font-extrabold tracking-tight">
                  CLEAN <span className="text-brand">UP</span>
                </span>
              </Link>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-heading transition-colors hover:bg-cool/60"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 border-b border-cool/60 py-4"
                  >
                    <span className="text-xs font-semibold text-brand">0{i + 1}</span>
                    <span className="text-3xl font-semibold">{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navItems.length + 0.1 }}
                className="mt-8 flex flex-col gap-3"
              >
                <div onClick={() => setOpen(false)}>
                  <Button href="/get-estimate" className="w-full">
                    Free Estimate
                  </Button>
                </div>
                <div onClick={() => setOpen(false)}>
                  <Button href={telLink()} variant="outline" className="w-full">
                    <Phone className="h-4 w-4" /> Call Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
