"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface QueueItem {
  id: string
  name: string
  position: number
  estimatedTime: string
  status: "waiting" | "in-progress" | "completed"
  avatar: string
}

const initialQueue: QueueItem[] = [
  { id: "1", name: "Sarah Johnson", position: 1, estimatedTime: "2 min", status: "in-progress", avatar: "SJ" },
  { id: "2", name: "Michael Chen", position: 2, estimatedTime: "8 min", status: "waiting", avatar: "MC" },
  { id: "3", name: "Emily Davis", position: 3, estimatedTime: "15 min", status: "waiting", avatar: "ED" },
  { id: "4", name: "James Wilson", position: 4, estimatedTime: "22 min", status: "waiting", avatar: "JW" },
  { id: "5", name: "Lisa Anderson", position: 5, estimatedTime: "30 min", status: "waiting", avatar: "LA" },
]

export function QueueTracker() {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue)

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => {
        const updated = [...prev]
        const randomIndex = Math.floor(Math.random() * updated.length)
        const item = updated[randomIndex]
        if (item.status === "waiting") {
          const newTime = parseInt(item.estimatedTime) - 1
          if (newTime > 0) {
            updated[randomIndex] = { ...item, estimatedTime: `${newTime} min` }
          }
        }
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Live Queue Tracker</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {queue.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
              item.status === "in-progress" 
                ? "bg-primary/20 glow-primary" 
                : "bg-secondary/30 hover:bg-secondary/50"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm font-medium text-primary-foreground">
              {item.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium truncate">{item.name}</p>
              <p className="text-sm text-muted-foreground">Position #{item.position}</p>
            </div>
            
            <div className="text-right">
              <p className="text-foreground font-medium">{item.estimatedTime}</p>
              <p className={cn(
                "text-xs font-medium",
                item.status === "in-progress" ? "text-emerald-600 dark:text-emerald-400" : "text-accent"
              )}>
                {item.status === "in-progress" ? "Being Served" : "Waiting"}
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  item.status === "in-progress" 
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400" 
                    : "bg-gradient-to-r from-accent to-primary"
                )}
                style={{ width: item.status === "in-progress" ? "75%" : `${100 - (item.position * 15)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
