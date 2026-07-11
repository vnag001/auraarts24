import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function Page() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Legal" title="Shipping Policy" />
      <div className="container-luxe max-w-3xl py-16 prose prose-neutral">
        <p className="text-muted leading-relaxed mb-4">AuraArts24 ships original paintings worldwide. Standard processing time is 2–4 business days before a piece leaves the studio, followed by 5–14 business days in transit depending on destination.</p>
        <p className="text-muted leading-relaxed mb-4">Every shipment includes a tracking number, sent by email once your order leaves the studio. You can also view tracking from your account order history.</p>
        <p className="text-muted leading-relaxed mb-4">Paintings are packed in acid-free tissue with corner protection inside a rigid custom box built for fine art transit. Shipping costs are calculated at checkout based on size and destination.</p>
        <p className="text-muted leading-relaxed">International orders may be subject to customs duties or import taxes, which are the responsibility of the recipient.</p>
      </div>
    </div>
  );
}
