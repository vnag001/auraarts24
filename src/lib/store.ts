"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, WishlistItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "auraarts24-cart" }
  )
);

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId);
          return {
            items: exists
              ? state.items.filter((i) => i.productId !== item.productId)
              : [...state.items, item],
          };
        }),
      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "auraarts24-wishlist" }
  )
);
