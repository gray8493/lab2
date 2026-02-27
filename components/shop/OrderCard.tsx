"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Order } from "@/lib/supabase";

interface OrderCardProps {
    order: Order;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: {
        label: "Pending",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: <Clock className="w-3 h-3" />,
    },
    completed: {
        label: "Completed",
        color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: <CheckCircle2 className="w-3 h-3" />,
    },
    cancelled: {
        label: "Cancelled",
        color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: <XCircle className="w-3 h-3" />,
    },
};

export const OrderCard = ({ order }: OrderCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const status = statusConfig[order.status] || statusConfig["pending"];

    const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-all duration-200">
            <CardHeader className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Order info */}
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950 flex-shrink-0">
                            <Package className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-0.5">
                                Order ID
                            </p>
                            <p className="font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">{formattedDate}</p>
                        </div>
                    </div>

                    {/* Right: Total + Status + Toggle */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="text-right">
                            <p className="text-xs text-zinc-400 font-medium mb-0.5">Total</p>
                            <p className="text-lg font-bold text-teal-600">
                                ${order.total_price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}
                            >
                                {status.icon}
                                {status.label}
                            </span>
                        </div>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1"
                            aria-label="Toggle order details"
                        >
                            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </CardHeader>

            {/* Expandable Items */}
            {expanded && (
                <CardContent className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                            Items ({order.items.length})
                        </p>
                        <div className="space-y-2.5">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm bg-zinc-50 dark:bg-zinc-800/50 rounded-lg px-4 py-2.5"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                            {item.name}
                                        </span>
                                        <span className="text-zinc-400 text-xs">x{item.quantity}</span>
                                    </div>
                                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                            <span className="text-sm font-semibold text-zinc-500">Order Total</span>
                            <span className="text-base font-bold text-teal-600">${order.total_price.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};
