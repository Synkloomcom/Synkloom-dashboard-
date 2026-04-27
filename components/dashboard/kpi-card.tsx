"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: number
  suffix?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function KPICard({ title, value, suffix = "", icon, trend, className }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:glow-primary group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground animate-count-up">
            {displayValue.toLocaleString()}{suffix}
          </p>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}%</span>
              <span className="text-muted-foreground">vs last hour</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/20 text-foreground group-hover:bg-primary/30 transition-colors">
          {icon}
        </div>
      </div>
    </div>
  )
}
