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
  Star
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Getting Started",
      description: "Essential guides for new teachers and Taughtful users",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
      resources: [
        {
          title: "Taughtful User Guide",
          description: "Complete walkthrough of all features including RAG-powered lesson planning, curriculum alignment, and assessment tools",
          type: "PDF Guide",
          download: true,
          size: "2.3 MB",
          pages: "45 pages",
          link: "/resources/taughtful-user-guide.pdf",
          features: ["Step-by-step tutorials", "Screenshot guides", "Troubleshooting tips"]
        },
        {
          title: "First Lesson Plan Tutorial",
          description: "Interactive video tutorial showing how to create your first curriculum-aligned lesson plan using Taughtful's AI",
          type: "Video Tutorial",
          external: true,
          duration: "12 minutes",
          link: "https://www.youtube.com/watch?v=taughtful-tutorial",
          features: ["Live demonstration", "Best practices", "Common mistakes to avoid"]
        },
        {
          title: "Curriculum Alignment Checklist",
          description: "Comprehensive checklist to ensure your lessons meet Australian Curriculum v9 standards and achievement outcomes",
          type: "Template",
          download: true,
          size: "156 KB",
          link: "/resources/curriculum-alignment-checklist.pdf",
          features: ["Learning area verification", "Year level alignment", "Assessment criteria"]
        },
        {
          title: "RAG Technology Explained",
          description: "Deep dive into how Retrieval-Augmented Generation works in Taughtful and why it's superior to traditional AI",
          type: "Educational Guide",
          download: true,
          size: "1.8 MB",
          pages: "28 pages",
          link: "/resources/rag-technology-guide.pdf",
          features: ["Technical overview", "Benefits for teachers", "Comparison with other AI"]
        }
      ]
    },
    {
      title: "Teaching Strategies",
      description: "Evidence-based approaches for effective and inclusive teaching",
      icon: Lightbulb,
      color: "bg-green-100 text-green-700",
      resources: [
        {
          title: "Trauma-Informed Teaching Practices",
          description: "Comprehensive guide to creating safe, supportive learning environments for students who have experienced trauma",
          type: "Resource Pack",
          download: true,
          size: "4.2 MB",
          pages: "67 pages",
          link: "/resources/trauma-informed-teaching.pdf",
          features: ["Behavioral strategies", "Classroom setup", "Communication techniques", "Self-regulation tools"]
        },
        {
          title: "Indigenous Perspectives Integration",
          description: "Authentic ways to embed Indigenous knowledge, perspectives, and cultural practices across all learning areas",
          type: "Guide",
          download: true,
          size: "3.1 MB",
          pages: "52 pages",
          link: "/resources/indigenous-perspectives-guide.pdf",
          features: ["Cultural protocols", "Curriculum integration", "Community engagement", "Resource recommendations"]
        },
        {
          title: "Differentiated Instruction Strategies",
          description: "Practical toolkit for meeting diverse learning needs, abilities, and interests in your classroom",
          type: "Toolkit",
          download: true,
          size: "2.9 MB",
          pages: "41 pages",
          link: "/resources/differentiated-instruction-toolkit.pdf",
          features: ["Learning style adaptations", "Assessment modifications", "Technology integration", "Collaborative strategies"]
        },
        {
          title: "Universal Design for Learning (UDL)",
          description: "Framework for designing accessible and inclusive learning experiences that work for all students",
          type: "Framework Guide",
          download: true,
          size: "2.7 MB",
          pages: "38 pages",
          link: "/resources/udl-framework-guide.pdf",
          features: ["Multiple means of representation", "Multiple means of engagement", "Multiple means of expression"]
        }
      ]
    },
    {
      title: "Assessment & Planning",
      description: "Tools and frameworks for effective assessment and lesson planning",
      icon: Target,
      color: "bg-purple-100 text-purple-700",
      resources: [
        {
          title: "Assessment Rubric Templates",
          description: "Ready-to-use rubrics for various subjects and year levels, aligned with Australian Curriculum achievement standards",
          type: "Templates",
          download: true,
          size: "1.4 MB",
          link: "/resources/assessment-rubric-templates.pdf",
          features: ["English rubrics", "Mathematics rubrics", "Science rubrics", "HASS rubrics", "Customizable formats"]
        },
        {
          title: "Lesson Planning Framework",
          description: "Structured approach to lesson design incorporating backward design principles and curriculum alignment",
          type: "Framework",
          download: true,
          size: "1.9 MB",
          pages: "34 pages",
          link: "/resources/lesson-planning-framework.pdf",
          features: ["Backward design process", "Learning objectives", "Assessment strategies", "Differentiation planning"]
        },
        {
          title: "Student Progress Tracking",
          description: "Digital and printable tools for monitoring and documenting student learning progress across all subjects",
          type: "Tools",
          download: true,
          size: "2.1 MB",
          link: "/resources/student-progress-tracking.pdf",
          features: ["Digital tracking sheets", "Portfolio templates", "Parent communication forms", "Data analysis tools"]
        },
        {
          title: "Formative Assessment Strategies",
          description: "Quick and effective formative assessment techniques to inform teaching and improve student learning",
          type: "Strategy Guide",
          download: true,
          size: "1.6 MB",
          pages: "29 pages",
          link: "/resources/formative-assessment-strategies.pdf",
          features: ["Exit tickets", "Think-pair-share", "Peer assessment", "Self-reflection tools"]
        }
      ]
    },
    {
      title: "Wellbeing & Support",
      description: "Resources for teacher and student wellbeing and mental health",
      icon: Heart,
      color: "bg-pink-100 text-pink-700",
      resources: [
        {
          title: "Teacher Self-Care Guide",
          description: "Evidence-based strategies for maintaining your wellbeing, managing stress, and preventing burnout in challenging times",
          type: "Guide",
          download: true,
          size: "2.4 MB",
          pages: "43 pages",
          link: "/resources/teacher-self-care-guide.pdf",
          features: ["Stress management techniques", "Work-life balance", "Mental health resources", "Professional support networks"]
        },
        {
          title: "Student Mental Health Resources",
          description: "Comprehensive toolkit for supporting student emotional wellbeing, recognizing warning signs, and accessing appropriate support",
          type: "Resource Pack",
          download: true,
          size: "3.8 MB",
          pages: "61 pages",
          link: "/resources/student-mental-health-resources.pdf",
          features: ["Warning signs guide", "Intervention strategies", "Referral processes", "Support service contacts"]
        },
        {
          title: "Classroom Management Strategies",
          description: "Positive behavior management approaches for creating respectful, productive learning environments",
          type: "Handbook",
          download: true,
          size: "3.2 MB",
          pages: "48 pages",
          link: "/resources/classroom-management-handbook.pdf",
          features: ["Positive reinforcement", "Conflict resolution", "Restorative practices", "Building relationships"]
        },
        {
          title: "Crisis Response Protocols",
          description: "Step-by-step protocols for responding to various crisis situations in educational settings",
          type: "Protocol Guide",
          download: true,
          size: "1.7 MB",
          pages: "31 pages",
          link: "/resources/crisis-response-protocols.pdf",
          features: ["Emergency procedures", "Communication plans", "Support services", "Follow-up protocols"]
        }
      ]
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
    // For now, we'll simulate downloads with alerts
    // In a real implementation, these would be actual file downloads
    alert(`Downloading: ${title}\n\nIn a production environment, this would download the actual file from: ${link}`)
  }

  const handleExternalLink = (link: string, title: string) => {
    // For now, we'll simulate external links with alerts
    // In a real implementation, these would open in new tabs
    alert(`Opening external link: ${title}\n\nIn a production environment, this would open: ${link}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-white to-[#FFF2E8]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-fredoka">
            Teaching Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Access curated resources, guides, and tools to enhance your teaching practice 
            and create meaningful learning experiences for your students.
          </p>
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-[#FD6585]" />
            <h2 className="text-2xl font-bold text-gray-900 font-fredoka">Featured Resources</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="border-2 border-[#FD6585] bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#FD6585] text-white">Featured</Badge>
                    <div className="flex gap-2">
                      {resource.download && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Download className="w-3 h-3" />
                          <span>{resource.size}</span>
                        </div>
                      )}
                      {resource.external && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ExternalLink className="w-3 h-3" />
                          <span>{resource.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-fredoka">{resource.title}</CardTitle>
                  <CardDescription className="font-nunito">
                    {resource.description}
                  </CardDescription>
                  {resource.highlights && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Key Features:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {resource.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-[#FD6585] hover:bg-[#E55A7A] text-white"
                      onClick={() => resource.download ? handleDownload(resource.link, resource.title) : handleExternalLink(resource.link, resource.title)}
                    >
                      {resource.download ? "Download" : "View"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="space-y-8">
          {resourceCategories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-fredoka">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 font-nunito">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                {category.resources.map((resource, resourceIndex) => (
                  <Card key={resourceIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {resource.size && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>{resource.size}</span>
                            </div>
                          )}
                          {resource.pages && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{resource.pages}</span>
                            </div>
                          )}
                          {resource.duration && (
                            <div className="flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              <span>{resource.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-fredoka">{resource.title}</CardTitle>
                      <CardDescription className="font-nunito">
                        {resource.description}
                      </CardDescription>
                      {resource.features && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Includes:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {resource.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {resource.download && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs flex-1"
                            onClick={() => handleDownload(resource.link, resource.title)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        )}
                        {resource.external && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs flex-1"
                            onClick={() => handleExternalLink(resource.link, resource.title)}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-fredoka">
            Need Help Getting Started?
          </h3>
          <p className="text-gray-600 mb-6 font-nunito max-w-2xl mx-auto">
            Our support team is here to help you make the most of Taughtful. 
            Get personalized guidance on using our platform effectively.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-[#FD6585] hover:bg-[#E55A7A] text-white">
              <Link href="/signup">
                Request Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/curriculum">
                Explore Curriculum
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}