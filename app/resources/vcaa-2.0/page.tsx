"use client"

import Link from "next/link"
import { ArrowLeft, Shield, BookOpen, Lightbulb, Target, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VCAAHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFF2E8]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/resources">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Knowledge Hub
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <div className="mx-auto mb-6 bg-gradient-to-br from-[#FF9800] to-[#FFC107] w-20 h-20 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-fredoka text-gray-900 mb-3">VCAA (2.0) Knowledge Hub</h1>
          <p className="text-gray-600 font-nunito max-w-2xl mx-auto">
            Explore the Victorian Curriculum F–10 Version 2.0 overview, learning areas, capabilities, and implementation resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9800] to-[#FFC107] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Curriculum Overview</CardTitle>
                  <CardDescription>Design principles and structure</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                The Victorian Curriculum F–10 Version 2.0 sets out what every student should learn from Foundation to Year 10. It organizes learning through learning areas, capabilities, and clearly defined achievement standards.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Clear year-level progression across F–10</li>
                <li>Integrated capabilities across learning areas</li>
                <li>Flexible implementation for diverse contexts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Learning Areas</CardTitle>
                  <CardDescription>Eight disciplines</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>The Arts, English, Health and Physical Education</li>
                <li>Humanities, Languages, Mathematics, Science</li>
                <li>Technologies (Design & Digital Technologies)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Capabilities</CardTitle>
                  <CardDescription>Cross-disciplinary development</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Four capabilities are explicitly taught and applied across learning areas. They build learners’ thinking, values, cultural awareness and relationships.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Critical & Creative Thinking: question framing, idea generation, evaluation</li>
                <li>Ethical: concepts, dilemmas, consequences, reasoned decision-making</li>
                <li>Intercultural: perspective-taking, cultural practices, respectful interaction</li>
                <li>Personal & Social: self-awareness, self-management, collaboration</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6CAB] to-[#7366FF] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Achievement Standards</CardTitle>
                  <CardDescription>Progression and assessment</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Achievement standards describe what students are expected to understand and be able to do at each level.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Descriptors for each level across areas</li>
                <li>Guidance for monitoring progress</li>
                <li>Supports consistent reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C6FF] to-[#0072FF] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Foundational Skills</CardTitle>
                  <CardDescription>Digital Literacy, Literacy, Numeracy</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Three observable skill sets underpin learning and enable access to curriculum across F–10.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Digital Literacy: safe, purposeful technology use; information evaluation; creation</li>
                <li>Literacy: decoding, composing, interpreting texts across modes and disciplines</li>
                <li>Numeracy: applying mathematical ideas and reasoning in real contexts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Cross‑Curriculum Priorities</CardTitle>
                  <CardDescription>Perspectives and organising ideas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Aboriginal & Torres Strait Islander Histories and Cultures: Country/Place, Culture, People</li>
                <li>Asia and Australia’s Engagement with Asia: diversity, connections, contributions</li>
                <li>Sustainability: systems, worldviews, responsible design, futures thinking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Implementation Guidance</CardTitle>
                  <CardDescription>Practical strategies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Plan programs using content descriptions and standards</li>
                <li>Integrate capabilities within learning sequences</li>
                <li>Differentiate for diverse learners and contexts</li>
                <li>Use multiple assessment approaches</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md lg:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9333EA] to-[#4C1D95] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Taughtful Alignment</CardTitle>
                  <CardDescription>How Taughtful operationalises VC2.0</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Curriculum mapping: each lesson tagged to learning area, level, content description and achievement standard</li>
                <li>Capabilities embedding: prompts and tasks auto‑suggest capability links with evidence statements</li>
                <li>Foundational skills: templates surface literacy/numeracy/digital literacy opportunities in every sequence</li>
                <li>Assessment alignment: success criteria generated from standards; checklists for formative and summative tasks</li>
                <li>Equity & inclusion: supports Foundation Levels A–D and EAL pathways with adapted exemplars</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


