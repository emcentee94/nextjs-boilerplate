'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FormDropdowns, CurriculumHelpers } from '@/lib/curriculum-data'
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  Home,
  BookOpen,
  CheckCircle
} from "lucide-react"

export default function Step2BasicSetup() {
  const [selectedLearningArea, setSelectedLearningArea] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedYearLevel, setSelectedYearLevel] = useState('')
  const [curriculumContent, setCurriculumContent] = useState([])
  const [achievementStandard, setAchievementStandard] = useState(null)


  // Update subjects when learning area changes
  useEffect(() => {
    if (selectedLearningArea) {
      setSelectedSubject('')
      setSelectedYearLevel('')
      setCurriculumContent([])
      setAchievementStandard(null)
    }
  }, [selectedLearningArea])

  // Update year levels when subject changes
  useEffect(() => {
    if (selectedSubject && selectedLearningArea) {
      setSelectedYearLevel('')
      setCurriculumContent([])
      setAchievementStandard(null)
    }
  }, [selectedSubject, selectedLearningArea])

  // Load curriculum content when year level is selected
  useEffect(() => {
    if (selectedYearLevel && selectedSubject && selectedLearningArea) {
      const content = CurriculumHelpers.getCurriculumContent(selectedLearningArea, selectedSubject, selectedYearLevel)
      const standard = CurriculumHelpers.getAchievementStandard(selectedLearningArea, selectedSubject, selectedYearLevel)
      setCurriculumContent(content)
      setAchievementStandard(standard)
    }
  }, [selectedYearLevel, selectedSubject, selectedLearningArea])

  const canContinue = Boolean(selectedYearLevel && selectedLearningArea && selectedSubject)

  // Debug logging
  console.log('Step 2 Debug:', { 
    selectedYearLevel, 
    selectedLearningArea, 
    selectedSubject, 
    canContinue,
    yearLevelTruthy: Boolean(selectedYearLevel),
    learningAreaTruthy: Boolean(selectedLearningArea),
    subjectTruthy: Boolean(selectedSubject)
  })
  
  // Additional debugging for dropdown changes
  const handleYearLevelChange = (e) => {
    console.log('Year Level changed to:', e.target.value)
    setSelectedYearLevel(e.target.value)
  }
  
  const handleLearningAreaChange = (e) => {
    console.log('Learning Area changed to:', e.target.value)
    setSelectedLearningArea(e.target.value)
    setSelectedSubject('') // Reset subject when learning area changes
  }
  
  const handleSubjectChange = (e) => {
    console.log('Subject changed to:', e.target.value)
    setSelectedSubject(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF9A2E]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#888625]/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-[#FD6585]/10 rounded-full blur-lg animate-float delay-2000"></div>
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
              <Badge variant="secondary" className="px-3 py-1 bg-[#FF9A2E]/10 text-[#FF9A2E] border-[#FF9A2E]/20">
                Step 2 of 9
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-foreground font-mono mb-6 hover:scale-105 transition-all duration-500">
            Basic Lesson Setup
          </h1>
          <p className="text-2xl text-muted-foreground font-medium mb-8">
            Let's start with the fundamentals - what are you teaching?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#FF9A2E]/10 text-[#FF9A2E] border-[#FF9A2E]/20">
              <FileText className="w-4 h-4 mr-2" />
              Curriculum Selection
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-[#888625]/10 text-[#888625] border-[#888625]/20">
              <BookOpen className="w-4 h-4 mr-2" />
              Australian Curriculum v9
            </Badge>
          </div>
        </div>

        {/* Basic Lesson Setup */}
        <Card className="mb-8 border-2 border-[#FF9A2E]/20 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-[#FF9A2E]/5 to-[#888625]/5">
            <CardTitle className="text-3xl font-bold text-foreground font-mono flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#FF9A2E]" />
              📝 Basic Lesson Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-white/90 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">Year Level (F-10)</label>
                    <select 
                      value={selectedYearLevel}
                      onChange={handleYearLevelChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD6585] focus:border-transparent text-lg"
                    >
                      <option value="">Select Year Level</option>
                      {FormDropdowns.yearLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">Learning Area</label>
                    <select 
                      value={selectedLearningArea}
                      onChange={handleLearningAreaChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD6585] focus:border-transparent text-lg"
                    >
                      <option value="">Select Learning Area</option>
                      {FormDropdowns.learningAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-3">Subject</label>
                    <select 
                      key={selectedLearningArea}
                      value={selectedSubject}
                      onChange={handleSubjectChange}
                      disabled={!selectedLearningArea}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FD6585] focus:border-transparent text-lg disabled:bg-gray-100"
                    >
                      <option value="">Select Subject</option>
                      {selectedLearningArea && FormDropdowns.getSubjectsByArea(selectedLearningArea).map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">📚 Curriculum Topics</h4>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium mb-2">Pre-loaded Australian Curriculum v9</p>
                    <p className="text-sm text-blue-700">Select from topic list for chosen year/subject</p>
                  </div>

                  {curriculumContent.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {curriculumContent.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <input type="checkbox" className="rounded border-gray-300 mt-1" />
                          <div>
                            <span className="text-sm font-medium">{item.code}</span>
                            <p className="text-xs text-gray-600 mt-1">{item.contentDescription}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Debug Display */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h5 className="text-sm font-bold text-yellow-800 mb-2">Debug Info:</h5>
                    <p className="text-xs text-yellow-700">Year Level: {selectedYearLevel || 'Not selected'}</p>
                    <p className="text-xs text-yellow-700">Learning Area: {selectedLearningArea || 'Not selected'}</p>
                    <p className="text-xs text-yellow-700">Subject: {selectedSubject || 'Not selected'}</p>
                    <p className="text-xs text-yellow-700">Can Continue: {canContinue ? 'YES' : 'NO'}</p>
                  </div>

                  {achievementStandard && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Achievement Standard:
                      </h5>
                      <p className="text-sm text-green-700">{achievementStandard.achievementStandard}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/sample-lesson/step-1">
            <Button variant="outline" className="px-6 py-3 text-lg font-bold border-2 hover:border-[#FD6585] hover:scale-105 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          {canContinue ? (
            <Link href={`/sample-lesson/step-3?learningArea=${encodeURIComponent(selectedLearningArea)}&subject=${encodeURIComponent(selectedSubject)}&yearLevel=${encodeURIComponent(selectedYearLevel)}`}>
              <Button className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-8 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                Continue to Curriculum
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button disabled className="px-8 py-3 text-lg font-bold bg-gray-400 text-white">
              Complete Selection to Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
