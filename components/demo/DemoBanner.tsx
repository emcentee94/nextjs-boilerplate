'use client'
import { useDemo } from '@/contexts/DemoContext'

export default function DemoBanner() {
  const { isDemo } = useDemo()
  if (!isDemo) return null
  return (
    <div className='w-full bg-amber-100 text-amber-900 text-sm px-4 py-2 border-b border-amber-200'>
      Demo Mode — Explore the dashboard and preview sample outputs. Sign up to
      generate your own.
    </div>
  )
}
