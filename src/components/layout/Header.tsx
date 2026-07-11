"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";

const NAV_LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/collections", label: "Collections" },
  { href: "/shop", label: "Shop" },
  { href: "/custom-orders", label: "Commission Artwork" },
  { href: "/about", label: "About the Artist" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCart((s) => s.itemCount());
  const wishlistCount = useWishlist((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        transparent ? "bg-transparent py-6" : "bg-secondary/95 backdrop-blur-md shadow-sm py-4"
      )}
    >
      <div className="container-luxe flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-2xl tracking-wide transition-colors",
              transparent ? "text-secondary" : "text-primary"
            )}
          >
            AuraArts24
          </span>
          <span
            className={cn(
              "eyebrow text-[10px] mt-0.5",
              transparent ? "text-accent-light" : "text-accent"
            )}
          >
            Bringing Colors to Life
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-accent",
                transparent ? "text-secondary" : "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className={cn(transparent ? "text-secondary" : "text-primary", "hover:text-accent transition-colors")}>
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={cn("relative hover:text-accent transition-colors", transparent ? "text-secondary" : "text-primary")}
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-primary">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className={cn("relative hover:text-accent transition-colors", transparent ? "text-secondary" : "text-primary")}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-primary">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className={cn("hidden sm:inline-flex hover:text-accent transition-colors", transparent ? "text-secondary" : "text-primary")}
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            aria-label="Menu"
            className={cn("lg:hidden", transparent ? "text-secondary" : "text-primary")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden container-luxe mt-6 flex flex-col gap-5 pb-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-primary text-base">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
