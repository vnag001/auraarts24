import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { resend } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    // Save message to Supabase
    const { error } = await supabase.from("messages").insert({
      name: body.name,
      email: body.email,
      subject: body.subject || null,
      message: body.message,
    });

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
      subject: `📩 New Contact Message - ${body.subject || "No Subject"}`,
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Subject:</strong> ${body.subject || "No Subject"}</p>

        <hr>

        <p>${body.message}</p>
      `,
    });

    // Confirmation email to customer
    await resend.emails.send({
      from: "AuraArts24 <onboarding@resend.dev>",
      to: [body.email],
      subject: "Thank you for contacting AuraArts24",
      html: `
        <h2>Hello ${body.name},</h2>

        <p>Thank you for contacting <strong>AuraArts24</strong>.</p>

        <p>We have received your message and will get back to you as soon as possible.</p>

        <p>We appreciate your interest in our artwork!</p>

        <br>

        <strong>AuraArts24 Team</strong>
      `,
    });

    return NextResponse.json({
      success: true,
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
