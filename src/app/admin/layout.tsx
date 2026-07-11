"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, Palette, LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/custom-orders", label: "Commissions", icon: Palette },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-primary text-secondary lg:flex">
        <div className="px-8 py-8">
          <p className="font-display text-xl">AuraArts24</p>
          <p className="eyebrow mt-1 text-[10px]">Admin</p>
        </div>
        <nav className="flex-1 space-y-1 px-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-secondary/70 transition-colors hover:bg-secondary/5 hover:text-secondary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/admin/login" className="flex items-center gap-3 px-8 py-6 text-sm text-secondary/50 hover:text-secondary">
          <LogOut className="h-4 w-4" /> Sign Out
        </Link>
      </aside>
      <main className="flex-1 p-8 lg:p-12">{children}</main>
    </div>
  );
}
