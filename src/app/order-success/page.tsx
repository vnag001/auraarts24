"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Download } from "lucide-react";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-32">
      <div className="container-luxe max-w-lg text-center">
        <CheckCircle2 className="mx-auto mb-6 h-14 w-14 text-accent" strokeWidth={1.25} />
        <h1 className="font-display text-3xl text-primary sm:text-4xl">Thank You for Your Order</h1>
        <p className="mt-4 text-muted leading-relaxed">
          Your painting is being carefully prepared for shipment. A confirmation email with your
          order details and tracking information is on its way to you.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          <Button variant="outline" size="md">
            <Download className="h-4 w-4" /> Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
