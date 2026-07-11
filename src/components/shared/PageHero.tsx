export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-secondary py-16 text-center">
      <div className="container-luxe">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-4xl text-primary sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-muted">{description}</p>}
      </div>
    </div>
  );
}
