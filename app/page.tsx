"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  ChevronDown,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Globe,
  Share2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock Data
const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    desc: "High-fidelity audio with noise cancellation",
    price: "$299.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_fwGFCWE3kA52dyCtjo423KFA13fdpERg2I-iw60q5MFTi_aI1Ecp6NrN1wXM6Pc8UvR0rz0fgcLoAGVT8YVR9lJ80Y9tP1nVi3Z15E8C1PoCVmeGbdlO-kbGgKryrpdR_s8ihUQ6A_iBpZ_crCWEYR10e8-DHDhTnezJ9CT1i4dFrgNxBCLo0u8PTVk3qINyO1wulxUf34lC1MAEUvhxfQ0P_up4W4zY6HHIU-P19lz9trUjAzql5kIAWT2VnmdJKWCSIs8zrTI",
    tag: "New",
    sale: false
  },
  {
    id: 2,
    title: "Minimalist Leather Watch",
    desc: "Genuine leather strap with Swiss movement",
    price: "$150.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzd5oMGECbTUJorgdYcgU9VaHAvCNI9LF9j20Mk8EPYuDV9YfZFtGQeztxsk0UT1S5b-RNjjkzbaTqAmCZRyrgeKuL4WPeq5dDhWZwzfiNkmGz3E-ftvecbkOa7_LarUnWV8IBMnJ2zjaPv7QgY2cMcZHd3_LCFxx0SHGUfOOKwCCN-z_TPuNZakemZs5tsM8bpS7vnPDzxF-LDeiHO3BBc1vjYLvVw2DyCdi_H7nTWpW0RhV-2vy5L1T9XIssbr0K3x5iS6qO7GU",
    tag: null,
    sale: false
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    desc: "Adjustable lumbar support and mesh back",
    price: "$450.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLLnSfiZ-vKcKc2lljX_CRUuHLP-tbiXl067n0yBVdayiUD7DE6W0ctxJdawUJO7LrYT7mbyTj3WF_PK_q9DHtIFqEEmXCH6Y3xhEO0ve7VnrCSYtMQjTs4M0T458BR7niqAHZsgkib0JkdWILbmHccdt9kbLJb0pWCTzUC1Da_n0WFQu6Y_zss5TUzVtILIRs6IAeGUgoXjLo50iQh3McL_5RvQ_9pRByjCF0EUzPUGqz4JymxhddRZFPsbLRifna6Isv7WlUcyY",
    tag: null,
    sale: false
  },
  {
    id: 4,
    title: "Mechanical Keyboard",
    desc: "Tactile switches with customizable RGB",
    price: "$129.00",
    oldPrice: "$159.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7OlWxYcQ8aZFeJmBaDeX15Wgvf_6I30qYZpuJSeTesfSWoqM2IwKw9Qttyxgwu1IXpNPcEDW8tdWsn1GCkKcHIT-cXe-ttz-xMkUk6N1cpOc14zTuLZY4eFOod_SMh4HcWD1QJK-5yBxFR_dSITaXOHKBjvM1h53uELV3HZOg9rdnq-x87giw7P_LkihuZgsjFS3YcGsanP_VbqT4cum9XNuSZ9q3KEE2Gn0ueu65KFh8Ct7gZnZup4YF598OGtQc3C7E303zwLs",
    tag: "Sale",
    sale: true,
    tagColor: "bg-orange-500"
  },
  {
    id: 5,
    title: "Eco-Friendly Water Bottle",
    desc: "Sustainable stainless steel design",
    price: "$35.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQTaOyNS1YImqxiFSlTXCvmZWHpgwxq8zFoz138DXl9Jf65SkKkjGcwh6WNsYU2QZa9gOH78g5iG-sDoIiUl6QrIiZhqamRlyernmOsjjcV13ZQ4TQK8tXfLYiu7RgnH5wOuTjo8OgYNrlrI422aCiXcwxemGuL168tZ_op_f66N-5RkxXYpbuOFVpNsQuOlfdKAkZnQJP8eCjsTUWGzVLQx9ZxbekFf0Wve_n38ZMpPVcWSRCOQc_lu1bY8K12WOVyslfPOLM8MI",
    tag: null,
    sale: false
  },
  {
    id: 6,
    title: "Smart Fitness Tracker",
    desc: "Heart rate and sleep monitoring",
    price: "$89.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ3Zr1HO5lwz5t77DkIoIPzk5AvOV1Tduu89k_QeSqCf1TvR5rQ37gXpyldhbqWmP2-qw99XYzgyCc26hxzGWGlGhoJSt1FLyoDi6mIsOtrMkBVx9dgCZkoTYoU2Ozpa_uJ2xat3jrCdN8jgibwTy64Wi1FLcH1VIf5x74e5MimD8LahFWG-y_jJK1LxEXrZvSz1sGmofryyoW5OffyW9YR1eExWImGtXbATSO0tD4NHh5hSHFfj4QWWqd7pRohP9KcK6kBLNtzxY",
    tag: null,
    sale: false
  },
  {
    id: 7,
    title: "Leather Travel Bag",
    desc: "Durable handcrafted calfskin leather",
    price: "$210.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa4E8kzh_bHa7GWyMTrdaB86CD_zXyW6c1FzlIUkDudqj9CU1B6DW_igYvccmIXkfFcMTomki0xGkC1Lud3sF-_w3kSGSdRPa10dxCaYVEiPMiq-Q3ClHHVJVM8V99tLRdecp3Ag4X0gzahi2NxdFMrKvvod1QMbBFYzgG1sozE4xZOPFW9dhxlVZ0hxhh_O0QqPLm3rlZq4ex91ihF7EJoaGGygsgADm1Y3zOdcxPi8rVshfvq3EMouTYQ2-2gCAuaf7z_2LM5Ec",
    tag: null,
    sale: false
  },
  {
    id: 8,
    title: "Studio Microphone",
    desc: "Professional grade condenser microphone",
    price: "$199.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR56mLqCYGcPDYb6re3ods3Bw6ua8Pi0RDkHvzw8_oDHtThguV00dlWEWkB216CyxImlE3rG9lA5IGKN4RCaYSxJo_fNvYxVKARO7UD5tit39ZdZm-Y75uBrqzSadynSPXzv1Knv78trq1HMkX-T-1go8BsrCM5OdW_cqVyp-hk__LaxVrwOdEc26z6uW7jRnQR2cvNq57t7riVI-qHSUJMpXTSAiQriptojsvrCu9UP5ocJiBj_NKZA62AMNr41Xk0DLXLrAYfcQ",
    tag: null,
    sale: false
  }
];

export default function Home() {
  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart`, {
      description: "You can view it in your shopping bag.",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-gray-100 min-h-screen font-sans">
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <ShoppingBag className="size-5" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-[#111418] dark:text-white">
              ShopLogo
            </h2>
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#617589]">
                <Search className="size-5" />
              </div>
              <Input
                type="text"
                className="block w-full h-10 pl-10 pr-3 py-2 border-none bg-[#f0f2f4] dark:bg-gray-800 rounded-lg text-sm placeholder-[#617589] focus-visible:ring-2 focus-visible:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-all shadow-none"
                placeholder="Search products, brands, and more..."
              />
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Electronics</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Home</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">Fashion</Link>
            </nav>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="h-10 px-4 text-sm font-semibold text-[#111418] dark:text-white hover:bg-[#f0f2f4] dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="h-10 px-5 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 hover:shadow-md transition-all">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 py-10">
        {/* Page Heading Component */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-black text-[#111418] dark:text-white tracking-tight">
                Trending Products
              </h1>
              <p className="text-[#617589] dark:text-gray-400 text-lg">
                Curated collection of our best-selling items this week.
              </p>
            </div>
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <Button className="h-9 gap-2 rounded-lg bg-primary text-white px-4 text-sm font-medium">
                All Products
                <ChevronDown className="size-[18px]" />
              </Button>
              <Button variant="outline" className="h-9 gap-2 rounded-lg bg-white dark:bg-gray-800 border border-[#f0f2f4] dark:border-gray-700 px-4 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                New Arrivals
                <ChevronDown className="size-[18px]" />
              </Button>
              <Button variant="outline" className="h-9 gap-2 rounded-lg bg-white dark:bg-gray-800 border border-[#f0f2f4] dark:border-gray-700 px-4 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                Best Sellers
                <ChevronDown className="size-[18px]" />
              </Button>
              <Button variant="outline" className="h-9 gap-2 rounded-lg bg-white dark:bg-gray-800 border border-[#f0f2f4] dark:border-gray-700 px-4 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                Price
                <ChevronDown className="size-[18px]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col gap-4 cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                {/* Image Placeholder */}
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${product.image}")` }}
                ></div>

                {product.tag && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white ${product.tagColor ? product.tagColor : 'bg-primary text-white'}`}>
                    {product.tag}
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button
                  size="icon"
                  className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 size-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-lg text-primary hover:bg-primary hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.title);
                  }}
                >
                  <ShoppingCart className="size-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[#111418] dark:text-white text-base font-bold leading-tight group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-[#617589] dark:text-gray-400 text-sm font-normal line-clamp-1">
                  {product.desc}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[#111418] dark:text-white text-lg font-extrabold">{product.price}</p>
                  {product.oldPrice && <p className="text-xs text-gray-400 line-through">{product.oldPrice}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="size-10 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
            <ChevronLeft className="size-5" />
          </Button>
          <Button className="size-10 bg-primary text-white rounded-lg shadow-sm font-bold text-sm">1</Button>
          <Button variant="ghost" className="size-10 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">2</Button>
          <Button variant="ghost" className="size-10 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">3</Button>
          <div className="text-sm font-medium flex size-10 items-center justify-center text-gray-400">...</div>
          <Button variant="ghost" className="size-10 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">12</Button>
          <Button variant="ghost" size="icon" className="size-10 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-[#f0f2f4] dark:border-gray-800 py-12 bg-white dark:bg-[#101922] mt-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                <ShoppingBag className="size-3" />
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">ShopLogo</h2>
            </div>
            <p className="text-sm text-[#617589] dark:text-gray-400">
              Your one-stop destination for premium tech and lifestyle products.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link className="text-sm text-[#617589] hover:text-primary" href="#">About Us</Link>
              <Link className="text-sm text-[#617589] hover:text-primary" href="#">Careers</Link>
              <Link className="text-sm text-[#617589] hover:text-primary" href="#">Sustainability</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Help</h4>
            <nav className="flex flex-col gap-2">
              <Link className="text-sm text-[#617589] hover:text-primary" href="#">Shipping Info</Link>
              <Link className="text-sm text-[#617589] hover:text-primary" href="#">Returns</Link>
              <Link className="text-sm text-[#617589] hover:text-primary" href="#">Track Order</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Newsletter</h4>
            <div className="flex gap-2">
              <Input className="flex-1 bg-[#f0f2f4] dark:bg-gray-800 border-none rounded-lg text-sm h-10 px-3 shadow-none" placeholder="Email address" type="email" />
              <Button className="bg-primary text-white font-bold h-10 px-4 rounded-lg text-sm">Join</Button>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 pt-12 mt-12 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <p className="text-xs text-[#617589]">© 2026 ShopLogo Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Globe className="size-5 text-gray-400 cursor-pointer hover:text-primary" />
            <Share2 className="size-5 text-gray-400 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </footer>
    </div>
  );
}