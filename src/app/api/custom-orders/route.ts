import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** POST /api/custom-orders — store a commission / custom artwork request */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("commission_requests")
    .insert({
      user_id: user?.id ?? null,
      name: body.name,
      email: body.email,
      phone: body.phone,
      canvas_size: body.canvasSize,
      painting_style: body.paintingStyle,
      deadline: body.deadline || null,
      budget: body.budget ? Number(body.budget) : null,
      description: body.description,
      reference_images: body.referenceImages ?? [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ request: data }, { status: 201 });
}
