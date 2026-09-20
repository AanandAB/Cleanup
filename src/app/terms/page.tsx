import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use | Clean UP" },
  description: "Terms of use for the Clean UP website and cleaning services.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="September 2026">
      <p>
        These terms govern your use of the {siteConfig.name} website and our cleaning
        services. By using this site or booking a service, you agree to these terms.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Services</h2>
      <p>
        We provide house deep cleaning, glass cleaning, interlock cleaning and related
        services. The scope of each job is agreed during the free site visit and
        confirmed in your quote.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Estimates &amp; pricing</h2>
      <p>
        Estimates are free and provided after a site visit. A quote reflects the agreed
        scope; additional work requested after the quote may change the price and will be
        communicated before proceeding.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Customer responsibilities</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Provide accurate information about the space and job.</li>
        <li>Allow our team reasonable access to the premises.</li>
        <li>Secure or remove valuables and fragile items before cleaning.</li>
      </ul>

      <h2 className="font-display text-lg font-bold text-navy">Liability</h2>
      <p>
        We work carefully and professionally. To the maximum extent permitted by law, our
        liability is limited to the amount paid for the service in question.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Governing law</h2>
      <p>
        These terms are governed by the laws of India, with courts in Kerala having
        jurisdiction.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after
        changes constitutes acceptance.
      </p>
    </LegalPage>
  );
}
