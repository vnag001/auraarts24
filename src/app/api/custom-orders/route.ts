import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body = await req.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      request: data,
    });
  } catch (err: any) {
    console.error("API Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}