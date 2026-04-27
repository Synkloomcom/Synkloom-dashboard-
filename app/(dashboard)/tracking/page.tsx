"use client"

import { useState, useEffect } from "react"
import { Search, Filter, RefreshCw, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QueueEntry {
  id: string
  ticketNumber: string
  name: string
  service: string
  status: "waiting" | "in-progress" | "completed" | "cancelled"
  position: number
  estimatedWait: string
  joinedAt: string
  counter?: string
  avatar: string
}

const initialEntries: QueueEntry[] = [
  { id: "1", ticketNumber: "A001", name: "Sarah Johnson", service: "General Inquiry", status: "in-progress", position: 1, estimatedWait: "2 min", joinedAt: "9:15 AM", counter: "Counter 3", avatar: "SJ" },
  { id: "2", ticketNumber: "A002", name: "Michael Chen", service: "Account Services", status: "waiting", position: 2, estimatedWait: "8 min", joinedAt: "9:22 AM", avatar: "MC" },
  { id: "3", ticketNumber: "A003", name: "Emily Davis", service: "Technical Support", status: "waiting", position: 3, estimatedWait: "15 min", joinedAt: "9:28 AM", avatar: "ED" },
  { id: "4", ticketNumber: "A004", name: "James Wilson", service: "Consultation", status: "waiting", position: 4, estimatedWait: "22 min", joinedAt: "9:35 AM", avatar: "JW" },
  { id: "5", ticketNumber: "A005", name: "Lisa Anderson", service: "General Inquiry", status: "waiting", position: 5, estimatedWait: "30 min", joinedAt: "9:41 AM", avatar: "LA" },
  { id: "6", ticketNumber: "A006", name: "Robert Brown", service: "Account Services", status: "completed", position: 0, estimatedWait: "-", joinedAt: "8:45 AM", counter: "Counter 1", avatar: "RB" },
  { id: "7", ticketNumber: "A007", name: "Jennifer Lee", service: "Technical Support", status: "completed", position: 0, estimatedWait: "-", joinedAt: "8:52 AM", counter: "Counter 2", avatar: "JL" },
  { id: "8", ticketNumber: "A008", name: "David Miller", service: "General Inquiry", status: "cancelled", position: 0, estimatedWait: "-", joinedAt: "9:05 AM", avatar: "DM" },
]

const counters = [
  { id: "1", name: "Counter 1", status: "active", serving: "A006", staff: "John Smith" },
  { id: "2", name: "Counter 2", status: "active", serving: "A007", staff: "Jane Doe" },
  { id: "3", name: "Counter 3", status: "active", serving: "A001", staff: "Mike Johnson" },
  { id: "4", name: "Counter 4", status: "idle", serving: null, staff: "Sarah Williams" },
  { id: "5", name: "Counter 5", status: "offline", serving: null, staff: "Break" },
]

export default function QueueTrackingPage() {
  const [entries, setEntries] = useState<QueueEntry[]>(initialEntries)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEntries(prev => {
        const updated = [...prev]
        const waitingEntries = updated.filter(e => e.status === "waiting")
        if (waitingEntries.length > 0) {
          const randomEntry = waitingEntries[Math.floor(Math.random() * waitingEntries.length)]
          const randomIndex = updated.findIndex(e => e.id === randomEntry.id)
          if (randomIndex !== -1 && updated[randomIndex]) {
            const currentWait = parseInt(updated[randomIndex].estimatedWait)
            if (!isNaN(currentWait) && currentWait > 1) {
              updated[randomIndex] = { ...updated[randomIndex], estimatedWait: `${currentWait - 1} min` }
            }
          }
        }
        return updated
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || entry.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: QueueEntry["status"]) => {
    switch (status) {
      case "in-progress":
        return <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />In Progress</span>
      case "waiting":
        return <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3" />Waiting</span>
      case "completed":
        return <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" />Completed</span>
      case "cancelled":
        return <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium flex items-center gap-1"><XCircle className="w-3 h-3" />Cancelled</span>
    }
  }

  const stats = {
    waiting: entries.filter(e => e.status === "waiting").length,
    inProgress: entries.filter(e => e.status === "in-progress").length,
    completed: entries.filter(e => e.status === "completed").length,
    cancelled: entries.filter(e => e.status === "cancelled").length,
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Queue Tracking</h1>
        <p className="text-muted-foreground">Real-time queue monitoring and management</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.waiting}</p>
              <p className="text-sm text-muted-foreground">Waiting</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.cancelled}</p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Status */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Counter Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {counters.map((counter) => (
            <div
              key={counter.id}
              className={cn(
                "p-4 rounded-xl text-center transition-all",
                counter.status === "active" ? "bg-emerald-500/10 border border-emerald-500/20" :
                counter.status === "idle" ? "bg-amber-500/10 border border-amber-500/20" :
                "bg-secondary/30 border border-border"
              )}
            >
              <p className="font-semibold text-foreground">{counter.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{counter.staff}</p>
              <div className={cn(
                "mt-2 text-xs font-medium",
                counter.status === "active" ? "text-emerald-600 dark:text-emerald-400" :
                counter.status === "idle" ? "text-amber-600 dark:text-amber-400" :
                "text-muted-foreground"
              )}>
                {counter.status === "active" && counter.serving && `Serving ${counter.serving}`}
                {counter.status === "idle" && "Available"}
                {counter.status === "offline" && "Offline"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Queue List */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground">Queue Entries</h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or ticket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            >
              <option value="all">All Status</option>
              <option value="waiting">Waiting</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className={cn(
                "p-2 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors",
                isRefreshing && "animate-spin"
              )}
            >
              <RefreshCw className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ticket</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Position</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Est. Wait</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono font-medium text-foreground">{entry.ticketNumber}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-medium text-primary-foreground">
                        {entry.avatar}
                      </div>
                      <span className="text-foreground">{entry.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{entry.service}</td>
                  <td className="py-4 px-4">{getStatusBadge(entry.status)}</td>
                  <td className="py-4 px-4">
                    {entry.position > 0 ? (
                      <span className="font-medium text-foreground">#{entry.position}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "font-medium",
                      entry.status === "waiting" ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
                    )}>
                      {entry.estimatedWait}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{entry.joinedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No entries found</p>
          </div>
        )}
      </div>
    </>
  )
}
