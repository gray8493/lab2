"use client";

import { useState } from "react";
import Link from "next/link";
import { Rocket, UserPlus, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error on change if needed
        if (e.target.name === "confirmPassword" || e.target.name === "password") {
            setError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // Success scenario
        alert("Registration Successful (Mock)!");
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] min-h-screen font-sans flex flex-col overflow-x-hidden">
            {/* Header / Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3">
                <div className="flex items-center gap-4 text-[#111418] dark:text-white">
                    <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-white">
                        <Rocket className="size-5" />
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                        Web App
                    </h2>
                </div>
                <Link href="/login">
                    <Button className="font-bold tracking-[0.015em]">
                        Login
                    </Button>
                </Link>
            </header>

            {/* Main Registration Card */}
            <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                    {/* Headline Section */}
                    <div className="text-center">
                        <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                            Create an account
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal pt-2">
                            Enter your details below to get started.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        {/* Full Name Field */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-[#111418] dark:text-white text-sm font-medium leading-none">
                                Full Name
                            </Label>
                            <Input
                                name="fullName"
                                placeholder="John Doe"
                                className="h-11"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-[#111418] dark:text-white text-sm font-medium leading-none">
                                Email Address
                            </Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                className="h-11"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-[#111418] dark:text-white text-sm font-medium leading-none">
                                Password
                            </Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-11"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-[#111418] dark:text-white text-sm font-medium leading-none">
                                Confirm Password
                            </Label>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className={`h-11 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {error && (
                                <span className="text-red-500 text-xs font-medium px-1">
                                    {error}
                                </span>
                            )}
                        </div>

                        {/* Action Button */}
                        <div className="pt-4">
                            <Button type="submit" className="w-full h-11 gap-2 text-sm font-semibold">
                                Register
                                <UserPlus className="size-[18px]" />
                            </Button>
                        </div>

                        {/* Or divider */}
                        <div className="relative flex py-4 items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest font-medium">
                                Or continue with
                            </span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        </div>

                        {/* Social Mockup */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" type="button" className="h-10 gap-2">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.904 3.184-1.904 4.184-1.264 1.264-3.256 2.6-6.4 2.6-5.112 0-9.272-4.136-9.272-9.256s4.16-9.256 9.272-9.256c2.784 0 4.888 1.104 6.384 2.504l2.32-2.32c-2.12-2.032-5.064-3.568-8.704-3.568-6.616 0-12 5.384-12 12s5.384 12 12 12c3.584 0 6.384-1.184 8.56-3.48 2.224-2.224 2.92-5.408 2.92-8.08 0-.56-.04-1.104-.12-1.632l-11.36.008z"></path>
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" type="button" className="h-10 gap-2">
                                <Github className="size-4" />
                                GitHub
                            </Button>
                        </div>

                        {/* Redirect to Login */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Already have an account?{" "}
                                <Link
                                    className="font-semibold text-primary hover:underline transition-all"
                                    href="/login"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer Decoration */}
            <footer className="py-8 text-center text-slate-400 text-xs">
                © 2026 Web App Inc. All rights reserved.
            </footer>
        </div>
    );
}
