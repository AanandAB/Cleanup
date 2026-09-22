import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Refund & Cancellation Policy | Clean UP" },
  description: "Refund and cancellation policy for Clean UP cleaning services.",
  robots: { index: false, follow: true },
};

export default function RefundPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy" updated="September 2026">
      <h2 className="font-display text-lg font-bold text-heading">Cancellations</h2>
      <p>
        If you need to cancel or reschedule, please contact us as early as possible so we
        can adjust our schedule. There is no charge for cancelling a free site visit.
      </p>

      <h2 className="font-display text-lg font-bold text-heading">Before service begins</h2>
      <p>
        If you cancel a confirmed booking before our team arrives or before work begins,
        any advance paid will be refunded in full.
      </p>

      <h2 className="font-display text-lg font-bold text-heading">After service begins</h2>
      <p>
        Once work has started, refunds are assessed case-by-case based on the work
        completed. Our final-inspection step means you confirm the job before we consider
        it done.
      </p>

      <h2 className="font-display text-lg font-bold text-heading">Satisfaction</h2>
      <p>
        If you&apos;re not satisfied with any part of the job, tell us during the final
        inspection or within 48 hours and we&apos;ll make it right.
      </p>

      <h2 className="font-display text-lg font-bold text-heading">Contact</h2>
      <p>
        For any refund or cancellation request, contact {siteConfig.name} at{" "}
        {siteConfig.email}.
      </p>
    </LegalPage>
  );
}
