'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  User,
  Plus,
  Calendar,
  Star,
  Clock,
  BookOpen,
  Eye,
  Edit,
  ArrowRight,
  ArrowLeft,
  Home
} from "lucide-react"

export default function Step1Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FD6585]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#FF9A2E]/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#888625]/10 rounded-full blur-lg animate-float delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-[#FD6585]/5 rounded-full blur-xl animate-float delay-3000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-[#FD6585]">
                  <Home className="w-4 h-4 mr-2" />
                  Taughtful
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 bg-[#FD6585]/10 text-[#FD6585] border-[#FD6585]/20">
                Step 1 of 9
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-foreground font-mono mb-6 hover:scale-105 transition-all duration-500">
            Teacher Dashboard
          </h1>
          <p className="text-2xl text-muted-foreground font-medium mb-8">
            Welcome back! Ready to create your next lesson plan?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#FD6585]/10 text-[#FD6585] border-[#FD6585]/20">
              <User className="w-4 h-4 mr-2" />
              Teacher Portal
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#FF9A2E]/10 text-[#FF9A2E] border-[#FF9A2E]/20">
              <BookOpen className="w-4 h-4 mr-2" />
              Lesson Planning
            </Badge>
          </div>
        </div>

        {/* Teacher Dashboard */}
        <Card className="mb-8 border-2 border-[#FD6585]/20 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-[#FD6585]/5 to-[#FF9A2E]/5">
            <CardTitle className="text-3xl font-bold text-foreground font-mono flex items-center gap-3">
              <User className="w-8 h-8 text-[#FD6585]" />
              Your Teaching Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-white/90 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FD6585] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Sarah Mitchell</h3>
                    <p className="text-sm text-gray-600">Year 8 English Teacher</p>
                  </div>
                </div>
                <Link href="/sample-lesson/step-2">
                  <Button className="bg-[#FD6585] hover:bg-[#FD6585]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Lesson Plan
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">This Week</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">5</p>
                  <p className="text-sm text-blue-700">Lessons Planned</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Favorites</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">12</p>
                  <p className="text-sm text-green-700">Saved Templates</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Time Saved</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">8.5</p>
                  <p className="text-sm text-purple-700">Hours This Month</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 mb-3">Recent Lesson Plans</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-[#FD6585]" />
                      <div>
                        <p className="font-medium">Character Analysis - Indigenous Perspectives</p>
                        <p className="text-sm text-gray-600">Year 8 English • 60 mins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-[#FF9A2E]" />
                      <div>
                        <p className="font-medium">Poetry Analysis - Australian Identity</p>
                        <p className="text-sm text-gray-600">Year 8 English • 45 mins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="outline" className="px-6 py-3 text-lg font-bold border-2 hover:border-[#FD6585] hover:scale-105 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/sample-lesson/step-2">
            <Button className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-8 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              Start Lesson Planning
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

