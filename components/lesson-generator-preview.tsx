'use client'

import React, { useEffect, useMemo, useState } from "react"

type Authority = "ACARA" | "VCAA" | "NESA" | "QCAA" | "SCSA"

export default function LessonGeneratorPreview() {
  const [name, setName] = useState<string>("")
  useEffect(() => {
    try {
      const candidates = [
        "demo_name",
        "demoUserName",
        "taughtful_demo_name",
        "demo_user",
      ]
      for (const key of candidates) {
        const v = localStorage.getItem(key)
        if (!v) continue
        if (key === "demo_user") {
          const obj = JSON.parse(v)
          if (obj?.name) {
            setName(obj.name as string)
            break
          }
        } else {
          setName(v)
          break
        }
      }
    } catch {}
  }, [])

  const [subject, setSubject] = useState("English")
  const [year, setYear] = useState("5")
  const [minutes, setMinutes] = useState(45)

  const [authority, setAuthority] = useState<Authority>("ACARA")
  const [version, setVersion] = useState<"V1.0" | "V2.0">("V2.0")
  const [levelBand, setLevelBand] = useState("Standard")

  const isVCAA = authority === "VCAA"
  const isACARA = authority === "ACARA"
  const isV2 = isVCAA && version === "V2.0"
  const showFoundationAD = isVCAA && isV2 && subject === "English"

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

  const activeKey = "basics"

  const progressPct = useMemo(() => {
    const min = 10,
      max = 120
    const clamped = Math.min(max, Math.max(min, minutes))
    return ((clamped - min) / (max - min)) * 100
  }, [minutes])

  const curriculumQuery = useMemo(() => {
    const params = new URLSearchParams({
      authority: authority.toLowerCase(),
      version: isVCAA ? version : isACARA ? "v9" : "N/A",
      year,
      subject: subject.toLowerCase(),
      level: isVCAA ? levelBand : "",
    })
    return `/curriculum/${subject.toLowerCase()}?${params.toString()}`
  }, [authority, version, isVCAA, isACARA, year, subject, levelBand])

  const nextHref = useMemo(() => {
    const params = new URLSearchParams({
      authority,
      version: isVCAA ? version : isACARA ? "v9" : "N/A",
      level: isVCAA ? levelBand : "",
      subject,
      year,
      minutes: String(minutes),
    })
    return `/generator/standards?${params.toString()}`
  }, [authority, version, isVCAA, isACARA, levelBand, subject, year, minutes])

  function applyDemoDefaults() {
    setAuthority("VCAA")
    setVersion("V2.0")
    setSubject("English")
    setYear("F")
    setLevelBand("Foundation A–D")
    setMinutes(45)
  }

  return (
    <div className="min-h-screen w-full bg-[#FDE5DA] text-[#333]">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8">
        <header className="sticky top-0 z-10 bg-[#FDE5DA]/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur flex items-center justify-between mb-4 lg:mb-6 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight">Teacher Dashboard</h1>
            {name && (
              <span className="hidden sm:inline text-sm font-extrabold text-[#888625] px-3 py-1 rounded-full bg-white border border-[#CBD5C0]">
                G'DAY {name.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={applyDemoDefaults}
              className="text-xs font-semibold px-3 py-1 rounded-full border border-[#CBD5C0] bg-white hover:border-[#888625] text-[#888625]"
            >
              Use demo defaults
            </button>
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
                      d="M4 6a2 2 0 0 1 2-2h9a1 1 0 0 1 .8.4l3.2 4.2a1 1 0 0 1 .2.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm11 0H6v12h12V9h-3a2 2 0 0 1-2-2V6Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Lesson Basics</h2>
                  <p className="text-sm text-[#666]">Start with the building blocks of your lesson.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                    Curriculum
                  </label>
                  <select
                    value={authority}
                    onChange={(e) => setAuthority(e.target.value as Authority)}
                    className="mt-1 w-full px-4 py-3 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                  >
                    <option value="ACARA">ACARA v9 (AU)</option>
                    <option value="VCAA">VCAA (VIC)</option>
                    <option value="NESA">NESA (NSW)</option>
                    <option value="QCAA">QCAA (QLD)</option>
                    <option value="SCSA">SCSA (WA)</option>
                  </select>
                </div>

                {isVCAA && (
                  <div>
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Version
                    </label>
                    <select
                      value={version}
                      onChange={(e) => setVersion(e.target.value as any)}
                      className="mt-1 w-full px-4 py-3 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                    >
                      <option value="V2.0">VC 2.0</option>
                      <option value="V1.0">VC 1.0</option>
                    </select>
                  </div>
                )}

                {isVCAA && (
                  <div>
                    <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">
                      Level
                    </label>
                    <select
                      value={levelBand}
                      onChange={(e) => setLevelBand(e.target.value)}
                      className="mt-1 w-full px-4 py-3 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                    >
                      <option>Standard</option>
                      {showFoundationAD && <option>Foundation A–D</option>}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">Subject</label>
                  <div className="mt-1 relative">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#888625]/20"
                    >
                      {[
                        "English",
                        "Mathematics",
                        "Science",
                        "HASS",
                        "Health & PE",
                        "The Arts",
                        "Technologies",
                        "Languages",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888625]">
                      ▾
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">Year Level</label>
                  <div className="mt-1 relative">
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 rounded-full border border-[#e6e6e6] bg-white focus:outline-none focus:ring-4 focus:ring-[#FD6585]/20"
                    >
                      {["F", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#FD6585]">
                      ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify_between">
                  <label className="text-xs uppercase tracking-wide text-[#666] font-semibold">Duration</label>
                  <span className="text-sm font-semibold">{minutes} mins</span>
                </div>
                <div className="mt-3">
                  <div className="relative">
                    <div className="mb-1 text-xs font-semibold text-[#888625]">Lesson Duration</div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value))}
                      className="w-full accent-[#888625]"
                    />
                    <div className="absolute -top-7" style={{ left: `calc(${progressPct}% - 18px)` }}>
                      <div className="px-2 py-1 text-xs bg-[#333] text-white rounded-md shadow border border-black/10">
                        {minutes}m
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={nextHref}
                  className="px-5 py-3 rounded-full text-white font-semibold shadow-lg bg-[#888625] hover:bg-[#6f7220] ring-1 ring-white"
                >
                  Next →
                </a>
                <button className="px-5 py-3 rounded-full font-semibold border border-[#CBD5C0] bg-white hover:border-[#333] transition">
                  Save Draft
                </button>
                <a
                  href={curriculumQuery}
                  className="px-4 py-3 rounded-full font-semibold border border-[#CBD5C0] bg_white hover:border-[#888625] text-[#888625]"
                >
                  Open Curriculum ↗
                </a>
                {isV2 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                    VCAA 2.0 aligned
                  </span>
                )}
                {isACARA && (
                  <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                    ACARA v9
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col border border-[#EFEFEF] h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Live Lesson Preview</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]">
                Auto-updating
              </span>
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
                <div className="text-xs text-[#666]">Version</div>
                <div className="font-semibold">{isVCAA ? version : isACARA ? "v9" : "—"}</div>
              </div>
              <div className="rounded-lg p-3 border bg_white ring-1 ring-[#F1F1F1]">
                <div className="text-xs text-[#666]">Subject</div>
                <div className="font-semibold">{subject}</div>
              </div>
              <div className="rounded-lg p-3 border bg_white ring-1 ring-[#F1F1F1]">
                <div className="text-xs text-[#666]">Year</div>
                <div className="font-semibold">{year}</div>
              </div>
              {isVCAA && (
                <div className="rounded-lg p-3 border bg_white ring-1 ring-[#F1F1F1] col-span-2">
                  <div className="text-xs text-[#666]">Level</div>
                  <div className="font-semibold">{levelBand}</div>
                </div>
              )}
            </div>

            <div className="rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0] mb-4">
              <div className="text-xs text-[#666] mb-2 font-semibold">Linked Standards</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FD6585]/10 text-[#FD6585] border border-[#FFD1DC]">
                    Content
                  </span>
                  <span className="flex-1">
                    Focus skill selected from curriculum (prefilled by Curriculum/Version/Level)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#888625]/10 text-[#888625] border border-[#CBD5C0]">
                    Achievement
                  </span>
                  <span className="flex-1">Corresponding achievement standard(s) auto-linked</span>
                </li>
              </ul>
              <a href={curriculumQuery} className="mt-3 inline-block text-xs font-semibold text-[#888625] underline">
                View in Curriculum
              </a>
            </div>

            <div className="rounded-xl border p-4 bg-white">
              <div className="text-xs text-[#666] mb-2">Lesson Snapshot</div>
              <ul className="list-disc ml-5 text-sm leading-6">
                <li>Aligned to selected curriculum (VCAA / NESA / QCAA / SCSA / ACARA v9)</li>
                <li>Trauma-informed entry routine & choice-based tasks</li>
                <li>Culturally respectful hooks; VCAA 2.0 English enables Foundation A–D scaffolds</li>
                <li>Formative checks mapped to achievement standards</li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-[#666]">Tip: Your choices update the scaffold in real time.</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="/resources/getting-started"
                className="text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]"
              >
                Getting Started Hub
              </a>
              <a
                href="/resources/teaching-strategies"
                className="text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]"
              >
                Teaching Strategies
              </a>
              <a
                href="/resources/assessment-planning"
                className="text-xs px-2 py-1 rounded_full bg-white border border-[#e9e9e9] hover:border-[#888625]"
              >
                Assessment & Planning
              </a>
              <a
                href="/resources/wellbeing-support"
                className="text-xs px-2 py-1 rounded_full bg-white border border-[#e9e9e9] hover:border-[#888625]"
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


