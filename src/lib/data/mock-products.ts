import { Product, Category } from "@/types";

/**
 * Catalog data source.
 *
 * The placeholder paintings that shipped with this template have been
 * removed — this is now an empty catalog ready for your real artwork.
 *
 * Two ways to add products:
 *   1. (Recommended) Connect Supabase, run `supabase/schema.sql`, then add
 *      products through the Admin Dashboard's "Upload Artwork" flow, or
 *      directly in the Supabase Table Editor. The storefront can then read
 *      from the `products` table instead of this file (see README →
 *      "Connecting Real Data").
 *   2. For a quick local preview before Supabase is set up, add entries to
 *      the `products` array below, following the same shape as before —
 *      each needs an `images` array (URLs to your uploaded photos), a
 *      `category_id` matching one of the categories below, price, canvas
 *      size, medium, etc.
 */

export const categories: Category[] = [
  { id: "1", name: "Landscape", slug: "landscape", description: "Sweeping vistas rendered in acrylic.", image_url: null, display_order: 1 },
  { id: "2", name: "Sunset", slug: "sunset", description: "Golden-hour skies and warm palettes.", image_url: null, display_order: 2 },
  { id: "3", name: "Bridge", slug: "bridge", description: "Architectural studies of bridges and crossings.", image_url: null, display_order: 3 },
  { id: "4", name: "Cityscape", slug: "cityscape", description: "Urban energy captured on canvas.", image_url: null, display_order: 4 },
  { id: "5", name: "Nature", slug: "nature", description: "Botanicals, forests, and organic forms.", image_url: null, display_order: 5 },
  { id: "6", name: "Abstract", slug: "abstract", description: "Expressive, non-representational works.", image_url: null, display_order: 6 },
];

export const products: Product[] = [];

export const getFeatured = () => products.filter((p) => p.is_featured);
export const getBestSellers = () => products.filter((p) => p.is_best_seller);
export const getTrending = () => products.filter((p) => p.is_trending);
export const getLatest = () =>
  [...products].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getByCategory = (categorySlug: string) => {
  const cat = categories.find((c) => c.slug === categorySlug);
  return cat ? products.filter((p) => p.category_id === cat.id) : [];
};
export const getRelated = (product: Product, limit = 4) =>
  products.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, limit);
