"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Building2, Users, Clock, TrendingUp, DollarSign, Star, Calendar, Download, Filter, ChevronUp, ChevronDown, Gauge, Activity, X, UserPlus, PackagePlus, FileText } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 50000 },
  { month: "Mar", revenue: 48000, target: 55000 },
  { month: "Apr", revenue: 61000, target: 55000 },
  { month: "May", revenue: 55000, target: 60000 },
  { month: "Jun", revenue: 67000, target: 60000 },
]

const staffMembers = [
  { id: "1", name: "John Smith", role: "Senior Agent", counter: "Counter 1", status: "active", served: 45, rating: 4.8 },
  { id: "2", name: "Jane Doe", role: "Agent", counter: "Counter 2", status: "active", served: 38, rating: 4.6 },
  { id: "3", name: "Mike Johnson", role: "Senior Agent", counter: "Counter 3", status: "active", served: 52, rating: 4.9 },
  { id: "4", name: "Sarah Williams", role: "Agent", counter: "Counter 4", status: "break", served: 30, rating: 4.5 },
  { id: "5", name: "Robert Brown", role: "Trainee", counter: "Counter 5", status: "offline", served: 15, rating: 4.2 },
]

const services = [
  { id: "1", name: "General Inquiry", active: true, avgTime: "12 min", price: "$25", popularity: 85 },
  { id: "2", name: "Account Services", active: true, avgTime: "18 min", price: "$35", popularity: 72 },
  { id: "3", name: "Technical Support", active: true, avgTime: "25 min", price: "$45", popularity: 58 },
  { id: "4", name: "Consultation", active: true, avgTime: "40 min", price: "$75", popularity: 35 },
  { id: "5", name: "VIP Services", active: false, avgTime: "30 min", price: "$100", popularity: 15 },
]

export default function BusinessPanelPage() {
  const [serviceCapacity, setServiceCapacity] = useState(75)
  const [activeTab, setActiveTab] = useState<"overview" | "staff" | "services" | "reports">("overview")
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (activeAction === "add-staff") {
      toast.success("Staff Member Added", { description: "The new staff member has been assigned to their counter." })
    } else if (activeAction === "add-service") {
      toast.success("Service Created", { description: "New service is now active and available for booking." })
    } else if (activeAction === "export") {
      toast.success("Report Exported", { description: "The business analytics report has been downloaded to your device." })
    } else if (activeAction === "filter") {
      toast.info("Filters Applied", { description: "The dashboard view has been updated based on your criteria." })
    }

    setIsProcessing(false)
    setActiveAction(null)
  }

  const renderActionModal = () => {
    if (!activeAction) return null
    const closeModal = () => !isProcessing && setActiveAction(null)

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="glass w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                {activeAction === "add-staff" && <UserPlus className="w-6 h-6 text-primary-foreground" />}
                {activeAction === "add-service" && <PackagePlus className="w-6 h-6 text-primary-foreground" />}
                {activeAction === "export" && <Download className="w-6 h-6 text-primary-foreground" />}
                {activeAction === "filter" && <Filter className="w-6 h-6 text-primary-foreground" />}
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {activeAction === "add-staff" && "Add New Staff"}
                {activeAction === "add-service" && "Add New Service"}
                {activeAction === "export" && "Export Report"}
                {activeAction === "filter" && "Filter Results"}
              </h2>
            </div>
            <button onClick={closeModal} className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleAction}>
            {activeAction === "add-staff" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input type="text" placeholder="e.g. Your Name" className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Senior Agent</option>
                      <option>Agent</option>
                      <option>Trainee</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Assigned Counter</label>
                  <input type="text" placeholder="e.g. Counter 6" className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </>
            )}

            {activeAction === "add-service" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Service Name</label>
                  <input type="text" placeholder="e.g. Premium Support" className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Avg. Time (min)</label>
                    <input type="number" placeholder="20" className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Base Price</label>
                    <input type="text" placeholder="$45" className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
              </>
            )}

            {activeAction === "export" && (
              <div className="p-6 rounded-2xl bg-secondary/20 border border-primary/10 space-y-4">
                <p className="text-sm text-muted-foreground text-center">Your report is ready to be exported based on the current period selection.</p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-primary/5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">business_analytics_apr_2026.pdf</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3.2 MB</span>
                </div>
              </div>
            )}

            {activeAction === "filter" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Date Range</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Operations", "Finance", "Sales"].map(dept => (
                      <button key={dept} type="button" className="px-3 py-1.5 rounded-lg border border-primary/20 text-xs font-medium hover:bg-primary/10 transition-colors">
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {activeAction === "export" ? "Download Original File" : "Save Changes"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const textColor = "#210635"
  const gridColor = "rgba(33, 6, 53, 0.1)"

  const stats = [
    { label: "Total Revenue", value: "$328,000", change: "+12.5%", positive: true, icon: <DollarSign className="w-5 h-5" /> },
    { label: "Customers Served", value: "12,847", change: "+8.3%", positive: true, icon: <Users className="w-5 h-5" /> },
    { label: "Avg Wait Time", value: "14 min", change: "-18%", positive: true, icon: <Clock className="w-5 h-5" /> },
    { label: "Customer Rating", value: "4.7/5", change: "+0.2", positive: true, icon: <Star className="w-5 h-5" /> },
  ]

  return (
    <>
      {renderActionModal()}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Business Panel</h1>
            <p className="text-muted-foreground">Manage your business operations and analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveAction("filter")}
              className="px-4 py-2 rounded-xl bg-secondary/50 text-foreground hover:bg-secondary/70 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button 
              onClick={() => setActiveAction("export")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass rounded-2xl p-2 mb-8 inline-flex gap-2">
        {(["overview", "staff", "services", "reports"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-xl font-medium capitalize transition-all",
              activeTab === tab
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-4 hover:glow-primary transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium mt-2",
                      stat.positive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
                    )}>
                      {stat.positive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/20">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Revenue vs Target</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="month" stroke={textColor} opacity={0.5} fontSize={12} tickLine={false} />
                    <YAxis stroke={textColor} opacity={0.5} fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(123, 51, 126, 0.5)", borderRadius: "12px", color: textColor }}
                    />
                    <Bar dataKey="revenue" fill="#7B337E" radius={[4, 4, 0, 0]} name="Revenue" />
                    <Bar dataKey="target" fill="#6667AB" radius={[4, 4, 0, 0]} name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Daily Customers</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: "Mon", customers: 180 },
                    { day: "Tue", customers: 220 },
                    { day: "Wed", customers: 195 },
                    { day: "Thu", customers: 250 },
                    { day: "Fri", customers: 280 },
                    { day: "Sat", customers: 150 },
                    { day: "Sun", customers: 120 },
                  ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="day" stroke={textColor} opacity={0.5} fontSize={12} tickLine={false} />
                    <YAxis stroke={textColor} opacity={0.5} fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(255,255,255,0.95)", border: "1px solid rgba(123, 51, 126, 0.5)", borderRadius: "12px", color: textColor }}
                    />
                    <Line type="monotone" dataKey="customers" stroke="#7B337E" strokeWidth={3} dot={{ fill: "#7B337E", strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Quick Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
                  className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  style={{ background: `linear-gradient(to right, var(--primary) ${serviceCapacity}%, var(--muted) ${serviceCapacity}%)` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Efficiency</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Load</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">67%</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Staff Tab */}
      {activeTab === "staff" && (
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Staff Management</h2>
            <button 
              onClick={() => setActiveAction("add-staff")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              + Add Staff
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Counter</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Served Today</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff) => (
                  <tr key={staff.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-medium text-primary-foreground">
                          {staff.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-medium text-foreground">{staff.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{staff.role}</td>
                    <td className="py-4 px-4 text-foreground">{staff.counter}</td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        staff.status === "active" ? "bg-emerald-500/20 text-emerald-600" :
                        staff.status === "break" ? "bg-amber-500/20 text-amber-600" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-foreground font-medium">{staff.served}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-foreground">{staff.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Service Configuration</h2>
            <button 
              onClick={() => setActiveAction("add-service")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              + Add Service
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className={cn(
                "p-4 rounded-xl border-2 transition-all",
                service.active ? "bg-secondary/30 border-primary/30" : "bg-secondary/10 border-border opacity-60"
              )}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                  <button className={cn(
                    "w-10 h-5 rounded-full transition-colors relative",
                    service.active ? "bg-primary" : "bg-muted"
                  )}>
                    <span className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                      service.active ? "left-5" : "left-0.5"
                    )} />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Time</span>
                    <span className="text-foreground">{service.avgTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-foreground font-medium">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Popularity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${service.popularity}%` }} />
                      </div>
                      <span className="text-foreground text-xs">{service.popularity}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Generated Reports</h2>
          <div className="space-y-4">
            {[
              { name: "Monthly Revenue Report", date: "Apr 2026", type: "Financial", size: "2.4 MB" },
              { name: "Customer Satisfaction Survey", date: "Apr 2026", type: "Customer", size: "1.8 MB" },
              { name: "Staff Performance Analysis", date: "Mar 2026", type: "Operations", size: "3.2 MB" },
              { name: "Queue Efficiency Report", date: "Mar 2026", type: "Operations", size: "1.5 MB" },
              { name: "Annual Business Summary", date: "2025", type: "Financial", size: "5.7 MB" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <Calendar className="w-5 h-5 text-primary dark:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.date} - {report.type} - {report.size}</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary/70 transition-colors flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
