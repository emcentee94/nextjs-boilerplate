import type React from 'react'
import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  return (
    <html lang='en' className='bg-transparent'>
      <body className={`font-sans ${fredoka.variable} ${nunito.variable}`}>
        {/* Header with Taughtful Logo */}
        <header className='bg-white shadow-sm border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-20'>
              <Link href='/' className='flex items-center space-x-4 group'>
                <div className='relative'>
                  <Image
                    src='/images/taughtful-logo-new.png'
                    alt='Taughtful Australia'
                    width={48}
                    height={48}
                    className='h-12 w-auto group-hover:scale-110 transition-transform duration-300 ring-2 ring-[#888625]/20 group-hover:ring-[#FD6585]/40 rounded-full'
                  />
                </div>
                <span className='text-2xl font-black text-gray-900 font-fredoka group-hover:text-[#888625] transition-colors duration-300 tracking-wide'>
                  Taughtful Australia
                </span>
              </Link>
              <nav className='hidden md:flex space-x-4'>
                <Link
                  href='/curriculum'
                  className='border-2 border-[#FF9A2E] text-[#FF9A2E] hover:bg-[#FF9A2E]/10 bg-[#FF9A2E]/5 px-4 py-2 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-700 hover:scale-105 font-fredoka tracking-wide'
                >
                  Curriculum
                </Link>
                <Link
                  href='/resources'
                  className='border-2 border-[#888625] text-[#888625] hover:bg-[#888625]/10 bg-[#888625]/5 px-4 py-2 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-700 hover:scale-105 font-fredoka tracking-wide'
                >
                  Resources
                </Link>
                <Link
                  href='/login'
                  className='border-2 border-[#FD6585] text-[#FD6585] hover:bg-[#FD6585]/10 bg-[#FD6585]/5 px-4 py-2 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-700 hover:scale-105 font-fredoka tracking-wide'
                >
                  Login
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
