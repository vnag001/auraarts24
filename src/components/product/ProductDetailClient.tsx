"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Share2, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const router = useRouter();

  const addItem = useCart((s) => s.addItem);
  const isWishlisted = useWishlist((s) => s.isWishlisted(product.id));
  const toggleWishlist = useWishlist((s) => s.toggleItem);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      quantity,
      canvasSize: product.canvas_size,
    });
    toast.success(`${product.title} added to your cart`);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
      {/* Gallery */}
      <div>
        <div
          className={cn(
            "relative aspect-[4/5] overflow-hidden bg-[#ECE9E2] cursor-zoom-in",
            zoomed && "cursor-zoom-out"
          )}
          onClick={() => setZoomed((z) => !z)}
        >
          <Image
            src={product.images[activeImage]}
            alt={product.title}
            fill
            priority
            className={cn("object-cover transition-transform duration-500", zoomed && "scale-150")}
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative h-20 w-20 overflow-hidden border-2",
                  activeImage === i ? "border-accent" : "border-transparent"
                )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="eyebrow mb-3">{product.medium}</p>
        <h1 className="font-display text-4xl text-primary leading-tight">{product.title}</h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl text-primary">{formatPrice(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-base text-muted line-through">{formatPrice(product.compare_at_price)}</span>
          )}
          <span
            className={cn(
              "ml-2 text-xs uppercase tracking-wide",
              product.is_available ? "text-green-700" : "text-red-600"
            )}
          >
            {product.is_available ? `In Stock (${product.stock_quantity})` : "Sold Out"}
          </span>
        </div>

        <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-6 text-sm">
          <div>
            <dt className="text-muted">Canvas Size</dt>
            <dd className="text-primary mt-1">{product.canvas_size}</dd>
          </div>
          <div>
            <dt className="text-muted">Medium</dt>
            <dd className="text-primary mt-1">{product.medium}</dd>
          </div>
          <div>
            <dt className="text-muted">Frame</dt>
            <dd className="text-primary mt-1">{product.frame_option}</dd>
          </div>
          <div>
            <dt className="text-muted">Originality</dt>
            <dd className="text-primary mt-1">{product.is_original ? "One-of-a-kind Original" : "Limited Edition"}</dd>
          </div>
        </dl>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center border border-border">
            <button
              className="p-3 hover:bg-canvas"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <button
              className="p-3 hover:bg-canvas"
              onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button variant="outline" size="icon" onClick={() =>
            toggleWishlist({ productId: product.id, title: product.title, slug: product.slug, image: product.images[0], price: product.price })
          }>
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current text-accent")} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              toast.success("Link copied to clipboard");
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="lg" className="flex-1" disabled={!product.is_available} onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="gold" size="lg" className="flex-1" disabled={!product.is_available} onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>

        <div className="mt-8 space-y-3 text-sm text-muted">
          <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Worldwide shipping with tracking included</p>
          <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Certificate of authenticity with every original</p>
        </div>
      </div>
    </div>
  );
}
