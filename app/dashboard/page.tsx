"use client"

import { useState } from "react"
import { LessonPlanGenerator } from "@/components/lesson-plan-generator"
import { LessonPlanDisplay } from "@/components/lesson-plan-display"
import type { LessonPlan } from "@/src/domain/lessonPlan"

export default function TeacherDashboard() {
  const [generatedLessonPlan, setGeneratedLessonPlan] = useState<LessonPlan | null>(null)

  const handleLessonPlanGenerated = (lessonPlan: LessonPlan) => {
    setGeneratedLessonPlan(lessonPlan)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    if (generatedLessonPlan) {
      const dataStr = JSON.stringify(generatedLessonPlan, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${generatedLessonPlan.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_lesson_plan.json`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Generate AI-powered lesson plans aligned with the Australian Curriculum
          </p>
        </div>

        {!generatedLessonPlan ? (
          <LessonPlanGenerator onLessonPlanGenerated={handleLessonPlanGenerated} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Generated Lesson Plan</h2>
              <button
                onClick={() => setGeneratedLessonPlan(null)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Generate Another Lesson Plan
              </button>
            </div>
            <LessonPlanDisplay 
              lessonPlan={generatedLessonPlan}
              onPrint={handlePrint}
              onExport={handleExport}
            />
          </div>
        )}
      </div>
    </div>
  )
}
