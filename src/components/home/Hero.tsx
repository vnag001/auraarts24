"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden bg-primary">
      {/* Full-screen artwork background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/60" />

      {/* Animated gold paint stroke */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path
          d="M -50 650 C 250 550, 450 750, 700 600 S 1100 450, 1250 500"
          fill="none"
          stroke="#C89B3C"
          strokeWidth="3"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-strokeReveal opacity-60"
        />
      </svg>

      <div className="container-luxe relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mb-6 text-accent-light"
        >
          Handcrafted Original Artwork
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-5xl leading-tight text-secondary sm:text-6xl md:text-7xl"
        >
          Bringing Colors <br className="hidden sm:block" /> to Life
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-lg text-base text-secondary/80"
        >
          One-of-a-kind acrylic paintings, hand-finished on canvas and shipped worldwide —
          or commissioned to tell your story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/shop" className="btn-gold">Shop Collection</Link>
          <Link
            href="/custom-orders"
            className="inline-flex items-center justify-center gap-2 border border-secondary/50 px-8 py-3.5 text-sm tracking-wide uppercase font-medium text-secondary transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-primary"
          >
            Commission Artwork
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary/60"
      >
        <div className="h-10 w-px animate-pulse bg-secondary/40" />
      </motion.div>
    </section>
  );
}
