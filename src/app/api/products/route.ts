import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

/** GET /api/products — list products, optionally filtered by ?category=slug&featured=true */
export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let query = supabase.from("products").select("*, category:categories(*)").order("created_at", { ascending: false });
  if (featured === "true") query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const filtered = category ? data?.filter((p: any) => p.category?.slug === category) : data;
  return NextResponse.json({ products: filtered ?? [] });
}

/** POST /api/products — create a product (admin only, enforced by RLS policy) */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("products")
    .insert({ ...body, slug: body.slug || slugify(body.title) })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data }, { status: 201 });
}
