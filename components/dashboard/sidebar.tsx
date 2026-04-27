"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Brain, 
  Bell, 
  Building2, 
  Network,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/" },
  { id: "booking", label: "Booking System", icon: <Calendar className="w-5 h-5" />, href: "/booking" },
  { id: "tracking", label: "Queue Tracking", icon: <Users className="w-5 h-5" />, href: "/tracking", badge: 12 },
  { id: "prediction", label: "AI Prediction", icon: <Brain className="w-5 h-5" />, href: "/prediction" },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" />, href: "/notifications", badge: 3 },
  { id: "business", label: "Business Panel", icon: <Building2 className="w-5 h-5" />, href: "/business" },
  { id: "architecture", label: "Architecture", icon: <Network className="w-5 h-5" />, href: "/architecture" },
]

export function Sidebar({ isMobile, onClear }: { isMobile?: boolean, onClear?: () => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { signOut } = useAuth()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "fixed left-4 top-4 bottom-4 glass z-50 flex flex-col transition-all duration-300 rounded-3xl",
        isMobile ? "w-full left-0 top-0 bottom-0 rounded-none border-none m-0" : isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo.svg" 
            alt="SYNKLOOM" 
            className={cn(
              "transition-all duration-300",
              isMobile ? "h-12" : isCollapsed ? "w-12 h-12" : "h-14 w-auto max-w-[210px]"
            )} 
          />
        </Link>
        {isMobile && (
          <button onClick={onClear} className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Toggle Button - Desktop Only */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-white border border-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md z-10"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
              isActive(item.href)
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <span className={cn(
              "flex-shrink-0 transition-transform",
              isActive(item.href) && "scale-110"
            )}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <>
                <span className="font-semibold text-sm">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold",
                    isActive(item.href) ? "bg-white text-primary" : "bg-primary text-primary-foreground"
                  )}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
            {isCollapsed && item.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold border-2 border-white shadow-sm">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto space-y-1">
        <Link 
          href="/settings"
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all",
            isCollapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span className="font-semibold text-sm">Settings</span>}
        </Link>
        <button 
          onClick={signOut}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-semibold text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
