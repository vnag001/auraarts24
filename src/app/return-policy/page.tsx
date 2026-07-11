import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Return Policy" };

export default function Page() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Legal" title="Return Policy" />
      <div className="container-luxe max-w-3xl py-16 prose prose-neutral">
        <p className="text-muted leading-relaxed mb-4">Original paintings may be returned within 14 days of delivery if they arrive in their original, unaltered condition. Contact hello@auraarts24.com to initiate a return.</p>
        <p className="text-muted leading-relaxed mb-4">Because each commissioned piece is created specifically for you, custom artwork is final sale and not eligible for return unless the piece arrives damaged.</p>
        <p className="text-muted leading-relaxed mb-4">If your painting arrives damaged in transit, contact us within 48 hours with photos of the packaging and artwork so we can arrange a replacement or refund.</p>
        <p className="text-muted leading-relaxed">Approved refunds are issued to the original payment method within 5–10 business days of receiving the returned item.</p>
      </div>
    </div>
  );
}
