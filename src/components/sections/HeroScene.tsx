"use client";

import dynamic from "next/dynamic";

// `ssr: false` dynamic imports must live in a Client Component.
const CleaningScene = dynamic(
  () => import("@/components/three/CleaningScene").then((m) => m.CleaningScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-navy via-navy-deep to-brand/50" />
    ),
  },
);

/** Client wrapper that lazy-loads the WebGL hero scene. */
export function HeroScene() {
  return <CleaningScene />;
}
