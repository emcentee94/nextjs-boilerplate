"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, ArrowRight, Users, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showFriendAccess, setShowFriendAccess] = useState(false)
  const [friendPassword, setFriendPassword] = useState("")
  const [friendError, setFriendError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Always log to backend (which writes to Supabase if configured)
      await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      // Store minimal session locally and go straight to dashboard
      const demoUser = {
        id: `demo-${Date.now()}`,
        name: formData.name || 'Teacher',
        email: formData.email || '',
        demo: true,
        created_at: new Date().toISOString(),
      }
      localStorage.setItem('taughtful_user', JSON.stringify(demoUser))
      window.location.href = '/dashboard'
      
    } catch (error) {
      console.error('Error submitting demo request:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit demo request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFriendAccess = (e: React.FormEvent) => {
    e.preventDefault()
    setFriendError("")
    
    if (friendPassword.toLowerCase() === 'mcentee') {
      // Store friend session locally and go straight to dashboard
      const friendUser = {
        id: `friend-${Date.now()}`,
        name: "Eva's Friend",
        email: '',
        demo: true,
        friend: true,
        created_at: new Date().toISOString(),
      }
      localStorage.setItem('taughtful_user', JSON.stringify(friendUser))
      window.location.href = '/dashboard'
    } else {
      setFriendError("That's not quite right. Try again!")
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-white to-[#FFF2E8] flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your demo access request has been submitted and stored in our system. We'll get back to you soon!
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  <Users className="mr-2 w-4 h-4" />
                  Try Demo Mode Now
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-white to-[#FFF2E8]">
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link href="/" className="inline-flex items-center">
                ← Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get Demo Access
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              Experience Taughtful's trauma-informed, culturally safe learning platform. 
              Request demo access and we'll get you started!
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Try Demo Mode
          </CardTitle>
              <CardDescription className="text-gray-600">
            Enter your name and email to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {!showFriendAccess ? (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="border-gray-300 focus:border-[#FD6585] focus:ring-[#FD6585]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@school.edu.au"
                      className="border-gray-300 focus:border-[#FD6585] focus:ring-[#FD6585]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 w-5 h-5" />
                      Continue to Dashboard
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to be contacted by Taughtful regarding demo access.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <button
                  onClick={() => setShowFriendAccess(true)}
                  className="text-sm text-[#FD6585] hover:text-[#FD6585]/80 font-medium underline"
                >
                  Friend of Eva's? Click here (it's quicker)
                </button>
              </div>
                </>
              ) : (
                <>
                  <form onSubmit={handleFriendAccess} className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Access</h3>
                      <p className="text-sm text-gray-600">What's Eva's surname?</p>
                    </div>
                    
                    {friendError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 text-sm">{friendError}</p>
                      </div>
                    )}
                    
                    <div>
                      <Input
                        type="text"
                        value={friendPassword}
                        onChange={(e) => setFriendPassword(e.target.value)}
                        placeholder="Enter surname"
                        className="border-gray-300 focus:border-[#FD6585] focus:ring-[#FD6585] text-center"
                        autoFocus
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white py-3 font-semibold"
                      >
                        Access Dashboard
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowFriendAccess(false)
                          setFriendPassword("")
                          setFriendError("")
                        }}
                        className="px-4"
                      >
                        Back
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </CardContent>
          </Card>

          {/* Alternative Contact */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Prefer to contact us directly?
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:hello@taughtful.com.au" className="inline-flex items-center">
                <Mail className="mr-2 w-4 h-4" />
                hello@taughtful.com.au
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
