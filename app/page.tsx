import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Cloud } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f0f7ff]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 w-full">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Cloud className="text-white size-5 fill-white" />
          </div>
          <span className="text-[#1a1c1e]">Acme Cloud</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline">Don't have an account?</span>
          <Button variant="outline" className="bg-[#e8f1ff] border-none text-blue-600 hover:bg-blue-100 font-semibold px-5">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-[440px] shadow-sm border-none rounded-2xl p-4">
          <CardHeader className="space-y-2 pb-8 pt-6">
            <h1 className="text-3xl font-bold text-center text-[#1a1c1e]">Welcome back</h1>
            <CardDescription className="text-center text-gray-500 text-base">
              Enter your details to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className="font-semibold text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="h-12 border-gray-200 focus-visible:ring-blue-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" title="Password" className="font-semibold text-sm">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-600 p-0 h-auto"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  className="h-12 border-gray-200 focus-visible:ring-blue-500 pr-10"
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Eye className="size-5" />
                </button>
              </div>
            </div>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg transition-colors mt-2">
              Sign In
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-3 font-semibold text-gray-700">
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>

            <p className="text-center text-xs text-gray-500 leading-relaxed px-4">
              By clicking continue, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-gray-800">Terms of Service</Link> và{" "}
              <Link href="/privacy" className="underline hover:text-gray-800">Privacy Policy</Link>.
            </p>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div>© 2023 Acme Cloud Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/support" className="hover:text-gray-600 transition-colors">Support</Link>
          <Link href="/status" className="hover:text-gray-600 transition-colors">Status</Link>
          <Link href="/security" className="hover:text-gray-600 transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  )
}