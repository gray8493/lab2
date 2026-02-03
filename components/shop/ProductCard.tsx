"use client";

import React, { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, useCart } from "@/lib/cart-context";

export const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader className="p-0 overflow-hidden h-48 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex items-center bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                    ${product.price.toFixed(2)}
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-6">
                <CardTitle className="text-lg font-bold truncate text-zinc-800 dark:text-zinc-100 mb-1">
                    {product.name}
                </CardTitle>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 h-10 mb-4">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase text-zinc-400">Quantity</span>
                    <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 rounded-md p-1">
                        <button
                            onClick={handleDecrement}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-sm transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <button
                            onClick={handleIncrement}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    onClick={() => addToCart(product, quantity)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all group/btn"
                >
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};
