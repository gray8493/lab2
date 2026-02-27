"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface AuthFormProps {
    mode: "login" | "register";
    redirectTo?: string;
}

export const AuthForm = ({ mode, redirectTo }: AuthFormProps) => {
    const { signIn, signUp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const finalRedirect = redirectTo || searchParams.get("redirect") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const isLogin = mode === "login";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) throw error;
                toast.success("Đăng nhập thành công! Chào mừng trở lại 👋");
                // Dùng window.location để full reload, middleware mới nhận cookie
                window.location.href = finalRedirect;
            } else {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;

                // Nếu session trả về ngay → email confirm đã tắt → login luôn
                if (data.session) {
                    toast.success("Đăng ký thành công! Chào mừng 🎉");
                    window.location.href = "/";
                } else {
                    // Supabase yêu cầu xác nhận email
                    toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
                    router.push("/login");
                }
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-teal-600 p-1.5 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Luxe<span className="text-teal-600">Shop</span>
                        </span>
                    </Link>
                    <div className="text-sm text-zinc-500">
                        {isLogin ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="text-teal-600 font-semibold hover:underline">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <Link href="/login" className="text-teal-600 font-semibold hover:underline">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Decorative background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(at 30% 20%, hsla(166,72%,90%,0.5) 0, transparent 50%),
                                     radial-gradient(at 80% 80%, hsla(166,72%,85%,0.3) 0, transparent 50%)`,
                    }}
                />

                <div className="relative z-10 w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-950 mb-4">
                                <ShoppingBag className="w-7 h-7 text-teal-600" />
                            </div>
                            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                                {isLogin ? "Welcome back" : "Create your account"}
                            </h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                                {isLogin
                                    ? "Sign in to access your orders and cart"
                                    : "Join LuxeShop for exclusive deals"}
                            </p>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-11"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        Password
                                    </Label>
                                    {isLogin && (
                                        <a href="#" className="text-xs text-teal-600 hover:underline font-medium">
                                            Forgot password?
                                        </a>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="h-11 pr-11"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password (Register only) */}
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-11"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg shadow-teal-500/20 transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait...</>
                                ) : (
                                    isLogin ? "Sign In" : "Create Account"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-zinc-500">
                            {isLogin ? (
                                <>
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register" className="text-teal-600 font-semibold hover:underline">
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-teal-600 font-semibold hover:underline">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
