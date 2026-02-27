"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartIcon } from "./CartIcon";
import { ShoppingBag, LogOut, ClipboardList, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Navbar = () => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        toast.info("Đã đăng xuất thành công");
        router.push("/");
        router.refresh();
    };

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

                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-teal-600 transition-colors">
                        Shop
                    </Link>

                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                    ) : user ? (
                        <>
                            {/* Authenticated user links */}
                            <Link
                                href="/orders"
                                className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-teal-600 transition-colors"
                            >
                                <ClipboardList className="w-4 h-4" />
                                <span className="hidden sm:inline">My Orders</span>
                            </Link>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-full px-3 py-1">
                                <div className="w-2 h-2 rounded-full bg-teal-500" />
                                <span className="max-w-[120px] truncate">{user.email}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleSignOut}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors gap-1.5"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Guest links */}
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="gap-1.5 text-zinc-600 hover:text-teal-600">
                                    <LogIn className="w-4 h-4" />
                                    <span className="hidden sm:inline">Login</span>
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white hidden sm:flex">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}

                    <CartIcon />
                </div>
            </div>
        </nav>
    );
};
