"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  Target,
  Heart,
  Calendar,
  Search,
  Filter,
  Download,
  Share,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const curriculumOptions = {
  acara: {
    name: "Australian Curriculum v9 (ACARA)",
    description: "National foundation curriculum",
    compliance: "Aligned to ACARA v9",
    color: "from-[#FD6585] to-[#FF9A2E]"
  },
  vic: {
    name: "Victorian Curriculum F–10",
    description: "Includes Capabilities strands",
    compliance: "Aligned to VCAA Curriculum F–10",
    color: "from-[#888625] to-[#FD6585]"
  },
  nsw: {
    name: "NSW Syllabus",
    description: "NESA outcomes and descriptors",
    compliance: "Linked to NESA outcomes",
    color: "from-[#FD6585] to-[#888625]"
  },
  wa: {
    name: "WA Curriculum & Assessment Outline",
    description: "WA-specific structure and phrasing",
    compliance: "Aligned to WA Curriculum",
    color: "from-[#FF9A2E] to-[#888625]"
  }
}

const sampleLessons = [
  {
    id: 1,
    title: "Year 8 English - Poetry Analysis",
    subject: "English",
    yearLevel: "Year 8",
    curriculum: "acara",
    lastModified: "2024-01-15",
    status: "Draft",
    description: "Analysing poetic devices in contemporary Australian poetry"
  },
  {
    id: 2,
    title: "Year 7 Mathematics - Fractions",
    subject: "Mathematics",
    yearLevel: "Year 7",
    curriculum: "vic",
    lastModified: "2024-01-14",
    status: "Complete",
    description: "Understanding equivalent fractions and operations"
  },
  {
    id: 3,
    title: "Year 9 Science - Chemical Reactions",
    subject: "Science",
    yearLevel: "Year 9",
    curriculum: "nsw",
    lastModified: "2024-01-13",
    status: "Complete",
    description: "Exploring types of chemical reactions and their applications"
  }
]

export default function TeacherDashboard() {
  const [selectedCurriculum, setSelectedCurriculum] = useState("acara")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [newLesson, setNewLesson] = useState({
    title: "",
    subject: "",
    yearLevel: "",
    description: ""
  })

  // Check authentication on component mount
  useEffect(() => {
    const userData = localStorage.getItem("taughtful_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirect to login if not authenticated
      window.location.href = "/login"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("taughtful_user")
    window.location.href = "/login"
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

  const filteredLessons = sampleLessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.yearLevel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateLesson = () => {
    // In a real app, this would save to a database
    console.log("Creating lesson:", { ...newLesson, curriculum: selectedCurriculum })
    setShowCreateForm(false)
    setNewLesson({ title: "", subject: "", yearLevel: "", description: "" })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#888625]/10 to-[#FD6585]/10 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-[#FF9A2E]/10 to-[#888625]/10 rounded-full blur-2xl animate-float delay-2000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/'}
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 relative transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]">
                <Image
                  src="/images/taughtful-logo.png"
                  alt="Taughtful"
                  width={40}
                  height={40}
                  className="rounded-full shadow-lg group-hover:shadow-xl"
                />
              </div>
              <span className="text-xl font-bold text-foreground font-mono transition-all duration-500 group-hover:text-[#FD6585] group-hover:scale-110">
                Taughtful Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Welcome, <span className="font-semibold text-foreground">{user.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground font-mono mb-4">
            Teacher Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your lesson plans, create new content, and stay curriculum-aligned.
          </p>
        </div>

        {/* Curriculum Selection */}
        <Card className="mb-8 border-2 border-[#FD6585]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#FD6585]" />
              Curriculum Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(curriculumOptions).map(([key, curriculum]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCurriculum(key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedCurriculum === key
                      ? `border-[#FD6585] bg-gradient-to-r ${curriculum.color} text-white shadow-lg`
                      : 'border-border hover:border-[#FD6585]/50 bg-white/50 hover:bg-white/80'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">{curriculum.name.split(' ')[0]}</div>
                  <div className="text-xs opacity-80">{curriculum.description}</div>
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#FD6585]">
                {curriculumOptions[selectedCurriculum as keyof typeof curriculumOptions].compliance}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Lesson
            </Button>
          </div>
        </div>

        {/* Create Lesson Form */}
        {showCreateForm && (
          <Card className="mb-8 border-2 border-[#FF9A2E]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#FF9A2E]" />
                Create New Lesson Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Select onValueChange={(value) => setNewLesson({...newLesson, subject: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="hass">HASS</SelectItem>
                      <SelectItem value="arts">The Arts</SelectItem>
                      <SelectItem value="technologies">Technologies</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="health-pe">Health & PE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Year Level</label>
                  <Select onValueChange={(value) => setNewLesson({...newLesson, yearLevel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="year-1">Year 1</SelectItem>
                      <SelectItem value="year-2">Year 2</SelectItem>
                      <SelectItem value="year-3">Year 3</SelectItem>
                      <SelectItem value="year-4">Year 4</SelectItem>
                      <SelectItem value="year-5">Year 5</SelectItem>
                      <SelectItem value="year-6">Year 6</SelectItem>
                      <SelectItem value="year-7">Year 7</SelectItem>
                      <SelectItem value="year-8">Year 8</SelectItem>
                      <SelectItem value="year-9">Year 9</SelectItem>
                      <SelectItem value="year-10">Year 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Curriculum</label>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">{curriculumOptions[selectedCurriculum as keyof typeof curriculumOptions].name}</p>
                    <p className="text-xs text-muted-foreground">{curriculumOptions[selectedCurriculum as keyof typeof curriculumOptions].compliance}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Brief description of the lesson..."
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateLesson} className="bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white">
                  Create Lesson
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lesson Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-border/50 hover:border-[#FD6585]/30">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{lesson.subject} • {lesson.yearLevel}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lesson.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  <span>Modified: {lesson.lastModified}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Target className="w-3 h-3" />
                  <span>{curriculumOptions[lesson.curriculum as keyof typeof curriculumOptions].name.split(' ')[0]}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="w-3 h-3" />
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
      </div>
    </div>
  )
}
