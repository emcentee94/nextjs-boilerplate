'use client'

import Image from 'next/image'
import React from 'react'

export default function AnimatedMascot({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <div className='animate-mascot-float will-change-transform [animation-duration:6s]'>
        <div className='[transform:rotate(-2deg)] hover:[transform:rotate(2deg)] transition-transform duration-500'>
          <div className='w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-[#FD6585]/30 bg-white shadow-xl'>
            <Image
              src='/images/mascot.png'
              alt='Taughtful Mascot'
              width={224}
              height={224}
              priority
              className='rounded-full object-cover w-full h-full'
            />
          </div>
        </div>
      </div>
      <div className='absolute -z-10 left-6 right-6 bottom-0 h-6 bg-black/10 blur-2xl rounded-full animate-pulse' />
      <div className='w-full flex justify-center mt-2'>
        <div
          className='px-4 py-1 rounded-full shadow-md border border-[#FD6585]/40 text-sm font-semibold'
          style={{
            minWidth: 160,
            textAlign: 'center',
            background: '#FD6585',
            color: 'white',
          }}
        >
          Hello! my name is{' '}
          <span className='font-bold text-white'>Dee Moe</span>
        </div>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        @keyframes mascot-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-mascot-float {
          animation: mascot-float ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
