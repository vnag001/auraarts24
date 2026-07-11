"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products as allProducts, categories } from "@/lib/data/mock-products";
import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { ImageOff } from "lucide-react";

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const cat = categories.find((c) => c.id === p.category_id);
      const matchesCategory = !activeCategory || cat?.slug === activeCategory;
      const matchesQuery =
        !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tags.some((t) => t.includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 text-xs tracking-wide uppercase transition-colors",
              !activeCategory ? "bg-primary text-secondary" : "bg-transparent text-primary border border-border hover:border-primary"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.slug)}
              className={cn(
                "px-4 py-2 text-xs tracking-wide uppercase transition-colors",
                activeCategory === c.slug ? "bg-primary text-secondary" : "bg-transparent text-primary border border-border hover:border-primary"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artwork..."
            className="w-full border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ImageOff}
          title="No artwork found"
          description="Try a different category or search term."
        />
      ) : (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
