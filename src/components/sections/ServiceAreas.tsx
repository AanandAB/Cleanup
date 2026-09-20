import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { locationPages, serviceAreas } from "@/lib/site";

export function ServiceAreas() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Service Areas"
            title="Cleaning Services Across Kannur"
            subtitle="From our base around Kuthuparamba, we cover Kannur and the surrounding areas. Tap an area for coverage details."
          />
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => {
            const hasPage = locationPages.some((l) => l.name === area);
            return (
              <Link
                key={area}
                href={hasPage ? `/locations/${area.toLowerCase()}` : "/locations"}
                className="group flex items-center gap-1.5 rounded-full border border-cool bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:border-brand/40 hover:text-brand hover:shadow-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {area}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
