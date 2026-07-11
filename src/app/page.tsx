import Hero from "@/components/home/Hero";
import ProductRail from "@/components/home/ProductRail";
import ArtistStory from "@/components/home/ArtistStory";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";
import { getFeatured, getLatest, getTrending, getBestSellers } from "@/lib/data/mock-products";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ProductRail
        eyebrow="Curated Selection"
        title="Featured Collection"
        description="A rotating edit of our most sought-after original paintings."
        products={getFeatured()}
      />

      <ProductRail
        eyebrow="Fresh From the Studio"
        title="Latest Paintings"
        products={getLatest()}
      />

      <ArtistStory />

      <ProductRail
        eyebrow="Right Now"
        title="Trending Artwork"
        products={getTrending()}
      />

      <ProductRail
        eyebrow="Collector Favorites"
        title="Best Sellers"
        products={getBestSellers()}
      />

      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
