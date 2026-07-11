"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import PageHero from "@/components/shared/PageHero";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = items.length > 0 ? 35 : 0;
  const total = subtotal() + shipping;

  return (
    <div className="pt-32">
      <PageHero eyebrow="Review Your Selection" title="Shopping Cart" />
      <div className="container-luxe py-16">
        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Discover an original piece to bring home."
            action={<Link href="/shop" className="btn-primary">Shop Collection</Link>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 divide-y divide-border">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-5 py-6">
                  <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden bg-[#ECE9E2]">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link href={`/shop/${item.slug}`} className="font-display text-lg text-primary hover:text-accent">
                          {item.title}
                        </Link>
                        {item.canvasSize && <p className="text-xs text-muted mt-1">{item.canvasSize}</p>}
                      </div>
                      <button onClick={() => removeItem(item.productId)} aria-label="Remove item" className="text-muted hover:text-primary">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button className="p-2 hover:bg-canvas" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button className="p-2 hover:bg-canvas" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm text-primary">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit bg-secondary p-8 shadow-card">
              <h2 className="font-display text-xl text-primary mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between border-t border-border pt-6 text-base text-primary">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link href="/checkout" className="btn-gold mt-8 flex w-full">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
