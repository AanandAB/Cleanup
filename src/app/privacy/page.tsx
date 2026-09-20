import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Clean UP" },
  description: "How Clean UP collects, uses and protects your personal information (DPDP Act 2023 compliant).",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <p>
        {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy and is
        committed to protecting your personal information in line with India&apos;s Digital
        Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Information we collect</h2>
      <p>
        When you contact us or request an estimate, we collect the information you provide:
        your name, phone number, location, the service you&apos;re interested in, and any
        message details. If you share photos of your space, we treat those as part of your
        request.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">How we use it</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>To respond to your enquiry and provide estimates.</li>
        <li>To schedule site visits and deliver our cleaning services.</li>
        <li>To communicate with you about your request via phone or WhatsApp.</li>
      </ul>

      <h2 className="font-display text-lg font-bold text-navy">Consent</h2>
      <p>
        By contacting us, you consent to us using the information you provide for the
        purposes above. You may withdraw consent at any time by contacting us.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Sharing</h2>
      <p>
        We do not sell your data. We share information only as needed to provide the
        service (for example, our team members who handle your job) and as required by
        law.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Your rights</h2>
      <p>
        You may request access to, correction of, or erasure of your personal information
        at any time. We will respond to such requests in line with applicable law.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Retention</h2>
      <p>
        We keep enquiry information only as long as needed to respond and provide the
        service, after which it is deleted or anonymised.
      </p>

      <h2 className="font-display text-lg font-bold text-navy">Contact</h2>
      <p>
        For privacy questions or requests, email {siteConfig.email} or contact us at{" "}
        {siteConfig.addressLine}.
      </p>
    </LegalPage>
  );
}
