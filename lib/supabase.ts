import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export type Order = {
    id: string;
    user_id: string;
    total_price: number;
    items: OrderItem[];
    status: string;
    created_at: string;
};
