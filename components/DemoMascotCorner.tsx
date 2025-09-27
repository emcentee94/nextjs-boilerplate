'use client'

import { useDemo } from '@/contexts/DemoContext'
import AnimatedMascot from '@/components/AnimatedMascot'

export default function DemoMascotCorner() {
  const { isDemo } = useDemo()

  if (!isDemo) return null

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
      <AnimatedMascot className='w-20 h-20 md:w-28 md:h-28' />
    </div>
  )
}
