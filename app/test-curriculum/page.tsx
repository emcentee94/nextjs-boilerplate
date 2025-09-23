"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CurriculumService, CurriculumData } from "@/lib/curriculum-service"

export default function TestCurriculumPage() {
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<{
    learning_areas: number
    achievement_standards: number
    cross_curriculum_priorities: number
    general_capabilities: number
  } | null>(null)

  const loadCurriculumData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("🔄 Loading curriculum data...")
      const data = await CurriculumService.fetchAllCurriculumData()
      
      setCurriculumData(data)
      setStats({
        learning_areas: data.learning_areas.length,
        achievement_standards: data.achievement_standards.length,
        cross_curriculum_priorities: data.cross_curriculum_priorities.length,
        general_capabilities: data.general_capabilities.length
      })
      
      console.log("✅ Curriculum data loaded successfully:", stats)
    } catch (err) {
      console.error("❌ Error loading curriculum data:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const testSearch = async () => {
    if (!curriculumData) return
    
    try {
      console.log("🔍 Testing search functionality...")
      const searchResults = await CurriculumService.searchCurriculumData("English")
      console.log("Search results:", searchResults)
    } catch (err) {
      console.error("❌ Search error:", err)
    }
  }

  const testSubjects = async () => {
    try {
      console.log("📚 Testing subjects...")
      const subjects = await CurriculumService.getSubjects()
      console.log("Subjects:", subjects)
    } catch (err) {
      console.error("❌ Subjects error:", err)
    }
  }

  const testLevels = async () => {
    try {
      console.log("📊 Testing levels...")
      const levels = await CurriculumService.getLevels()
      console.log("Levels:", levels)
    } catch (err) {
      console.error("❌ Levels error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Curriculum Data Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={loadCurriculumData} disabled={loading}>
                {loading ? "Loading..." : "Load Curriculum Data"}
              </Button>
              <Button onClick={testSearch} variant="outline" disabled={!curriculumData}>
                Test Search
              </Button>
              <Button onClick={testSubjects} variant="outline" disabled={!curriculumData}>
                Test Subjects
              </Button>
              <Button onClick={testLevels} variant="outline" disabled={!curriculumData}>
                Test Levels
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">Error: {error}</p>
              </div>
            )}

            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.learning_areas}</div>
                    <div className="text-sm text-muted-foreground">Learning Areas</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.achievement_standards}</div>
                    <div className="text-sm text-muted-foreground">Achievement Standards</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.cross_curriculum_priorities}</div>
                    <div className="text-sm text-muted-foreground">Cross-Curriculum Priorities</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.general_capabilities}</div>
                    <div className="text-sm text-muted-foreground">General Capabilities</div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {curriculumData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning Areas Sample */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Areas Sample</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {curriculumData.learning_areas.slice(0, 5).map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{item.learning_area}</div>
                      <div className="text-sm text-muted-foreground">{item.subject}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.content_description?.substring(0, 100)}...
                      </div>
                      <div className="flex gap-2 mt-2">
                        {item.level && <Badge variant="outline">{item.level}</Badge>}
                        {item.strand && <Badge variant="outline">{item.strand}</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Standards Sample */}
            <Card>
              <CardHeader>
                <CardTitle>Achievement Standards Sample</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {curriculumData.achievement_standards.slice(0, 5).map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium">{item.learning_area}</div>
                      <div className="text-sm text-muted-foreground">{item.subject}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.achievement_standard?.substring(0, 100)}...
                      </div>
                      <div className="flex gap-2 mt-2">
                        {item.level && <Badge variant="outline">{item.level}</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
