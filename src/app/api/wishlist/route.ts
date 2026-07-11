import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/wishlist — list the signed-in user's saved products */
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ items: [] });

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("*, product:products(*)")
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

/** POST /api/wishlist — add a product to the signed-in user's wishlist */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();
  const { error } = await supabase.from("wishlist_items").upsert({ user_id: user.id, product_id: productId });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
