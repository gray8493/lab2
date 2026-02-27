"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, ShoppingBag, Loader2, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/shop/Navbar";
import { OrderCard } from "@/components/shop/OrderCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { supabase, type Order } from "@/lib/supabase";

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect nếu chưa đăng nhập
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login?redirect=/orders");
        }
    }, [user, authLoading, router]);

    const fetchOrders = async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setOrders((data as Order[]) || []);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to load orders.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Đang kiểm tra auth
    if (authLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
        );
    }

    // Chưa đăng nhập (đang redirect)
    if (!user) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950">
                                <ClipboardList className="w-6 h-6 text-teal-600" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                My Orders
                            </h1>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 ml-[52px]">
                            View and track all your past purchases
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchOrders}
                        disabled={loading}
                        className="gap-2 hidden sm:flex"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                </div>

                {/* User info */}
                <div className="mb-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{user.email}</p>
                        <p className="text-xs text-zinc-400">Logged in · Viewing your personal orders</p>
                    </div>
                </div>

                {/* Error state */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Loading skeleton */}
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-24 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 animate-pulse"
                            />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    /* Empty state */
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="bg-zinc-100 dark:bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ClipboardList className="w-10 h-10 text-zinc-400" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">No orders yet</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                            You haven&apos;t placed any orders. Start shopping!
                        </p>
                        <Link href="/">
                            <Button className="bg-teal-600 hover:bg-teal-700">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    /* Orders list */
                    <div className="space-y-4">
                        <p className="text-sm text-zinc-400 font-medium">{orders.length} order{orders.length !== 1 ? "s" : ""} found</p>
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
