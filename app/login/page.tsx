"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  BookOpen,
  Heart,
  Target,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { auth, supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if Supabase is configured
      if (!supabase) {
        // Fallback to localStorage for demo
        if (email && password) {
          localStorage.setItem("taughtful_user", JSON.stringify({ email, name: email.split("@")[0] }))
          window.location.href = "/dashboard"
        } else {
          setError("Please enter both email and password")
        }
        return
      }

      const { data, error } = await auth.signIn(email, password)
      
      if (error) {
        setError(error.message)
      } else if (data.user) {
        // Successful login - redirect to dashboard
        window.location.href = "/dashboard"
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#888625]/10 to-[#FD6585]/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-[#FF9A2E]/10 to-[#888625]/10 rounded-full blur-2xl animate-float delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-full blur-xl animate-float delay-500"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/'}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 relative transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]">
                <Image
                  src="/images/taughtful-logo.png"
                  alt="Taughtful"
                  width={40}
                  height={40}
                  className="rounded-full shadow-lg group-hover:shadow-xl"
                />
              </div>
              <span className="text-xl font-bold text-foreground font-mono transition-all duration-500 group-hover:text-[#FD6585] group-hover:scale-110">
                Taughtful
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <Card className="border-2 border-[#FD6585]/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-black font-mono">Teacher Login</CardTitle>
              <p className="text-muted-foreground mt-2">
                Access your dashboard and lesson plans
              </p>
            </CardHeader>
            <CardContent>
              {/* MVP Notice */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800 text-center">
                  <strong>MVP Notice:</strong> {supabase ? 'Supabase connected! Real authentication enabled.' : 'Demo mode: Any email/password combination will work for testing.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="teacher@school.edu.au"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white font-bold text-lg"
                >
                  {isLoading ? "Signing In..." : "Sign In to Dashboard"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button className="text-[#FD6585] hover:underline font-medium">
                    Join the Beta
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-6 font-mono">What's in your dashboard?</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-[#FD6585]/20">
                <div className="w-10 h-10 bg-[#FD6585]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#FD6585]" />
                </div>
                <div>
                  <h4 className="font-semibold">Lesson Plan Management</h4>
                  <p className="text-sm text-muted-foreground">Create, edit, and organize your lessons</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-[#FF9A2E]/20">
                <div className="w-10 h-10 bg-[#FF9A2E]/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#FF9A2E]" />
                </div>
                <div>
                  <h4 className="font-semibold">Curriculum Alignment</h4>
                  <p className="text-sm text-muted-foreground">ACARA v9, Victorian, NSW, WA curricula</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-[#888625]/20">
                <div className="w-10 h-10 bg-[#888625]/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#888625]" />
                </div>
                <div>
                  <h4 className="font-semibold">Trauma-Informed Design</h4>
                  <p className="text-sm text-muted-foreground">Built-in wellbeing and cultural safety</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
