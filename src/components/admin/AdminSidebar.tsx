"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  FolderKanban,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Responsive admin navigation.
 *
 * - Desktop (md+): a fixed left sidebar, exactly as before.
 * - Mobile (<md): the sidebar is hidden; instead we render a sticky top bar
 *   with a hamburger button that opens a slide-in drawer. The drawer closes
 *   on backdrop tap, Escape, or any navigation.
 *
 * The nav links + logout live in small inner components so the desktop
 * sidebar and the mobile drawer share one source of truth.
 */

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/before-after", label: "Before & After", icon: ArrowLeftRight },
  { href: "/admin/gallery", label: "Gallery & Media", icon: Images },
];

/** Brand wordmark — white text for the navy sidebar/drawer. */
function Brand() {
  return (
    <p className="font-display text-lg font-extrabold tracking-tight text-white">
      Clean <span className="text-brand-light">UP</span>
      <span className="ml-1.5 text-xs font-medium text-white/50">Admin</span>
    </p>
  );
}

/** The nav links. `onNavigate` is wired on the mobile drawer only. */
function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton() {
  return (
    <div className="border-t border-white/10 p-3">
      <form action="/api/auth/logout" method="post">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4.5 w-4.5" />
          Log out
        </button>
      </form>
    </div>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  // While open: close on Escape / back-forward navigation, and lock body
  // scroll behind the drawer. Nav links close the drawer via `onNavigate`.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPop = () => setOpen(false);
    window.addEventListener("popstate", onPop);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile top bar — sticky, visible below md only. */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-cool bg-surface/90 px-4 py-3 backdrop-blur md:hidden">
        <p className="font-display text-base font-extrabold tracking-tight text-heading">
          Clean <span className="text-brand">UP</span>
          <span className="ml-1.5 text-xs font-medium text-ink-muted">Admin</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-cool bg-surface text-ink transition-colors hover:border-brand/40"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Desktop sidebar — fixed left, hidden below md. */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-navy-deep bg-navy md:flex">
        <div className="px-5 py-6">
          <Brand />
        </div>
        <NavLinks />
        <LogoutButton />
      </aside>

      {/* Mobile drawer — always mounted, slid off-screen when closed so the
          open/close transition animates cleanly. */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        {/* Panel */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Admin menu"
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85%] flex-col bg-navy shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <Brand />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <NavLinks onNavigate={() => setOpen(false)} />
          <LogoutButton />
        </aside>
      </div>
    </>
  );
}
