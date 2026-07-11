import { MetadataRoute } from "next";
import { products } from "@/lib/data/mock-products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auraarts24.com";

const STATIC_ROUTES = [
  "", "gallery", "collections", "shop", "custom-orders", "about", "contact",
  "faq", "privacy-policy", "terms", "shipping-policy", "return-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries = products.map((p) => ({
    url: `${siteUrl}/shop/${p.slug}`,
    lastModified: p.created_at,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
