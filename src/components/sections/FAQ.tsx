import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/content/home";

export function FAQ() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, Answered."
            subtitle="Common questions about our cleaning services across Kannur."
          />
        </Reveal>
        <Reveal className="mt-10">
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
