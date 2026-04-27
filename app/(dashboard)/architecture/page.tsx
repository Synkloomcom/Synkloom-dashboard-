"use client"

import { useState } from "react"
import { 
  Database, 
  Server, 
  Cloud, 
  Cpu, 
  Network, 
  Shield, 
  Zap, 
  Layers,
  GitBranch,
  Globe,
  Lock,
  Activity,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SystemComponent {
  id: string
  name: string
  description: string
  status: "healthy" | "warning" | "error"
  uptime: string
  icon: React.ReactNode
  connections: string[]
}

const systemComponents: SystemComponent[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    description: "Load balancer and request routing",
    status: "healthy",
    uptime: "99.99%",
    icon: <Globe className="w-6 h-6" />,
    connections: ["auth-service", "queue-service", "notification-service"]
  },
  {
    id: "auth-service",
    name: "Auth Service",
    description: "Authentication and authorization",
    status: "healthy",
    uptime: "99.98%",
    icon: <Lock className="w-6 h-6" />,
    connections: ["database", "cache"]
  },
  {
    id: "queue-service",
    name: "Queue Service",
    description: "Queue management and processing",
    status: "healthy",
    uptime: "99.97%",
    icon: <Layers className="w-6 h-6" />,
    connections: ["database", "cache", "ai-engine"]
  },
  {
    id: "ai-engine",
    name: "AI Prediction Engine",
    description: "ML models for wait time prediction",
    status: "healthy",
    uptime: "99.95%",
    icon: <Cpu className="w-6 h-6" />,
    connections: ["database", "queue-service"]
  },
  {
    id: "notification-service",
    name: "Notification Service",
    description: "Push notifications and alerts",
    status: "healthy",
    uptime: "99.96%",
    icon: <Zap className="w-6 h-6" />,
    connections: ["queue-service", "cache"]
  },
  {
    id: "database",
    name: "Primary Database",
    description: "PostgreSQL with read replicas",
    status: "healthy",
    uptime: "99.99%",
    icon: <Database className="w-6 h-6" />,
    connections: []
  },
  {
    id: "cache",
    name: "Redis Cache",
    description: "Distributed caching layer",
    status: "healthy",
    uptime: "99.99%",
    icon: <Server className="w-6 h-6" />,
    connections: []
  },
]

const architectureFeatures = [
  {
    title: "Microservices Architecture",
    description: "Loosely coupled services for independent scaling and deployment",
    icon: <GitBranch className="w-5 h-5" />
  },
  {
    title: "Event-Driven Design",
    description: "Asynchronous communication for high throughput",
    icon: <Activity className="w-5 h-5" />
  },
  {
    title: "Auto-Scaling",
    description: "Kubernetes-based horizontal scaling based on demand",
    icon: <Cloud className="w-5 h-5" />
  },
  {
    title: "Security First",
    description: "End-to-end encryption and role-based access control",
    icon: <Shield className="w-5 h-5" />
  },
]

const deploymentRegions = [
  { name: "US East", status: "primary", latency: "12ms" },
  { name: "US West", status: "active", latency: "45ms" },
  { name: "EU West", status: "active", latency: "85ms" },
  { name: "Asia Pacific", status: "active", latency: "120ms" },
]

export default function ArchitecturePage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const getStatusColor = (status: SystemComponent["status"]) => {
    switch (status) {
      case "healthy":
        return "text-emerald-500"
      case "warning":
        return "text-amber-500"
      case "error":
        return "text-red-500"
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">System Architecture</h1>
        <p className="text-muted-foreground">Scalable queue management platform infrastructure</p>
      </div>

      {/* Architecture Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {architectureFeatures.map((feature, index) => (
          <div key={index} className="glass rounded-xl p-5">
            <div className="p-2 rounded-lg bg-primary/20 w-fit mb-3">
              <span className="text-primary">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* System Components Grid */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">System Components</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Error</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {systemComponents.map((component) => (
            <button
              key={component.id}
              onClick={() => setSelectedComponent(selectedComponent === component.id ? null : component.id)}
              className={cn(
                "p-4 rounded-xl text-left transition-all border",
                selectedComponent === component.id
                  ? "bg-primary/10 border-primary/30"
                  : "bg-secondary/30 border-border hover:bg-secondary/50"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  selectedComponent === component.id ? "bg-primary/20 text-primary" : "bg-secondary/50 text-muted-foreground"
                )}>
                  {component.icon}
                </div>
                <div className={cn("flex items-center gap-1", getStatusColor(component.status))}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-medium">{component.uptime}</span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{component.name}</h3>
              <p className="text-xs text-muted-foreground">{component.description}</p>
              {selectedComponent === component.id && component.connections.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Connects to:</p>
                  <div className="flex flex-wrap gap-1">
                    {component.connections.map((conn) => (
                      <span key={conn} className="px-2 py-0.5 rounded bg-secondary/50 text-xs text-foreground">
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-6">Data Flow Architecture</h2>
        <div className="relative">
          {/* Simplified Architecture Visualization */}
          <div className="flex flex-col gap-8">
            {/* Client Layer */}
            <div className="flex justify-center">
              <div className="glass-dark rounded-xl px-8 py-4 text-center">
                <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-medium text-foreground">Client Applications</p>
                <p className="text-xs text-muted-foreground">Web, Mobile, Kiosk</p>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-accent/50" />
            </div>

            {/* API Gateway Layer */}
            <div className="flex justify-center">
              <div className="glass-dark rounded-xl px-8 py-4 text-center border border-primary/20">
                <Network className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="font-medium text-foreground">API Gateway</p>
                <p className="text-xs text-muted-foreground">Load Balancing, Rate Limiting, Auth</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-accent/50" />
            </div>

            {/* Services Layer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-dark rounded-xl p-4 text-center">
                <Lock className="w-5 h-5 mx-auto mb-2 text-emerald-500" />
                <p className="text-sm font-medium text-foreground">Auth</p>
              </div>
              <div className="glass-dark rounded-xl p-4 text-center">
                <Layers className="w-5 h-5 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium text-foreground">Queue</p>
              </div>
              <div className="glass-dark rounded-xl p-4 text-center">
                <Cpu className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-foreground">AI Engine</p>
              </div>
              <div className="glass-dark rounded-xl p-4 text-center">
                <Zap className="w-5 h-5 mx-auto mb-2 text-amber-500" />
                <p className="text-sm font-medium text-foreground">Notifications</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-accent/50 to-primary/50" />
            </div>

            {/* Data Layer */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="glass-dark rounded-xl p-4 text-center border border-accent/20">
                <Database className="w-5 h-5 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium text-foreground">PostgreSQL</p>
                <p className="text-xs text-muted-foreground">Primary DB</p>
              </div>
              <div className="glass-dark rounded-xl p-4 text-center border border-primary/20">
                <Server className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-foreground">Redis</p>
                <p className="text-xs text-muted-foreground">Cache Layer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Regions */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Global Deployment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deploymentRegions.map((region, index) => (
            <div key={index} className="p-4 rounded-xl bg-secondary/30 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{region.name}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium",
                  region.status === "primary" 
                    ? "bg-primary/20 text-primary" 
                    : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                )}>
                  {region.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Latency: <span className="text-foreground font-medium">{region.latency}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
