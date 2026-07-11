import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <div className="container-luxe max-w-3xl py-16 prose prose-neutral">
        <p className="text-muted leading-relaxed mb-4">AuraArts24 (&quot;we&quot;, &quot;us&quot;) collects the personal information you provide when browsing, purchasing, or submitting a commission request — including your name, email, shipping address, and payment details processed securely via Stripe.</p>
        <p className="text-muted leading-relaxed mb-4">We use this information solely to fulfill orders, respond to inquiries, and — with your consent — send occasional newsletter updates. We never sell your personal data to third parties.</p>
        <p className="text-muted leading-relaxed mb-4">Payment information is handled entirely by Stripe and is never stored on our servers. Uploaded reference images for commissions are stored securely via Cloudinary and used only for the purpose of creating your artwork.</p>
        <p className="text-muted leading-relaxed">You may request access to, correction of, or deletion of your personal data at any time by contacting hello@auraarts24.com.</p>
      </div>
    </div>
  );
}
