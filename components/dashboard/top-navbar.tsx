"use client"

import { useState, useEffect } from "react"

import { Bell, User, ChevronDown, Wifi, WifiOff, Menu } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function TopNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [isOnline, setIsOnline] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="glass sticky top-0 z-40 px-4 md:px-6 py-4 m-4 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl bg-white/50 border border-primary/10 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Live Status */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-sm border ${
              isOnline 
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span className="text-sm font-medium hidden sm:inline">{isOnline ? "System Online" : "Offline"}</span>
          </button>

          {/* Notifications */}
          <Link href="/notifications">
            <button className="relative p-2.5 rounded-xl bg-white/50 border border-primary/10 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold border-2 border-white">
                3
              </span>
            </button>
          </Link>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-primary/5 transition-all border border-transparent hover:border-primary/10"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-foreground leading-none mb-1">{user?.name || "User"}</p>
                <p className="text-[10px] text-primary font-semibold uppercase tracking-wider opacity-70">{user?.role || "Member"}</p>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", showProfileMenu && "rotate-180")} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-3 w-56 glass rounded-2xl p-2 animate-slide-in-right shadow-2xl border border-primary/10 z-50">
                <div className="px-4 py-3 border-b border-primary/10 mb-2">
                  <p className="text-sm font-bold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <Link href="/settings">
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full px-4 py-2.5 text-left text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center gap-2"
                  >
                    Profile Settings
                  </button>
                </Link>
                <hr className="my-2 border-primary/10" />
                <button 
                  onClick={() => {
                    setShowProfileMenu(false)
                    signOut()
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-semibold"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
