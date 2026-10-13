import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { getPublicSettings } from "@/lib/queries";

// Fallbacks used until the admin uploads real before/after photos via
// Settings → "Before & After section".
const FALLBACK_BEFORE = "https://picsum.photos/seed/cleanup-before/900/675";
const FALLBACK_AFTER = "https://picsum.photos/seed/cleanup-after/900/675";

export async function BeforeAfter() {
  const settings = await getPublicSettings();
  const before = settings["before_image"] || FALLBACK_BEFORE;
  const after = settings["after_image"] || FALLBACK_AFTER;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Before & After"
            title="See the Clean UP Difference"
            subtitle="Drag the handle to see the transformation."
          />
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <BeforeAfterSlider before={before} after={after} alt="Cleaning transformation" />
        </Reveal>
      </Container>
    </section>
  );
}
