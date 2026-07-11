import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import { categories, getByCategory } from "@/lib/data/mock-products";

export const metadata: Metadata = { title: "Collections" };

const COVER = {
  landscape: "photo-1465101162946-4377e57745c3",
  sunset: "photo-1500462918059-b1a0cb512f1d",
  bridge: "photo-1470004914212-05527e49370b",
  cityscape: "photo-1477959858617-67f85cf4f1df",
  nature: "photo-1441974231531-c6227db76b6e",
  abstract: "photo-1549289524-06cf8837ace5",
} as const;

export default function CollectionsPage() {
  return (
    <div className="pt-32">
      <PageHero eyebrow="Curated by Theme" title="Collections" description="Explore original artwork organized by mood and subject." />
      <div className="container-luxe grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const count = getByCategory(cat.slug).length;
          const cover = COVER[cat.slug as keyof typeof COVER];
          return (
            <Link key={cat.id} href={`/gallery?category=${cat.slug}`} className="group relative aspect-[4/5] overflow-hidden">
              <Image
                src={`https://images.unsplash.com/${cover}?auto=format&fit=crop&w=900&q=80`}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-2xl text-secondary">{cat.name}</h3>
                <p className="mt-1 text-xs text-secondary/70">{count} {count === 1 ? "piece" : "pieces"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
