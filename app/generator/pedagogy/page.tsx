"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function PedagogyGenerator() {
  const searchParams = useSearchParams()

  const authorityParam = searchParams.get("authority") || "ACARA"
  const versionParam = searchParams.get("version") || (authorityParam === "ACARA" ? "v9" : "V1.0")
  const subjectParam = searchParams.get("subject") || "English"
  const yearParam = searchParams.get("year") || "5"
  const minutesParam = parseInt(searchParams.get("minutes") || "45", 10)
  const levelParam = searchParams.get("level") || "Standard"
  const selectedStandardsParam = searchParams.get("selectedStandards") || "[]"
  const classSizeParam = parseInt(searchParams.get("classSize") || "25", 10)
  const abilityRangeParam = searchParams.get("abilityRange") || "Mixed"
  const specialNeedsParam = searchParams.get("specialNeeds") || "[]"

  const [authority, setAuthority] = useState(authorityParam)
  const [version, setVersion] = useState(versionParam)
  const [subject, setSubject] = useState(subjectParam)
  const [year, setYear] = useState(yearParam)
  const [minutes, setMinutes] = useState(minutesParam)
  const [level, setLevel] = useState(levelParam)
  const [selectedStandards, setSelectedStandards] = useState<string[]>([])
  const [classSize, setClassSize] = useState(classSizeParam)
  const [abilityRange, setAbilityRange] = useState(abilityRangeParam)
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([])
  const [pedagogyApproach, setPedagogyApproach] = useState("Trauma-Informed")
  const [scaffoldingLevel, setScaffoldingLevel] = useState("Moderate")
  const [indigenousPerspectives, setIndigenousPerspectives] = useState(true)
  const [showPedagogyInfo, setShowPedagogyInfo] = useState(false)
  const [showScaffoldingInfo, setShowScaffoldingInfo] = useState(false)
  const [showIndigenousInfo, setShowIndigenousInfo] = useState(false)

  useEffect(() => {
    setAuthority(authorityParam)
    setVersion(versionParam)
    setSubject(subjectParam)
    setYear(yearParam)
    setMinutes(minutesParam)
    setLevel(levelParam)
    setClassSize(classSizeParam)
    setAbilityRange(abilityRangeParam)
    try {
      setSelectedStandards(JSON.parse(selectedStandardsParam))
      setSpecialNeeds(JSON.parse(specialNeedsParam))
    } catch {
      setSelectedStandards([])
      setSpecialNeeds([])
    }
  }, [authorityParam, versionParam, subjectParam, yearParam, minutesParam, levelParam, selectedStandardsParam, classSizeParam, abilityRangeParam, specialNeedsParam])

  const tabs = [
    {
      key: "basics",
      label: "Lesson Basics",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path
            fill="currentColor"
            d="M4 6a2 2 0 0 1 2-2h9a1 1 0 0 1 .8.4l3.2 4.2a1 1 0 0 1 .2.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm11 0H6v12h12V9h-3a2 2 0 0 1-2-2V6Z"
          />
        </svg>
      ),
    },
    {
      key: "standards",
      label: "Curriculum Standards",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path fill="currentColor" d="M5 4h14v2H5V4Zm0 7h14v2H5v-2Zm0 7h14v2H5v-2Z" />
        </svg>
      ),
    },
    {
      key: "profile",
      label: "Class Profile",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path
            fill="currentColor"
            d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"
          />
        </svg>
      ),
    },
    {
      key: "pedagogy",
      label: "Pedagogy & Scaffolds",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path fill="currentColor" d="M3 4h18v2H3V4Zm2 4h14v12H5V8Zm4 2v8h2v-8H9Zm4 0v8h2v-8h-2Z" />
        </svg>
      ),
    },
    {
      key: "review",
      label: "Review & Generate",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm1 5v6l5 3-.8 1.4L11 14V7h2Z"
          />
        </svg>
      ),
    },
  ] as const

  const activeKey = "pedagogy"

  const pedagogyOptions = ["Trauma-Informed", "Inquiry-Based", "Direct Instruction", "Collaborative Learning", "Differentiated Instruction"]
  const scaffoldingOptions = ["Minimal", "Moderate", "Extensive", "Adaptive"]

  return (
    <div className="min-h-screen w-full bg-[#FDE5DA] text-[#333]">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8">
        <header className="sticky top-0 z-10 bg-[#FDE5DA]/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur flex items-center justify-between mb-4 lg:mb-6 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight">Teacher Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium px-3 py-1 rounded-full bg-white border border-[#e9e9e9]">
              Preview
            </div>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2 mb-4 lg:mb-6">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              className={`group inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${
                t.key === activeKey
                  ? "bg-white text-[#333] shadow-sm border-[#CBD5C0] ring-2 ring-[#888625]/20"
                  : "bg-white/60 text-[#333] hover:bg-white border-[#eee] hover:border-[#CBD5C0]"
              }`}
            >
              <span
                className={`p-1 rounded-full ${
                  t.key === activeKey
                    ? "bg-[#888625] text-white"
                    : "bg-white text-[#333] group-hover:text-[#888625]"
                }`}
                aria-hidden
              >
                {t.icon}
              </span>
              <span className="text-sm font-semibold">
                {i + 1}. {t.label}
              </span>
            </button>
          ))}
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[70vh]">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 relative overflow-hidden border border-[#EFEFEF] h-full">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FF9A2E]/10" />
            <div className="absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-[#FD6585]/10" />
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-[#888625]/10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#888625]/10 flex items-center justify-center ring-1 ring-[#CBD5C0]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#888625]" aria-hidden>
                    <path fill="currentColor" d="M3 4h18v2H3V4Zm2 4h14v12H5V8Zm4 2v8h2v-8H9Zm4 0v8h2v-8h-2Z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Pedagogy & Scaffolds</h2>
                  <p className="text-sm text-[#666]">Choose your teaching approach and support level.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Subject</div>
                  <div className="font-semibold">{subject}</div>
                </div>
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Year</div>
                  <div className="font-semibold">{year}</div>
                </div>
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Class Size</div>
                  <div className="font-semibold">{classSize} students</div>
                </div>
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Ability</div>
                  <div className="font-semibold">{abilityRange}</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Pedagogy Approach */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Teaching Approach
                    </label>
                    <button
                      onClick={() => setShowPedagogyInfo(!showPedagogyInfo)}
                      className="w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors"
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                  {showPedagogyInfo && (
                    <div className="mb-3 p-3 rounded-lg bg-[#F7FBF3] border border-[#CBD5C0] text-xs">
                      <div className="font-semibold text-[#888625] mb-1">Teaching Approaches</div>
                      <div className="space-y-1 text-[#666]">
                        <div>• <strong>Trauma-Informed:</strong> Safe, predictable, choice-based learning</div>
                        <div>• <strong>Inquiry-Based:</strong> Student-driven questions and discovery</div>
                        <div>• <strong>Direct Instruction:</strong> Explicit teaching with clear steps</div>
                        <div>• <strong>Collaborative:</strong> Group work and peer learning</div>
                      </div>
                    </div>
                  )}
                  <select
                    value={pedagogyApproach}
                    onChange={(e) => setPedagogyApproach(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                  >
                    {pedagogyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scaffolding Level */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Scaffolding Level
                    </label>
                    <button
                      onClick={() => setShowScaffoldingInfo(!showScaffoldingInfo)}
                      className="w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors"
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                  {showScaffoldingInfo && (
                    <div className="mb-3 p-3 rounded-lg bg-[#F7FBF3] border border-[#CBD5C0] text-xs">
                      <div className="font-semibold text-[#888625] mb-1">Scaffolding Support</div>
                      <div className="space-y-1 text-[#666]">
                        <div>• <strong>Minimal:</strong> Independent work with basic guidance</div>
                        <div>• <strong>Moderate:</strong> Balanced support and independence</div>
                        <div>• <strong>Extensive:</strong> High support with step-by-step guidance</div>
                        <div>• <strong>Adaptive:</strong> Adjusts based on student needs</div>
                      </div>
                    </div>
                  )}
                  <select
                    value={scaffoldingLevel}
                    onChange={(e) => setScaffoldingLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                  >
                    {scaffoldingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Indigenous Perspectives */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Indigenous Perspectives
                    </label>
                    <button
                      onClick={() => setShowIndigenousInfo(!showIndigenousInfo)}
                      className="w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors"
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                  {showIndigenousInfo && (
                    <div className="mb-3 p-3 rounded-lg bg-[#F7FBF3] border border-[#CBD5C0] text-xs">
                      <div className="font-semibold text-[#888625] mb-1">Cultural Integration</div>
                      <div className="space-y-1 text-[#666]">
                        <div>• <strong>Respectful:</strong> Authentic Indigenous perspectives and knowledge</div>
                        <div>• <strong>Inclusive:</strong> Connects to local Aboriginal and Torres Strait Islander cultures</div>
                        <div>• <strong>Meaningful:</strong> Goes beyond tokenistic inclusion</div>
                        <div>• <strong>Collaborative:</strong> Works with local communities when possible</div>
                      </div>
                    </div>
                  )}
                  <label className="flex items-center gap-3 p-3 rounded-lg border bg-white hover:bg-[#fff8] cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={indigenousPerspectives}
                      onChange={(e) => setIndigenousPerspectives(e.target.checked)}
                      className="accent-[#888625]"
                    />
                    <div>
                      <div className="text-sm font-semibold">Include Indigenous Perspectives</div>
                      <div className="text-xs text-[#666]">Integrate Aboriginal and Torres Strait Islander knowledge respectfully</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="px-5 py-3 rounded-full font-semibold border border-[#CBD5C0] bg-white hover:border-[#333] transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    // Navigate to next step (Review & Generate)
                    const params = new URLSearchParams({
                      authority,
                      version: authority === "VCAA" ? version : authority === "ACARA" ? "v9" : "N/A",
                      level: authority === "VCAA" ? level : "",
                      subject,
                      year,
                      minutes: String(minutes),
                      selectedStandards: JSON.stringify(selectedStandards),
                      classSize: String(classSize),
                      abilityRange,
                      specialNeeds: JSON.stringify(specialNeeds),
                      pedagogyApproach,
                      scaffoldingLevel,
                      indigenousPerspectives: String(indigenousPerspectives)
                    })
                    window.location.href = `/generator/review?${params.toString()}`
                  }}
                  className="px-5 py-3 rounded-full text-white font-semibold shadow-lg bg-[#888625] hover:bg-[#6f7220] ring-1 ring-white"
                >
                  Next →
                </button>
                <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                  Step 4 of 5
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col border border-[#EFEFEF] h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Pedagogy Preview</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                Auto-updating
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0]">
                <div className="text-xs text-[#666] mb-2 font-semibold">Teaching Approach</div>
                <div className="text-sm font-semibold">{pedagogyApproach}</div>
                <div className="text-xs text-[#666] mt-1">
                  {pedagogyApproach === "Trauma-Informed" && "Safe, predictable learning with student choice"}
                  {pedagogyApproach === "Inquiry-Based" && "Student-driven questions and discovery"}
                  {pedagogyApproach === "Direct Instruction" && "Explicit teaching with clear steps"}
                  {pedagogyApproach === "Collaborative Learning" && "Group work and peer learning"}
                  {pedagogyApproach === "Differentiated Instruction" && "Tailored to individual student needs"}
                </div>
              </div>

              <div className="rounded-xl border p-4 bg-white">
                <div className="text-xs text-[#666] mb-2 font-semibold">Scaffolding Support</div>
                <div className="text-sm font-semibold">{scaffoldingLevel}</div>
                <div className="text-xs text-[#666] mt-1">
                  {scaffoldingLevel === "Minimal" && "Independent work with basic guidance"}
                  {scaffoldingLevel === "Moderate" && "Balanced support and independence"}
                  {scaffoldingLevel === "Extensive" && "High support with step-by-step guidance"}
                  {scaffoldingLevel === "Adaptive" && "Adjusts based on student needs"}
                </div>
              </div>

              {indigenousPerspectives && (
                <div className="rounded-xl border p-4 bg-white">
                  <div className="text-xs text-[#666] mb-2 font-semibold">Cultural Integration</div>
                  <div className="text-sm font-semibold text-[#888625]">Indigenous Perspectives Included</div>
                  <div className="text-xs text-[#666] mt-1">
                    Authentic Aboriginal and Torres Strait Islander knowledge integrated respectfully
                  </div>
                </div>
              )}

              <div className="rounded-xl border p-4 bg-white">
                <div className="text-xs text-[#666] mb-2">Lesson Impact</div>
                <ul className="list-disc ml-5 text-sm leading-6">
                  <li>Activities designed for {classSize} students</li>
                  <li>Scaffolding adapted for {abilityRange} ability range</li>
                  <li>Trauma-informed practices throughout</li>
                  <li>Culturally respectful content and examples</li>
                  {specialNeeds.length > 0 && <li>Inclusive supports for special needs</li>}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-[#666]">Tip: Your choices shape the entire lesson structure.</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="/resources/teaching-strategies"
                className="text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]"
              >
                Teaching Strategies
              </a>
              <a
                href="/resources/wellbeing-support"
                className="text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]"
              >
                Wellbeing & Support
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
