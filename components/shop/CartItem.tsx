"use client";

import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType, useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export const CartItem = ({ item }: { item: CartItemType }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 py-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0 group">
            <div className="w-24 h-24 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                        {item.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        ${item.price.toFixed(2)} each
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 rounded-md p-1">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-sm transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
