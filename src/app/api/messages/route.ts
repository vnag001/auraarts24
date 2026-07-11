import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/** POST /api/messages — store a contact form submission */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createAdminClient();

  const { error } = await supabase.from("messages").insert({
    name: body.name,
    email: body.email,
    subject: body.subject || null,
    message: body.message,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
