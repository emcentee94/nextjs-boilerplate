"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ExternalLink,
  Users,
  Lightbulb,
  Target,
  Shield,
  Heart,
  Clock,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Getting Started",
      description: "Essential guides for new teachers and Taughtful users",
      icon: BookOpen,
      circleBg: "bg-gradient-to-br from-[#FD6585] to-[#FF9A2E]",
      link: "/resources/getting-started",
      animation: "animate-fade-in"
    },
    {
      title: "Teaching Strategies",
      description: "Evidence-based approaches for effective and inclusive teaching",
      icon: Lightbulb,
      circleBg: "bg-gradient-to-br from-[#4CAF50] to-[#8BC34A]",
      link: "/resources/teaching-strategies",
      animation: "animate-fade-in"
    },
    {
      title: "Assessment & Planning",
      description: "Tools and frameworks for effective assessment and lesson planning",
      icon: Target,
      circleBg: "bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0]",
      link: "/resources/assessment-planning",
      animation: "animate-fade-in"
    },
    {
      title: "Wellbeing & Support",
      description: "Resources for teacher and student wellbeing and mental health",
      icon: Heart,
      circleBg: "bg-gradient-to-br from-[#FF6CAB] to-[#7366FF]",
      link: "/resources/wellbeing-support",
      animation: "animate-fade-in"
    },
    {
      title: "VCAA (2.0)",
      description: "Victorian Curriculum F-10 Version 2.0 resources for all learning areas",
      icon: Shield,
      circleBg: "bg-gradient-to-br from-[#FF9800] to-[#FFC107]",
      link: "/resources/vcaa-2.0",
      animation: "animate-fade-in"
    }
  ]

  const featuredResources = [
    {
      title: "Australian Curriculum v9 Quick Reference",
      description: "Essential overview of all learning areas, general capabilities, and cross-curriculum priorities with year-level progression",
      type: "Reference Guide",
      featured: true,
      download: true,
      size: "3.5 MB",
      pages: "89 pages",
      link: "/resources/australian-curriculum-v9-reference.pdf",
      highlights: ["Complete learning area overview", "Year-level progression maps", "Achievement standard summaries", "General capabilities matrix"]
    },
    {
      title: "RAG Technology Explained",
      description: "Understanding how Taughtful's Retrieval-Augmented Generation creates curriculum-aligned lessons from trusted sources",
      type: "Educational",
      featured: true,
      external: true,
      duration: "8 minutes",
      link: "https://www.youtube.com/watch?v=taughtful-rag-explained",
      highlights: ["How RAG works", "Curriculum database integration", "Quality assurance process", "Benefits over traditional AI"]
    },
    {
      title: "Cultural Safety in Education",
      description: "Best practices for culturally responsive teaching, Indigenous perspectives integration, and creating inclusive learning environments",
      type: "Professional Development",
      featured: true,
      download: true,
      size: "4.1 MB",
      pages: "73 pages",
      link: "/resources/cultural-safety-education.pdf",
      highlights: ["Cultural protocols", "Inclusive practices", "Community partnerships", "Assessment considerations"]
    }
  ]

  const handleDownload = (link: string, title: string) => {
    // Create actual file downloads for the resources
    const a = document.createElement('a')
    a.href = link
    a.download = title.toLowerCase().replace(/\s+/g, '-') + '.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleExternalLink = (link: string, title: string) => {
    // For now, we'll simulate external links with alerts
    // In a real implementation, these would open in new tabs
    alert(`Opening external link: ${title}\n\nIn a production environment, this would open: ${link}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-white to-[#FFF2E8]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 font-fredoka animate-fade-in-down">
            Knowledge Hubs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito animate-fade-in-up">
            Explore our interactive hubs filled with teaching resources, guides, and tools to inspire and empower your educational journey.
          </p>
        </div>

        {/* Interactive Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {resourceCategories.map((category, index) => (
            <Link href={category.link} key={index} className="group">
              <Card 
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-3xl overflow-hidden transform group-hover:-translate-y-2 group-hover:scale-105 ${category.animation}`}
              >
                <CardContent className="p-8 text-center">
                  <div className={`mx-auto mb-6 ${category.circleBg} w-16 h-16 rounded-full flex items-center justify-center transform transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3 font-fredoka">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-nunito mb-6 min-h-[64px]">
                    {category.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="mt-2 mx-auto bg-transparent border-2 border-[#FD6585] text-[#FD6585] hover:bg-[#FD6585] hover:text-white transition-all duration-300 rounded-full px-6 py-2 font-bold"
                  >
                    Explore Hub
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-white rounded-3xl p-10 shadow-lg max-w-4xl mx-auto animate-fade-in">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 font-fredoka">
            Want to See Taughtful in Action?
          </h3>
          <p className="text-gray-600 mb-8 font-nunito max-w-2xl mx-auto text-lg">
            Experience how our AI-powered platform can transform your lesson planning with a personalized demo.
          </p>
          <div className="flex gap-6 justify-center">
            <Button asChild className="bg-[#FD6585] hover:bg-[#E55A7A] text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Link href="/signup">
                Request Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}