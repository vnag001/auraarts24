import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <section className="bg-canvas py-24">
      <div className="container-luxe max-w-lg text-center">
        <p className="eyebrow mb-3">Join the List</p>
        <h2 className="font-display text-3xl text-primary sm:text-4xl">
          Stay Close to the Studio
        </h2>
        <p className="mt-4 text-muted">
          Be the first to see new collections, artist stories, and limited commission openings.
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
