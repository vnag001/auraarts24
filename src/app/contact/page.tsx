"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent. We'll reply within 1–2 business days.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32">
      <PageHero eyebrow="Get in Touch" title="Contact Us" />
      <div className="container-luxe grid grid-cols-1 gap-14 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-primary text-sm font-medium">Email</p>
              <p className="text-muted text-sm">vinaynag51@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-primary text-sm font-medium">Phone</p>
              <p className="text-muted text-sm">+91 63605 36307</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-primary text-sm font-medium">Studio</p>
              <p className="text-muted text-sm">Shipping worldwide from our home studio</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <Textarea required placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
