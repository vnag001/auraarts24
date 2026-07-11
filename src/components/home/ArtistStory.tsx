import Image from "next/image";
import Link from "next/link";

export default function ArtistStory() {
  return (
    <section className="bg-secondary py-24">
      <div className="container-luxe grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=80"
            alt="The artist at work in the studio"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow mb-4">The Artist</p>
          <h2 className="font-display text-4xl text-primary leading-tight">
            Every canvas begins with a feeling worth keeping.
          </h2>
          <p className="mt-6 text-muted leading-relaxed">
            AuraArts24 began in a small home studio with a single easel and a belief that
            handmade work carries something no print ever could. Each painting is built up in
            layers of acrylic, texture, and patience — designed to hold its own in a room and
            in a story.
          </p>
          <Link href="/about" className="btn-outline mt-8 inline-flex">Read the Full Story</Link>
        </div>
      </div>
    </section>
  );
}
