"use client"

import LearningAreaList from "@/src/components/curriculum/LearningAreaList"

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Australian Curriculum Learning Areas</h1>
          <p className="text-muted-foreground mt-2">
            Explore the 8 learning areas of the F–10 Australian Curriculum
          </p>
        </div>

        <LearningAreaList />
      </div>
    </div>
  )
}
