import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

/**
 * Stripe sends events here after checkout completes, fails, or is refunded.
 * Register this endpoint in the Stripe Dashboard:
 *   Developers → Webhooks → Add endpoint → https://yourdomain.com/api/webhooks/stripe
 * Listen for: checkout.session.completed, checkout.session.expired, charge.refunded
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderNumber = session.metadata?.order_number;
      if (orderNumber) {
        await supabase
          .from("orders")
          .update({
            status: "paid",
            payment_status: "paid",
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq("order_number", orderNumber);
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderNumber = session.metadata?.order_number;
      if (orderNumber) {
        await supabase.from("orders").update({ status: "cancelled" }).eq("order_number", orderNumber);
      }
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      await supabase
        .from("orders")
        .update({ status: "refunded", payment_status: "refunded" })
        .eq("stripe_payment_intent_id", charge.payment_intent as string);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
