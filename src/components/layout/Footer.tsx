import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import NewsletterForm from "@/components/home/NewsletterForm";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Paintings" },
      { href: "/collections", label: "Collections" },
      { href: "/gallery", label: "Gallery" },
      { href: "/custom-orders", label: "Commission Artwork" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping-policy", label: "Shipping Policy" },
      { href: "/return-policy", label: "Returns & Exchanges" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About the Artist" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary">
      <div className="container-luxe py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-display text-2xl tracking-wide">AuraArts24</span>
            <p className="eyebrow mt-1 text-accent">Bringing Colors to Life</p>
            <p className="mt-5 max-w-sm text-sm text-secondary/70 leading-relaxed">
              Original handmade acrylic paintings and bespoke commissions, crafted to bring
              warmth, story, and color into every space they inhabit.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm tracking-luxe uppercase text-accent mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-secondary/70 hover:text-secondary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm tracking-luxe uppercase text-accent mb-5">Stay Inspired</h4>
            <p className="text-sm text-secondary/70 mb-4">
              New collections, artist stories, and early access — straight to your inbox.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-secondary/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-secondary/50 sm:flex-row">
          <p>© {new Date().getFullYear()} AuraArts24. All rights reserved.</p>
          <p>Worldwide shipping · Secure checkout via Stripe</p>
        </div>
      </div>
    </footer>
  );
}
