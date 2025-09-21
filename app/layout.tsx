import type React from "react"
import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
import { Nunito } from "next/font/google"
import { Suspense } from "react"
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
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
