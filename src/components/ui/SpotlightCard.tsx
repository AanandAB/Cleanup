"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight card — a radial gradient highlight follows the cursor
 * (21st.dev "SpotlightCard" pattern). Purely decorative; content
 * stays inside a normal stacking layer.
 */
export function SpotlightCard({
  className,
  children,
  spotlightColor = "rgba(71,116,246,0.16)",
}: {
  className?: string;
  children: React.ReactNode;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-cool bg-surface",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(560px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
