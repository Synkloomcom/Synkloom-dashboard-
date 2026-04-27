"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertTriangle, Info, X, Check, CheckCheck, Filter, Trash2, Clock, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "alert"
  title: string
  message: string
  time: string
  isRead: boolean
  category: "queue" | "booking" | "system" | "ai"
}

const initialNotifications: Notification[] = [
  { id: "1", type: "success", title: "Booking Confirmed", message: "Your appointment for Account Services on April 25 at 2:30 PM has been confirmed.", time: "Just now", isRead: false, category: "booking" },
  { id: "2", type: "info", title: "Your Turn is Coming", message: "You are now #2 in the queue. Estimated wait time: 5 minutes.", time: "2 min ago", isRead: false, category: "queue" },
  { id: "3", type: "warning", title: "Queue Delay", message: "Due to high volume, wait times have increased by approximately 10 minutes.", time: "15 min ago", isRead: false, category: "queue" },
  { id: "4", type: "info", title: "AI Recommendation", message: "Based on your history, we recommend booking Technical Support for your inquiry.", time: "1 hour ago", isRead: true, category: "ai" },
  { id: "5", type: "success", title: "Feedback Received", message: "Thank you for your feedback! It helps us improve our services.", time: "2 hours ago", isRead: true, category: "system" },
  { id: "6", type: "alert", title: "Counter Reassignment", message: "Your service has been moved to Counter 5 due to staff availability.", time: "3 hours ago", isRead: true, category: "queue" },
  { id: "7", type: "info", title: "System Maintenance", message: "Scheduled maintenance tonight from 2 AM to 4 AM. Services may be briefly unavailable.", time: "5 hours ago", isRead: true, category: "system" },
  { id: "8", type: "success", title: "Peak Hours Alert", message: "Tomorrow is expected to be busy. Consider booking early to avoid long waits.", time: "Yesterday", isRead: true, category: "ai" },
]

const notificationSettings = [
  { id: "queue_updates", label: "Queue Updates", description: "Get notified about your queue position", enabled: true },
  { id: "booking_reminders", label: "Booking Reminders", description: "Receive reminders before your appointments", enabled: true },
  { id: "ai_recommendations", label: "AI Recommendations", description: "Personalized suggestions from our AI", enabled: true },
  { id: "system_alerts", label: "System Alerts", description: "Important system notifications", enabled: true },
  { id: "promotional", label: "Promotional", description: "Special offers and promotions", enabled: false },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<string>("all")
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState(notificationSettings)

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true
    if (filter === "unread") return !n.isRead
    return n.category === filter
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      case "alert": return <Bell className="w-5 h-5 text-destructive" />
      default: return <Info className="w-5 h-5 text-accent" />
    }
  }

  const getBorderColor = (type: Notification["type"]) => {
    switch (type) {
      case "success": return "border-l-emerald-500"
      case "warning": return "border-l-amber-500"
      case "alert": return "border-l-destructive"
      default: return "border-l-accent"
    }
  }

  const getCategoryBadge = (category: Notification["category"]) => {
    const colors: Record<string, string> = {
      queue: "bg-primary/20 text-primary dark:text-primary-foreground",
      booking: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      system: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
      ai: "bg-accent/20 text-accent",
    }
    return <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium uppercase", colors[category])}>{category}</span>
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your queue status and alerts</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "p-3 rounded-xl transition-colors",
              showSettings ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-foreground hover:bg-secondary/70"
            )}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="glass rounded-2xl p-6 mb-8 animate-slide-in-right">
          <h2 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                <div>
                  <p className="font-medium text-foreground">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    setting.enabled ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                    setting.enabled ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground"><strong>{unreadCount}</strong> unread</span>
          </div>
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground"><strong>{notifications.length - unreadCount}</strong> read</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="queue">Queue Updates</option>
            <option value="booking">Bookings</option>
            <option value="system">System</option>
            <option value="ai">AI Insights</option>
          </select>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 rounded-lg bg-secondary/50 text-foreground text-sm hover:bg-secondary/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Mark All Read
          </button>
          <button
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="glass rounded-2xl p-6">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  "p-4 rounded-xl border-l-4 transition-all cursor-pointer group animate-slide-in-right",
                  getBorderColor(notification.type),
                  notification.isRead ? "bg-secondary/20" : "bg-secondary/40 ring-1 ring-primary/20"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={cn("font-medium", notification.isRead ? "text-muted-foreground" : "text-foreground")}>{notification.title}</p>
                      {getCategoryBadge(notification.category)}
                      {!notification.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id) }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 rounded-lg"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-30" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Notifications</h3>
            <p className="text-muted-foreground">You&apos;re all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </>
  )
}
