"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { beforeAfterCategories } from "@/content/home";
import { cn } from "@/lib/utils";

// Placeholder images — real Clean UP job photos replace these via
// the CMS (Phase 6). The slider interaction is fully working.
const PLACEHOLDER = {
  before: "/placeholders/before.svg",
  after: "/placeholders/after.svg",
};

export function BeforeAfter() {
  const [active, setActive] = useState<string>(beforeAfterCategories[0]);

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Before & After"
          title="Don't Take Our Word for It. See the Difference."
          subtitle="Drag the handle to compare. Photos below are placeholders — real job photos land here from the CMS."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {beforeAfterCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                active === c
                  ? "bg-navy text-white shadow-md"
                  : "bg-cool text-ink hover:bg-cool/70",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <BeforeAfterSlider
            before={PLACEHOLDER.before}
            after={PLACEHOLDER.after}
            alt={`${active} cleaning — before and after`}
          />
        </div>
      </Container>
    </section>
  );
}
