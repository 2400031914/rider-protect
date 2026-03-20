import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className = "" }: StatCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{typeof value === "number" ? value.toLocaleString("en-IN") : value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
      </div>
    </div>
  );
}
