import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { resend } from "@/lib/email";

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
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Email to you
    await resend.emails.send({
      from: "AuraArts24 <onboarding@resend.dev>",
      to: ["vinaynag51@gmail.com"],
      subject: "🎨 New Commission Request",
      html: `
        <h2>New Commission Request</h2>

        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>

        <p><strong>Canvas Size:</strong> ${body.canvasSize}</p>
        <p><strong>Painting Style:</strong> ${body.paintingStyle}</p>

        <p><strong>Budget:</strong> ${body.budget}</p>
        <p><strong>Deadline:</strong> ${body.deadline}</p>

        <hr>

        <p>${body.description}</p>
      `,
    });

    // Confirmation email to customer
    await resend.emails.send({
      from: "AuraArts24 <onboarding@resend.dev>",
      to: [body.email],
      subject: "We've received your commission request 🎨",
      html: `
        <h2>Thank you, ${body.name}!</h2>

        <p>We've received your commission request.</p>

        <p>Our artist will review it and contact you within <strong>48 hours</strong>.</p>

        <p>Thank you for choosing AuraArts24.</p>

        <br>

        <strong>AuraArts24 Team</strong>
      `,
    });

    return NextResponse.json({
      success: true,
      request: data,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}