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
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/taughtful-logo-new.png"
                alt="Taughtful Australia"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-gray-900 font-fredoka">Taughtful Australia</span>
            </Link>
            
            {/* Knowledge Hub Button */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#888625] to-[#4CAF50] hover:from-[#888625]/90 hover:to-[#4CAF50]/90 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group rounded-full border border-white/20 hover:border-white/40"
              asChild
            >
              <Link href="/resources">
                <BookOpen className="mr-2 w-4 h-4 group-hover:animate-bounce" />
                <span className="font-fredoka">Knowledge Hub</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
              </Link>
            </Button>
          </div>
          
          {showBackButton && (
            <Button variant="outline" asChild>
              <Link href={backHref} className="font-fredoka">
                {backText}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
