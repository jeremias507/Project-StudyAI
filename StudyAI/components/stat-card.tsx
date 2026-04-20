import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  subtitle?: string
  className?: string
  iconClassName?: string
}

export function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  className,
  iconClassName,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconClassName || "bg-primary/10"
          )}
        >
          <Icon className={cn("h-5 w-5", iconClassName ? "text-white" : "text-primary")} />
        </div>
      </div>
    </div>
  )
}
