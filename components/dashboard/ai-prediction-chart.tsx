"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const generateData = () => {
  const hours = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"]
  return hours.map((hour, index) => ({
    time: hour,
    actual: Math.floor(Math.random() * 40) + 20 + (index < 4 ? index * 10 : (8 - index) * 10),
    predicted: Math.floor(Math.random() * 30) + 25 + (index < 4 ? index * 12 : (8 - index) * 12),
  }))
}

export function AIPredictionChart() {
  const [data, setData] = useState(generateData())
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      setData(generateData())
    }, 8000)

    return () => clearInterval(interval)
  }, [isLive])

  const textColor = "#210635"
  const gridColor = "rgba(33, 6, 53, 0.1)"
  const tooltipBg = "rgba(255, 255, 255, 0.95)"

  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Queue Forecasting</h3>
          <p className="text-sm text-muted-foreground">Real-time demand prediction</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isLive 
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" 
              : "bg-secondary/50 text-muted-foreground border border-border"
          }`}
        >
          {isLive ? "● Live" : "○ Paused"}
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7B337E" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7B337E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6667AB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6667AB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="time" 
              stroke={textColor} 
              opacity={0.5} 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke={textColor} 
              opacity={0.5} 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: "1px solid rgba(123, 51, 126, 0.5)",
                borderRadius: "12px",
                color: textColor,
              }}
              labelStyle={{ color: textColor }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#7B337E"
              strokeWidth={2}
              fill="url(#actualGradient)"
              name="Actual Demand"
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#6667AB"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#predictedGradient)"
              name="AI Prediction"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Actual Demand</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">AI Prediction</span>
        </div>
      </div>
    </div>
  )
}
