"use client"

import { useState } from "react"
import { Users, Gauge, TrendingUp, Clock } from "lucide-react"

export function BusinessControls() {
  const [serviceCapacity, setServiceCapacity] = useState(75)
  const [staffAllocation, setStaffAllocation] = useState(8)

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Business Control Panel</h3>
        <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary dark:text-primary-foreground text-sm font-medium">
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Quick Stats */}
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Efficiency</span>
          </div>
          <p className="text-2xl font-bold text-foreground">94%</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Avg Wait</span>
          </div>
          <p className="text-2xl font-bold text-foreground">12 min</p>
        </div>
      </div>

      {/* Service Capacity Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm text-muted-foreground">Service Capacity</label>
          <span className="text-sm font-medium text-foreground">{serviceCapacity}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={serviceCapacity}
          onChange={(e) => setServiceCapacity(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:bg-accent [&::-webkit-slider-thumb]:transition-colors"
          style={{
            background: `linear-gradient(to right, var(--primary) ${serviceCapacity}%, var(--muted) ${serviceCapacity}%)`,
          }}
        />
      </div>

      {/* Staff Allocation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm text-muted-foreground">Staff Allocation</label>
          <span className="text-sm font-medium text-foreground">{staffAllocation} members</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStaffAllocation(Math.max(1, staffAllocation - 1))}
            className="w-10 h-10 rounded-xl bg-secondary/50 text-foreground hover:bg-primary/30 transition-colors flex items-center justify-center text-xl font-medium"
          >
            −
          </button>
          <div className="flex-1 flex items-center justify-center gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  i < staffAllocation 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary/30 text-muted-foreground"
                }`}
              >
                <Users className="w-3 h-3" />
              </div>
            ))}
          </div>
          <button
            onClick={() => setStaffAllocation(Math.min(10, staffAllocation + 1))}
            className="w-10 h-10 rounded-xl bg-secondary/50 text-foreground hover:bg-primary/30 transition-colors flex items-center justify-center text-xl font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Peak Hour Analytics Mini */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-sm font-medium text-foreground">Next Peak: 2:00 PM - 4:00 PM</p>
            <p className="text-xs text-muted-foreground">Recommended: Add 2 more staff</p>
          </div>
        </div>
      </div>
    </div>
  )
}
