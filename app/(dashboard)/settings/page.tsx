"use client"

import { useState, useEffect } from "react"
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Mail,
  Lock,
  Key,
  Eye,
  EyeOff,
  Save,
  Check,
  Sun,
  Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

interface SettingsSection {
  id: string
  label: string
  icon: React.ReactNode
}

const sections: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
  { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
  { id: "integrations", label: "Integrations", icon: <Globe className="w-5 h-5" /> },
]

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [saved, setSaved] = useState(false)

  // Profile form state
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "User",
    timezone: "America/New_York"
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    queueUpdates: true,
    systemAlerts: true,
    marketingEmails: false
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.id))
        if (userDoc.exists()) {
          const data = userDoc.data()
          if (data.profile) setProfile(data.profile)
          if (data.notifications) setNotificationSettings(data.notifications)
        } else {
          // Initialize with default values if no doc exists
          setProfile(prev => ({
            ...prev,
            firstName: user.name.split(" ")[0] || "",
            lastName: user.name.split(" ")[1] || "",
            email: user.email
          }))
        }
      } catch (error) {
        console.error("Error fetching user settings:", error)
        toast.error("Failed to load settings")
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchUserData()
  }, [user])

  const handleSave = async () => {
    if (!user?.id) return
    
    setIsSaving(true)
    try {
      await setDoc(doc(db, "users", user.id), {
        profile,
        notifications: notificationSettings,
        updatedAt: new Date().toISOString()
      }, { merge: true })
      
      setSaved(true)
      toast.success("Settings saved successfully")
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and system settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass rounded-xl p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                  activeSection === section.id
                    ? "bg-primary/20 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {section.icon}
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Profile Information</h2>
              
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  JD
                </div>
                <div>
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">GMT</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                {Object.entries(notificationSettings).map(([key, value]) => {
                  const labels: Record<string, { title: string; description: string }> = {
                    emailAlerts: { title: "Email Alerts", description: "Receive important alerts via email" },
                    pushNotifications: { title: "Push Notifications", description: "Browser and mobile push notifications" },
                    smsAlerts: { title: "SMS Alerts", description: "Text messages for critical updates" },
                    queueUpdates: { title: "Queue Updates", description: "Real-time queue status changes" },
                    systemAlerts: { title: "System Alerts", description: "System maintenance and downtime notices" },
                    marketingEmails: { title: "Marketing Emails", description: "Product updates and newsletters" },
                  }
                  return (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                      <div>
                        <p className="font-medium text-foreground">{labels[key].title}</p>
                        <p className="text-sm text-muted-foreground">{labels[key].description}</p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative",
                          value ? "bg-primary" : "bg-secondary"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                          value ? "translate-x-7" : "translate-x-1"
                        )} />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          )}



          {/* Security Section */}
          {activeSection === "security" && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                {/* Change Password */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="w-full pl-10 pr-12 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="p-4 rounded-xl bg-secondary/30">
                  <h3 className="font-medium text-foreground mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Chrome on Windows</p>
                          <p className="text-xs text-muted-foreground">New York, US - Current session</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Safari on iPhone</p>
                          <p className="text-xs text-muted-foreground">New York, US - 2 hours ago</p>
                        </div>
                      </div>
                      <button className="text-destructive text-sm font-medium hover:underline">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Integrations Section */}
          {activeSection === "integrations" && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Integrations</h2>
              
              <div className="space-y-4">
                {[
                  { name: "Google Calendar", description: "Sync bookings with your calendar", connected: true, icon: "G" },
                  { name: "Slack", description: "Get notifications in Slack channels", connected: true, icon: "S" },
                  { name: "Microsoft Teams", description: "Team notifications and updates", connected: false, icon: "T" },
                  { name: "Twilio", description: "SMS notifications for customers", connected: true, icon: "T" },
                  { name: "Stripe", description: "Payment processing integration", connected: false, icon: "$" },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {integration.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <button className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-colors",
                      integration.connected
                        ? "bg-secondary/50 text-foreground hover:bg-secondary/70"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}>
                      {integration.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
