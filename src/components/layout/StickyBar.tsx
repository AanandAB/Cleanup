"use client";

import { MessageCircle, Phone } from "lucide-react";
import { siteConfig, telLink, waLink } from "@/lib/site";

/**
 * Sticky mobile action bar — Call / WhatsApp always within thumb
 * reach (spec §35). Hidden on desktop.
 */
export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-cool/70 bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={telLink()}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-navy transition-colors active:bg-cool/60"
        aria-label="Call Clean UP"
      >
        <Phone className="h-5 w-5" />
        <span className="text-xs font-semibold">Call</span>
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 border-l border-cool/70 bg-[#25D366] text-white transition-colors active:brightness-95"
        aria-label="WhatsApp Clean UP"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-xs font-semibold">WhatsApp</span>
      </a>
    </div>
  );
}
