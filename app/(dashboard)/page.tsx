"use client"

import { useState } from "react"
import { Users, Clock, CheckCircle, Activity, X, Calendar, FileText, Settings, LayoutGrid } from "lucide-react"
import { KPICard } from "@/components/dashboard/kpi-card"
import { QueueTracker } from "@/components/dashboard/queue-tracker"
import { AIPredictionChart } from "@/components/dashboard/ai-prediction-chart"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import { AIRecommendations } from "@/components/dashboard/ai-recommendations"
import { BusinessControls } from "@/components/dashboard/business-controls"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function DashboardPage() {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (activeAction === "report") {
      toast.success("Report Generated Successfully", {
        description: "Your comprehensive queue analytics report is ready for download.",
      })
    } else if (activeAction === "booking") {
      toast.success("Slot Booked Successfully", {
        description: "Your reservation has been added to the system.",
      })
    } else if (activeAction === "settings") {
      toast.success("Settings Updated", {
        description: "AI configurations have been applied successfully.",
      })
    }

    setIsProcessing(false)
    setActiveAction(null)
  }

  const renderActionModal = () => {
    if (!activeAction) return null

    const closeModal = () => {
      if (!isProcessing) setActiveAction(null)
    }

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="glass w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                {activeAction === "booking" && <Calendar className="w-6 h-6 text-primary-foreground" />}
                {activeAction === "queues" && <LayoutGrid className="w-6 h-6 text-primary-foreground" />}
                {activeAction === "report" && <FileText className="w-6 h-6 text-primary-foreground" />}
                {activeAction === "settings" && <Settings className="w-6 h-6 text-primary-foreground" />}
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {activeAction === "booking" && "Book New Slot"}
                {activeAction === "queues" && "View All Queues"}
                {activeAction === "report" && "Generate Report"}
                {activeAction === "settings" && "AI Settings"}
              </h2>
            </div>
            <button 
              onClick={closeModal} 
              disabled={isProcessing}
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleAction}>
            {activeAction === "booking" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Service Type</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Account Management</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Preferred Time</label>
                  <input type="time" className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </>
            )}

            {activeAction === "report" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Report Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-primary text-sm font-medium">Daily Analytics</button>
                    <button type="button" className="p-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary/30">Weekly Summary</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Format</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>PDF Document</option>
                    <option>Excel Spreadsheet</option>
                    <option>CSV Data</option>
                  </select>
                </div>
              </>
            )}

            {activeAction === "queues" && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-secondary/20 border border-primary/5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">Queue #{i * 1024}</p>
                      <p className="text-xs text-muted-foreground">Main Entrance Service Point</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">ACTIVE</span>
                  </div>
                ))}
              </div>
            )}

            {activeAction === "settings" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                  <span className="text-sm font-medium">Smart Load Balancing</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                  <span className="text-sm font-medium">Real-time Predictions</span>
                  <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all mt-4 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {activeAction === "booking" && "Confirm Booking"}
                  {activeAction === "queues" && "Close View"}
                  {activeAction === "report" && "Download Report"}
                  {activeAction === "settings" && "Save Configuration"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderActionModal()}
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Command Center</h1>
        <p className="text-muted-foreground">AI-Powered Queue Intelligence System</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Active Users in Queue"
          value={247}
          icon={<Users className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Average Wait Time"
          value={18}
          suffix=" min"
          icon={<Clock className="w-6 h-6" />}
          trend={{ value: 8, isPositive: false }}
        />
        <KPICard
          title="Completed Today"
          value={1284}
          icon={<CheckCircle className="w-6 h-6" />}
          trend={{ value: 23, isPositive: true }}
        />
        <KPICard
          title="System Load"
          value={67}
          suffix="%"
          icon={<Activity className="w-6 h-6" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AIPredictionChart />
        </div>
        <div className="lg:col-span-1">
          <AIRecommendations />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <QueueTracker />
        </div>
        <div className="lg:col-span-1">
          <NotificationsPanel />
        </div>
      </div>

      {/* Third Row - Business Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BusinessControls />
        
        {/* Quick Actions Panel */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveAction("booking")}
              className="p-4 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Book New Slot
            </button>
            <button 
              onClick={() => setActiveAction("queues")}
              className="p-4 rounded-xl bg-secondary/50 border border-border text-foreground font-medium hover:bg-secondary/70 transition-colors"
            >
              View All Queues
            </button>
            <button 
              onClick={() => setActiveAction("report")}
              className="p-4 rounded-xl bg-secondary/50 border border-border text-foreground font-medium hover:bg-secondary/70 transition-colors"
            >
              Generate Report
            </button>
            <button 
              onClick={() => setActiveAction("settings")}
              className="p-4 rounded-xl bg-secondary/50 border border-border text-foreground font-medium hover:bg-secondary/70 transition-colors"
            >
              AI Settings
            </button>
          </div>

          {/* System Status */}
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">All Systems Operational</p>
                <p className="text-xs text-muted-foreground">Last updated: Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
