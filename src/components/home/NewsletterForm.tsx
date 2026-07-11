"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success("You're on the list. Welcome to AuraArts24.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const dark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.25)" : "#111111" }}>
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          "flex-1 bg-transparent py-2.5 text-sm outline-none",
          dark ? "text-secondary placeholder:text-secondary/40" : "text-primary placeholder:text-muted"
        )}
      />
      <button
        type="submit"
        disabled={loading}
        aria-label="Subscribe"
        className={cn("p-2 transition-colors", dark ? "text-accent hover:text-accent-light" : "text-primary hover:text-accent")}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
