import Stripe from "stripe";

/**
 * Server-side Stripe client. Never import this into a Client Component.
 * Lazily initialized so `npm run build` doesn't fail before STRIPE_SECRET_KEY
 * is configured — it's only actually constructed the first time a route
 * handler touches `stripe` at request time.
 */
let _stripe: Stripe | null = null;

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    if (!_stripe) {
      _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
        apiVersion: "2025-02-24.acacia",
        typescript: true,
      });
    }
    return (_stripe as any)[prop];
  },
});

export interface CheckoutLineItem {
  title: string;
  image: string;
  price: number; // in dollars
  quantity: number;
}

/**
 * Build a Stripe Checkout Session for the AuraArts24 cart.
 * Supports card, Apple Pay, and Google Pay automatically via Stripe's
 * `automatic_payment_methods`.
 */
export async function createCheckoutSession(params: {
  items: CheckoutLineItem[];
  customerEmail: string;
  orderNumber: string;
  successUrl: string;
  cancelUrl: string;
  shippingCostCents: number;
  discountCents?: number;
}) {
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = params.items.map(
    (item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
      },
    })
  );

  if (params.shippingCostCents > 0) {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: params.shippingCostCents,
        product_data: { name: "Shipping" },
      },
    });
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"], // Apple Pay / Google Pay auto-enabled for card on supported browsers
    line_items,
    customer_email: params.customerEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { order_number: params.orderNumber },
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "IN", "DE", "FR", "AE"],
    },
    discounts: params.discountCents
      ? [
          {
            coupon: await createOneTimeCoupon(params.discountCents),
          },
        ]
      : undefined,
  });
}

async function createOneTimeCoupon(amountOffCents: number) {
  const coupon = await stripe.coupons.create({
    amount_off: amountOffCents,
    currency: "usd",
    duration: "once",
  });
  return coupon.id;
}
