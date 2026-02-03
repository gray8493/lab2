"use client";

import { Navbar } from "@/components/shop/Navbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl mb-4">
            New Arrivals
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Discover our curated collection of premium lifestyle essentials designed for the modern minimalist.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            &copy; 2024 LuxeShop. All rights reserved. Built for Lab 3.
          </p>
        </div>
      </footer>
    </div>
  );
}