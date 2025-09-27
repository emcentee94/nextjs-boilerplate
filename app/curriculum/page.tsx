'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Search,
  Filter,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import LearningAreaList from '@/src/components/curriculum/LearningAreaList'
import { useState } from 'react'

export default function CurriculumPage() {
  const [version, setVersion] = useState<'1.0' | '2.0'>('2.0')
  const [region, setRegion] = useState<'NATIONAL' | 'VIC'>('NATIONAL')
  const curriculumHighlights = [
    {
      title: '8 Learning Areas',
      description: 'Comprehensive coverage from Foundation to Year 10',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'General Capabilities',
      description: 'Critical thinking, creativity, and digital literacy',
      icon: Lightbulb,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Cross-Curriculum Priorities',
      description: 'Indigenous perspectives and sustainability',
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Achievement Standards',
      description: 'Clear expectations for student learning',
      icon: Target,
      color: 'bg-orange-100 text-orange-700',
    },
  ]

  const quickActions = [
    {
      title: 'Browse by Subject',
      description: 'Explore specific learning areas',
      href: '#learning-areas',
      icon: BookOpen,
    },
    {
      title: 'Search Standards',
      description: 'Find specific curriculum outcomes',
      href: '#search',
      icon: Search,
    },
    {
      title: 'Filter by Year Level',
      description: 'View content by grade',
      href: '#filter',
      icon: Filter,
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#FDE5DA] via-white to-[#FFF2E8]'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4 font-fredoka'>
            Australian Curriculum v9
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto font-nunito'>
            Explore the comprehensive F–10 Australian Curriculum with its 8
            learning areas, general capabilities, and cross-curriculum
            priorities.
          </p>
        </div>

        {/* Region + Version */}
        <div className='mb-6 flex items-center justify-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Region</span>
            <select
              className='text-sm border rounded-md px-2 py-1 bg-white'
              value={region}
              onChange={(e) => {
                const r = e.target.value as 'NATIONAL' | 'VIC'
                setRegion(r)
                if (r === 'NATIONAL') setVersion('1.0')
              }}
            >
              <option value='NATIONAL'>Australia (AC v9)</option>
              <option value='VIC'>Victoria (VC 2.0)</option>
            </select>
          </div>
          {region === 'VIC' && (
            <div className='flex items-center gap-3'>
              <span
                className={`px-3 py-1 rounded-full text-sm ${version === '1.0' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setVersion('1.0')}
                role='button'
              >
                Version 1.0
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${version === '2.0' ? 'bg-[#FD6585] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setVersion('2.0')}
                role='button'
              >
                Version 2.0
              </span>
            </div>
          )}
        </div>

        {/* Curriculum Highlights */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 font-fredoka text-center'>
            Curriculum Overview
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {curriculumHighlights.map((highlight, index) => (
              <Card
                key={index}
                className='text-center hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full ${highlight.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <highlight.icon className='w-8 h-8' />
                  </div>
                  <CardTitle className='text-lg font-fredoka'>
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='font-nunito'>
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 font-fredoka text-center'>
            Quick Actions
          </h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className='hover:shadow-lg transition-shadow cursor-pointer group'
              >
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-[#FD6585] group-hover:text-white transition-colors'>
                      <action.icon className='w-5 h-5' />
                    </div>
                    <div>
                      <CardTitle className='text-lg font-fredoka'>
                        {action.title}
                      </CardTitle>
                      <CardDescription className='font-nunito'>
                        {action.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant='outline'
                    className='w-full group-hover:bg-[#FD6585] group-hover:text-white group-hover:border-[#FD6585] transition-colors'
                  >
                    Explore
                    <ArrowRight className='w-4 h-4 ml-2' />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Areas Section */}
        <div id='learning-areas' className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900 font-fredoka'>
                Learning Areas
              </h2>
              <p className='text-gray-600 font-nunito mt-2'>
                The 8 learning areas that form the foundation of the Australian
                Curriculum
              </p>
            </div>
            <Badge variant='outline' className='text-sm'>
              {curriculumHighlights[0].title}
            </Badge>
          </div>

          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <LearningAreaList version={version} />
            {region !== 'VIC' && (
              <p className='mt-3 text-xs text-gray-500'>
                Victorian Curriculum 2.0 options are only available when Region
                is set to Victoria.
              </p>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className='mt-16 text-center bg-white rounded-2xl p-8 shadow-lg'>
          <h3 className='text-2xl font-bold text-gray-900 mb-4 font-fredoka'>
            Ready to Create Curriculum-Aligned Lessons?
          </h3>
          <p className='text-gray-600 mb-6 font-nunito max-w-2xl mx-auto'>
            Use Taughtful's RAG-powered AI to generate lesson plans that
            perfectly align with Australian Curriculum v9 standards.
          </p>
          <div className='flex gap-4 justify-center'>
            <Button
              asChild
              className='bg-[#FD6585] hover:bg-[#E55A7A] text-white'
            >
              <Link href='/signup'>Start Creating Lessons</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/resources'>View Teaching Resources</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
