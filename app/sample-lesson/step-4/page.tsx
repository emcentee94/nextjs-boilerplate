'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { FormDropdowns } from '@/lib/curriculum-data'
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  Home,
  CheckCircle
} from "lucide-react"

export default function Step4TraumaProfile() {
  const [selectedTraumaNeeds, setSelectedTraumaNeeds] = useState([])
  const [classDescription, setClassDescription] = useState('')

  const handleTraumaChange = (value) => {
    setSelectedTraumaNeeds(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const canContinue = selectedTraumaNeeds.length > 0 || classDescription.trim().length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-[#FFF2E8] to-[#FDE5DA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-400/10 rounded-full blur-lg animate-float delay-2000"></div>
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
              <Badge variant="secondary" className="px-3 py-1 bg-red-500/10 text-red-500 border-red-500/20">
                Step 4 of 9
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-foreground font-mono mb-6 hover:scale-105 transition-all duration-500">
            Trauma-Informed Class Profile
          </h1>
          <p className="text-2xl text-muted-foreground font-medium mb-8">
            Help us understand your class dynamics to create the best learning experience
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-red-500/10 text-red-500 border-red-500/20">
              <Heart className="w-4 h-4 mr-2" />
              TAUGHTFUL ADDITION
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-lg bg-pink-500/10 text-pink-500 border-pink-500/20">
              <CheckCircle className="w-4 h-4 mr-2" />
              Evidence-Based
            </Badge>
          </div>
        </div>

        {/* Trauma-Informed Class Profile */}
        <Card className="mb-8 border-2 border-red-500/20 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="bg-gradient-to-r from-red-500/5 to-pink-500/5">
            <CardTitle className="text-3xl font-bold text-foreground font-mono flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              ⚕️ Trauma-Informed Class Profile
            </CardTitle>
            <div className="bg-red-100 p-3 rounded-lg border border-red-200 mt-4">
              <p className="text-sm text-red-800 font-medium">
                <strong>TAUGHTFUL ADDITION:</strong> Suggestions based on research, using effective and evidence-based frameworks
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-white/90 rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    📝 CHATBOX: Describe challenging behaviors (NO personal student data)
                  </label>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="text-sm text-blue-800 font-medium mb-2">EXAMPLE:</p>
                    <p className="text-sm text-blue-700 italic">
                      "My class struggles with loud noises and sudden changes. Some students shut down when overwhelmed, 
                      others become disruptive. Transitions are particularly challenging."
                    </p>
                  </div>
                  <textarea 
                    value={classDescription}
                    onChange={(e) => setClassDescription(e.target.value)}
                    placeholder="Describe your class dynamics and challenging behaviors (no personal student data)..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">✅ CHECKBOXES:</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      {FormDropdowns.traumaInformedOptions.slice(0, 4).map((option) => (
                        <div key={option.value} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 mt-1"
                            checked={selectedTraumaNeeds.includes(option.value)}
                            onChange={() => handleTraumaChange(option.value)}
                          />
                          <div>
                            <span className="text-sm font-medium">{option.label}</span>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {FormDropdowns.traumaInformedOptions.slice(4).map((option) => (
                        <div key={option.value} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 mt-1"
                            checked={selectedTraumaNeeds.includes(option.value)}
                            onChange={() => handleTraumaChange(option.value)}
                          />
                          <div>
                            <span className="text-sm font-medium">{option.label}</span>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {canContinue && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">🎯 Your Class Profile:</h4>
                    <p className="text-sm text-green-700 mb-3">
                      {selectedTraumaNeeds.length > 0 
                        ? `Selected: ${selectedTraumaNeeds.map(need => FormDropdowns.traumaInformedOptions.find(opt => opt.value === need)?.label).join(', ')}`
                        : 'Custom description provided'
                      }. These strategies will be woven into your lesson automatically.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/sample-lesson/step-3">
            <Button variant="outline" className="px-6 py-3 text-lg font-bold border-2 hover:border-[#FD6585] hover:scale-105 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Curriculum
            </Button>
          </Link>
          
          <div className="flex gap-3">
            <Link href="/sample-lesson/step-4">
              <Button variant="outline" className="border-gray-400 text-gray-600 hover:bg-gray-50 px-6 py-3 text-lg font-bold">
                Skip This Step
              </Button>
            </Link>
            
            {canContinue ? (
              <Link href="/sample-lesson/step-5">
                <Button className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white px-8 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  Continue to Indigenous Perspectives
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button disabled className="px-8 py-3 text-lg font-bold bg-gray-400 text-white">
                Complete Profile to Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

