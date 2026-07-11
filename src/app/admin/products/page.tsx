import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import { products } from "@/lib/data/mock-products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-primary">Products</h1>
        <Button variant="gold" size="md"><Plus className="h-4 w-4" /> Upload Artwork</Button>
      </div>

      <div className="overflow-x-auto bg-secondary shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Artwork</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Views</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden bg-[#ECE9E2]">
                      <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                    </div>
                    <span className="text-primary">{p.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-primary">{formatPrice(p.price)}</td>
                <td className="px-6 py-4 text-muted">{p.stock_quantity}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs uppercase ${p.is_available ? "text-green-700" : "text-red-600"}`}>
                    {p.is_available ? "Available" : "Sold"}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">{p.view_count}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-muted hover:text-accent" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button className="p-2 text-muted hover:text-red-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
