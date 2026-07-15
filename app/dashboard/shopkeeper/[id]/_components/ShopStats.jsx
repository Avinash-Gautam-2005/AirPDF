import { Clock, Printer, CheckCircle2, XCircle, TrendingUp, Package } from "lucide-react";

const STAT_CARDS = [
  {
    key: "total",
    label: "Total Orders",
    icon: Package,
    gradient: "from-violet-500 to-indigo-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    text: "text-violet-700 dark:text-violet-300",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-300",
  },
  {
    key: "printing",
    label: "Printing",
    icon: Printer,
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-300",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    gradient: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-700 dark:text-green-300",
  },
];

export default function ShopStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map(({ key, label, icon: Icon, gradient, bg, border, text }) => (
        <div
          key={key}
          className={`relative rounded-2xl p-5 border ${bg} ${border} overflow-hidden`}
        >
          {/* Background number watermark */}
          <span className="absolute -bottom-2 -right-1 text-7xl font-black opacity-5 select-none pointer-events-none">
            {stats[key]}
          </span>

          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-wider ${text} opacity-70`}>{label}</p>
              <p className="text-3xl font-bold text-foreground mt-1">{stats[key]}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Progress bar relative to total */}
          {key !== "total" && stats.total > 0 && (
            <div className="mt-3 h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                style={{ width: `${Math.round((stats[key] / stats.total) * 100)}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
