import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface ChatMessage {
    role: "user" | "model";
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const { messages }: { messages: ChatMessage[] } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
                { status: 500 }
            );
        }

        // Build conversation history for Gemini
        const contents = messages.map((msg) => ({
            role: msg.role === "user" ? "user" as const : "model" as const,
            parts: [{ text: msg.content }],
        }));

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction:
                    "Bạn là trợ lý AI thân thiện của LuxeShop - một cửa hàng thời trang cao cấp. " +
                    "Hãy trả lời ngắn gọn, hữu ích và thân thiện. " +
                    "Bạn có thể hỗ trợ khách hàng về sản phẩm, đơn hàng, và các câu hỏi chung. " +
                    "Trả lời bằng tiếng Việt nếu khách hỏi bằng tiếng Việt, bằng tiếng Anh nếu khách hỏi bằng tiếng Anh.",
                temperature: 0.7,
                maxOutputTokens: 1024,
            },
        });

        const text = response.text ?? "Xin lỗi, tôi không thể trả lời lúc này.";

        return NextResponse.json({ message: text });
    } catch (error) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: "Đã xảy ra lỗi khi xử lý yêu cầu." },
            { status: 500 }
        );
    }
}
