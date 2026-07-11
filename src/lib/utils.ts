import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency, e.g. 1250 -> "$1,250.00" */
export function formatPrice(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/** Generate a human-friendly order number, e.g. AA24-482913 */
export function generateOrderNumber() {
  return `AA24-${Math.floor(100000 + Math.random() * 900000)}`;
}

/** Turn a title into a URL-safe slug. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text to a maximum length with an ellipsis. */
export function truncate(text: string, length: number) {
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}
