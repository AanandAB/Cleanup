import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { getPublicSettings } from "@/lib/queries";

// Fallbacks used until the admin sets values via the "Before & After" page.
const FALLBACK_TITLE = "See the Clean UP Difference";
const FALLBACK_SUBTITLE = "Drag the handle to see the transformation.";
const FALLBACK_BEFORE = "https://picsum.photos/seed/cleanup-before/900/675";
const FALLBACK_AFTER = "https://picsum.photos/seed/cleanup-after/900/675";

export async function BeforeAfter() {
  const settings = await getPublicSettings();
  const title = settings["before_after_title"] || FALLBACK_TITLE;
  const subtitle = settings["before_after_subtitle"] || FALLBACK_SUBTITLE;
  const before = settings["before_image"] || FALLBACK_BEFORE;
  const after = settings["after_image"] || FALLBACK_AFTER;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Before & After" title={title} subtitle={subtitle} />
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <BeforeAfterSlider before={before} after={after} alt="Cleaning transformation" />
        </Reveal>
      </Container>
    </section>
  );
}
