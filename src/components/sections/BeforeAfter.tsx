import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

/**
 * Before/after comparison section. Uses placeholder images for now —
 * replace the two URLs with a real dirty/clean photo pair via a future CMS
 * field, or edit this file.
 */
export function BeforeAfter() {
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
          <BeforeAfterSlider
            before="https://picsum.photos/seed/cleanup-before/1200/900"
            after="https://picsum.photos/seed/cleanup-after/1200/900"
            alt="Cleaning transformation"
          />
        </Reveal>
      </Container>
    </section>
  );
}
