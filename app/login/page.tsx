import { Suspense } from "react";
import { AuthForm } from "@/components/shop/AuthForm";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
        }>
            <AuthForm mode="login" />
        </Suspense>
    );
}
