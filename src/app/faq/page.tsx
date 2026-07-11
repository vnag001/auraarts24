import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "FAQ" };

const FAQS = [
  { q: "Are these original paintings or prints?", a: "Every painting sold on AuraArts24 is an original, handmade acrylic work unless explicitly listed as a print or limited edition." },
  { q: "How long does a custom commission take?", a: "Most commissions take 2–6 weeks depending on size, complexity, and current studio queue. You'll receive a specific estimate after your request is reviewed." },
  { q: "Do you ship internationally?", a: "Yes — we ship worldwide with tracked, insured shipping. Delivery estimates are shown at checkout based on your address." },
  { q: "Can I return a painting?", a: "Yes, original paintings can be returned within 14 days of delivery in their original condition. See our Return Policy for full details." },
  { q: "How is my painting packaged?", a: "Each canvas is wrapped in acid-free tissue, corner-protected, and shipped in a rigid, custom-built box to prevent damage in transit." },
  { q: "Do you offer a certificate of authenticity?", a: "Every original painting ships with a signed certificate of authenticity." },
];

export default function FAQPage() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Have a Question?" title="Frequently Asked Questions" />
      <div className="container-luxe max-w-3xl divide-y divide-border py-16">
        {FAQS.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="cursor-pointer list-none font-display text-lg text-primary flex items-center justify-between">
              {item.q}
              <span className="ml-4 text-accent transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
            </summary>
            <p className="mt-4 text-muted leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
