"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/shared/PageHero";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    line1: "", city: "", state: "", zip: "", country: "United States",
  });

  const shipping = items.length > 0 ? 35 : 0;
  const total = subtotal() + shipping;

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer: form }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        throw new Error(data.error ?? "Checkout failed");
      }
    } catch (err) {
      toast.error("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32">
      <PageHero eyebrow="Secure Checkout" title="Checkout" />
      <div className="container-luxe py-16">
        <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-xl text-primary mb-5">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input required placeholder="Full Name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
                <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                <Input required placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="sm:col-span-2" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl text-primary mb-5">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input required placeholder="Address" value={form.line1} onChange={(e) => update("line1", e.target.value)} className="sm:col-span-2" />
                <Input required placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
                <Input required placeholder="State / Province" value={form.state} onChange={(e) => update("state", e.target.value)} />
                <Input required placeholder="ZIP / Postal Code" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
                <Input required placeholder="Country" value={form.country} onChange={(e) => update("country", e.target.value)} />
              </div>
            </div>
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading || items.length === 0}>
              {loading ? "Redirecting to secure payment…" : `Pay ${formatPrice(total)}`}
            </Button>
            <p className="text-xs text-muted text-center">
              You&apos;ll be redirected to Stripe&apos;s secure checkout to pay by card, Apple Pay, or Google Pay.
            </p>
          </div>

          <div className="h-fit bg-secondary p-8 shadow-card">
            <h2 className="font-display text-xl text-primary mb-6">Order Summary</h2>
            <div className="space-y-4 divide-y divide-border">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between pt-4 first:pt-0 text-sm">
                  <span className="text-primary">{item.title} × {item.quantity}</span>
                  <span className="text-muted">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatPrice(subtotal())}</span></div>
              <div className="flex justify-between text-muted"><span>Shipping</span><span>{formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-base text-primary pt-2"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
