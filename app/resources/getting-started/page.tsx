"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function GettingStartedHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFF2E8]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/resources">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Knowledge Hubs
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="mx-auto mb-6 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] w-16 h-16 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-fredoka">Getting Started</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-nunito">Quick guides to set up Taughtful and generate your first lessons, aligned to your curriculum.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>1) Create your first lesson</CardTitle>
              <CardDescription>Subject, year level, outcomes, and scaffolds</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Use the dashboard to select a subject and year level, then choose curriculum outcomes. Pick trauma-informed supports and embed Indigenous perspectives as needed.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>2) Curriculum alignment</CardTitle>
              <CardDescription>AC v9 and VCAA VC2.0 (VIC only)</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Toggle your curriculum region in the Curriculum area. Victorian teachers can select Version 2.0; others default to AC v9.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>3) Save and iterate</CardTitle>
              <CardDescription>Adjust duration, supports, and assessment</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Regenerate with different scaffolds, time, and assessment focus. Export or copy into your planning docs.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Explore the Dashboard</CardTitle>
              <CardDescription>Jump in and try it live</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard">
                  <BookOpen className="mr-2 w-4 h-4" /> Open Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


