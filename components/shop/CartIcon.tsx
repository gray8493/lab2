"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useEffect, useState } from "react";

export const CartIcon = () => {
    const { totalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
            </div>
        );
    }

    return (
        <Link href="/cart" className="relative p-2 transition-transform hover:scale-110">
            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-in zoom-in duration-300">
                    {totalItems}
                </span>
            )}
        </Link>
    );
};
