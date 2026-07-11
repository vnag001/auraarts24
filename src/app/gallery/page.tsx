import { Metadata } from "next";
import GalleryClient from "@/components/gallery/GalleryClient";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse the full AuraArts24 gallery of original handmade acrylic paintings.",
};

export default function GalleryPage() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Explore" title="Gallery" description="Every original painting, in one place." />
      <div className="container-luxe py-16">
        <GalleryClient />
      </div>
    </div>
  );
}
