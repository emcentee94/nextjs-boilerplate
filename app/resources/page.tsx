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
  Heart
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Getting Started",
      description: "Essential guides for new teachers",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
      resources: [
        {
          title: "Taughtful User Guide",
          description: "Complete walkthrough of all features",
          type: "PDF Guide",
          download: true
        },
        {
          title: "First Lesson Plan Tutorial",
          description: "Step-by-step guide to creating your first lesson",
          type: "Video Tutorial",
          external: true
        },
        {
          title: "Curriculum Alignment Checklist",
          description: "Ensure your lessons meet Australian Curriculum standards",
          type: "Template",
          download: true
        }
      ]
    },
    {
      title: "Teaching Strategies",
      description: "Evidence-based approaches for effective teaching",
      icon: Lightbulb,
      color: "bg-green-100 text-green-700",
      resources: [
        {
          title: "Trauma-Informed Teaching Practices",
          description: "Creating safe, supportive learning environments",
          type: "Resource Pack",
          download: true
        },
        {
          title: "Indigenous Perspectives Integration",
          description: "Authentic ways to embed Indigenous knowledge",
          type: "Guide",
          download: true
        },
        {
          title: "Differentiated Instruction Strategies",
          description: "Meeting diverse learning needs in your classroom",
          type: "Toolkit",
          download: true
        }
      ]
    },
    {
      title: "Assessment & Planning",
      description: "Tools for effective assessment and lesson planning",
      icon: Target,
      color: "bg-purple-100 text-purple-700",
      resources: [
        {
          title: "Assessment Rubric Templates",
          description: "Ready-to-use rubrics for various subjects",
          type: "Templates",
          download: true
        },
        {
          title: "Lesson Planning Framework",
          description: "Structured approach to lesson design",
          type: "Framework",
          download: true
        },
        {
          title: "Student Progress Tracking",
          description: "Monitor and document student learning",
          type: "Tools",
          download: true
        }
      ]
    },
    {
      title: "Wellbeing & Support",
      description: "Resources for teacher and student wellbeing",
      icon: Heart,
      color: "bg-pink-100 text-pink-700",
      resources: [
        {
          title: "Teacher Self-Care Guide",
          description: "Maintaining your wellbeing in challenging times",
          type: "Guide",
          download: true
        },
        {
          title: "Student Mental Health Resources",
          description: "Supporting student emotional wellbeing",
          type: "Resource Pack",
          download: true
        },
        {
          title: "Classroom Management Strategies",
          description: "Creating positive learning environments",
          type: "Handbook",
          download: true
        }
      ]
    }
  ]

  const featuredResources = [
    {
      title: "Australian Curriculum v9 Quick Reference",
      description: "Essential overview of all learning areas and capabilities",
      type: "Reference Guide",
      featured: true,
      download: true
    },
    {
      title: "RAG Technology Explained",
      description: "Understanding how Taughtful's AI creates curriculum-aligned lessons",
      type: "Educational",
      featured: true,
      external: true
    },
    {
      title: "Cultural Safety in Education",
      description: "Best practices for culturally responsive teaching",
      type: "Professional Development",
      featured: true,
      download: true
    }
  ]

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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-fredoka">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="border-2 border-[#FD6585] bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#FD6585] text-white">Featured</Badge>
                    <div className="flex gap-2">
                      {resource.download && (
                        <Download className="w-4 h-4 text-gray-500" />
                      )}
                      {resource.external && (
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-fredoka">{resource.title}</CardTitle>
                  <CardDescription className="font-nunito">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <Button size="sm" className="bg-[#FD6585] hover:bg-[#E55A7A] text-white">
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

              <div className="grid md:grid-cols-3 gap-4">
                {category.resources.map((resource, resourceIndex) => (
                  <Card key={resourceIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-fredoka">{resource.title}</CardTitle>
                      <CardDescription className="font-nunito">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <div className="flex gap-2">
                          {resource.download && (
                            <Button size="sm" variant="outline" className="text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          )}
                          {resource.external && (
                            <Button size="sm" variant="outline" className="text-xs">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          )}
                        </div>
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
