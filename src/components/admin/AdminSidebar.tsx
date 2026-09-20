"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Images,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/gallery", label: "Gallery & Media", icon: Images },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-navy-deep bg-navy text-white md:min-h-screen">
      <div className="px-5 py-6">
        <p className="font-display text-lg font-extrabold tracking-tight">
          Clean <span className="text-brand-light">UP</span>
        </p>
        <p className="text-xs font-medium text-white/50">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
