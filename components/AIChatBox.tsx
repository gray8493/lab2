"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface Message {
    id: string;
    role: "user" | "model";
    content: string;
    timestamp: Date;
}

export default function AIChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "model",
            content: "Xin chào! 👋 Tôi là trợ lý AI của LuxeShop. Tôi có thể giúp gì cho bạn?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const chatHistory = [...messages, userMessage]
                .filter((m) => m.id !== "welcome")
                .map((m) => ({
                    role: m.role,
                    content: m.content,
                }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: chatHistory }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Lỗi kết nối");
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "model",
                content: data.message,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "model",
                content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau! 😅",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isOpen ? "scale(0.9) rotate(90deg)" : "scale(1)",
                    zIndex: 9999,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = isOpen
                        ? "scale(0.95) rotate(90deg)"
                        : "scale(1.1)";
                    e.currentTarget.style.boxShadow =
                        "0 12px 40px rgba(102, 126, 234, 0.6)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = isOpen
                        ? "scale(0.9) rotate(90deg)"
                        : "scale(1)";
                    e.currentTarget.style.boxShadow =
                        "0 8px 32px rgba(102, 126, 234, 0.4)";
                }}
                aria-label={isOpen ? "Đóng chat" : "Mở chat AI"}
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div
                style={{
                    position: "fixed",
                    bottom: "96px",
                    right: "24px",
                    width: "380px",
                    maxHeight: "560px",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 9998,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                    pointerEvents: isOpen ? "auto" : "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "#ffffff",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        ✨
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                color: "white",
                                fontWeight: 700,
                                fontSize: "15px",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            LuxeShop AI
                        </div>
                        <div
                            style={{
                                color: "rgba(255, 255, 255, 0.8)",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#4ade80",
                                    display: "inline-block",
                                }}
                            />
                            Gemini 2.5 Flash
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            background: "rgba(255, 255, 255, 0.15)",
                            border: "none",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                        }}
                        aria-label="Đóng chat"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        maxHeight: "380px",
                        minHeight: "300px",
                        background: "#f8f9fd",
                    }}
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                display: "flex",
                                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                alignItems: "flex-end",
                                gap: "8px",
                            }}
                        >
                            {msg.role === "model" && (
                                <div
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "12px",
                                        flexShrink: 0,
                                    }}
                                >
                                    ✨
                                </div>
                            )}
                            <div
                                style={{
                                    maxWidth: "75%",
                                    padding: "10px 14px",
                                    borderRadius:
                                        msg.role === "user"
                                            ? "16px 16px 4px 16px"
                                            : "16px 16px 16px 4px",
                                    background:
                                        msg.role === "user"
                                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                            : "#ffffff",
                                    color: msg.role === "user" ? "white" : "#1a1a2e",
                                    fontSize: "13.5px",
                                    lineHeight: "1.5",
                                    boxShadow:
                                        msg.role === "user"
                                            ? "0 2px 12px rgba(102, 126, 234, 0.3)"
                                            : "0 1px 6px rgba(0, 0, 0, 0.06)",
                                    wordBreak: "break-word",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {msg.content}
                                <div
                                    style={{
                                        fontSize: "10px",
                                        opacity: 0.6,
                                        marginTop: "4px",
                                        textAlign: msg.role === "user" ? "right" : "left",
                                    }}
                                >
                                    {formatTime(msg.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: "8px",
                            }}
                        >
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    flexShrink: 0,
                                }}
                            >
                                ✨
                            </div>
                            <div
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "16px 16px 16px 4px",
                                    background: "#ffffff",
                                    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.06)",
                                    display: "flex",
                                    gap: "4px",
                                    alignItems: "center",
                                }}
                            >
                                <span style={{ ...dotStyle, animationDelay: "0ms" }} />
                                <span style={{ ...dotStyle, animationDelay: "150ms" }} />
                                <span style={{ ...dotStyle, animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                    style={{
                        padding: "12px 16px",
                        background: "#ffffff",
                        borderTop: "1px solid #f0f0f5",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập tin nhắn..."
                        disabled={isLoading}
                        style={{
                            flex: 1,
                            padding: "10px 16px",
                            borderRadius: "12px",
                            border: "1.5px solid #e8e8f0",
                            outline: "none",
                            fontSize: "13.5px",
                            background: "#f8f9fd",
                            transition: "all 0.2s",
                            color: "#1a1a2e",
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#667eea";
                            e.currentTarget.style.boxShadow =
                                "0 0 0 3px rgba(102, 126, 234, 0.1)";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#e8e8f0";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            border: "none",
                            background:
                                isLoading || !input.trim()
                                    ? "#e0e0e8"
                                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            cursor: isLoading || !input.trim() ? "default" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s",
                            flexShrink: 0,
                        }}
                        aria-label="Gửi tin nhắn"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Global keyframe animation for loading dots */}
            <style jsx global>{`
        @keyframes chatDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
        </>
    );
}

const dotStyle: React.CSSProperties = {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    animation: "chatDotBounce 1.2s infinite",
    display: "inline-block",
};
