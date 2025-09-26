"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  Star,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import Header from "@/components/header"

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  yearLevels: z.string().min(1, "Please select year levels"),
  planningHeadache: z.string().optional(),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Save 3+ Hours Weekly",
    description: "Stop spending weekends on lesson plans"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Curriculum Aligned",
    description: "ACARA v9, VCAA, NESA, QCAA, SCSA compliant"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Trauma-Informed Design",
    description: "Built with student wellbeing at the core"
  }
]

const testimonials = [
  {
    quote: "Finally, someone who gets what we actually need in classrooms.",
    author: "Sarah M.",
    role: "Year 8 English Teacher",
    rating: 5
  },
  {
    quote: "The Indigenous perspectives integration is respectful and authentic.",
    author: "David L.",
    role: "Primary School Principal",
    rating: 5
  },
  {
    quote: "Saves me hours every week. The trauma-informed approach is game-changing.",
    author: "Emma K.",
    role: "Year 5 Teacher",
    rating: 5
  }
]

const stats = [
  { number: "500+", label: "Teachers Using" },
  { number: "2,000+", label: "Lessons Generated" },
  { number: "4.9/5", label: "Teacher Rating" },
  { number: "85%", label: "Time Saved" }
]

export default function TaughtfulLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* HERO SECTION */}
      <section className="pt-16 pb-24 px-4 bg-gradient-to-br from-white via-[#FDE5DA]/20 to-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FD6585]/10 text-[#FD6585] px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-[#FD6585]/20">
              <Sparkles className="w-4 h-4" />
              Trusted by 500+ Australian Teachers
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-balance leading-tight font-fredoka mb-8">
              <span className="text-foreground">Stop the</span>{" "}
              <span className="text-[#FD6585] relative inline-block">
                panic planning
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-[#FD6585]/40 via-[#FF9A2E]/40 to-[#FD6585]/40 rounded-full -rotate-1"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-4xl mx-auto mb-12">
              Generate curriculum-aligned, trauma-informed lesson plans in minutes. 
              Built specifically for Australian classrooms with Indigenous perspectives embedded.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group rounded-2xl"
              >
                <Users className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                Start Free Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-6 text-lg font-semibold border-2 hover:bg-[#FD6585]/5 hover:border-[#FD6585] transition-all duration-300"
              >
                See How It Works
              </Button>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center text-white mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-fredoka mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#888625] to-[#4CAF50] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-black font-fredoka mb-2">{stat.number}</div>
                <div className="text-sm md:text-base font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-br from-[#FDE5DA] via-white to-[#FDE5DA]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-fredoka mb-6">
              How Taughtful Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our RAG (Retrieval-Augmented Generation) technology ensures every lesson is accurate, aligned, and culturally safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-black text-white font-fredoka">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-fredoka">Choose Your Details</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your curriculum, year level, and subject. Tell us about your class profile and learning needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF9A2E] to-[#888625] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-black text-white font-fredoka">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-fredoka">AI Retrieves & Augments</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI finds the right curriculum resources and adds trauma-informed scaffolding and Indigenous perspectives.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#888625] to-[#FD6585] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-black text-white font-fredoka">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-fredoka">Get Your Lesson Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a complete, classroom-ready lesson plan that you can trust and use immediately.
              </p>
            </div>
          </div>

          {/* Key Differentiator */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#FD6585]/20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-fredoka">Why RAG Technology Matters</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Unlike generic AI that guesses from the internet, our RAG system retrieves trusted curriculum resources first, 
                then generates lessons with trauma-informed practices and authentic Indigenous perspectives built in.
              </p>
              <div className="inline-block bg-gradient-to-r from-[#888625] to-[#4CAF50] text-white px-6 py-3 rounded-full text-sm font-bold">
                🛡️ Safe • Accurate • Respectful • Classroom-Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground font-fredoka mb-6">
              Loved by Australian Teachers
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#FDE5DA] to-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-medium italic mb-8 text-gray-800">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[currentTestimonial].author.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">{testimonials[currentTestimonial].author}</div>
                  <div className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-[#FD6585]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM COVERAGE */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA]">
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
              { name: "ACARA", desc: "v9 National", color: "from-[#FD6585] to-[#FF9A2E]" },
              { name: "VCAA", desc: "Victorian F-10", color: "from-[#888625] to-[#FD6585]" },
              { name: "NESA", desc: "NSW Syllabus", color: "from-[#FD6585] to-[#888625]" },
              { name: "QCAA", desc: "Queensland", color: "from-[#FF9A2E] to-[#888625]" }
            ].map((curriculum, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${curriculum.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-black text-lg">{curriculum.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{curriculum.name}</h3>
                <p className="text-sm text-gray-600">{curriculum.desc}</p>
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
      <section className="py-16 px-4 bg-white">
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
      <section className="py-32 px-4 bg-gradient-to-br from-[#FDE5DA] via-white to-[#FDE5DA] relative overflow-hidden">
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