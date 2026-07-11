import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Priya S.", text: "The painting is even more stunning in person. Packaging was museum-quality — every corner protected.", rating: 5 },
  { name: "Daniel W.", text: "Commissioned a piece for our living room and the artist nailed the palette we described from just a few photos.", rating: 5 },
  { name: "Meera R.", text: "Fast worldwide shipping and the canvas arrived without a scratch. Already planning my second piece.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="bg-primary py-24">
      <div className="container-luxe">
        <p className="eyebrow mb-3 text-center text-accent">What Collectors Say</p>
        <h2 className="mb-14 text-center font-display text-3xl text-secondary sm:text-4xl">
          Loved by Art Collectors Worldwide
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="border border-secondary/10 p-8">
              <div className="mb-4 flex gap-1 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-secondary/80 leading-relaxed">&quot;{r.text}&quot;</p>
              <p className="mt-6 text-sm text-secondary/50">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
