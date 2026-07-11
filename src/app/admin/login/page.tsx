"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-6">
      <div className="w-full max-w-sm bg-secondary p-10 shadow-card">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl text-primary">AuraArts24</p>
          <p className="eyebrow mt-1">Admin Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input required type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
