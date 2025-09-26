"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  BookOpen,
  Users,
  Shield,
  Clock,
  Heart,
  MessageCircle,
  Calculator,
  Flag as Flask,
  Globe,
  Sparkles,
  Zap,
  Target,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import { motion } from 'framer-motion'
import RAGSection from "@/components/RAGSection"

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  yearLevels: z.string().min(1, "Please select year levels"),
  planningHeadache: z.string().optional(),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

const stats = [
  { number: "30+", label: "Teachers Testing" },
  { number: "150+", label: "Lessons Generated" },
  { number: "Beta", label: "Currently Live" },
  { number: "Free", label: "During Testing" }
]

export default function TaughtfulLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  // Testimonials removed; no rotation state needed

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  })

  // Removed testimonial rotation effect

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const yearLevels = watch("yearLevels")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA]">
      {/* HERO SECTION */}
      <section className="pt-16 pb-24 px-4 bg-transparent relative overflow-hidden rounded-3xl mx-4 md:mx-6 lg:mx-8">
        {/* Playful Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#FD6585]/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-[#FF9A2E]/15 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-[#888625]/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Scattered dots */}
          <div className="absolute top-32 left-1/3 w-3 h-3 bg-[#FD6585] rounded-full opacity-30"></div>
          <div className="absolute top-60 right-1/3 w-2 h-2 bg-[#FF9A2E] rounded-full opacity-40"></div>
          <div className="absolute bottom-40 right-1/4 w-4 h-4 bg-[#888625] rounded-full opacity-25"></div>
          
          {/* Wavy lines */}
          <svg className="absolute top-1/4 left-0 w-64 h-32 opacity-10" viewBox="0 0 200 100">
            <path d="M0,50 Q50,20 100,50 T200,50" stroke="#FD6585" strokeWidth="3" fill="none" className="animate-pulse"/>
          </svg>
          <svg className="absolute bottom-1/4 right-0 w-64 h-32 opacity-10 rotate-180" viewBox="0 0 200 100">
            <path d="M0,50 Q50,80 100,50 T200,50" stroke="#888625" strokeWidth="3" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-balance leading-tight font-fredoka mb-10">
              <span className="text-foreground">Other AI tools?</span>{" "}
              <span className="text-[#FD6585] relative inline-block">
                Absolute detention.
                <div className="absolute -bottom-3 left-0 right-0 h-6 bg-gradient-to-r from-[#FD6585]/40 via-[#FF9A2E]/40 to-[#FD6585]/40 rounded-full -rotate-1"></div>
                <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-[#FF9A2E] animate-pulse" />
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-16 font-nunito">
              Generate <span className="text-[#888625] font-semibold">curriculum-aligned, trauma-informed</span> lesson plans in minutes.
              <br className="hidden md:block" />
              Built specifically for Australian classrooms.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/signup'}
                className="w-48 h-48 rounded-full border-2 border-[#FD6585] text-[#FD6585] hover:bg-[#FD6585]/10 shadow-md hover:shadow-lg transition-all duration-700 group flex flex-col items-center justify-center text-center font-nunito bg-[#FD6585]/5 px-4"
              >
                <Users className="w-6 h-6 mb-2 group-hover:animate-pulse" />
                <span className="text-lg font-semibold mb-1 text-wrap">Start Free Demo</span>
                <span className="text-sm opacity-80 text-wrap">✨ No signup needed</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-48 h-48 rounded-full border-2 border-[#888625] text-[#888625] hover:bg-[#888625]/10 shadow-md hover:shadow-lg transition-all duration-700 group flex flex-col items-center justify-center text-center font-nunito bg-[#888625]/5 px-4"
              >
                <ArrowRight className="w-6 h-6 mb-2 group-hover:animate-pulse rotate-90" />
                <span className="text-lg font-semibold mb-1 text-wrap">See How It Works</span>
                <span className="text-sm opacity-70 text-wrap">🤔 Just curious?</span>
                </Button>
            </div>

            {/* Remove this entire benefits grid */}

          </div>
        </div>
      </section>


      {/* RAG COMPARISON SECTION */}
      <section id="how-it-works" className="py-12 px-4 bg-transparent relative overflow-hidden border-4 border-[#888625] rounded-3xl mx-4 md:mx-6 lg:mx-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Paper airplane paths */}
          <div className="absolute top-16 left-8 transform rotate-12">
            <div className="w-8 h-8 text-[#FF9A2E]/30 animate-pulse">✈️</div>
            </div>
          <div className="absolute top-32 right-12 transform -rotate-12">
            <div className="w-6 h-6 text-[#FD6585]/40 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '2s'}}>🎯</div>
          </div>
          
          {/* Geometric shapes */}
          <div className="absolute bottom-20 left-16 w-16 h-16 border-4 border-[#888625]/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute top-20 right-1/4 w-12 h-12 bg-gradient-to-r from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-full"></div>
          
          {/* Dashed lines */}
          <svg className="absolute top-1/3 left-1/4 w-32 h-16 opacity-20" viewBox="0 0 100 50">
            <line x1="0" y1="25" x2="100" y2="25" stroke="#888625" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse"/>
          </svg>
            </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Testimonial Cards Removed */}

          {/* SECRET SAUCE: RAG EXPLANATION */}
          <section id="how-it-works" className="py-12 px-4 bg-transparent relative overflow-hidden rounded-3xl mx-4 md:mx-6 lg:mx-8">
            <RAGSection />
          </section>
        </div>
      </section>

      {/* TESTIMONIALS REMOVED */}

      {/* CURRICULUM COVERAGE */}
      <section className="py-24 px-4 bg-transparent rounded-3xl mx-4 md:mx-6 lg:mx-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-fredoka mb-6">
              Every Australian Curriculum Covered
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No matter which state you're in, Taughtful speaks your curriculum language.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { name: "ACARA", desc: "v9 National", tint: "bg-[#FF9A2E]/10" },
              { name: "VCAA", desc: "Victorian F-10", tint: "bg-[#FF9A2E]/15" },
              { name: "NESA", desc: "NSW Syllabus", tint: "bg-[#FF9A2E]/20" },
              { name: "QCAA", desc: "Queensland", tint: "bg-[#FF9A2E]/25" }
            ].map((curriculum, index) => (
              <div key={index} className={`text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${curriculum.tint}`}>
                <div className="w-16 h-16 bg-[#FF9A2E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-black text-lg">{curriculum.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{curriculum.name}</h3>
                <p className="text-sm text-gray-700">{curriculum.desc}</p>
              </div>
            ))}
          </div>

            <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold">Automatic code mapping • State-specific language • 100% compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* SUBJECT COVERAGE */}
      <section className="py-16 px-4 bg-white/70 backdrop-blur-sm rounded-3xl mx-4 md:mx-6 lg:mx-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground font-fredoka mb-4">All F-10 Subjects Covered</h3>
          </div>

                <div className="flex justify-center gap-4 flex-wrap">
            {[
              { icon: BookOpen, name: "English", color: "bg-blue-100 text-blue-800" },
              { icon: Calculator, name: "Mathematics", color: "bg-green-100 text-green-800" },
              { icon: Flask, name: "Science", color: "bg-purple-100 text-purple-800" },
              { icon: Heart, name: "Health & PE", color: "bg-red-100 text-red-800" },
              { icon: Globe, name: "HASS", color: "bg-orange-100 text-orange-800" },
              { icon: Sparkles, name: "The Arts", color: "bg-pink-100 text-pink-800" },
              { icon: Zap, name: "Technologies", color: "bg-indigo-100 text-indigo-800" },
              { icon: MessageCircle, name: "Languages", color: "bg-teal-100 text-teal-800" }
            ].map((subject, index) => (
              <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 ${subject.color}`}>
                <subject.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4 bg-transparent relative overflow-hidden rounded-3xl mx-4 md:mx-6 lg:mx-8">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-[#FD6585]/20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground font-fredoka">
              Ready to Reclaim Your Weekends?
              </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ Australian teachers who've already saved thousands of hours with Taughtful.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register("email")}
                    placeholder="Your email address"
                      type="email"
                    className="h-14 text-lg rounded-2xl border-2 hover:border-[#FD6585]/60 focus:border-[#FD6585]"
                    />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Input
                      {...register("name")}
                    placeholder="Your name"
                    className="h-14 text-lg rounded-2xl border-2 hover:border-[#FD6585]/60 focus:border-[#FD6585]"
                    />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
              </div>
              
                <div>
                  <Select onValueChange={(value) => setValue("yearLevels", value)} value={yearLevels}>
                  <SelectTrigger className="h-14 text-lg rounded-2xl border-2 hover:border-[#FD6585]/60 focus:border-[#FD6585]">
                    <SelectValue placeholder="Which year levels do you teach?" />
                    </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="primary" className="text-lg py-3">Primary (K-6)</SelectItem>
                    <SelectItem value="secondary" className="text-lg py-3">Secondary (7-12)</SelectItem>
                    <SelectItem value="both" className="text-lg py-3">Both Primary & Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                {errors.yearLevels && <p className="text-red-500 text-sm mt-1">{errors.yearLevels.message}</p>}
                </div>

                <Textarea
                  {...register("planningHeadache")}
                placeholder="What's your biggest lesson planning challenge? (optional)"
                className="min-h-[100px] text-lg rounded-2xl border-2 hover:border-[#FD6585]/60 focus:border-[#FD6585] resize-none"
                />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Getting Your Access...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 w-6 h-6" />
                    Get Free Beta Access
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </>
                )}
                  </Button>

                  {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl font-medium">
                      🎉 Welcome to the beta! Check your email for next steps.
                    </div>
                  )}

                  {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl font-medium">
                  Something went wrong. Please try again or email us at hello@taughtful.com.au
                </div>
              )}
              </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free during beta</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDIGENOUS PERSPECTIVES BANNER */}
      <section className="py-12 px-4 bg-transparent rounded-3xl mx-4 md:mx-6 lg:mx-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#888625] rounded-full flex items-center justify-center text-white">🤝</div>
              <h3 className="text-xl md:text-2xl font-bold font-fredoka text-[#888625]">Respectful teaching starts with local voices</h3>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-[#888625]/20">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Taughtful provides curriculum‑aligned scaffolds with trauma‑informed and Indigenous perspectives. Please adapt with guidance from local Aboriginal and Torres Strait Islander communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#333333] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-3">
                <Image
                  src="/images/taughtful-logo.png"
                  alt="Taughtful"
                  width={40}
                  height={40}
                className="rounded-full"
                />
              <span className="text-2xl font-bold font-fredoka">Taughtful</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <p className="text-white/80">
                  <a href="mailto:hello@taughtful.com.au" className="hover:text-[#FD6585] transition-colors">
                  hello@taughtful.com.au
                </a>
              </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Curriculum Support</h4>
                <div className="text-white/80 space-y-1">
                  <div>✓ ACARA v9 aligned</div>
                  <div>✓ All state curricula</div>
                  <div>✓ F-10 subjects covered</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Built With Respect</h4>
                <p className="text-white/80 text-sm">
                  Indigenous perspectives embedded with proper cultural protocols and community guidance.
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 text-white/60 text-sm">
              <p>© 2024 Taughtful. Built for Australian teachers, by Australian educators.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ComparisonRow({ icon, text }: { icon: string; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-xl mt-0.5">{icon}</div>
      <div className="text-gray-700 leading-relaxed">{text}</div>
    </div>
  )
}