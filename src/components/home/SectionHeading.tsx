export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl text-primary sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-sm text-muted leading-relaxed">{description}</p>}
    </div>
  );
}
