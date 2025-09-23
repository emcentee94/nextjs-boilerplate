"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, BookOpen, Target, Users, Filter, X } from "lucide-react"
import { CurriculumService, CurriculumItem } from "@/lib/curriculum-service"

interface CurriculumSelectorProps {
  onSelectionChange: (selectedItems: CurriculumItem[]) => void
  selectedItems?: CurriculumItem[]
  subject?: string
  level?: string
}

export function CurriculumSelector({ 
  onSelectionChange, 
  selectedItems = [],
  subject,
  level 
}: CurriculumSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState(subject || "")
  const [selectedLevel, setSelectedLevel] = useState(level || "")
  const [subjects, setSubjects] = useState<string[]>([])
  const [levels, setLevels] = useState<string[]>([])
  const [learningAreas, setLearningAreas] = useState<CurriculumItem[]>([])
  const [achievementStandards, setAchievementStandards] = useState<CurriculumItem[]>([])
  const [crossCurriculumPriorities, setCrossCurriculumPriorities] = useState<CurriculumItem[]>([])
  const [generalCapabilities, setGeneralCapabilities] = useState<CurriculumItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"learning_areas" | "achievement_standards" | "cross_curriculum" | "general_capabilities">("learning_areas")

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  // Filter data when subject/level changes
  useEffect(() => {
    if (selectedSubject && selectedSubject !== "all" || selectedLevel && selectedLevel !== "all") {
      loadFilteredData()
    } else if (selectedSubject === "all" && selectedLevel === "all") {
      loadInitialData()
    }
  }, [selectedSubject, selectedLevel])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [subjectsData, levelsData, learningAreasData, achievementStandardsData, crossCurriculumData, generalCapabilitiesData] = await Promise.all([
        CurriculumService.getSubjects(),
        CurriculumService.getLevels(),
        CurriculumService.getLearningAreas(selectedSubject, selectedLevel),
        CurriculumService.getAchievementStandards(selectedSubject, selectedLevel),
        CurriculumService.getCrossCurriculumPriorities(),
        CurriculumService.getGeneralCapabilities()
      ])

      setSubjects(subjectsData)
      setLevels(levelsData)
      setLearningAreas(learningAreasData)
      setAchievementStandards(achievementStandardsData)
      setCrossCurriculumPriorities(crossCurriculumData)
      setGeneralCapabilities(generalCapabilitiesData)
    } catch (error) {
      console.error("Error loading curriculum data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadFilteredData = async () => {
    try {
      setLoading(true)
      const subjectFilter = selectedSubject && selectedSubject !== "all" ? selectedSubject : undefined
      const levelFilter = selectedLevel && selectedLevel !== "all" ? selectedLevel : undefined
      
      const [learningAreasData, achievementStandardsData] = await Promise.all([
        CurriculumService.getLearningAreas(subjectFilter, levelFilter),
        CurriculumService.getAchievementStandards(subjectFilter, levelFilter)
      ])

      setLearningAreas(learningAreasData)
      setAchievementStandards(achievementStandardsData)
    } catch (error) {
      console.error("Error loading filtered data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadFilteredData()
      return
    }

    try {
      setLoading(true)
      const searchResults = await CurriculumService.searchCurriculumData(searchTerm)
      setLearningAreas(searchResults.learning_areas)
      setAchievementStandards(searchResults.achievement_standards)
      setCrossCurriculumPriorities(searchResults.cross_curriculum_priorities)
      setGeneralCapabilities(searchResults.general_capabilities)
    } catch (error) {
      console.error("Error searching curriculum data:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleItemSelection = (item: CurriculumItem) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id)
    let newSelection: CurriculumItem[]

    if (isSelected) {
      newSelection = selectedItems.filter(selected => selected.id !== item.id)
    } else {
      newSelection = [...selectedItems, item]
    }

    onSelectionChange(newSelection)
  }

  const removeSelectedItem = (itemId: string) => {
    const newSelection = selectedItems.filter(item => item.id !== itemId)
    onSelectionChange(newSelection)
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case "learning_areas":
        return learningAreas
      case "achievement_standards":
        return achievementStandards
      case "cross_curriculum":
        return crossCurriculumPriorities
      case "general_capabilities":
        return generalCapabilities
      default:
        return []
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "learning_areas":
        return <BookOpen className="w-4 h-4" />
      case "achievement_standards":
        return <Target className="w-4 h-4" />
      case "cross_curriculum":
        return <Users className="w-4 h-4" />
      case "general_capabilities":
        return <Filter className="w-4 h-4" />
      default:
        return null
    }
  }

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "learning_areas":
        return "Learning Areas"
      case "achievement_standards":
        return "Achievement Standards"
      case "cross_curriculum":
        return "Cross-Curriculum Priorities"
      case "general_capabilities":
        return "General Capabilities"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Curriculum Data...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Data Selector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <Input
              placeholder="Search curriculum content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} variant="outline">
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Curriculum Items ({selectedItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedItems.map(item => (
                <div key={item.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">
                      {item["Learning Area"] || item.learning_area || item["Subject"] || item.subject || item["Organising ideas title"] || item.organising_ideas_title}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item["Content Description"] || item.content_description || item["Achievement Standard"] || item.achievement_standard || item["Description"] || item.description}
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {(item["Level"] || item.level) && (
                        <Badge variant="secondary" className="text-xs">
                          {item["Level"] || item.level}
                        </Badge>
                      )}
                      {(item["Code"] || item.code) && (
                        <Badge variant="outline" className="text-xs">
                          {item["Code"] || item.code}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSelectedItem(item.id)}
                    className="ml-2 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Curriculum Data Tabs */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1">
            {(["learning_areas", "achievement_standards", "cross_curriculum", "general_capabilities"] as const).map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2"
              >
                {getTabIcon(tab)}
                {getTabLabel(tab)}
                <Badge variant="secondary">
                  {getCurrentData().length}
                </Badge>
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getCurrentData().map(item => {
              const isSelected = selectedItems.some(selected => selected.id === item.id)
              return (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => toggleItemSelection(item)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={isSelected} readOnly />
                    <div className="flex-1">
                      <div className="font-medium">
                        {item["Learning Area"] || item.learning_area || item["Subject"] || item.subject || item["Organising ideas title"] || item.organising_ideas_title}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-3">
                        {item["Content Description"] || item.content_description || item["Achievement Standard"] || item.achievement_standard || item["Description"] || item.description}
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {(item["Level"] || item.level) && (
                          <Badge variant="outline" className="text-xs">
                            {item["Level"] || item.level}
                          </Badge>
                        )}
                        {(item["Strand"] || item.strand) && (
                          <Badge variant="outline" className="text-xs">
                            {item["Strand"] || item.strand}
                          </Badge>
                        )}
                        {(item["Element"] || item.element) && (
                          <Badge variant="outline" className="text-xs">
                            {item["Element"] || item.element}
                          </Badge>
                        )}
                        {(item["Code"] || item.code) && (
                          <Badge variant="secondary" className="text-xs">
                            {item["Code"] || item.code}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
