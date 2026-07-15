"use client";

import { Card, CardContent } from "@/components/ui/card";

const STATUS_CONFIG = {
    PENDING: {
        label: "Pending",
        dotColor: "bg-amber-500",
        badgeBg: "bg-amber-50 dark:bg-amber-950/30",
        badgeText: "text-amber-700 dark:text-amber-300",
        ping: true,
    },
    PRINTING: {
        label: "Printing",
        dotColor: "bg-blue-500",
        badgeBg: "bg-blue-50 dark:bg-blue-950/30",
        badgeText: "text-blue-700 dark:text-blue-300",
        ping: true,
    },
    COMPLETED: {
        label: "Completed",
        dotColor: "bg-emerald-500",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/30",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        ping: false,
    },
    CANCELLED: {
        label: "Cancelled",
        dotColor: "bg-red-500",
        badgeBg: "bg-red-50 dark:bg-red-950/30",
        badgeText: "text-red-700 dark:text-red-300",
        ping: false,
    },
};

function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText}`}
        >
            <span className="relative flex h-2 w-2">
                {config.ping && (
                    <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75`}
                    />
                )}
                <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`}
                />
            </span>
            {config.label}
        </span>
    );
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function OrdersList({ orders }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-violet-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1">No orders yet</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Scan a shop&apos;s QR code and upload a document to place your first
                    print order.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <Card
                    key={order.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background group"
                >
                    <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            {/* Left: Order Info */}
                            <div className="flex items-start gap-4 min-w-0 flex-1">
                                {/* Icon */}
                                <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                        />
                                    </svg>
                                </div>

                                {/* Details */}
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-sm truncate">
                                            {order.shop?.name || "Unknown Shop"}
                                        </h3>
                                    </div>

                                    {order.fileName && (
                                        <p className="text-sm text-muted-foreground truncate mb-2">
                                            {order.fileName}
                                        </p>
                                    )}

                                    {/* Print Options Tags */}
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                            </svg>
                                            {order.copies} {order.copies === 1 ? "copy" : "copies"}
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted">
                                            {order.colorMode === "COLOR" ? (
                                                <>
                                                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                                                    Color
                                                </>
                                            ) : (
                                                <>
                                                    <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                                                    B&W
                                                </>
                                            )}
                                        </span>
                                        {order.doubleSided && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                Double-sided
                                            </span>
                                        )}
                                        {order.pageCount && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted">
                                                {order.pageCount} {order.pageCount === 1 ? "page" : "pages"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Status + Date */}
                            <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5 shrink-0">
                                <StatusBadge status={order.status} />
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(order.createdAt)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
