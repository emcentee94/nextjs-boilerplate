"use client"

import { ShieldCheck, Users, BadgeCheck, Lock, CheckCircle2, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type ColorKey = "emerald" | "indigo" | "sky" | "rose" | "amber" | "violet"

const colorClasses: Record<ColorKey, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-700" },
  sky: { bg: "bg-sky-100", text: "text-sky-700" },
  rose: { bg: "bg-rose-100", text: "text-rose-700" },
  amber: { bg: "bg-amber-100", text: "text-amber-700" },
  violet: { bg: "bg-violet-100", text: "text-violet-700" },
}

export default function CulturalSafeguardsGrid() {
  const items: Array<{ icon: JSX.Element; title: string; desc: string; color: ColorKey }> = [
    {
      icon: <Lock className="w-6 h-6" />, title: "Permissions",
      desc: "All content is governed by a Master IP agreement with clear source metadata",
      color: "emerald",
    },
    {
      icon: <Users className="w-6 h-6" />, title: "Community voice",
      desc: "Collaboration with community organisations",
      color: "indigo",
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />, title: "Attribution",
      desc: "Cultural contributions are auto‑attributed in lesson footers and visible in the UX",
      color: "sky",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />, title: "AI misuse",
      desc: "AI cannot generate in cultural slots; only approved sources can be selected",
      color: "rose",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />, title: "Leadership trust",
      desc: "Every cultural insert is sourced, cited, and verified for classroom use",
      color: "amber",
    },
    {
      icon: <Info className="w-6 h-6" />, title: "Teacher clarity",
      desc: "Each insert comes with a protocol note; all defaults are 100% compliant",
      color: "violet",
    },
  ]

  return (
    <section className="py-14 px-6 md:px-12 bg-white/60">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Prioritising Cultural Safety in EduTech</h2>
        <p className="text-gray-700 mt-3 text-lg">Practical safeguards that respect Country, Culture, and Community—built into every lesson.</p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2">
        {items.map((it) => {
          const cc = colorClasses[it.color]
          return (
            <Card key={it.title} className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`shrink-0 rounded-full p-3 ${cc.bg} ${cc.text}`}>{it.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{it.title}</h3>
                  <p className="text-gray-700 mt-1 leading-relaxed">{it.desc}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}


