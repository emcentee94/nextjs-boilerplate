"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  showBackButton?: boolean
  backHref?: string
  backText?: string
}

export default function Header({ 
  showBackButton = false, 
  backHref = "/", 
  backText = "Back to Home" 
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <Image
                  src="/images/taughtful-logo-new.png"
                  alt="Taughtful Australia"
                  width={48}
                  height={48}
                  className="h-12 w-auto group-hover:scale-110 transition-transform duration-300 ring-2 ring-[#888625]/20 group-hover:ring-[#FD6585]/40 rounded-full"
                />
              </div>
              <span className="text-2xl font-black text-gray-900 font-fredoka group-hover:text-[#888625] transition-colors duration-300 tracking-wide">
                Taughtful Australia
              </span>
            </Link>
            
            {/* Knowledge Hub Button */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#888625] to-[#4CAF50] hover:from-[#888625]/90 hover:to-[#4CAF50]/90 text-white px-8 py-4 text-lg font-black shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group rounded-2xl border-4 border-[#FD6585] hover:border-[#FF9A2E] ring-4 ring-[#FD6585]/20 hover:ring-[#FF9A2E]/30 relative"
              asChild
            >
              <Link href="/resources" className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FD6585]/10 via-[#FF9A2E]/10 to-[#888625]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="mr-3 w-6 h-6 group-hover:animate-bounce relative z-10" />
                <span className="font-fredoka font-black text-xl tracking-wide relative z-10">Knowledge Hub</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300 relative z-10" />
              </Link>
            </Button>
          </div>
          
          {showBackButton && (
            <Button 
              variant="outline" 
              size="lg"
              className="border-3 border-[#888625] hover:border-[#FD6585] text-[#888625] hover:text-white hover:bg-[#FD6585] font-black text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-[#888625]/20 hover:ring-[#FD6585]/30"
              asChild
            >
              <Link href={backHref} className="font-fredoka tracking-wide">
                {backText}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
