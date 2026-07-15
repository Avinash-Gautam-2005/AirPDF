"use client";

import { useEffect, useState, useTransition } from "react";
import { updateOrderStatus } from "../../../../../actions/shopkeeper";
import { supabase } from "../../../../../lib/supabase-client";
import {
  FileText, Clock, Printer, CheckCircle2,
  XCircle, User, Hash, Palette, BookOpen,
  RotateCcw, ChevronRight, ExternalLink, Package,
  ChevronLeft
} from "lucide-react";

const STATUS_CONFIG = {
  PENDING: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", icon: Clock },
  PRINTING: { label: "Printing", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", icon: Printer },
  COMPLETED: { label: "Completed", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-800", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800", icon: XCircle },
};

// Next status transitions for each state
const NEXT_STATUS = {
  PENDING: "PRINTING",
  PRINTING: "COMPLETED",
  COMPLETED: null,
  CANCELLED: null,
};

const CANCEL_ALLOWED = ["PENDING", "PRINTING"];

function OrderCard({ order }) {
  const [status, setStatus] = useState(order.status);
  const [isPending, startTransition] = useTransition();
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  const nextStatus = NEXT_STATUS[status];

  const handleStatusChange = (newStatus) => {
    startTransition(async () => {
      try {
        await updateOrderStatus(order.id, newStatus);
        setStatus(newStatus);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border overflow-hidden hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-violet-500" />
          <span className="text-sm font-mono font-medium truncate max-w-[200px]" title={order.fileName}>
            {order.fileName || order.filePublicId?.split("/").pop() || "document.pdf"}
          </span>
        </div>
        {/* Status Badge */}
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
          <Icon className="w-3 h-3" />
          {cfg.label}
        </span>
      </div>

      {/* Card Body */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {/* Customer */}
        {order.customer && (
          <div className="flex items-center gap-2 text-sm">
            {order.customer.image ? (
              <img src={order.customer.image} alt="" className="w-6 h-6 rounded-full" />
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="font-medium">{order.customer.name || "Customer"}</span>
            <span className="text-muted-foreground text-xs">· {order.customer.email}</span>
          </div>
        )}

        {/* Print Specs */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" />
            {order.copies} {order.copies === 1 ? "copy" : "copies"}
          </span>
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" />
            {order.colorMode === "BW" ? "Black & White" : "Color"}
          </span>
          {order.pageRange && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Pages: {order.pageRange}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            {order.doubleSided ? "Double sided" : "Single sided"}
          </span>
          {order.pageCount && (
            <span className="flex items-center gap-1.5 col-span-2 text-xs">
              <FileText className="w-3.5 h-3.5" />
              {order.pageCount} pages · {order.fileSizeBytes ? `${(order.fileSizeBytes / 1024).toFixed(0)} KB` : ""}
            </span>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground">
          Placed {new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
        </p>
      </div>

      {/* Card Footer — Actions */}
      <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center gap-2 flex-wrap">
        {/* View PDF */}
        <a
          href={order.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View PDF
        </a>

        {/* Progress to next status */}
        {nextStatus && (
          <button
            onClick={() => handleStatusChange(nextStatus)}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ml-auto"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            Mark as {STATUS_CONFIG[nextStatus].label}
          </button>
        )}

        {/* Cancel */}
        {CANCEL_ALLOWED.includes(status) && (
          <button
            onClick={() => handleStatusChange("CANCELLED")}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-red-500 bg-red-50 dark:bg-red-950/30 text-xs font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function Shopinfo({ orders: initialOrders, shopId }) {
  // Convert prop to state so we can update it when Realtime pushes new orders
  const [orders, setOrders] = useState(initialOrders);
  const [page, setpage] = useState(0);
  const items = 5;
  // ── Supabase Realtime Subscription ─────────────────────────────────────
  useEffect(() => {
    if (!shopId) {
      return;
    }

    const channel = supabase
      .channel(`shop-orders-${shopId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `shop_id=eq.${shopId}`,
        },
        (payload) => {
          // Map Postgres snake_case → Prisma camelCase
          const row = payload.new;
          const mappedOrder = {
            id: row.id,
            shopId: row.shop_id,
            customerId: row.customer_id,
            filePublicId: row.file_public_id,
            fileUrl: row.file_url,
            fileName: row.file_name,
            fileSizeBytes: row.file_size_bytes,
            pageCount: row.page_count,
            copies: row.copies,
            colorMode: row.color_mode,
            pageRange: row.page_range,
            doubleSided: row.double_sided,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            customer: null, // Realtime doesn't include relations
          };
          setOrders((prev) => [mappedOrder, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [shopId]);

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl bg-background/80 backdrop-blur-sm border border-border p-12 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <Package className="w-8 h-8 text-muted-foreground opacity-50" />
        </div>
        <div>
          <p className="font-semibold text-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Share your QR code so customers can start sending print jobs.
          </p>
        </div>
      </div>
    );
  }

  // Group by status for a quick summary
  const counts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      {/* Summary bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) =>
          counts[key] ? (
            <span key={key} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
              <cfg.icon className="w-3 h-3" />
              {counts[key]} {cfg.label}
            </span>
          ) : null
        )}
      </div>

      {/* Order Cards */}
      <div className="flex flex-col gap-3">
        {orders.slice(page * items, items * (page + 1)).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setpage(page - 1)}
          disabled={page === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>
        <button
          onClick={() => setpage(page + 1)}
          disabled={page * items + items >= orders.length}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium transition-colors"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
