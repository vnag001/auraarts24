import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "./SectionHeading";

export default function ProductRail({
  eyebrow,
  title,
  description,
  products,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="container-luxe py-20">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
