"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlist } from "@/lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const isWishlisted = useWishlist((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlist((s) => s.toggleItem);

  const onSale = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <div className="painting-card group">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE9E2]">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {onSale && (
            <span className="absolute left-3 top-3 bg-accent px-3 py-1 text-[10px] tracking-luxe uppercase text-primary">
              Sale
            </span>
          )}
          {!product.is_available && (
            <span className="absolute left-3 top-3 bg-primary px-3 py-1 text-[10px] tracking-luxe uppercase text-secondary">
              Sold
            </span>
          )}

          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:opacity-100">
            <button
              aria-label="Quick view"
              onClick={(e) => e.preventDefault()}
              className="flex h-11 w-11 -translate-y-2 items-center justify-center bg-secondary text-primary opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-accent"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist({
                  productId: product.id,
                  title: product.title,
                  slug: product.slug,
                  image: product.images[0],
                  price: product.price,
                });
              }}
              className={cn(
                "flex h-11 w-11 translate-y-2 items-center justify-center shadow-card transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100 opacity-0",
                isWishlisted ? "bg-accent text-primary" : "bg-secondary text-primary hover:bg-accent"
              )}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </button>
          </div>
        </div>

        <div className="p-5">
          <p className="eyebrow mb-1 text-[10px] text-muted">{product.medium}</p>
          <h3 className="font-display text-lg text-primary leading-snug">{product.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-primary">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
