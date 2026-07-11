import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        primary: "#111111",      // Ink black — headings, primary text, buttons
        secondary: "#FFFFFF",    // White — surfaces, reversed text
        accent: {
          DEFAULT: "#C89B3C",    // Luxury gold — the signature AuraArts24 accent
          light: "#E4C877",
          dark: "#9A7626",
        },
        canvas: "#F8F8F8",       // Background — gallery-wall off-white
        border: "#E7E3DA",
        muted: "#6B6B6B",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],   // Playfair Display — titles, artwork names
        body: ["var(--font-poppins)", "sans-serif"],   // Poppins — UI, body copy
      },
      letterSpacing: {
        luxe: "0.18em",
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(17,17,17,0.12)",
        gold: "0 8px 24px -8px rgba(200,155,60,0.45)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        strokeReveal: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        strokeReveal: "strokeReveal 2.4s ease forwards",
        shimmer: "shimmer 1.8s infinite linear",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
