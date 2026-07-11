import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://auraarts24.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AuraArts24 — Bringing Colors to Life",
    template: "%s | AuraArts24",
  },
  description:
    "Original handmade acrylic paintings, custom commissions, and curated canvas art collections. Bringing colors to life, one brushstroke at a time.",
  keywords: [
    "acrylic paintings",
    "original artwork",
    "custom paintings",
    "canvas art",
    "handmade art",
    "art commissions",
  ],
  openGraph: {
    title: "AuraArts24 — Bringing Colors to Life",
    description:
      "Original handmade acrylic paintings, custom commissions, and curated canvas art collections.",
    url: siteUrl,
    siteName: "AuraArts24",
    type: "website",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraArts24 — Bringing Colors to Life",
    description: "Original handmade acrylic paintings & custom canvas art commissions.",
    images: ["/images/og-cover.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AuraArts24",
              url: siteUrl,
              slogan: "Bringing Colors to Life",
              description:
                "Original handmade acrylic paintings and custom canvas art commissions.",
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
