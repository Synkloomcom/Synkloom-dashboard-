"use client"

import { useState } from "react"
import { Bell, Clock, CheckCircle, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "success" | "warning"
  title: string
  message: string
  time: string
  isNew: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Slot Booked Successfully",
    message: "Your appointment at 2:30 PM has been confirmed",
    time: "Just now",
    isNew: true,
  },
  {
    id: "2",
    type: "info",
    title: "Your Turn in 5 Minutes",
    message: "Please proceed to Counter 3",
    time: "2 min ago",
    isNew: true,
  },
  {
    id: "3",
    type: "warning",
    title: "Queue Delay Notice",
    message: "Expected wait time increased by 10 minutes",
    time: "15 min ago",
    isNew: false,
  },
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [isExpanded, setIsExpanded] = useState(true)

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      default:
        return <Bell className="w-5 h-5 text-accent" />
    }
  }

  const getBorderColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-l-emerald-500"
      case "warning":
        return "border-l-amber-500"
      default:
        return "border-l-accent"
    }
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-foreground" />
            {notifications.filter(n => n.isNew).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground font-bold">
                {notifications.filter(n => n.isNew).length}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground">Smart Alerts</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={cn(
                "p-4 rounded-xl bg-secondary/30 border-l-4 animate-slide-in-right relative group",
                getBorderColor(notification.type),
                notification.isNew && "ring-1 ring-primary/30"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => removeNotification(notification.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary/20 rounded"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-medium">{notification.title}</p>
                    {notification.isNew && (
                      <span className="px-2 py-0.5 bg-primary/30 text-foreground text-[10px] rounded-full font-medium">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
