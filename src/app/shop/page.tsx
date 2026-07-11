import { Metadata } from "next";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ProductCard from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/empty-state";
import { products } from "@/lib/data/mock-products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop original acrylic paintings and canvas artwork from AuraArts24.",
};

export default function ShopPage() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Original Paintings" title="Shop" description="One-of-a-kind pieces, ready to ship." />
      <div className="container-luxe py-16">
        {products.length === 0 ? (
          <EmptyState
            icon={ImageOff}
            title="New artwork coming soon"
            description="The studio is preparing its next collection. Check back shortly, or reach out to commission a custom piece."
            action={<Link href="/custom-orders" className="btn-primary">Commission Artwork</Link>}
          />
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
