'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Shield,
  BookOpen,
  Lightbulb,
  Target,
  Heart,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function VCAAHubPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFF2E8]'>
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-8'>
          <Button asChild variant='outline' className='rounded-full'>
            <Link href='/resources'>
              <ArrowLeft className='mr-2 w-4 h-4' /> Back to Knowledge Hub
            </Link>
          </Button>
        </div>

        <div className='text-center mb-14'>
          <div className='mx-auto mb-6 bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] w-24 h-24 rounded-full flex items-center justify-center shadow-xl animate-float'>
            <Shield className='w-12 h-12 text-white' />
          </div>
          <h1 className='text-5xl font-black font-fredoka text-gray-900 mb-4'>
            VCAA (2.0) Knowledge Hub
          </h1>
          <p className='text-gray-700 font-nunito max-w-3xl mx-auto text-lg'>
            Explore the Victorian Curriculum F–10 Version 2.0 overview, learning
            areas, capabilities, and implementation resources.
          </p>
        </div>

        {/* Taughtful Alignment FIRST */}
        <div className='max-w-6xl mx-auto mb-10'>
          <div className='bg-white/90 border-4 border-[#FD6585]/20 rounded-3xl shadow-2xl p-8 text-center'>
            <div className='mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#9333EA] to-[#4C1D95] flex items-center justify-center'>
              <Target className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl md:text-4xl font-black font-fredoka mb-2'>
              Taughtful Alignment
            </h2>
            <p className='text-muted-foreground font-nunito mb-6'>
              How Taughtful operationalises VC2.0 for real classrooms
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-left'>
              <div className='bg-gradient-to-r from-[#FD6585]/10 to-[#FF9A2E]/10 rounded-2xl p-4 border-2 border-[#FD6585]/20'>
                <p className='text-sm text-gray-800'>
                  <span className='font-semibold'>Curriculum mapping:</span>{' '}
                  lessons tagged to learning area, level, content description
                  and achievement standard
                </p>
              </div>
              <div className='bg-gradient-to-r from-[#8E2DE2]/10 to-[#4A00E0]/10 rounded-2xl p-4 border-2 border-[#8E2DE2]/20'>
                <p className='text-sm text-gray-800'>
                  <span className='font-semibold'>Capabilities embedding:</span>{' '}
                  auto‑suggested links with evidence statements
                </p>
              </div>
              <div className='bg-gradient-to-r from-[#00C6FF]/10 to-[#0072FF]/10 rounded-2xl p-4 border-2 border-[#00C6FF]/20'>
                <p className='text-sm text-gray-800'>
                  <span className='font-semibold'>Foundational skills:</span>{' '}
                  templates surface literacy/numeracy/digital literacy
                  opportunities
                </p>
              </div>
              <div className='bg-gradient-to-r from-[#22C55E]/10 to-[#16A34A]/10 rounded-2xl p-4 border-2 border-[#22C55E]/20'>
                <p className='text-sm text-gray-800'>
                  <span className='font-semibold'>Assessment alignment:</span>{' '}
                  success criteria from standards; formative + summative
                  checklists
                </p>
              </div>
              <div className='md:col-span-2 bg-gradient-to-r from-[#FF6CAB]/10 to-[#7366FF]/10 rounded-2xl p-4 border-2 border-[#FF6CAB]/20'>
                <p className='text-sm text-gray-800'>
                  <span className='font-semibold'>Equity & inclusion:</span>{' '}
                  supports Foundation Levels A–D and EAL pathways with adapted
                  exemplars
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          <Card className='shadow-md text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9800] to-[#FFC107] flex items-center justify-center'>
                  <Shield className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>
                    Curriculum Overview
                  </CardTitle>
                  <CardDescription className='font-semibold'>
                    Design principles and structure
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-800 mb-3'>
                The Victorian Curriculum F–10 Version 2.0 sets out what every
                student should learn from Foundation to Year 10. It organizes
                learning through learning areas, capabilities, and clearly
                defined achievement standards.
              </p>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>Clear year-level progression across F–10</li>
                <li>Integrated capabilities across learning areas</li>
                <li>Flexible implementation for diverse contexts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] flex items-center justify-center'>
                  <BookOpen className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>Learning Areas</CardTitle>
                  <CardDescription className='font-semibold'>
                    Eight disciplines
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>The Arts, English, Health and Physical Education</li>
                <li>Humanities, Languages, Mathematics, Science</li>
                <li>Technologies (Design & Digital Technologies)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] flex items-center justify-center'>
                  <Lightbulb className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>Capabilities</CardTitle>
                  <CardDescription className='font-semibold'>
                    Cross-disciplinary development
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-800 mb-3'>
                Four capabilities are explicitly taught and applied across
                learning areas. They build learners’ thinking, values, cultural
                awareness and relationships.
              </p>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>
                  Critical & Creative Thinking: question framing, idea
                  generation, evaluation
                </li>
                <li>
                  Ethical: concepts, dilemmas, consequences, reasoned
                  decision-making
                </li>
                <li>
                  Intercultural: perspective-taking, cultural practices,
                  respectful interaction
                </li>
                <li>
                  Personal & Social: self-awareness, self-management,
                  collaboration
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6CAB] to-[#7366FF] flex items-center justify-center'>
                  <Target className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>
                    Achievement Standards
                  </CardTitle>
                  <CardDescription className='font-semibold'>
                    Progression and assessment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-800 mb-3'>
                Achievement standards describe what students are expected to
                understand and be able to do at each level.
              </p>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>Descriptors for each level across areas</li>
                <li>Guidance for monitoring progress</li>
                <li>Supports consistent reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#00C6FF] to-[#0072FF] flex items-center justify-center'>
                  <BookOpen className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>
                    Foundational Skills
                  </CardTitle>
                  <CardDescription className='font-semibold'>
                    Digital Literacy, Literacy, Numeracy
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-800 mb-3'>
                Three observable skill sets underpin learning and enable access
                to curriculum across F–10.
              </p>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>
                  Digital Literacy: safe, purposeful technology use; information
                  evaluation; creation
                </li>
                <li>
                  Literacy: decoding, composing, interpreting texts across modes
                  and disciplines
                </li>
                <li>
                  Numeracy: applying mathematical ideas and reasoning in real
                  contexts
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center'>
                  <Heart className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>
                    Cross‑Curriculum Priorities
                  </CardTitle>
                  <CardDescription className='font-semibold'>
                    Perspectives and organising ideas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>
                  Aboriginal & Torres Strait Islander Histories and Cultures:
                  Country/Place, Culture, People
                </li>
                <li>
                  Asia and Australia’s Engagement with Asia: diversity,
                  connections, contributions
                </li>
                <li>
                  Sustainability: systems, worldviews, responsible design,
                  futures thinking
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md lg:col-span-2 text-center'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] flex items-center justify-center'>
                  <Heart className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='font-black'>
                    Implementation Guidance
                  </CardTitle>
                  <CardDescription className='font-semibold'>
                    Practical strategies
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className='list-disc list-inside text-sm text-gray-800 space-y-1'>
                <li>Plan programs using content descriptions and standards</li>
                <li>Integrate capabilities within learning sequences</li>
                <li>Differentiate for diverse learners and contexts</li>
                <li>Use multiple assessment approaches</li>
              </ul>
            </CardContent>
          </Card>
          {/* Taughtful Alignment moved to the top */}
        </div>
      </div>
    </div>
  )
}
