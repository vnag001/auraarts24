import { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <div className="container-luxe max-w-3xl py-16 prose prose-neutral">
        <p className="text-muted leading-relaxed mb-4">By using AuraArts24, you agree to purchase original artwork and commissioned pieces in accordance with these terms.</p>
        <p className="text-muted leading-relaxed mb-4">All artwork remains the intellectual property of the artist. Purchasing a painting transfers ownership of the physical piece, not reproduction rights, unless otherwise agreed in writing.</p>
        <p className="text-muted leading-relaxed mb-4">Commissioned artwork is created based on the brief, reference images, and preferences you provide. While we aim to match your vision closely, final artistic interpretation rests with the artist.</p>
        <p className="text-muted leading-relaxed">Prices are listed in USD and are subject to change without notice. Orders are confirmed only once payment has been successfully processed.</p>
      </div>
    </div>
  );
}
