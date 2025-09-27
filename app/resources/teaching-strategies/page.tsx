'use client'

import Link from 'next/link'
import { ArrowLeft, Lightbulb } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TeachingStrategiesHub() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#F0FFF4] via-white to-[#E8FFF7]'>
      <div className='container mx-auto px-4 py-12'>
        <div className='mb-8'>
          <Button asChild variant='outline' className='rounded-full'>
            <Link href='/resources'>
              <ArrowLeft className='mr-2 w-4 h-4' /> Back to Knowledge Hub
            </Link>
          </Button>
        </div>

        <div className='text-center mb-12'>
          <div className='mx-auto mb-6 bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] w-16 h-16 rounded-full flex items-center justify-center'>
            <Lightbulb className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2 font-fredoka'>
            Teaching Strategies
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto font-nunito'>
            Practical, evidence‑based strategies you can apply tomorrow, with
            built‑in differentiation and wellbeing.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <Card className='shadow-md'>
            <CardHeader>
              <CardTitle>Trauma‑informed practice</CardTitle>
              <CardDescription>
                Regulation, routine, relationships
              </CardDescription>
            </CardHeader>
            <CardContent className='text-sm text-gray-700 space-y-2'>
              <ul className='list-disc list-inside space-y-1'>
                <li>Predictable structures and visual timers</li>
                <li>Low‑stakes entry and choice in tasks</li>
                <li>De‑escalation and co‑regulation routines</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md'>
            <CardHeader>
              <CardTitle>Indigenous perspectives</CardTitle>
              <CardDescription>Respectful embedding pathways</CardDescription>
            </CardHeader>
            <CardContent className='text-sm text-gray-700 space-y-2'>
              <ul className='list-disc list-inside space-y-1'>
                <li>Contextual to deep integration choices</li>
                <li>Use local protocols and approved materials</li>
                <li>8 Ways alignment for task design</li>
              </ul>
            </CardContent>
          </Card>

          <Card className='shadow-md'>
            <CardHeader>
              <CardTitle>Differentiation toolkit</CardTitle>
              <CardDescription>
                Light / Balanced / Full scaffolds
              </CardDescription>
            </CardHeader>
            <CardContent className='text-sm text-gray-700 space-y-2'>
              <p>
                Adjust inputs, outputs, time, and supports. Pair with formative
                checks to move students within their ZPD.
              </p>
            </CardContent>
          </Card>

          <Card className='shadow-md'>
            <CardHeader>
              <CardTitle>Try it in Taughtful</CardTitle>
              <CardDescription>
                Generate a plan with selected strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href='/dashboard'>Open Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
