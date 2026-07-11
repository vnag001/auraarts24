import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import { generateOrderNumber } from "@/lib/utils";
import { CartItem } from "@/types";

const SHIPPING_COST = 35;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body as {
      items: CartItem[];
      customer: { fullName: string; email: string; phone: string; line1: string; city: string; state: string; zip: string; country: string };
    };

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Persist a pending order in Supabase before redirecting to Stripe.
    // Requires SUPABASE_SERVICE_ROLE_KEY to be set — swallow errors in dev
    // so the checkout flow still works before Supabase is connected.
    try {
      const supabase = createAdminClient();
      const { data: order } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          customer_email: customer.email,
          customer_name: customer.fullName,
          customer_phone: customer.phone,
          shipping_address: {
            line1: customer.line1,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            country: customer.country,
          },
          subtotal,
          shipping_cost: SHIPPING_COST,
          total: subtotal + SHIPPING_COST,
          status: "pending",
          payment_status: "unpaid",
        })
        .select()
        .single();

      if (order) {
        await supabase.from("order_items").insert(
          items.map((item) => ({
            order_id: order.id,
            product_id: item.productId,
            product_title: item.title,
            product_image: item.image,
            unit_price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          }))
        );
      }
    } catch (dbErr) {
      console.warn("Supabase order not persisted (not yet configured?):", dbErr);
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

    const session = await createCheckoutSession({
      items: items.map((i) => ({ title: i.title, image: i.image, price: i.price, quantity: i.quantity })),
      customerEmail: customer.email,
      orderNumber,
      successUrl: `${origin}/order-success?order=${orderNumber}`,
      cancelUrl: `${origin}/checkout`,
      shippingCostCents: SHIPPING_COST * 100,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }
}
