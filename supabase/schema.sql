-- ═══════════════════════════════════════════════════════════════
-- AuraArts24 — Supabase Database Schema
-- Run this in the Supabase SQL Editor (Project → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────
-- PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- CATEGORIES
-- ─────────────────────────────────────────────
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- PRODUCTS (original paintings, canvas artwork, collections)
-- ─────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2),
  category_id uuid references categories(id) on delete set null,
  medium text,                          -- e.g. "Acrylic on Canvas"
  canvas_size text,                     -- e.g. "24in x 36in"
  frame_option text,                    -- e.g. "Unframed / Gold Float Frame"
  is_original boolean not null default true,
  stock_quantity int not null default 1,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  is_best_seller boolean not null default false,
  is_trending boolean not null default false,
  tags text[] default '{}',
  images text[] not null default '{}',  -- Cloudinary URLs, first = primary
  seo_title text,
  seo_description text,
  view_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_featured on products(is_featured) where is_featured = true;

-- ─────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,        -- e.g. AA24-100231
  user_id uuid references profiles(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  shipping_address jsonb not null,          -- {line1, line2, city, state, zip, country}
  billing_address jsonb,
  subtotal numeric(10,2) not null,
  shipping_cost numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  coupon_code text,
  tax_amount numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  currency text not null default 'usd',
  status text not null default 'pending'
    check (status in ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','paid','failed','refunded')),
  stripe_payment_intent_id text,
  tracking_number text,
  carrier text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_orders_status on orders(status);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_title text not null,       -- snapshot at time of purchase
  product_image text,
  unit_price numeric(10,2) not null,
  quantity int not null default 1,
  subtotal numeric(10,2) not null
);
create index if not exists idx_order_items_order on order_items(order_id);

-- ─────────────────────────────────────────────
-- CART (persisted for logged-in users; guests use client-side storage)
-- ─────────────────────────────────────────────
create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ─────────────────────────────────────────────
-- WISHLIST
-- ─────────────────────────────────────────────
create table if not exists wishlist_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ─────────────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────────────
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  customer_name text not null,
  rating int not null check (rating between 1 and 5),
  title text,
  comment text,
  is_verified_purchase boolean not null default false,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_reviews_product on reviews(product_id);

-- ─────────────────────────────────────────────
-- CUSTOM ARTWORK / COMMISSION REQUESTS
-- ─────────────────────────────────────────────
create table if not exists commission_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  reference_images text[] default '{}',    -- Cloudinary URLs
  canvas_size text,
  painting_style text,
  deadline date,
  budget numeric(10,2),
  description text,
  status text not null default 'new'
    check (status in ('new','reviewing','quoted','in_progress','completed','declined')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- CONTACT MESSAGES
-- ─────────────────────────────────────────────
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- NEWSLETTER
-- ─────────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true
);

-- ─────────────────────────────────────────────
-- COUPONS
-- ─────────────────────────────────────────────
create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage','fixed')),
  discount_value numeric(10,2) not null,
  min_order_amount numeric(10,2) default 0,
  max_uses int,
  used_count int not null default 0,
  is_active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════
-- TRIGGERS
-- ═══════════════════════════════════════════════════════════════

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_products_updated_at before update on products
  for each row execute function set_updated_at();
create trigger trg_orders_updated_at before update on orders
  for each row execute function set_updated_at();
create trigger trg_commission_updated_at before update on commission_requests
  for each row execute function set_updated_at();

-- Auto-create a profile row when a new auth user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

alter table profiles enable row level security;
alter table products enable row level security;
alter table categories enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table cart_items enable row level security;
alter table wishlist_items enable row level security;
alter table reviews enable row level security;
alter table commission_requests enable row level security;
alter table messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table coupons enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Public read: products & categories (storefront is public)
create policy "Public can view products" on products for select using (true);
create policy "Public can view categories" on categories for select using (true);
create policy "Admins manage products" on products for all using (is_admin());
create policy "Admins manage categories" on categories for all using (is_admin());

-- Profiles: users see/edit their own; admins see all
create policy "Users view own profile" on profiles for select using (auth.uid() = id or is_admin());
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

-- Orders: users see their own; admins see all
create policy "Users view own orders" on orders for select using (auth.uid() = user_id or is_admin());
create policy "Users create own orders" on orders for insert with check (auth.uid() = user_id or user_id is null);
create policy "Admins manage orders" on orders for update using (is_admin());
create policy "Users view own order items" on order_items for select using (
  exists (select 1 from orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or is_admin()))
);

-- Cart & wishlist: private to the user
create policy "Users manage own cart" on cart_items for all using (auth.uid() = user_id);
create policy "Users manage own wishlist" on wishlist_items for all using (auth.uid() = user_id);

-- Reviews: public read approved reviews; users create their own; admins moderate
create policy "Public views approved reviews" on reviews for select using (is_approved = true or is_admin());
create policy "Users submit reviews" on reviews for insert with check (auth.uid() = user_id or user_id is null);
create policy "Admins moderate reviews" on reviews for update using (is_admin());

-- Commission requests: users see their own; admins see all; anyone can submit
create policy "Users view own commissions" on commission_requests for select using (auth.uid() = user_id or is_admin());
create policy "Anyone can submit a commission request" on commission_requests for insert with check (true);
create policy "Admins manage commissions" on commission_requests for update using (is_admin());

-- Messages: admins only view; anyone can submit
create policy "Anyone can send a message" on messages for insert with check (true);
create policy "Admins view messages" on messages for select using (is_admin());
create policy "Admins update messages" on messages for update using (is_admin());

-- Newsletter: anyone can subscribe; admins view list
create policy "Anyone can subscribe" on newsletter_subscribers for insert with check (true);
create policy "Admins view subscribers" on newsletter_subscribers for select using (is_admin());

-- Coupons: public can validate active coupons; admins manage
create policy "Public can view active coupons" on coupons for select using (is_active = true or is_admin());
create policy "Admins manage coupons" on coupons for all using (is_admin());

-- ═══════════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════════

insert into categories (name, slug, description, display_order) values
  ('Landscape', 'landscape', 'Sweeping vistas rendered in acrylic.', 1),
  ('Sunset', 'sunset', 'Golden-hour skies and warm palettes.', 2),
  ('Bridge', 'bridge', 'Architectural studies of bridges and crossings.', 3),
  ('Cityscape', 'cityscape', 'Urban energy captured on canvas.', 4),
  ('Nature', 'nature', 'Botanicals, forests, and organic forms.', 5),
  ('Abstract', 'abstract', 'Expressive, non-representational works.', 6)
on conflict (slug) do nothing;
