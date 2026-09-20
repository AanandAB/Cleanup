import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EstimateForm } from "@/components/EstimateForm";

export const metadata: Metadata = {
  title: { absolute: "Get a Free Estimate | Clean UP" },
  description:
    "Request a free cleaning estimate from Clean UP. House deep cleaning, glass and interlock cleaning across Kannur — free site visit.",
};

export default function GetEstimatePage() {
  return (
    <SiteShell>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Get Estimate" }]}
        title="Get a Free Estimate"
        intro="Fill in a few details and we'll open WhatsApp with your request prefilled — then we arrange a free site visit."
      />

      <section className="py-16 md:py-20">
        <Container className="max-w-2xl">
          <EstimateForm />
        </Container>
      </section>
    </SiteShell>
  );
}
