import type React from "react"
import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
})

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "Taughtful - Learning Made Delightful",
  description:
    "Transform the way you learn and teach with AI that understands your unique style. Make every lesson engaging, personalized, and fun.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-transparent">
      <body className={`font-sans ${fredoka.variable} ${nunito.variable}`}>
        {/* Header with Taughtful Logo */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/taughtful-logo-new.png"
                  alt="Taughtful Australia"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-xl font-semibold text-gray-900 font-[Fredoka]">Taughtful Australia</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium font-[Nunito]">
                  Dashboard
                </Link>
                <Link href="/curriculum" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium font-[Nunito]">
                  Curriculum
                </Link>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium font-[Nunito]">
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
