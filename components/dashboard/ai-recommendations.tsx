"use client"

import { Brain, Zap, TrendingUp, Clock, Sparkles } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  icon: React.ReactNode
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Optimize Counter 3",
    description: "Reassign 2 staff members to reduce wait time by 15%",
    impact: "high",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: "2",
    title: "Peak Hour Alert",
    description: "Expected surge at 2PM - prepare additional resources",
    impact: "high",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "3",
    title: "Queue Redistribution",
    description: "Move 5 customers to Counter 2 for better flow",
    impact: "medium",
    icon: <Zap className="w-5 h-5" />,
  },
]

export function AIRecommendations() {
  const getImpactColor = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
      default:
        return "bg-accent/20 text-accent border-accent/30"
    }
  }

  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
          <p className="text-xs text-muted-foreground">Powered by ML Engine</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/20 text-foreground group-hover:bg-primary/30 transition-colors">
                {rec.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-foreground font-medium">{rec.title}</p>
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getImpactColor(rec.impact)}`}>
                    {rec.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Load */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">System Load</span>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">42%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000"
            style={{ width: "42%" }}
          />
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3" />
          <span>AI Engine running optimally</span>
        </div>
      </div>
    </div>
  )
}
