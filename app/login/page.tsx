"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Layers, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation logic
        if (email === "admin@example.com" && password === "12345678") {
            setError(null);
            alert("Login Successful!"); // Or redirect
        } else {
            setError("Incorrect username or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#101922]">
            {/* Header / Navbar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbe0e6]/40 dark:border-white/10 px-6 py-4 lg:px-10 bg-white/50 dark:bg-[#101922]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-3 text-[#111418] dark:text-white">
                    <Link href="/" title="Back to Homepage">
                        <Button variant="ghost" size="icon" className="mr-1 text-slate-500 hover:text-primary hover:bg-transparent">
                            <ArrowLeft className="size-5" />
                        </Button>
                    </Link>
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Layers className="size-5" />
                    </div>
                    <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                        Acme Cloud
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-[#617589] hidden sm:inline">
                        Don't have an account?
                    </span>
                    <Link href="/register">
                        <Button variant="ghost" className="bg-primary/10 text-primary hover:bg-primary/20">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center px-4 py-12 bg-mesh relative overflow-hidden">
                {/* Mesh Background Effect (CSS logic simulation) */}
                <div className="absolute inset-0 pointer-events-none z-0" style={{
                    background: `
                radial-gradient(at 0% 0%, hsla(210,100%,95%,1) 0, transparent 50%), 
                radial-gradient(at 100% 0%, hsla(210,100%,92%,1) 0, transparent 50%),
                radial-gradient(at 100% 100%, hsla(210,100%,95%,1) 0, transparent 50%),
                radial-gradient(at 0% 100%, hsla(210,100%,92%,1) 0, transparent 50%)
            `
                }}></div>

                {/* Login Card */}
                <div className="w-full max-w-[480px] bg-white dark:bg-[#1a242f] rounded-xl shadow-xl border border-[#dbe0e6] dark:border-white/10 p-8 lg:p-12 z-10">
                    {/* Headline & Body */}
                    <div className="text-center mb-8">
                        <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl font-extrabold leading-tight pb-2">
                            Welcome back
                        </h1>
                        <p className="text-[#617589] dark:text-slate-400 text-base font-normal leading-relaxed">
                            Enter your details to access your dashboard.
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Form */}
                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-[#111418] dark:text-white text-sm font-semibold leading-normal">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                className="h-12 text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-[#111418] dark:text-white text-sm font-semibold leading-normal">
                                    Password
                                </Label>
                                <a
                                    className="text-primary text-xs font-semibold hover:underline"
                                    href="#"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative flex w-full items-center">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="h-12 text-base pr-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 text-[#617589] hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <Eye className="size-5" />
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="h-12 text-base font-bold shadow-md w-full mt-2"
                        >
                            Sign In
                        </Button>

                        {/* Divider */}
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#dbe0e6] dark:border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-[#1a242f] px-3 text-[#617589] font-medium">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <Button
                            variant="outline"
                            type="button"
                            className="h-12 gap-3 w-full border-[#dbe0e6] dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                            <div className="size-5 overflow-hidden">
                                <img
                                    alt="Google"
                                    className="w-full h-full object-contain"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqm4Y9Fx2e81zeV2CFkCVqXws06A_0i6r7UXQbAyfQiwuE7pEC6dxUMkWR5mmY4Vz9GVH9n2QGoMEQh_-ajCFdIYQa3zpjhq6GuYx6waA5FBscTl2TQAB2jL8K4pYCwIWmfx1zrRkwaEfS0naa2Uw3xKa0HKdtfWW0Vl5mE8iBoTGHBmwZzOzG6lySLOEBYZADTPpebJilnt1rC9yWMBu44B-Mu-Fe_beNZrIBIvSki6YyA-xGWTqIcBmwCC5xNtqdBxN523TbOSc"
                                />
                            </div>
                            <span>Sign in with Google</span>
                        </Button>
                    </form>

                    {/* Footer links */}
                    <div className="mt-8 text-center text-sm text-[#617589] dark:text-slate-400">
                        By clicking continue, you agree to our{" "}
                        <a
                            className="underline underline-offset-4 hover:text-primary transition-colors"
                            href="#"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            className="underline underline-offset-4 hover:text-primary transition-colors"
                            href="#"
                        >
                            Privacy Policy
                        </a>
                        .
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 px-10 border-t border-[#dbe0e6] dark:border-white/10 bg-white/50 dark:bg-[#101922]/50 backdrop-blur-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#617589] dark:text-slate-400 text-xs font-medium">
                    <p>© 2026 Acme Cloud Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a className="hover:text-primary" href="#">
                            Support
                        </a>
                        <a className="hover:text-primary" href="#">
                            Status
                        </a>
                        <a className="hover:text-primary" href="#">
                            Security
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
