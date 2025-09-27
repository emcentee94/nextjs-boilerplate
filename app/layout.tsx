import type React from 'react'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Suspense } from 'react'
import { DemoProvider } from '@/contexts/DemoContext'
import AnimatedMascot from '@/components/AnimatedMascot'
import { useDemo } from '@/contexts/DemoContext'

import './globals.css'

const fredoka = Fredoka({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fredoka',
})

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Taughtful - trauma informed, culturally safe',
  description:
    'Transform the way you learn and teach with AI that understands your unique style. Make every lesson engaging, personalized, and fun.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Use a client-side hook for Demo Mode
  function DemoMascotCorner() {
    const { isDemo } = useDemo()
    if (!isDemo) return null
    return (
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
        <AnimatedMascot className='w-20 h-20 md:w-28 md:h-28' />
      </div>
    )
  }
  return (
    <html lang='en' className='bg-transparent'>
      <body className={`font-sans ${fredoka.variable} ${nunito.variable}`}>
        <DemoProvider>
          <DemoMascotCorner />
          <Suspense fallback={null}>{children}</Suspense>
        </DemoProvider>
        <Analytics />
      </body>
    </html>
  )
}
