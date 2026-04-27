"use client"

import { useState, useEffect } from "react"
import { Brain, TrendingUp, TrendingDown, Zap, Clock, Users, Target, Activity, Sparkles } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { cn } from "@/lib/utils"

const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    predicted: Math.floor(Math.random() * 60) + 20 + (i >= 9 && i <= 17 ? 40 : 0),
    actual: Math.floor(Math.random() * 55) + 25 + (i >= 9 && i <= 17 ? 35 : 0),
    confidence: Math.floor(Math.random() * 20) + 80,
  }))
}

const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return days.map(day => ({
    day,
    customers: Math.floor(Math.random() * 300) + 200,
    waitTime: Math.floor(Math.random() * 20) + 10,
  }))
}

const serviceDistribution = [
  { name: "General Inquiry", value: 35, color: "#7B337E" },
  { name: "Account Services", value: 28, color: "#6667AB" },
  { name: "Technical Support", value: 22, color: "#420D4B" },
  { name: "Consultation", value: 15, color: "#F5D5E0" },
]

const insights = [
  { id: 1, title: "Peak Hour Prediction", description: "Expected 45% increase in traffic between 2-4 PM", impact: "high", icon: <TrendingUp className="w-5 h-5" /> },
  { id: 2, title: "Staff Recommendation", description: "Add 2 more staff members to reduce wait time by 18%", impact: "high", icon: <Users className="w-5 h-5" /> },
  { id: 3, title: "Service Optimization", description: "Technical support queue showing 95% efficiency", impact: "medium", icon: <Zap className="w-5 h-5" /> },
  { id: 4, title: "Wait Time Forecast", description: "Average wait expected to decrease by 5 min tomorrow", impact: "low", icon: <Clock className="w-5 h-5" /> },
]

export default function AIPredictionPage() {
  const [hourlyData, setHourlyData] = useState(generateHourlyData())
  const [weeklyData, setWeeklyData] = useState(generateWeeklyData())
  const [accuracy, setAccuracy] = useState(94.2)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setHourlyData(generateHourlyData())
      setAccuracy(prev => Math.min(99, Math.max(85, prev + (Math.random() - 0.5) * 2)))
    }, 5000)
    return () => clearInterval(interval)
  }, [isLive])

  const textColor = "#210635"
  const gridColor = "rgba(33, 6, 53, 0.1)"

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30"
      case "medium": return "bg-amber-500/20 text-amber-600 border-amber-500/30"
      default: return "bg-accent/20 text-accent border-accent/30"
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Prediction Engine</h1>
            <p className="text-muted-foreground">Machine learning powered queue forecasting and optimization</p>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2",
              isLive
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                : "bg-secondary/50 text-muted-foreground border border-border"
            )}
          >
            <span className={cn("w-2 h-2 rounded-full", isLive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground")} />
            {isLive ? "Live Updates" : "Paused"}
          </button>
        </div>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{accuracy.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">98.5%</p>
              <p className="text-sm text-muted-foreground">Peak Detection</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2.3M</p>
              <p className="text-sm text-muted-foreground">Data Points</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">v3.2</p>
              <p className="text-sm text-muted-foreground">Model Version</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 24-Hour Forecast */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">24-Hour Queue Forecast</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B337E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7B337E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6667AB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6667AB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="hour" stroke={textColor} opacity={0.5} fontSize={10} tickLine={false} interval={3} />
                <YAxis stroke={textColor} opacity={0.5} fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(123, 51, 126, 0.5)", borderRadius: "12px", color: textColor }}
                />
                <Area type="monotone" dataKey="predicted" stroke="#7B337E" strokeWidth={2} fill="url(#predictedGrad)" name="Predicted" />
                <Area type="monotone" dataKey="actual" stroke="#6667AB" strokeWidth={2} fill="url(#actualGrad)" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Actual</span>
            </div>
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Customer Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="day" stroke={textColor} opacity={0.5} fontSize={12} tickLine={false} />
                <YAxis stroke={textColor} opacity={0.5} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(123, 51, 126, 0.5)", borderRadius: "12px", color: textColor }}
                />
                <Bar dataKey="customers" fill="#7B337E" radius={[4, 4, 0, 0]} name="Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Service Distribution Forecast</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(123, 51, 126, 0.5)", borderRadius: "12px", color: textColor }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {serviceDistribution.map((service) => (
              <div key={service.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                <span className="text-sm text-muted-foreground">{service.name} ({service.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Confidence */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Prediction Confidence Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData.slice(0, 12)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="hour" stroke={textColor} opacity={0.5} fontSize={10} tickLine={false} />
                <YAxis stroke={textColor} opacity={0.5} fontSize={10} tickLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(123, 51, 126, 0.5)", borderRadius: "12px", color: textColor }}
                />
                <Line type="monotone" dataKey="confidence" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }} name="Confidence %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI-Generated Insights</h2>
            <p className="text-sm text-muted-foreground">Actionable recommendations from our ML model</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/20 text-foreground group-hover:bg-primary/30 transition-colors">
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{insight.title}</p>
                    <span className={cn("px-2 py-0.5 text-[10px] font-medium rounded-full border", getImpactColor(insight.impact))}>
                      {insight.impact.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
