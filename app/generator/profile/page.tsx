"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ClassProfileGenerator() {
  const searchParams = useSearchParams()

  const authorityParam = searchParams.get("authority") || "ACARA"
  const versionParam = searchParams.get("version") || (authorityParam === "ACARA" ? "v9" : "V1.0")
  const subjectParam = searchParams.get("subject") || "English"
  const yearParam = searchParams.get("year") || "5"
  const minutesParam = parseInt(searchParams.get("minutes") || "45", 10)
  const levelParam = searchParams.get("level") || "Standard"
  const selectedStandardsParam = searchParams.get("selectedStandards") || "[]"

  const [authority, setAuthority] = useState(authorityParam)
  const [version, setVersion] = useState(versionParam)
  const [subject, setSubject] = useState(subjectParam)
  const [year, setYear] = useState(yearParam)
  const [minutes, setMinutes] = useState(minutesParam)
  const [level, setLevel] = useState(levelParam)
  const [selectedStandards, setSelectedStandards] = useState<string[]>([])
  const [classSize, setClassSize] = useState(25)
  const [abilityRange, setAbilityRange] = useState("Mixed")
  const [learnerProfiles, setLearnerProfiles] = useState<string[]>([])
  const [showClassSizeInfo, setShowClassSizeInfo] = useState(true)
  const [showAbilityInfo, setShowAbilityInfo] = useState(true)
  const [showInclusiveInfo, setShowInclusiveInfo] = useState(true)

  useEffect(() => {
    setAuthority(authorityParam)
    setVersion(versionParam)
    setSubject(subjectParam)
    setYear(yearParam)
    setMinutes(minutesParam)
    setLevel(levelParam)
    try {
      setSelectedStandards(JSON.parse(selectedStandardsParam))
    } catch {
      setSelectedStandards([])
    }
  }, [authorityParam, versionParam, subjectParam, yearParam, minutesParam, levelParam, selectedStandardsParam])

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

  const activeKey = "profile"

  const abilityOptions = ["Mixed", "Above Average", "Average", "Below Average", "Wide Range"]
  const learnerProfileOptions = [
    "Attention & Focus Needs (e.g., ADHD)",
    "Communication & Language Needs (e.g., speech/language, EAL)",
    "Literacy & Numeracy Supports (e.g., dyslexia, dyscalculia)",
    "Sensory & Physical Supports (e.g., hearing, vision, mobility)",
    "Social & Emotional Regulation Supports (e.g., trauma impact, autistic traits)",
    "Learning Extension (Gifted & Talented)"
  ]

  function toggleArray(array: string[], setter: (arr: string[]) => void, value: string) {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value))
    } else {
      setter([...array, value])
    }
  }

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
                    <path
                      fill="currentColor"
                      d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Class Profile</h2>
                  <p className="text-sm text-[#666]">Tell us about your students to personalize the lesson.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Curriculum</div>
                  <div className="font-semibold">
                    {authority === "ACARA"
                      ? "ACARA v9 (AU)"
                      : authority === "VCAA"
                      ? "VCAA (VIC)"
                      : authority === "NESA"
                      ? "NESA (NSW)"
                      : authority === "QCAA"
                      ? "QCAA (QLD)"
                      : "SCSA (WA)"}
                  </div>
                </div>
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Subject</div>
                  <div className="font-semibold">{subject}</div>
                </div>
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Year</div>
                  <div className="font-semibold">{year}</div>
                </div>
                <div className="rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]">
                  <div className="text-xs text-[#666]">Duration</div>
                  <div className="font-semibold">{minutes} mins</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Class Size */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Class Size
                    </label>
                    <button
                      onClick={() => setShowClassSizeInfo(!showClassSizeInfo)}
                      className="w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors"
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                  {showClassSizeInfo && (
                    <div className="mb-3 p-3 rounded-lg bg-[#F7FBF3] border border-[#CBD5C0] text-xs relative">
                      <button
                        onClick={() => setShowClassSizeInfo(false)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors flex items-center justify-center"
                        title="Close"
                      >
                        ×
                      </button>
                      <div className="font-semibold text-[#888625] mb-1">Class Size Impact</div>
                      <div className="space-y-1 text-[#666]">
                        <div>• <strong>Small (15-20):</strong> More individual attention, detailed activities</div>
                        <div>• <strong>Medium (21-30):</strong> Balanced group work and individual tasks</div>
                        <div>• <strong>Large (30+):</strong> Structured group activities, clear routines</div>
                      </div>
                    </div>
                  )}
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={classSize}
                    onChange={(e) => setClassSize(parseInt(e.target.value))}
                    className="w-full accent-[#888625]"
                  />
                  <div className="flex justify-between text-xs text-[#666] mt-1">
                    <span>10</span>
                    <span className="font-semibold">{classSize} students</span>
                    <span>40</span>
                  </div>
                </div>

                {/* Ability Range */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Ability Range
                    </label>
                    <button
                      onClick={() => setShowAbilityInfo(!showAbilityInfo)}
                      className="w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors"
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                  {showAbilityInfo && (
                    <div className="mb-3 p-3 rounded-lg bg-[#F7FBF3] border border-[#CBD5C0] text-xs relative">
                      <button
                        onClick={() => setShowAbilityInfo(false)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors flex items-center justify-center"
                        title="Close"
                      >
                        ×
                      </button>
                      <div className="font-semibold text-[#888625] mb-1">Differentiation Strategies</div>
                      <div className="space-y-1 text-[#666]">
                        <div>• <strong>Mixed:</strong> Tiered activities, flexible grouping</div>
                        <div>• <strong>Above Average:</strong> Extension tasks, higher-order thinking</div>
                        <div>• <strong>Below Average:</strong> Additional scaffolding, visual supports</div>
                      </div>
                    </div>
                  )}
                  <select
                    value={abilityRange}
                    onChange={(e) => setAbilityRange(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                  >
                    {abilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inclusive Teaching */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Inclusive Teaching
                    </label>
                    <button
                      onClick={() => setShowInclusiveInfo(!showInclusiveInfo)}
                      className="w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors"
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                  {showInclusiveInfo && (
                    <div className="mb-3 p-3 rounded-lg bg-[#F7FBF3] border border-[#CBD5C0] text-xs relative">
                      <button
                        onClick={() => setShowInclusiveInfo(false)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors flex items-center justify-center"
                        title="Close"
                      >
                        ×
                      </button>
                      <div className="font-semibold text-[#888625] mb-1">Inclusive Teaching (applies to all lessons)</div>
                      <div className="space-y-1 text-[#666]">
                        <div>• <strong>Universal Design:</strong> Accessible for all learners</div>
                        <div>• <strong>Trauma-Informed:</strong> Safe, predictable environments</div>
                        <div>• <strong>Cultural Safety:</strong> Respectful of all backgrounds</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Learner Profiles */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#666] font-semibold mb-2 block">
                    Learner Profiles (select any that apply for planning supports)
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {learnerProfileOptions.map((profile) => (
                      <label key={profile} className="flex items-center gap-2 p-2 rounded-lg border bg-white hover:bg-[#fff8] cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={learnerProfiles.includes(profile)}
                          onChange={() => toggleArray(learnerProfiles, setLearnerProfiles, profile)}
                          className="accent-[#888625]"
                        />
                        <span className="text-xs">{profile}</span>
                      </label>
                    ))}
                  </div>
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
                    // Navigate to next step (Pedagogy & Scaffolds)
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
                      specialNeeds: JSON.stringify(specialNeeds)
                    })
                    window.location.href = `/generator/pedagogy?${params.toString()}`
                  }}
                  className="px-5 py-3 rounded-full text-white font-semibold shadow-lg bg-[#888625] hover:bg-[#6f7220] ring-1 ring-white"
                >
                  Next →
                </button>
                <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                  Step 3 of 5
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col border border-[#EFEFEF] h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Class Profile Preview</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                Auto-updating
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0]">
                <div className="text-xs text-[#666] mb-2 font-semibold">Class Overview</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-[#666]">Size</div>
                    <div className="font-semibold">{classSize} students</div>
                  </div>
                  <div>
                    <div className="text-[#666]">Ability</div>
                    <div className="font-semibold">{abilityRange}</div>
                  </div>
                </div>
              </div>

              {specialNeeds.length > 0 && (
                <div className="rounded-xl border p-4 bg-white">
                  <div className="text-xs text-[#666] mb-2 font-semibold">Support Needs</div>
                  <div className="flex flex-wrap gap-1">
                    {specialNeeds.map((need) => (
                      <span key={need} className="text-xs px-2 py-1 rounded-full bg-[#FD6585]/10 text-[#FD6585] border border-[#FFD1DC]">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              )}


              <div className="rounded-xl border p-4 bg-white">
                <div className="text-xs text-[#666] mb-2">Personalization Impact</div>
                <ul className="list-disc ml-5 text-sm leading-6">
                  <li>Lesson activities adapted for class size</li>
                  <li>Differentiation strategies for ability range</li>
                  <li>Inclusive supports for special needs</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-[#666]">Tip: More details = better personalization.</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="/resources/getting-started"
                className="text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]"
              >
                Getting Started Hub
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
