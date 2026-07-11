import Image from "next/image";

const IMAGES = [
  "photo-1541961017774-22349e4a1262",
  "photo-1500462918059-b1a0cb512f1d",
  "photo-1470004914212-05527e49370b",
  "photo-1549289524-06cf8837ace5",
  "photo-1441974231531-c6227db76b6e",
  "photo-1477959858617-67f85cf4f1df",
];

export default function InstagramGallery() {
  return (
    <section className="py-20">
      <div className="container-luxe">
        <p className="eyebrow mb-3 text-center">@auraarts24</p>
        <h2 className="mb-12 text-center font-display text-3xl text-primary sm:text-4xl">
          Follow the Studio
        </h2>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {IMAGES.map((id) => (
            <div key={id} className="group relative aspect-square overflow-hidden">
              <Image
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`}
                alt="Studio artwork on Instagram"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
