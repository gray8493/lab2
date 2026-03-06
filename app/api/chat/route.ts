import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

interface ChatMessage {
    role: "user" | "model";
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
                { status: 500 }
            );
        }

        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { messages }: { messages: ChatMessage[] } = await req.json();
        const lastUserMessage = messages[messages.length - 1];

        // Insert user message if not already there (though usually we insert in client for speed)
        // For reliability, we can check or just insert here. Let's assume client inserts for UX but we need it here for context.

        // Build conversation history for Gemini
        const contents = messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        const productsInfo = `Danh sách sản phẩm của LuxeShop:
- Classic Leather Sneakers: $89.99 (Giày da cao cấp, đế cao su bền)
- Minimalist Quartz Watch: $129.50 (Thiết kế thanh lịch, dây da thật)
- Bluetooth Wireless Headphones: $199.00 (Âm thanh Hifi, chống ồn chủ động)
- Cotton Canvas Backpack: $55.00 (Ba lô phong cách Vintage cho đi học/đi làm)
- Ceramic Coffee Mug: $18.25 (Cốc sứ tối giản cao cấp)
- Mechanical Gaming Keyboard: $145.00 (Bàn phím cơ có đèn RGB)`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [
                            {
                                text:
                                    "Bạn là trợ lý AI thân thiện của LuxeShop. " +
                                    "Hãy hỗ trợ khách hàng dựa trên thông tin sản phẩm sau: " +
                                    productsInfo +
                                    " Trả lời ngắn gọn, chuyên nghiệp, dùng Emoji phù hợp. " +
                                    "Luôn trả lời bằng tiếng Việt.",
                            },
                        ],
                    },
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API Error Detail:", errText);
            throw new Error(`Gemini API error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Xin lỗi, tôi gặp sự cố.";

        // Insert AI response into Supabase
        const { error: dbError } = await supabase.from("messages").insert({
            user_id: user.id,
            content: aiResponse,
            sender_type: "ai"
        });

        if (dbError) {
            console.error("Database error during AI message storage:", dbError);
        }

        return NextResponse.json({ message: aiResponse });
    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: error.message || "Đã xảy ra lỗi khi xử lý yêu cầu." },
            { status: 500 }
        );
    }
}
