# AuraArts24 — Bringing Colors to Life

A production-ready, luxury e-commerce platform for an original acrylic painting business, built with Next.js 15, Supabase, Stripe, and Cloudinary.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database & Auth | Supabase (Postgres + RLS) |
| Payments | Stripe Checkout (Card, Apple Pay, Google Pay) |
| Image Storage | Cloudinary |
| State | Zustand (cart & wishlist, persisted) |
| Deployment | Vercel |

## Project Structure

```
auraarts24/
├── src/
│   ├── app/                     # App Router routes
│   │   ├── page.tsx             # Homepage
│   │   ├── gallery/              # Masonry gallery with filters/search
│   │   ├── collections/          # Category collections
│   │   ├── shop/                 # Product listing + [slug] detail page
│   │   ├── cart/, checkout/, order-success/, wishlist/
│   │   ├── custom-orders/        # Commission request form
│   │   ├── about/, contact/, faq/
│   │   ├── privacy-policy/, terms/, shipping-policy/, return-policy/
│   │   ├── admin/                # Admin dashboard (auth-protected)
│   │   │   ├── login/, dashboard/, products/, orders/, customers/
│   │   │   ├── messages/, custom-orders/
│   │   ├── api/                  # Route Handlers (see below)
│   │   ├── sitemap.ts, robots.ts, not-found.tsx
│   ├── components/
│   │   ├── layout/               # Header, Footer
│   │   ├── home/                 # Hero, ProductRail, ArtistStory, Testimonials...
│   │   ├── product/               # ProductCard, ProductDetailClient, ReviewSection
│   │   ├── gallery/, shared/, ui/ # Masonry grid, PageHero, button/input/skeleton
│   │   ├── admin/
│   ├── lib/
│   │   ├── supabase/             # client.ts (browser), server.ts (SSR + admin)
│   │   ├── stripe.ts             # Checkout session builder
│   │   ├── cloudinary.ts         # Upload / delete / URL helpers
│   │   ├── store.ts              # Zustand cart & wishlist store
│   │   ├── utils.ts, data/mock-products.ts
│   ├── types/index.ts            # Shared TypeScript types
│   └── middleware.ts             # Refreshes Supabase session, guards /admin
├── supabase/schema.sql           # Full Postgres schema + RLS policies + seed data
├── .env.example
└── tailwind.config.ts            # Design tokens (colors, fonts, animations)
```

## Design System

- **Primary** `#111111` · **Secondary** `#FFFFFF` · **Accent (Gold)** `#C89B3C` · **Background** `#F8F8F8`
- **Display font**: Playfair Display (headings, artwork titles)
- **Body font**: Poppins (UI, paragraphs)
- Reusable tokens live in `tailwind.config.ts` and `src/app/globals.css` (`.btn-primary`, `.btn-gold`, `.painting-card`, `.eyebrow`, etc.)

## API Routes

| Route | Purpose |
|---|---|
| `POST /api/checkout` | Creates a pending Supabase order, then a Stripe Checkout Session |
| `POST /api/webhooks/stripe` | Confirms payment, updates order status (`checkout.session.completed`, refunds, expirations) |
| `GET/POST /api/products`, `PATCH/DELETE /api/products/:id` | Product CRUD (admin, enforced by RLS) |
| `GET /api/orders` | Current user's order history |
| `POST /api/custom-orders` | Stores commission requests in Supabase |
| `POST /api/newsletter` | Newsletter signup |
| `POST /api/messages` | Contact form submissions |
| `GET/POST /api/reviews` | Product reviews (moderated before going public) |
| `GET/POST /api/wishlist` | Signed-in user's wishlist |

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql` — this creates every table, trigger, and Row Level Security policy, and seeds the six art categories.
3. Copy your Project URL and keys into `.env.local` (see step 4).
4. To make a user an admin: after they sign up, run
   ```sql
   update profiles set role = 'admin' where id = '<their-user-id>';
   ```

### 3. Set up Stripe
1. Get your API keys from the Stripe Dashboard.
2. Create a webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`, listening for `checkout.session.completed`, `checkout.session.expired`, and `charge.refunded`.
3. Apple Pay / Google Pay are enabled automatically for the `card` payment method on supported browsers/devices once your domain is verified in the Stripe Dashboard (Settings → Payment Methods → Apple Pay).

### 4. Set up Cloudinary
1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Copy your Cloud Name, API Key, and API Secret into `.env.local`.
3. (Optional) Create an unsigned upload preset for client-side uploads on the Custom Orders page.

### 5. Configure environment variables
```bash
cp .env.example .env.local
# then fill in every value
```

### 6. Run locally
```bash
npm run dev
```
Visit `http://localhost:3000`. Until Supabase is connected, the storefront runs on the mock catalog in `src/lib/data/mock-products.ts` so you can preview the full design immediately.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo into [Vercel](https://vercel.com/new).
3. Add all variables from `.env.example` in Project Settings → Environment Variables.
4. Update `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy — Vercel auto-detects Next.js and handles Server Components, image optimization, and edge caching.
6. Point your Stripe webhook and Cloudinary upload presets at the production domain.

## Connecting Real Data

The storefront currently reads from `src/lib/data/mock-products.ts` so the UI is fully browsable without any backend configured. To go live:

1. Insert real products into the `products` table (via the Admin Dashboard's "Upload Artwork" flow, or directly in Supabase).
2. Replace the mock-data imports in `src/app/page.tsx`, `src/app/shop/page.tsx`, `src/app/shop/[slug]/page.tsx`, and `src/components/gallery/GalleryClient.tsx` with Supabase queries (`supabase.from('products').select()`), following the same pattern already used in `src/app/api/products/route.ts`.

## Notes on Production Readiness

- All forms have loading and error states; empty states are implemented for cart, wishlist, gallery search, and admin lists.
- RLS policies mean the anon key is safe to expose — Supabase enforces who can read/write each table.
- The service role key (`SUPABASE_SERVICE_ROLE_KEY`) is only ever used in server-only files (API routes) and must never be exposed to the client.
- Add real product photography before launch — the mock catalog uses royalty-free Unsplash placeholders.
- Wire up an email provider (Resend is scaffolded in `.env.example`) for order confirmations and commission notifications.
