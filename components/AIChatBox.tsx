"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Bot, User, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    user_id: string;
    content: string;
    sender_type: "user" | "ai";
    created_at: string;
}

export default function AIChatBox() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch chat history and setup realtime subscription
    useEffect(() => {
        if (!user || !isOpen) return;

        // Initial fetch
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: true });

            if (error) {
                console.error("Error fetching history:", error);
            } else {
                setMessages(data || []);
            }
        };

        fetchHistory();

        // Subscribe to new messages
        const channel = supabase
            .channel(`chat_${user.id}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    const newMessage = payload.new as Message;
                    setMessages((prev) => {
                        // Prevent duplicate messages if already in state
                        if (prev.some((m) => m.id === newMessage.id)) return prev;
                        return [...prev, newMessage];
                    });

                    if (newMessage.sender_type === "ai") {
                        setIsLoading(false);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, isOpen]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || !user || isLoading) return;

        const userContent = input.trim();
        const temporaryId = Date.now().toString();

        // Optimistic update
        const optimisticMessage: Message = {
            id: temporaryId,
            user_id: user.id,
            content: userContent,
            sender_type: "user",
            created_at: new Date().toISOString()
        };

        setMessages((prev) => [...prev, optimisticMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // 1. Insert user message into Supabase
            const { error: insertError } = await supabase.from("messages").insert({
                user_id: user.id,
                content: userContent,
                sender_type: "user",
            });

            if (insertError) throw insertError;

            // 2. Request AI response via API
            // Full message history for context
            const chatContext = messages.map(m => ({
                role: m.sender_type === "user" ? ("user" as const) : ("model" as const),
                content: m.content
            }));
            chatContext.push({ role: "user", content: userContent });

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: chatContext }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to get AI response");
            }

        } catch (error: any) {
            console.error("Chat error:", error);
            toast.error(`Có lỗi xảy ra: ${error.message}`);
            // Remove the optimistic message on error
            setMessages((prev) => prev.filter(m => m.id !== temporaryId));
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all animate-in slide-in-from-bottom-5 dark:border-zinc-800 dark:bg-zinc-950">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-zinc-900 p-4 text-white dark:bg-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                                <Bot className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold leading-none">LuxeShop Assistant</h3>
                                <p className="mt-1 text-xs text-zinc-400">Trực tuyến</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-8 text-center text-zinc-500">
                                    <div className="mb-3 rounded-full bg-zinc-100 p-3 dark:bg-zinc-900">
                                        <MessageCircle className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm">Xin chào! 👋 Tôi có thể giúp gì cho bạn?</p>
                                </div>
                            )}

                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full mb-4",
                                        msg.sender_type === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex max-w-[80%] flex-col gap-1",
                                            msg.sender_type === "user" ? "items-end" : "items-start"
                                        )}
                                    >
                                        <div className="flex items-end gap-2">
                                            {msg.sender_type === "ai" && (
                                                <Avatar className="h-6 w-6 border border-zinc-200 dark:border-zinc-800 shrink-0 mb-1">
                                                    <AvatarFallback className="bg-indigo-100 text-[10px] text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                                                        AI
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div
                                                className={cn(
                                                    "rounded-2xl px-4 py-2 text-sm shadow-sm",
                                                    msg.sender_type === "user"
                                                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-br-none"
                                                        : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-700"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-zinc-500 px-1">
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-start gap-2">
                                    <Avatar className="h-6 w-6 border border-zinc-200 dark:border-zinc-800">
                                        <AvatarFallback className="bg-indigo-100 text-[10px] text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
                                            AI
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex h-8 items-center gap-1 rounded-2xl bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
                                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Footer Input */}
                    <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-2 border-t border-zinc-100 p-4 dark:border-zinc-800"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 bg-zinc-50 dark:bg-zinc-900"
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !input.trim()}
                            className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <Button
                size="icon"
                className={cn(
                    "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
                    isOpen ? "rotate-90 scale-90 bg-zinc-900" : "bg-zinc-900 hover:scale-110 dark:bg-zinc-50"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-white dark:text-zinc-950" />
                ) : (
                    <MessageCircle className="h-6 w-6 text-white dark:text-zinc-950" />
                )}
            </Button>
        </div>
    );
}
