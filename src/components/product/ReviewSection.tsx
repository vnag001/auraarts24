import { Star } from "lucide-react";

const MOCK_REVIEWS = [
  { name: "Alicia M.", rating: 5, comment: "Stunning in person, the color depth is incredible. Arrived perfectly packaged." },
  { name: "Jordan K.", rating: 5, comment: "This is my third piece from AuraArts24. Consistent quality every time." },
];

export default function ReviewSection() {
  return (
    <div className="border-t border-border pt-12">
      <h2 className="font-display text-2xl text-primary mb-8">Customer Reviews</h2>
      <div className="space-y-6">
        {MOCK_REVIEWS.map((r) => (
          <div key={r.name} className="border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span className="text-sm text-primary font-medium">{r.name}</span>
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
