export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  category?: Category;
  medium: string | null;
  canvas_size: string | null;
  frame_option: string | null;
  is_original: boolean;
  stock_quantity: number;
  is_available: boolean;
  is_featured: boolean;
  is_best_seller: boolean;
  is_trending: boolean;
  tags: string[];
  images: string[];
  view_count: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface CartItem {
  productId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  canvasSize?: string | null;
}

export interface WishlistItem {
  productId: string;
  title: string;
  slug: string;
  image: string;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  tax_amount: number;
  total: number;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  payment_status: "unpaid" | "paid" | "failed" | "refunded";
  tracking_number: string | null;
  created_at: string;
}

export interface CommissionRequest {
  name: string;
  email: string;
  phone: string;
  canvas_size: string;
  painting_style: string;
  deadline: string;
  budget: string;
  description: string;
  reference_images: string[];
}
