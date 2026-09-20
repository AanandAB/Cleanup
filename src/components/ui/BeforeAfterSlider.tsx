"use client";

import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive before/after comparison slider. Drag (or tap-drag)
 * the handle to reveal the "after" over the "before" image.
 * Works with mouse, touch and keyboard via the range input under
 * the hood for a11y.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  className,
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-3xl border border-cool bg-cool",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* AFTER (base layer) */}
      <img
        src={after}
        alt={`${alt} — after`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* BEFORE (clipped layer) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt={`${alt} — before`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* divider + handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-white/90 shadow-md" />
        <div className="absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-surface text-heading shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" />
        </div>
      </div>

      {/* labels */}
      <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
        Before
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-brand/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
        After
      </span>
    </div>
  );
}
