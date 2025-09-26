"use client"

import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WellbeingSupportHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F6] via-white to-[#F0F0FF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/resources">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Knowledge Hubs
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="mx-auto mb-6 bg-gradient-to-br from-[#FF6CAB] to-[#7366FF] w-16 h-16 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-fredoka">Wellbeing & Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-nunito">Guidance to keep students regulated and safe, and teachers supported.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Classroom regulation</CardTitle>
              <CardDescription>Routines that reduce load</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Calm entries/exits, visual schedules</li>
                <li>Co‑regulation scripts and micro‑breaks</li>
                <li>Choice and predictable task flow</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Teacher support</CardTitle>
              <CardDescription>Boundaries and care</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Template comms, referral pathways, and self‑care check‑ins that are sustainable during term time.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Try it in Taughtful</CardTitle>
              <CardDescription>Add wellbeing to any plan</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard">Open Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


