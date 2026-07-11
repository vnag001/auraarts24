import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/reviews?product_id=... — list approved reviews for a product */
export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const productId = new URL(req.url).searchParams.get("product_id");
  if (!productId) return NextResponse.json({ error: "product_id is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reviews: data ?? [] });
}

/** POST /api/reviews — submit a new review (goes to is_approved=false until moderated) */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("reviews").insert({
    product_id: body.productId,
    user_id: user?.id ?? null,
    customer_name: body.customerName,
    rating: body.rating,
    title: body.title ?? null,
    comment: body.comment ?? null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true }, { status: 201 });
}
