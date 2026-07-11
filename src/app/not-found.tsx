import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center pt-32">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl text-primary sm:text-5xl">This Canvas isn&apos;t here</h1>
      <p className="mt-4 max-w-sm text-muted">
        The page you&apos;re looking for may have sold, moved, or never existed. Let&apos;s get you back to the gallery.
      </p>
      <Link href="/" className="btn-gold mt-10">Return Home</Link>
    </div>
  );
}
