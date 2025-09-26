"use client"

import Link from "next/link"
import { ArrowLeft, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AssessmentPlanningHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1FF] via-white to-[#ECE7FF]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/resources">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Knowledge Hubs
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="mx-auto mb-6 bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] w-16 h-16 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-fredoka">Assessment & Planning</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-nunito">Scope‑and‑sequence mapping, outcome selection, and clear success criteria linked to standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>From content to standards</CardTitle>
              <CardDescription>Alignment you can show families</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Select content descriptions and view the linked achievement standards. Build success criteria straight from the language of the standard.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Formative first</CardTitle>
              <CardDescription>Checks for understanding</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Use quick checks, exit tickets, and conferencing to adjust instruction in the moment.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Open in Taughtful</CardTitle>
              <CardDescription>Plan with live alignment</CardDescription>
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


