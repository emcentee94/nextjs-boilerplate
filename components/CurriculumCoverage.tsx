"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"

type CardSpec = {
  key: string
  abbr: string
  name: string
  sub: string
  color: "emerald" | "indigo" | "blue" | "amber" | "purple"
  viewMapping?: boolean
  href?: string
}

const colorClasses: Record<CardSpec["color"], {
  cardBg: string
  cardBorder: string
  circleBorder: string
  circleBg: string
  circleText: string
  nameText: string
  linkText: string
  verifiedText: string
}> = {
  emerald: {
    cardBg: "from-emerald-50 to-emerald-100",
    cardBorder: "border-emerald-300",
    circleBorder: "border-emerald-600",
    circleBg: "bg-emerald-100",
    circleText: "text-emerald-700",
    nameText: "text-emerald-800",
    linkText: "text-emerald-700",
    verifiedText: "text-emerald-600",
  },
  indigo: {
    cardBg: "from-indigo-50 to-indigo-100",
    cardBorder: "border-indigo-300",
    circleBorder: "border-indigo-600",
    circleBg: "bg-indigo-100",
    circleText: "text-indigo-700",
    nameText: "text-indigo-800",
    linkText: "text-indigo-700",
    verifiedText: "text-indigo-600",
  },
  blue: {
    cardBg: "from-blue-50 to-blue-100",
    cardBorder: "border-blue-300",
    circleBorder: "border-blue-600",
    circleBg: "bg-blue-100",
    circleText: "text-blue-700",
    nameText: "text-blue-800",
    linkText: "text-blue-700",
    verifiedText: "text-blue-600",
  },
  amber: {
    cardBg: "from-amber-50 to-amber-100",
    cardBorder: "border-amber-300",
    circleBorder: "border-amber-600",
    circleBg: "bg-amber-100",
    circleText: "text-amber-700",
    nameText: "text-amber-800",
    linkText: "text-amber-700",
    verifiedText: "text-amber-600",
  },
  purple: {
    cardBg: "from-purple-50 to-purple-100",
    cardBorder: "border-purple-300",
    circleBorder: "border-purple-600",
    circleBg: "bg-purple-100",
    circleText: "text-purple-700",
    nameText: "text-purple-800",
    linkText: "text-purple-700",
    verifiedText: "text-purple-600",
  },
}

export default function CurriculumCoverage() {
  const cards: CardSpec[] = [
    { key: "acara", abbr: "AC", name: "ACARA", sub: "Australian Curriculum v9", color: "emerald" },
    { key: "vcaa", abbr: "VIC", name: "VCAA", sub: "Victorian F–10 v2.0", color: "indigo", viewMapping: true, href: "/curriculum/vic" },
    { key: "nesa", abbr: "NSW", name: "NESA", sub: "NSW Syllabus", color: "blue" },
    { key: "qcaa", abbr: "QLD", name: "QCAA", sub: "Queensland Curriculum", color: "amber" },
    { key: "scsa", abbr: "WA", name: "SCSA", sub: "Western Australian Curriculum", color: "purple" },
  ]

  const areas = [
    { name: "English", color: "bg-pink-200 text-pink-900" },
    { name: "Mathematics", color: "bg-blue-200 text-blue-900" },
    { name: "Science", color: "bg-green-200 text-green-900" },
    { name: "Health & PE", color: "bg-yellow-200 text-yellow-900" },
    { name: "HASS", color: "bg-purple-200 text-purple-900" },
    { name: "The Arts", color: "bg-indigo-200 text-indigo-900" },
    { name: "Technologies", color: "bg-teal-200 text-teal-900" },
    { name: "Languages", color: "bg-red-200 text-red-900" },
  ]

  return (
    <section className="bg-gradient-to-b from-rose-50 to-amber-50 py-16 px-6 md:px-12">
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">Every Australian Curriculum Covered</h2>
        <p className="mt-3 text-lg text-gray-800">
          Mapped automatically to your state’s framework — ready to teach.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-8">
        {cards.map((c) => {
          const cc = colorClasses[c.color]
          return (
            <a
              key={c.key}
              href={c.viewMapping ? c.href : undefined}
              className={`group rounded-2xl bg-gradient-to-br ${cc.cardBg} border ${cc.cardBorder} shadow-md hover:shadow-xl hover:-translate-y-1 transition transform p-6 block text-center`}
            >
              <div className="flex flex-col items-center mb-3">
                <span className={`h-16 w-16 rounded-full border-4 ${cc.circleBorder} ${cc.circleBg} grid place-content-center text-lg font-bold ${cc.circleText} mb-2 transition-transform group-hover:scale-110`}>
                  {c.abbr}
                </span>
                <h3 className={`text-xl font-bold ${cc.nameText}`}>{c.name}</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">{c.sub}</p>
              {c.viewMapping && (
                <span className={`inline-flex items-center gap-2 ${cc.linkText} font-semibold group-hover:underline`}>
                  View mapping <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
              <div className="mt-4 flex justify-center">
                <span className={`flex items-center gap-1 ${cc.verifiedText} text-xs font-semibold`}>
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </span>
              </div>
            </a>
          )
        })}
      </div>

      <div className="max-w-6xl mx-auto mb-12">
        <div className="rounded-xl bg-gradient-to-r from-lime-100 via-emerald-50 to-lime-100 border border-lime-300 px-6 py-4 text-center text-sm text-gray-800 shadow-sm font-medium">
          <span className="font-bold text-lime-700">Auto-mapped</span> standards • State-specific language • 100% alignment
        </div>
      </div>

      {/* All F–10 Learning Areas section removed as requested */}
    </section>
  )
}


