import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBySlug, getRelated, products } from "@/lib/data/mock-products";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import ReviewSection from "@/components/product/ReviewSection";
import ProductCard from "@/components/product/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [{ url: product.images[0] }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <div className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            image: product.images,
            description: product.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: product.price,
              availability: product.is_available
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />

      <div className="container-luxe py-16">
        <ProductDetailClient product={product} />

        <div className="mt-20">
          <ReviewSection />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
