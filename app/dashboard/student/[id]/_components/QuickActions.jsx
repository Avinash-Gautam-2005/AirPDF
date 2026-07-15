"use client";

import { QrCode, Upload, History, HelpCircle } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: QrCode,
    label: "Scan QR and Upload",
    description: "Scan shop's QR code and upload document",
    href: "/scan",
    gradient: "from-violet-500 to-purple-500",
  },
//   {
//     icon: Upload,
//     label: "Upload",
//     description: "Upload a document",
//     href: "/upload",
//     gradient: "from-purple-500 to-indigo-500",
//   },
  {
    icon: History,
    label: "History",
    description: "View all orders",
    href: "#orders",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: HelpCircle,
    label: "Help",
    description: "Get support",
    href: "/help",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 mt-6">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="group relative p-5 lg:p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-border hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <action.icon className="w-6 h-6 lg:w-7 lg:h-7" />
          </div>

          {/* Text */}
          <h3 className="font-semibold text-sm lg:text-base">{action.label}</h3>
          <p className="text-xs lg:text-sm text-muted-foreground mt-1">
            {action.description}
          </p>

          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Link>
      ))}
    </div>
  );
}
