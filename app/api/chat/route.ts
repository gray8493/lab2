import { NextRequest, NextResponse } from "next/server";

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

        const { messages }: { messages: ChatMessage[] } = await req.json();

        // Build conversation history for Gemini REST API
        const contents = messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [
                            {
                                text:
                                    "Bạn là trợ lý AI thân thiện của LuxeShop - một cửa hàng thời trang cao cấp. " +
                                    "Hãy trả lời ngắn gọn, hữu ích và thân thiện. " +
                                    "Bạn có thể hỗ trợ khách hàng về sản phẩm, đơn hàng, và các câu hỏi chung. " +
                                    "Trả lời bằng tiếng Việt nếu khách hỏi bằng tiếng Việt, bằng tiếng Anh nếu khách hỏi bằng tiếng Anh.",
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
            const errorData = await response.json();
            console.error("Gemini API error response:", errorData);
            throw new Error(errorData.error?.message || "Gemini API request failed");
        }

        const data = await response.json();
        const text =
            data.candidates?.[0]?.content?.parts?.[0]?.text ??
            "Xin lỗi, tôi không thể trả lời lúc này.";

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: "Đã xảy ra lỗi khi xử lý yêu cầu." },
            { status: 500 }
        );
    }
}
