"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const passwordRequirements = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Passwords match", met: password === confirmPassword && password.length > 0 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)

    const result = await signUp(name, email, password)

    if (result.success) {
      // Redirect to sign-in page after successful registration
      router.push("/sign-in?registered=true")
    } else {
      setError(result.error || "Sign up failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5D5E0] via-[#FDFAFC] to-[#E8D5F0]" />

      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-[#7B337E]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-[#6667AB]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#420D4B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Main card */}
      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-2xl shadow-[#7B337E]/10 p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img src="/logo.svg" alt="SYNKLOOM" className="h-40 w-30" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#210635] mb-2">Create an account</h2>
            <p className="text-[#420D4B]/70">Start managing queues intelligently</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-200/50 backdrop-blur-sm">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-[#210635]">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B337E]/50">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 border border-[#7B337E]/20 text-[#210635] placeholder:text-[#420D4B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B337E]/30 focus:border-[#7B337E]/40 transition-all"
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#210635]">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B337E]/50">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 border border-[#7B337E]/20 text-[#210635] placeholder:text-[#420D4B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B337E]/30 focus:border-[#7B337E]/40 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#210635]">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B337E]/50">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/50 border border-[#7B337E]/20 text-[#210635] placeholder:text-[#420D4B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B337E]/30 focus:border-[#7B337E]/40 transition-all"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7B337E]/50 hover:text-[#7B337E] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-[#210635]">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7B337E]/50">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 border border-[#7B337E]/20 text-[#210635] placeholder:text-[#420D4B]/40 focus:outline-none focus:ring-2 focus:ring-[#7B337E]/30 focus:border-[#7B337E]/40 transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Password requirements */}
            {password.length > 0 && (
              <div className="p-3 rounded-xl bg-[#6667AB]/10 border border-[#6667AB]/20">
                <div className="space-y-1.5">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? "bg-green-500" : "bg-[#7B337E]/20"}`}>
                        {req.met && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-xs ${req.met ? "text-green-600" : "text-[#420D4B]/60"}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-all ${acceptTerms
                  ? "bg-[#7B337E] border-[#7B337E]"
                  : "border-[#7B337E]/30 hover:border-[#7B337E]/50"
                  }`}
              >
                {acceptTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <p className="text-sm text-[#420D4B]/70">
                I agree to the{" "}
                <Link href="/terms" className="text-[#7B337E] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#7B337E] hover:underline">Privacy Policy</Link>
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7B337E] to-[#6667AB] text-white font-semibold shadow-lg shadow-[#7B337E]/30 hover:shadow-xl hover:shadow-[#7B337E]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Google Sign In */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#7B337E]/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/70 text-[#420D4B]/40">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                setError("")
                const result = await signInWithGoogle()
                if (result.success) router.push("/")
                else setError(result.error || "Google sign in failed")
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-white/50 border border-[#7B337E]/20 text-[#210635] font-semibold hover:bg-[#7B337E]/5 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  style={{ fill: "#4285F4" }}
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  style={{ fill: "#34A853" }}
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  style={{ fill: "#FBBC05" }}
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  style={{ fill: "#EA4335" }}
                />
              </svg>
              <span>Google</span>
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-[#420D4B]/70 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#7B337E] font-semibold hover:text-[#6667AB] transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#420D4B]/50 mt-6">
          2024 SYNKLOOM. AI-Powered Queue Management.
        </p>
      </div>
    </div>
  )
}
