'use client'

import Link from 'next/link'
import { Home, BookOpen, LogIn } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function NavigationBar() {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-gray-800 shadow-lg'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Left: Branding */}
          <Link
            href='/'
            className='flex items-center gap-3 hover:opacity-80 transition-opacity'
          >
            <Image
              src='/images/taughtful-logo.png'
              alt='Taughtful'
              width={32}
              height={32}
              className='rounded-full'
            />
            <span className='text-xl font-black font-fredoka text-gray-800'>
              Taughtful Australia
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className='hidden md:flex items-center gap-2'>
            <Link href='/'>
              <Button
                variant='outline'
                size='sm'
                className='bg-pink-200/80 hover:bg-pink-300/80 text-gray-800 border-gray-800 font-semibold transition-all duration-200 hover:scale-105'
              >
                <Home className='w-4 h-4 mr-2' />
                Back to Home
              </Button>
            </Link>

            <Link href='/resources'>
              <Button
                variant='outline'
                size='sm'
                className='bg-green-200/80 hover:bg-green-300/80 text-gray-800 border-gray-800 font-semibold transition-all duration-200 hover:scale-105'
              >
                <BookOpen className='w-4 h-4 mr-2' />
                Learning Hub
              </Button>
            </Link>
          </div>

          {/* Right: Login */}
          <div className='flex items-center gap-2'>
            <Link href='/login'>
              <Button
                variant='outline'
                size='sm'
                className='bg-orange-200/80 hover:bg-orange-300/80 text-gray-800 border-gray-800 font-semibold transition-all duration-200 hover:scale-105'
              >
                <LogIn className='w-4 h-4 mr-2' />
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden mt-3 pt-3 border-t border-gray-300'>
          <div className='flex flex-wrap gap-2'>
            <Link href='/' className='flex-1'>
              <Button
                variant='outline'
                size='sm'
                className='w-full bg-pink-200/80 hover:bg-pink-300/80 text-gray-800 border-gray-800 font-semibold text-xs'
              >
                <Home className='w-3 h-3 mr-1' />
                Home
              </Button>
            </Link>

            <Link href='/resources' className='flex-1'>
              <Button
                variant='outline'
                size='sm'
                className='w-full bg-green-200/80 hover:bg-green-300/80 text-gray-800 border-gray-800 font-semibold text-xs'
              >
                <BookOpen className='w-3 h-3 mr-1' />
                Learning Hub
              </Button>
            </Link>

            <Link href='/login' className='flex-1'>
              <Button
                variant='outline'
                size='sm'
                className='w-full bg-orange-200/80 hover:bg-orange-300/80 text-gray-800 border-gray-800 font-semibold text-xs'
              >
                <LogIn className='w-3 h-3 mr-1' />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
