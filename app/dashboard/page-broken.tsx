"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Search,
  LogOut,
  BookOpen,
  Calendar,
  ArrowRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { auth, lessons } from "@/lib/supabase"
import { CurriculumSelector } from "@/components/curriculum-selector"
import { CurriculumItem, CurriculumService } from "@/lib/curriculum-service"

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null)
  const [userLessons, setUserLessons] = useState<any[]>([])
  const [newLesson, setNewLesson] = useState({
    title: "",
    learningArea: "",
    subject: "",
    yearLevel: "",
    description: ""
  })
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState<CurriculumItem[]>([])
  const [showCurriculumSelector, setShowCurriculumSelector] = useState(false)
  const [learningAreas, setLearningAreas] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [levels, setLevels] = useState<string[]>([])
  const [loadingCurriculumData, setLoadingCurriculumData] = useState(false)

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try Supabase authentication first
        const user = await auth.getCurrentUser()
        if (user) {
          setUser(user)
          await loadUserLessons(user.id || user.email)
          return
        }
      } catch (error) {
        console.log("Supabase auth not available, checking demo mode...")
      }

      // Fallback to demo mode
      const demoUser = localStorage.getItem("taughtful_user")
      if (demoUser) {
        const userData = JSON.parse(demoUser)
        setUser(userData)
        // In demo mode, show empty lessons list
        setUserLessons([])
      } else {
        window.location.href = "/login"
      }
    }
    checkAuth()
  }, [])

  // Load curriculum data for dropdowns
  useEffect(() => {
    const loadCurriculumData = async () => {
      try {
        setLoadingCurriculumData(true)
        const [learningAreasData, levelsData] = await Promise.all([
          CurriculumService.getLearningAreaNames(),
          CurriculumService.getLevels()
        ])
        setLearningAreas(learningAreasData)
        setLevels(levelsData)
      } catch (error) {
        console.error("Error loading curriculum data:", error)
        // Fallback to static data if curriculum service fails
        setLearningAreas(["English", "Mathematics", "Science", "Humanities and Social Sciences", "The Arts", "Health and Physical Education", "Languages", "Technologies"])
        setLevels(["Foundation", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"])
      } finally {
        setLoadingCurriculumData(false)
      }
    }
    loadCurriculumData()
  }, [])

  // Load subjects when learning area and year level change
  useEffect(() => {
    const loadSubjectsForLearningAreaAndLevel = async () => {
      if (!newLesson.learningArea || !newLesson.yearLevel) {
        setSubjects([])
        return
      }

      try {
        setLoadingCurriculumData(true)
        const subjectsData = await CurriculumService.getSubjectsForLearningAreaAndLevel(
          newLesson.learningArea, 
          newLesson.yearLevel
        )
        setSubjects(subjectsData)
        
        // Clear subject selection if it's no longer valid
        if (newLesson.subject && !subjectsData.includes(newLesson.subject)) {
          setNewLesson(prev => ({ ...prev, subject: "" }))
        }
      } catch (error) {
        console.error("Error loading subjects for learning area and level:", error)
        setSubjects([])
      } finally {
        setLoadingCurriculumData(false)
      }
    }
    loadSubjectsForLearningAreaAndLevel()
  }, [newLesson.learningArea, newLesson.yearLevel])

  const loadUserLessons = async (userId: string) => {
    try {
      const { data, error } = await lessons.getUserLessons(userId)
      if (error) {
        console.error('Error loading lessons:', error)
      } else {
        setUserLessons(data || [])
      }
    } catch (error) {
      console.error('Error loading lessons:', error)
    }
  }

  const handleLogout = async () => {
    try {
      // Try Supabase logout first
      await auth.signOut()
    } catch (error) {
      console.log("Supabase logout not available, clearing demo data...")
    }
    
    // Clear demo data
    localStorage.removeItem("taughtful_user")
    window.location.href = "/login"
  }

  const handleCreateLesson = async () => {
    if (!user) return
    
    try {
      const lessonData = {
        user_id: user.id || user.email,
        title: newLesson.title,
        learning_area: newLesson.learningArea,
        subject: newLesson.subject,
        year_level: newLesson.yearLevel,
        duration_minutes: 60,
        selected_curriculum_ids: selectedCurriculumItems.map(item => item.id),
        achievement_standards: selectedCurriculumItems
          .filter(item => item.achievement_standard)
          .map(item => item.achievement_standard!),
        learning_intentions: newLesson.description,
        success_criteria: "",
        trauma_informed_profile: {},
        include_indigenous_perspectives: false,
        indigenous_pedagogy_methods: [],
        cultural_safety_verified: false,
        lesson_structure: {},
        differentiation_strategies: {},
        assessment_strategies: {},
        resources: {},
        ai_model_used: "curriculum-integrated",
        generation_prompts: {
          curriculum_items: selectedCurriculumItems.length,
          subject: newLesson.subject,
          level: newLesson.yearLevel
        },
        generation_time_seconds: 0,
        status: 'draft' as const,
        generation_step: 0,
        is_template: false,
        view_count: 0,
        export_count: 0
      }
      
      const { data, error } = await lessons.createLesson(lessonData)
      
      if (error) {
        console.error('Failed to create lesson:', error)
        alert('Failed to create lesson. Please try again.')
      } else {
        await loadUserLessons(user.id || user.email)
        setShowCreateForm(false)
        setNewLesson({ title: "", learningArea: "", subject: "", yearLevel: "", description: "" })
        setSelectedCurriculumItems([])
        setShowCurriculumSelector(false)
      }
    } catch (error) {
      console.error('Error creating lesson:', error)
      alert('Failed to create lesson. Please try again.')
    }
  }

  // Show loading while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Users className="w-8 h-8 text-white" />
          </div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const filteredLessons = userLessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.year_level.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold">Taughtful</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.name || user.email}</span>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                <Users className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showCreateForm ? (
          /* Dashboard Landing */
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Teacher Dashboard</h2>
              <p className="text-muted-foreground">Choose an option to get started</p>
            </div>

            {/* Top-level Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-[#FD6585]/50"
                onClick={() => setShowCreateForm(true)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Create Lesson Plan</h3>
                  <p className="text-sm text-muted-foreground">Start a new lesson with curriculum alignment</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-[#FD6585]/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#888625] to-[#FD6585] rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Browse Curriculum</h3>
                  <p className="text-sm text-muted-foreground">Explore ACARA v9 curriculum content</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-[#FD6585]/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF9A2E] to-[#888625] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Saved Lessons</h3>
                  <p className="text-sm text-muted-foreground">Access your lesson library</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-[#FD6585]/50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FD6585] to-[#888625] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Resources & PD</h3>
                  <p className="text-sm text-muted-foreground">Professional development materials</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            {userLessons.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Recent Lesson Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userLessons.slice(0, 6).map((lesson, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{lesson.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {lesson.subject} • {lesson.year_level}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(lesson.created_at).toLocaleDateString()}
                          </span>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Lesson Creation Wizard */
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="bg-white rounded-lg p-6 border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Create Lesson Plan</h2>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Back to Dashboard
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#FD6585] text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <span className="ml-2 text-sm font-medium">Context Setup</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 rounded">
                  <div className="h-1 bg-[#FD6585] rounded w-1/3"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <span className="ml-2 text-sm text-gray-600">Curriculum Linking</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <span className="ml-2 text-sm text-gray-600">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Step 1: Context Setup */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Step 1: Context Setup</CardTitle>
                <p className="text-sm text-muted-foreground">Set the foundation for your lesson plan</p>
              </CardHeader>
              <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Lesson Title</label>
                  <Input
                    placeholder="Enter lesson title..."
                    value={newLesson.title}
                    onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Year Level</label>
                  <Select value={newLesson.yearLevel} onValueChange={(value) => setNewLesson({...newLesson, yearLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={loadingCurriculumData ? "Loading levels..." : "Select year level"} />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Learning Area</label>
                  <Select value={newLesson.learningArea} onValueChange={(value) => setNewLesson({...newLesson, learningArea: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={loadingCurriculumData ? "Loading learning areas..." : "Select learning area"} />
                    </SelectTrigger>
                    <SelectContent>
                      {learningAreas.map(learningArea => (
                        <SelectItem key={learningArea} value={learningArea}>
                          {learningArea}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Select 
                    value={newLesson.subject} 
                    onValueChange={(value) => setNewLesson({...newLesson, subject: value})}
                    disabled={!newLesson.learningArea || !newLesson.yearLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        !newLesson.learningArea || !newLesson.yearLevel 
                          ? "Select learning area and year level first" 
                          : loadingCurriculumData 
                            ? "Loading subjects..." 
                            : subjects.length === 0 
                              ? "No subjects available" 
                              : "Select subject"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.length > 0 ? (
                        subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-subjects" disabled>
                          {!newLesson.learningArea || !newLesson.yearLevel 
                            ? "Select learning area and year level first" 
                            : "No subjects available for this combination"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <Textarea
                  placeholder="Brief description of the lesson (optional)..."
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                />
              </div>

              {/* Step 1.3: Add Filters (Optional) */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Add Filters (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">General Capabilities</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select capabilities (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="literacy">Literacy</SelectItem>
                        <SelectItem value="numeracy">Numeracy</SelectItem>
                        <SelectItem value="critical-creative">Critical & Creative Thinking</SelectItem>
                        <SelectItem value="personal-social">Personal & Social Capability</SelectItem>
                        <SelectItem value="ict">Information & Communication Technology</SelectItem>
                        <SelectItem value="intercultural">Intercultural Understanding</SelectItem>
                        <SelectItem value="ethical">Ethical Understanding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cross-Curriculum Priorities</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priorities (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atsi">Aboriginal & Torres Strait Islander Histories and Cultures</SelectItem>
                        <SelectItem value="asia">Asia and Australia's Engagement with Asia</SelectItem>
                        <SelectItem value="sustainability">Sustainability</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Step 1.4: Continue to Curriculum Linking */}
              <div className="flex justify-end pt-6 border-t">
                <Button 
                  onClick={() => setShowCurriculumSelector(true)}
                  className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white"
                  disabled={!newLesson.title || !newLesson.learningArea || !newLesson.subject || !newLesson.yearLevel}
                >
                  Continue to Curriculum Linking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Curriculum Linking */}
          {showCurriculumSelector && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Step 2: Curriculum Linking</CardTitle>
                <p className="text-sm text-muted-foreground">Search and select curriculum content to align with your lesson</p>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Selected Curriculum Items</h4>
                    <span className="text-sm text-muted-foreground">
                      {selectedCurriculumItems.length} items selected
                    </span>
                  </div>
                  
                  {selectedCurriculumItems.length > 0 && (
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {selectedCurriculumItems.slice(0, 5).map((item, index) => (
                          <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {item["Code"] || item.code || item["Learning Area"] || item.learning_area}
                          </span>
                        ))}
                        {selectedCurriculumItems.length > 5 && (
                          <span className="text-xs text-muted-foreground px-3 py-1">
                            +{selectedCurriculumItems.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border rounded-lg p-4 bg-muted/20">
                  <CurriculumSelector
                    onSelectionChange={setSelectedCurriculumItems}
                    selectedItems={selectedCurriculumItems}
                    subject={newLesson.subject}
                    level={newLesson.yearLevel}
                  />
                </div>

                {/* Continue to Confirmation */}
                <div className="flex justify-end pt-6 border-t mt-6">
                  <Button 
                    onClick={() => {/* TODO: Move to confirmation step */}}
                    className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white"
                    disabled={selectedCurriculumItems.length === 0}
                  >
                    Continue to Confirmation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        )}

        {/* Lesson Plans Grid - Only show when not in create form */}
        {!showCreateForm && (
          <>
            {/* Search and Create */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search lesson plans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{lesson.subject} • {lesson.year_level}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lesson.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{lesson.learning_intentions || lesson.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>Modified: {new Date(lesson.updated_at).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

            {filteredLessons.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No lesson plans found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first lesson plan to get started"}
                  </p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Lesson
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}