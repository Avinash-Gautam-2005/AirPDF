"use client";

import { FileText, Clock, Loader2, CheckCircle } from "lucide-react";

export default function DashboardStats({ stats }) {
  const statCards = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: FileText,
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-100 dark:bg-violet-900/30",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Printing",
      value: stats.printing,
      icon: Loader2,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="relative p-5 lg:p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-border overflow-hidden group hover:shadow-md transition-shadow duration-300"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 lg:w-28 lg:h-28 -mr-6 -mt-6 rounded-full bg-gradient-to-br from-violet-500/10 to-indigo-500/10 group-hover:scale-150 transition-transform duration-500" />

          <div className="relative flex items-center gap-4">
            <div className={`p-2.5 lg:p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
