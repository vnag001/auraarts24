import { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = { title: "About the Artist" };

export default function AboutPage() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Our Story" title="About the Artist" />
      <div className="container-luxe grid grid-cols-1 gap-14 py-16 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80"
            alt="The artist in the studio"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-muted leading-relaxed">
          <p>
            AuraArts24 is the work of a single studio built around one idea: that a painting
            should hold a feeling, not just fill a wall. Every piece begins as raw canvas and
            a palette of acrylics, and ends as something meant to live with a person for years.
          </p>
          <p>
            Landscapes, sunsets, cityscapes, bridges, nature studies, and abstract works each
            explore color and texture differently, but they share the same hand-built process —
            layered, textured, and finished with care before it ever reaches a collector&apos;s home.
          </p>
          <p>
            Beyond the ready-to-ship collection, much of the studio&apos;s work is commissioned —
            paintings built around a memory, a room, or a story a client wants to keep close.
          </p>
        </div>
      </div>
    </div>
  );
}
