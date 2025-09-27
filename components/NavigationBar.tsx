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
                className='px-6 py-3 rounded-2xl border-2 border-[#FD6585] text-[#FD6585] bg-[#FD6585]/5 shadow-md transition-all duration-300 hover:bg-[#FD6585] hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] group font-nunito'
              >
                <Home className='w-4 h-4 mr-2' />
                Back to Home
              </Button>
            </Link>

            <Link href='/resources'>
              <Button
                variant='outline'
                size='sm'
                className='px-6 py-3 rounded-2xl border-2 border-[#888625] text-[#888625] bg-[#888625]/5 shadow-md transition-all duration-300 hover:bg-[#888625] hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] group font-nunito'
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
                className='px-6 py-3 rounded-2xl border-2 border-[#FF9A2E] text-[#FF9A2E] bg-[#FF9A2E]/5 shadow-md transition-all duration-300 hover:bg-[#FF9A2E] hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] group font-nunito'
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
                className='w-full px-4 py-2 rounded-2xl border-2 border-[#FD6585] text-[#FD6585] bg-[#FD6585]/5 shadow-md transition-all duration-300 hover:bg-[#FD6585] hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] group font-nunito text-xs'
              >
                <Home className='w-3 h-3 mr-1' />
                Home
              </Button>
            </Link>

            <Link href='/resources' className='flex-1'>
              <Button
                variant='outline'
                size='sm'
                className='w-full px-4 py-2 rounded-2xl border-2 border-[#888625] text-[#888625] bg-[#888625]/5 shadow-md transition-all duration-300 hover:bg-[#888625] hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] group font-nunito text-xs'
              >
                <BookOpen className='w-3 h-3 mr-1' />
                Learning Hub
              </Button>
            </Link>

            <Link href='/login' className='flex-1'>
              <Button
                variant='outline'
                size='sm'
                className='w-full px-4 py-2 rounded-2xl border-2 border-[#FF9A2E] text-[#FF9A2E] bg-[#FF9A2E]/5 shadow-md transition-all duration-300 hover:bg-[#FF9A2E] hover:text-white hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] group font-nunito text-xs'
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
