"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, X, Search, Layers, Rocket, AlertTriangle, Sparkles, Star } from "lucide-react"

export default function RAGSection() {
  return (
    <div className="py-12 px-4">
      {/* Hero Heading */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="flex justify-center mb-4">
          <div className="bg-[#888625]/15 px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
            <Star className="text-[#888625] w-5 h-5" />
            <span className="text-[#888625] font-semibold uppercase tracking-wide text-sm">
              Why Taughtful is Different
            </span>
          </div>
        </div>
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          The Secret Sauce: <span className="text-[#888625]">R.A.G.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Retrieval-Augmented Generation <span className="font-semibold">does the homework first</span>. Our AI checks real
          curriculum and pedagogy before it writes—so you get <span className="text-[#888625] font-bold">classroom-ready plans</span>, not guesses.
        </p>
      </div>

      {/* Two Quotes Row */}
      <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-10">
        <blockquote className="bg-[#FD6585]/15 text-[#333333] px-6 py-4 rounded-2xl shadow-md text-lg md:text-xl italic font-medium">
          “I've tested AI tools for quizzes, slides, and lessons—options are obvious, slides dated, language awkward, visuals wrong. I end up reworking everything.”
          <footer className="mt-2 text-right font-semibold block text-[#333333]">— Matt, Year 9 Science teacher (VIC)</footer>
        </blockquote>
        <blockquote className="bg-[#888625]/15 text-[#333333] px-6 py-4 rounded-2xl shadow-md text-lg md:text-xl italic font-medium">
          “Taughtful’s plans just get it. No more tweaking generic AI output—it’s thoughtful from the start.”
          <footer className="mt-2 text-right font-semibold block text-[#333333]">— Safi, Year 5 teacher (VIC)</footer>
        </blockquote>
      </div>

      {/* 3-Step Explainer */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-[#888625]/15 p-4 rounded-full shadow-md mb-3">
            <Search className="text-[#888625] w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-[#888625] tracking-wide uppercase text-center mb-2">Retrieve</h3>
          <Card className="bg-white rounded-2xl shadow-lg border border-[#888625]/30 w-full h-full flex items-center justify-center">
            <CardContent className="px-6 py-6">
              <p className="text-gray-700 leading-relaxed text-center">
                Searches trusted curriculum, pedagogy, and exemplars—no guessing.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-[#FF9A2E]/15 p-4 rounded-full shadow-md mb-3">
            <Layers className="text-[#FF9A2E] w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-[#FF9A2E] tracking-wide uppercase text-center mb-2">Ground</h3>
          <Card className="bg-white rounded-2xl shadow-lg border border-[#FF9A2E]/30 w-full h-full flex items-center justify-center">
            <CardContent className="px-6 py-6">
              <p className="text-gray-700 leading-relaxed text-center">
                Builds to your level with real achievement standards and goals.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-[#FD6585]/15 p-4 rounded-full shadow-md mb-3">
            <Rocket className="text-[#FD6585] w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-[#FD6585] tracking-wide uppercase text-center mb-2">Deliver</h3>
          <Card className="bg-white rounded-2xl shadow-lg border border-[#FD6585]/30 w-full h-full flex items-center justify-center">
            <CardContent className="px-6 py-6">
              <p className="text-gray-700 leading-relaxed text-center">
                Hands you plans, quizzes, and slides you can teach tomorrow.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card className="bg-red-50 rounded-2xl shadow-md border border-red-200 w-full h-full">
          <CardContent className="px-6 md:px-8 py-6 md:py-8 text-center flex flex-col justify-between h-full">
            <div className="flex flex-col items-center mb-4 md:mb-6">
              <AlertTriangle className="text-red-500 w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold text-red-600">Generic AI Tools</h3>
            </div>
            <ul className="space-y-3 md:space-y-4 text-gray-700 text-left">
              <li className="flex items-start"><X className="text-red-500 mt-1 mr-3" /> <span><span className="font-semibold">Slides</span> feel dated and generic</span></li>
              <li className="flex items-start"><X className="text-red-500 mt-1 mr-3" /> <span><span className="font-semibold">Quiz options</span> are obvious or irrelevant</span></li>
              <li className="flex items-start"><X className="text-red-500 mt-1 mr-3" /> <span><span className="font-semibold">Tone</span> is awkward or stiff</span></li>
              <li className="flex items-start"><X className="text-red-500 mt-1 mr-3" /> <span><span className="font-semibold">Diagrams</span> are wrong or irrelevant</span></li>
              <li className="flex items-start"><X className="text-red-500 mt-1 mr-3" /> <span>“Saves time” but <span className="font-semibold">forces rework</span></span></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#888625]/10 rounded-2xl shadow-md border border-[#888625]/30 w-full h-full">
          <CardContent className="px-6 md:px-8 py-6 md:py-8 text-center flex flex-col justify-between h-full">
            <div className="flex flex-col items-center mb-4 md:mb-6">
              <Sparkles className="text-[#888625] w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold text-[#888625]">Taughtful with R.A.G.</h3>
            </div>
            <ul className="space-y-3 md:space-y-4 text-gray-700 text-left">
              <li className="flex items-start"><Check className="text-[#888625] mt-1 mr-3" /> <span><span className="font-semibold">Slides</span> follow evidence-based pedagogy</span></li>
              <li className="flex items-start"><Check className="text-[#888625] mt-1 mr-3" /> <span><span className="font-semibold">Quiz options</span> use real student misconceptions</span></li>
              <li className="flex items-start"><Check className="text-[#888625] mt-1 mr-3" /> <span><span className="font-semibold">Tone</span> is teacher-ready, scaffolded & natural</span></li>
              <li className="flex items-start"><Check className="text-[#888625] mt-1 mr-3" /> <span><span className="font-semibold">Visuals</span> are curriculum-aligned</span></li>
              <li className="flex items-start"><Check className="text-[#888625] mt-1 mr-3" /> <span><span className="font-semibold">Classroom-ready</span> on day one</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


