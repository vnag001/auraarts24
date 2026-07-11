"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STYLES = ["Realism", "Abstract", "Landscape", "Portrait", "Minimalist", "Impressionist"];

export default function CustomOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", canvasSize: "", paintingStyle: STYLES[0],
    deadline: "", budget: "", description: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // In production: upload `files` to Cloudinary first, then POST resulting URLs
      // alongside the form fields to /api/custom-orders (which writes to Supabase).
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, referenceImageCount: files.length }),
      });
      if (!res.ok) throw new Error();
      toast.success("Your commission request has been submitted. We'll be in touch within 48 hours.");
      setForm({ name: "", email: "", phone: "", canvasSize: "", paintingStyle: STYLES[0], deadline: "", budget: "", description: "" });
      setFiles([]);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32">
      <PageHero
        eyebrow="Made For You"
        title="Commission Artwork"
        description="Tell us your vision — we'll bring it to life in acrylic, on canvas, made to fit your space."
      />
      <div className="container-luxe max-w-2xl py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block cursor-pointer border-2 border-dashed border-border p-10 text-center hover:border-accent transition-colors">
            <UploadCloud className="mx-auto mb-3 h-8 w-8 text-accent" />
            <p className="text-sm text-primary">
              {files.length > 0 ? `${files.length} reference image(s) selected` : "Upload reference images"}
            </p>
            <p className="mt-1 text-xs text-muted">PNG, JPG up to 10MB each</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input required placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            <Input required placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            <Input required placeholder="Canvas Size (e.g. 24in x 36in)" value={form.canvasSize} onChange={(e) => update("canvasSize", e.target.value)} />

            <select
              value={form.paintingStyle}
              onChange={(e) => update("paintingStyle", e.target.value)}
              className="border border-border bg-secondary px-4 py-3 text-sm focus:border-accent focus:outline-none"
            >
              {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Input type="date" required value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
            <Input placeholder="Budget (USD)" value={form.budget} onChange={(e) => update("budget", e.target.value)} className="sm:col-span-2" />
          </div>

          <Textarea
            required
            placeholder="Describe your vision — colors, mood, subject, inspiration..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
            {loading ? "Submitting…" : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
