"use client"

import React from "react"
import type { LucideIcon } from "lucide-react"
import {
  Leaf,
  Languages,
  Layers,
  ShieldCheck,
  Palette,
  Landmark,
  BadgeCheck,
  BookOpen,
} from "lucide-react"

type Item = {
  Icon: LucideIcon
  title: string
  body: string
  palette: {
    bg: string
    ring: string
    text: string
  }
}

const items: Item[] = [
  {
    Icon: Leaf,
    title: "Traditional Knowledge",
    body:
      "Ecological knowledge, oral traditions, and cultural practices are embedded with care—reflecting guidance on Aboriginal ways of knowing and doing without tokenism.",
    palette: { bg: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-900" },
  },
  {
    Icon: Languages,
    title: "Language & Identity",
    body:
      "Teacher-facing language mirrors current government terminology. Materials support language revitalisation and celebrate diverse Aboriginal and Torres Strait Islander identities.",
    palette: { bg: "bg-stone-50", ring: "ring-stone-200", text: "text-stone-900" },
  },
  {
    Icon: Layers,
    title: "Cross-Curriculum Priority",
    body:
      "Resources carry a clear First Nations perspective indicator, making integration across English, Science, Humanities, and the Arts simple and intentional.",
    palette: { bg: "bg-emerald-50", ring: "ring-emerald-200", text: "text-emerald-900" },
  },
  {
    Icon: ShieldCheck,
    title: "Guidance & Respectful Use",
    body:
      "Tooltips and brief checklists prompt respectful practice (acknowledgement of Traditional Owners, approved sources), aligning with official advice while keeping workload light.",
    palette: { bg: "bg-orange-50", ring: "ring-orange-200", text: "text-orange-900" },
  },
  {
    Icon: Palette,
    title: "Cultural Arts & Voices",
    body:
      "Indigenous-led art, music, performance, and storytelling are positioned as powerful learning tools—centering lived voices and contemporary expression.",
    palette: { bg: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-900" },
  },
  {
    Icon: Landmark,
    title: "Government-Aligned & Vetted",
    body:
      "Linked to trusted, government-endorsed materials (e.g., VCAA “Making Visible”) so teachers can plan with confidence that practice is aligned and culturally safe.",
    palette: { bg: "bg-stone-50", ring: "ring-stone-200", text: "text-stone-900" },
  },
]

export default function AboriginalPerspectivesNarrativeGrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10">
          <p className="mt-4 text-lg text-stone-700">
            At <span className="font-semibold">Taughtful</span>, embedding Aboriginal and Torres Strait
            Islander perspectives is a responsibility—not an add-on. The product and content teams have
            undertaken careful review of government standards, curriculum expectations, and Indigenous-led
            scholarship to ensure the approach is respectful, authentic, and free from tokenism. Every
            resource is checked against official frameworks and draws on recognised education bodies, so
            teachers can act with confidence.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-900 px-3 py-1 text-sm">
              <BadgeCheck className="w-4 h-4" aria-hidden /> Government-aligned
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-sm">
              <BadgeCheck className="w-4 h-4" aria-hidden /> Vetted sources
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 text-stone-900 px-3 py-1 text-sm">
              <BadgeCheck className="w-4 h-4" aria-hidden /> Anti-tokenism stance
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column: stance + references */}
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-stone-800" aria-hidden />
                Our stance
              </h3>
              <p className="mt-3 text-stone-700">
                Inclusion should be meaningful and safe. Prescriptive localisation that burdens teachers
                or oversteps cultural protocols is avoided. Instead, teachers are guided with clear
                language, perspective indicators, and pathways to reputable training and resources—so
                alignment is achievable in everyday planning.
              </p>
              <ul className="mt-4 space-y-2 text-stone-700">
                <li>• Respectful language consistent with current guidance</li>
                <li>• Perspective tags to scaffold planning choices</li>
                <li>• Reference pathways to recognised training and materials</li>
              </ul>

              <div className="mt-5 border-t border-stone-200 pt-4">
                <p className="text-sm text-stone-600 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" aria-hidden />
                  Selected references
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <a
                      className="underline decoration-stone-300 hover:decoration-stone-600 text-stone-800"
                      href="https://www.vcaa.vic.edu.au/professional-learning-programs/past-professional-learning-materials"
                      target="_blank" rel="noreferrer"
                    >
                      VCAA – Professional Learning (e.g., “Making Visible”)
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline decoration-stone-300 hover:decoration-stone-600 text-stone-800"
                      href="https://www.education.vic.gov.au/school/teachers/teachingresources/multicultural/Pages/koorieculture.aspx"
                      target="_blank" rel="noreferrer"
                    >
                      Education Vic – Koorie education & protocols
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((it, idx) => (
              <article
                key={idx}
                className={`group ${it.palette.bg} ring-1 ${it.palette.ring} rounded-2xl p-6 transition hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <it.Icon className={`w-6 h-6 ${it.palette.text}`} aria-hidden />
                  <div>
                    <h4 className={`text-lg font-semibold ${it.palette.text}`}>{it.title}</h4>
                    <p className="mt-2 text-stone-700">{it.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-12 text-lg text-stone-700">
          This is deliberate, research-driven work. By making Aboriginal perspectives a natural
          part of planning, <span className="font-semibold">Taughtful</span> stands with educators and First Nations
          communities—building classrooms that are inclusive, standards-aligned, and enriched by
          the world’s oldest continuous cultures.
        </p>

        {/* Community Priorities → Our Commitments grid */}
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-3 text-stone-800">
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">Community Priorities → Our Commitments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Row 1 */}
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4">
              <div className="text-stone-900 font-semibold">Legal permissions</div>
              <div className="text-stone-700 text-sm mt-1">Community Priorities</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-emerald-50 p-4">
              <div className="text-stone-900 font-semibold">Master IP agreement + source metadata schema</div>
              <div className="text-stone-700 text-sm mt-1">Our Commitments</div>
            </div>

            {/* Row 2 */}
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4">
              <div className="text-stone-900 font-semibold">Community consultation</div>
              <div className="text-stone-700 text-sm mt-1">Community Priorities</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-emerald-50 p-4">
              <div className="text-stone-900 font-semibold">Pre‑selected partner organisations + opt‑in co‑creation packs</div>
              <div className="text-stone-700 text-sm mt-1">Our Commitments</div>
            </div>

            {/* Row 3 */}
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4">
              <div className="text-stone-900 font-semibold">Attribution</div>
              <div className="text-stone-700 text-sm mt-1">Community Priorities</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-emerald-50 p-4">
              <div className="text-stone-900 font-semibold">Auto‑inserted in lesson footer + UX visibility</div>
              <div className="text-stone-700 text-sm mt-1">Our Commitments</div>
            </div>

            {/* Row 4 */}
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4">
              <div className="text-stone-900 font-semibold">AI misuse</div>
              <div className="text-stone-700 text-sm mt-1">Community Priorities</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-emerald-50 p-4">
              <div className="text-stone-900 font-semibold">No generation in cultural slots; source‑pick only</div>
              <div className="text-stone-700 text-sm mt-1">Our Commitments</div>
            </div>

            {/* Row 5 */}
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4">
              <div className="text-stone-900 font-semibold">Leadership concerns</div>
              <div className="text-stone-700 text-sm mt-1">Community Priorities</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-emerald-50 p-4">
              <div className="text-stone-900 font-semibold">Trust signal: “Every cultural insert is sourced, cited, and approved for classroom”</div>
              <div className="text-stone-700 text-sm mt-1">Our Commitments</div>
            </div>

            {/* Row 6 */}
            <div className="rounded-2xl border border-stone-200 bg-amber-50 p-4">
              <div className="text-stone-900 font-semibold">Teacher clarity</div>
              <div className="text-stone-700 text-sm mt-1">Community Priorities</div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-emerald-50 p-4">
              <div className="text-stone-900 font-semibold">Protocol note with each insert + default sources 100% compliant</div>
              <div className="text-stone-700 text-sm mt-1">Our Commitments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


