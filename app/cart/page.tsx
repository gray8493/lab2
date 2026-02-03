"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, CreditCard, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Navbar } from "@/components/shop/Navbar";
import { CartItem } from "@/components/shop/CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CartPage() {
    const { cart, totalPrice, totalItems, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <div className="flex items-center space-x-2 text-sm text-zinc-500 mb-8">
                    <Link href="/" className="hover:text-teal-600 transition-colors">Shop</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-zinc-900 dark:text-zinc-50 font-medium">Cart</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
                    Your Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="bg-zinc-100 dark:bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-zinc-400" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Cart is empty</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link href="/">
                            <Button className="bg-teal-600 hover:bg-teal-700">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8">
                                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-2">
                                    <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Product Detail</span>
                                    <div className="hidden sm:flex items-center gap-12 pr-16">
                                        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Quantity</span>
                                        <span className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Total</span>
                                    </div>
                                </div>
                                <div>
                                    {cart.map((item) => (
                                        <CartItem key={item.id} item={item} />
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between items-center">
                                    <Button
                                        variant="outline"
                                        onClick={clearCart}
                                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-950/30"
                                    >
                                        Clear Cart
                                    </Button>
                                    <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-28 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                                            <span>Subtotal ({totalItems} items)</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                                            <span>Shipping</span>
                                            <span className="text-teal-600 font-medium">Free</span>
                                        </div>
                                        <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                                            <span>Taxes</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />
                                        <div className="flex justify-between text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                            <span>Total Amount</span>
                                            <span className="text-teal-600">${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg font-bold shadow-lg shadow-teal-500/20 transition-all active:scale-[0.98]">
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        Checkout Now
                                    </Button>

                                    <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                                        <p className="text-xs text-zinc-400 text-center italic">
                                            Secure payment processing by Stripe. <br />
                                            Free shipping on all orders this month.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
