import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/** POST /api/newsletter — subscribe an email address */
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email, is_active: true }, { onConflict: "email" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
