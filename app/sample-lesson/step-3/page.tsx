'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Home,
  CheckCircle
} from "lucide-react"
import { CurriculumHelpers } from "@/lib/curriculum-data"

function Step3Content() {
  const searchParams = useSearchParams()
  const [selectedAchievementStandards, setSelectedAchievementStandards] = useState([])
  const [selectedContentDescriptors, setSelectedContentDescriptors] = useState([])
  
  // Get selections from URL parameters
  const learningArea = searchParams.get('learningArea') || ''
  const subject = searchParams.get('subject') || ''
  const yearLevel = searchParams.get('yearLevel') || ''

  // Debug logging
  console.log('Step 3 Debug:', { learningArea, subject, yearLevel })

  // Get dynamic curriculum data based on selections
  const achievementStandards = CurriculumHelpers.getAchievementStandardsBySelection(learningArea, subject, yearLevel)
  const contentDescriptors = CurriculumHelpers.getContentDescriptorsBySelection(learningArea, subject, yearLevel)

  // Debug logging
  console.log('Curriculum Data:', { 
    achievementStandardsCount: achievementStandards.length, 
    contentDescriptorsCount: contentDescriptors.length,
    achievementStandards: achievementStandards,
    contentDescriptors: contentDescriptors
  })

  const handleAchievementStandardChange = (standardId) => {
    setSelectedAchievementStandards(prev => 
      prev.includes(standardId) 
        ? prev.filter(item => item !== standardId)
        : [...prev, standardId]
    )
  }

  const handleContentDescriptorChange = (descriptorId) => {
    setSelectedContentDescriptors(prev => 
      prev.includes(descriptorId) 
        ? prev.filter(item => item !== descriptorId)
        : [...prev, descriptorId]
    )
  }

  const canContinue = selectedAchievementStandards.length > 0 && selectedContentDescriptors.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#888625]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#FD6585]/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#FF9A2E]/10 rounded-full blur-lg animate-float delay-2000"></div>
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
              <Badge variant="secondary" className="px-3 py-1 bg-[#888625]/10 text-[#888625] border-[#888625]/20">
                Step 3 of 9
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-foreground font-mono mb-6 hover:scale-105 transition-all duration-500">
            Australian Curriculum v9
          </h1>
          <p className="text-2xl text-muted-foreground font-medium mb-8">
            Select the specific curriculum standards for your lesson
          </p>
          
          {/* Display current selections */}
          <div className="flex justify-center gap-4 flex-wrap mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#888625]/10 text-[#888625] border-[#888625]/20">
              <BookOpen className="w-4 h-4 mr-2" />
              {learningArea}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#FD6585]/10 text-[#FD6585] border-[#FD6585]/20">
              <CheckCircle className="w-4 h-4 mr-2" />
              {subject}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#FF9A2E]/10 text-[#FF9A2E] border-[#FF9A2E]/20">
              {yearLevel}
            </Badge>
          </div>
        </div>

        {/* Australian Curriculum v9 */}
        <Card className="mb-8 border-2 border-[#888625]/20 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-[#888625]/5 to-[#FD6585]/5">
            <CardTitle className="text-3xl font-bold text-foreground font-mono flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#888625]" />
              📚 Australian Curriculum v9
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-white/90 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">
                      Achievement Standards ({achievementStandards.length} available)
                    </label>
                    {achievementStandards.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {achievementStandards.map((standard) => (
                          <div key={standard.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 mt-1"
                              checked={selectedAchievementStandards.includes(standard.id)}
                              onChange={() => handleAchievementStandardChange(standard.id)}
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800 mb-1">
                                {learningArea} - {subject} - {yearLevel}
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{standard.standard}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No achievement standards available for this selection.</p>
                        <p className="text-sm mt-2">Please go back and select a different combination.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">
                      Content Descriptors ({contentDescriptors.length} available)
                    </label>
                    {contentDescriptors.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {contentDescriptors.map((descriptor) => (
                          <div key={descriptor.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 mt-1"
                              checked={selectedContentDescriptors.includes(descriptor.id)}
                              onChange={() => handleContentDescriptorChange(descriptor.id)}
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800 mb-1">
                                {descriptor.code}
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{descriptor.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No content descriptors available for this selection.</p>
                        <p className="text-sm mt-2">Please go back and select a different combination.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {canContinue && (
                <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-800">Curriculum Selection Complete</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    {selectedAchievementStandards.length} achievement standard(s) and {selectedContentDescriptors.length} content descriptor(s) selected.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href={`/sample-lesson/step-2?learningArea=${encodeURIComponent(learningArea)}&subject=${encodeURIComponent(subject)}&yearLevel=${encodeURIComponent(yearLevel)}`}>
            <Button variant="outline" className="px-6 py-3 text-lg font-bold border-2 hover:border-[#FD6585] hover:scale-105 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Setup
            </Button>
          </Link>
          
          {canContinue ? (
            <Link href={`/sample-lesson/step-4?learningArea=${encodeURIComponent(learningArea)}&subject=${encodeURIComponent(subject)}&yearLevel=${encodeURIComponent(yearLevel)}&achievementStandards=${encodeURIComponent(JSON.stringify(selectedAchievementStandards))}&contentDescriptors=${encodeURIComponent(JSON.stringify(selectedContentDescriptors))}`}>
              <Button className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-8 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                Continue to Trauma Profile
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button disabled className="px-8 py-3 text-lg font-bold bg-gray-400 text-white">
              Select Standards to Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Step3Curriculum() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FD6585] mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading curriculum data...</p>
        </div>
      </div>
    }>
      <Step3Content />
    </Suspense>
  )
}
