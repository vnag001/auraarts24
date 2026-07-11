"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useWishlist, useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, toggleItem } = useWishlist();
  const addToCart = useCart((s) => s.addItem);

  return (
    <div className="pt-32">
      <PageHero eyebrow="Saved For Later" title="Your Wishlist" />
      <div className="container-luxe py-16">
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save the pieces that catch your eye and come back to them anytime."
            action={<Link href="/gallery" className="btn-primary">Browse Gallery</Link>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.productId} className="painting-card group relative">
                <button
                  onClick={() => toggleItem(item)}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-secondary shadow-card hover:bg-accent"
                  aria-label="Remove from wishlist"
                >
                  <X className="h-4 w-4" />
                </button>
                <Link href={`/shop/${item.slug}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE9E2]">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>
                <div className="p-5">
                  <h3 className="font-display text-lg text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-primary">{formatPrice(item.price)}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => {
                      addToCart({ ...item, quantity: 1 });
                      toast.success("Added to cart");
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
