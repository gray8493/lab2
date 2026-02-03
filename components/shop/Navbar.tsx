"use client";

import Link from "next/link";
import { CartIcon } from "./CartIcon";
import { ShoppingBag } from "lucide-react";

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-teal-600 p-1.5 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Luxe<span className="text-teal-600">Shop</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-teal-600 transition-colors">
                        Shop
                    </Link>
                    <CartIcon />
                </div>
            </div>
        </nav>
    );
};
