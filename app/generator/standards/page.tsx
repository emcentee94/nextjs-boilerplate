'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function StandardsGenerator() {
  const searchParams = useSearchParams()

  const authorityParam = searchParams.get('authority') || 'ACARA'
  const versionParam =
    searchParams.get('version') || (authorityParam === 'ACARA' ? 'v9' : 'V1.0')
  const subjectParam = searchParams.get('subject') || 'English'
  const yearParam = searchParams.get('year') || '5'
  const minutesParam = parseInt(searchParams.get('minutes') || '45', 10)
  const levelParam = searchParams.get('level') || 'Standard'

  const [authority, setAuthority] = useState(authorityParam)
  const [version, setVersion] = useState(versionParam)
  const [subject, setSubject] = useState(subjectParam)
  const [year, setYear] = useState(yearParam)
  const [minutes, setMinutes] = useState(minutesParam)
  const [level, setLevel] = useState(levelParam)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [outcomes, setOutcomes] = useState<any[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [showStandardsInfo, setShowStandardsInfo] = useState(true)
  const [showSelectionInfo, setShowSelectionInfo] = useState(true)

  useEffect(() => {
    setAuthority(authorityParam)
    setVersion(versionParam)
    setSubject(subjectParam)
    setYear(yearParam)
    setMinutes(minutesParam)
    setLevel(levelParam)
  }, [
    authorityParam,
    versionParam,
    subjectParam,
    yearParam,
    minutesParam,
    levelParam,
  ])

  useEffect(() => {
    const controller = new AbortController()
    async function fetchOutcomes() {
      try {
        setLoading(true)
        setError(null)
        setOutcomes([])
        setSelected({})
        // Map subject to learning area param expected by API
        const learningAreaId = subject
        const url = `/api/curriculum/search?learningAreaId=${encodeURIComponent(learningAreaId)}&yearLevel=${encodeURIComponent(year)}&limit=200`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed (${res.status})`)
        const data = await res.json()
        setOutcomes(Array.isArray(data.outcomes) ? data.outcomes : [])
      } catch (e: any) {
        if (e?.name !== 'AbortError')
          setError(e?.message || 'Failed to load standards')
      } finally {
        setLoading(false)
      }
    }
    fetchOutcomes()
    return () => controller.abort()
  }, [subject, year])

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const tabs = [
    {
      key: 'basics',
      label: 'Lesson Basics',
      icon: (
        <svg viewBox='0 0 24 24' className='w-4 h-4' aria-hidden>
          <path
            fill='currentColor'
            d='M4 6a2 2 0 0 1 2-2h9a1 1 0 0 1 .8.4l3.2 4.2a1 1 0 0 1 .2.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm11 0H6v12h12V9h-3a2 2 0 0 1-2-2V6Z'
          />
        </svg>
      ),
    },
    {
      key: 'standards',
      label: 'Curriculum Standards',
      icon: (
        <svg viewBox='0 0 24 24' className='w-4 h-4' aria-hidden>
          <path
            fill='currentColor'
            d='M5 4h14v2H5V4Zm0 7h14v2H5v-2Zm0 7h14v2H5v-2Z'
          />
        </svg>
      ),
    },
    {
      key: 'profile',
      label: 'Class Profile',
      icon: (
        <svg viewBox='0 0 24 24' className='w-4 h-4' aria-hidden>
          <path
            fill='currentColor'
            d='M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z'
          />
        </svg>
      ),
    },
    {
      key: 'pedagogy',
      label: 'Pedagogy & Scaffolds',
      icon: (
        <svg viewBox='0 0 24 24' className='w-4 h-4' aria-hidden>
          <path
            fill='currentColor'
            d='M3 4h18v2H3V4Zm2 4h14v12H5V8Zm4 2v8h2v-8H9Zm4 0v8h2v-8h-2Z'
          />
        </svg>
      ),
    },
    {
      key: 'review',
      label: 'Review & Generate',
      icon: (
        <svg viewBox='0 0 24 24' className='w-4 h-4' aria-hidden>
          <path
            fill='currentColor'
            d='M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm1 5v6l5 3-.8 1.4L11 14V7h2Z'
          />
        </svg>
      ),
    },
  ] as const

  const activeKey = 'standards'

  return (
    <div className='min-h-screen w-full bg-[#FDE5DA] text-[#333]'>
      <div className='max-w-7xl mx-auto px-6 py-6 lg:py-8'>
        <header className='sticky top-0 z-10 bg-[#FDE5DA]/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur flex items-center justify-between mb-4 lg:mb-6 py-3'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-black tracking-tight'>
              Teacher Dashboard
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <div className='text-sm font-medium px-3 py-1 rounded-full bg-white border border-[#e9e9e9]'>
              Preview
            </div>
          </div>
        </header>

        <nav className='flex flex-wrap gap-2 mb-4 lg:mb-6'>
          {tabs.map((t, i) => (
            <button
              key={t.key}
              className={`group inline-flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${
                t.key === activeKey
                  ? 'bg-white text-[#333] shadow-sm border-[#CBD5C0] ring-2 ring-[#888625]/20'
                  : 'bg-white/60 text-[#333] hover:bg-white border-[#eee] hover:border-[#CBD5C0]'
              }`}
            >
              <span
                className={`p-1 rounded-full ${
                  t.key === activeKey
                    ? 'bg-[#888625] text-white'
                    : 'bg-white text-[#333] group-hover:text-[#888625]'
                }`}
                aria-hidden
              >
                {t.icon}
              </span>
              <span className='text-sm font-semibold'>
                {i + 1}. {t.label}
              </span>
            </button>
          ))}
        </nav>

        <section className='grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[70vh]'>
          <div className='bg-white rounded-2xl shadow-xl p-6 lg:p-8 relative overflow-hidden border border-[#EFEFEF] h-full'>
            <div className='absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FF9A2E]/10' />
            <div className='absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-[#FD6585]/10' />
            <div className='absolute -top-8 -left-8 w-24 h-24 rounded-full bg-[#888625]/10' />
            <div className='relative'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-9 h-9 rounded-2xl bg-[#888625]/10 flex items-center justify-center ring-1 ring-[#CBD5C0]'>
                  <svg
                    viewBox='0 0 24 24'
                    className='w-5 h-5 text-[#888625]'
                    aria-hidden
                  >
                    <path
                      fill='currentColor'
                      d='M5 4h14v2H5V4Zm0 7h14v2H5v-2Zm0 7h14v2H5v-2Z'
                    />
                  </svg>
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Curriculum Standards</h2>
                  <p className='text-sm text-[#666]'>
                    Select the standards that align with your lesson.
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]'>
                  <div className='text-xs text-[#666]'>Curriculum</div>
                  <div className='font-semibold'>
                    {authority === 'ACARA'
                      ? 'ACARA v9 (AU)'
                      : authority === 'VCAA'
                        ? 'VCAA (VIC)'
                        : authority === 'NESA'
                          ? 'NESA (NSW)'
                          : authority === 'QCAA'
                            ? 'QCAA (QLD)'
                            : 'SCSA (WA)'}
                  </div>
                </div>
                <div className='rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]'>
                  <div className='text-xs text-[#666]'>Version</div>
                  <div className='font-semibold'>
                    {authority === 'VCAA'
                      ? version
                      : authority === 'ACARA'
                        ? 'v9'
                        : '—'}
                  </div>
                </div>
                <div className='rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]'>
                  <div className='text-xs text-[#666]'>Subject</div>
                  <div className='font-semibold'>{subject}</div>
                </div>
                <div className='rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1]'>
                  <div className='text-xs text-[#666]'>Year</div>
                  <div className='font-semibold'>{year}</div>
                </div>
                {authority === 'VCAA' && (
                  <div className='rounded-lg p-3 border bg-white ring-1 ring-[#F1F1F1] col-span-2'>
                    <div className='text-xs text-[#666]'>Level</div>
                    <div className='font-semibold'>{level}</div>
                  </div>
                )}
              </div>

              <div className='rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0] mb-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <div className='text-xs text-[#666] font-semibold'>
                    Available Standards
                  </div>
                  <button
                    onClick={() => setShowStandardsInfo(!showStandardsInfo)}
                    className='w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors'
                    title="What's this?"
                  >
                    ?
                  </button>
                </div>
                {showStandardsInfo && (
                  <div className='mb-3 p-3 rounded-lg bg-white border border-[#CBD5C0] text-xs relative'>
                    <button
                      onClick={() => setShowStandardsInfo(false)}
                      className='absolute top-1 right-1 w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors flex items-center justify-center'
                      title='Close'
                    >
                      ×
                    </button>
                    <div className='font-semibold text-[#888625] mb-1'>
                      Curriculum Standards Structure
                    </div>
                    <div className='space-y-1 text-[#666]'>
                      <div>
                        • <strong>Content Descriptions:</strong> What students
                        should learn (AC9E5LA01, etc.)
                      </div>
                      <div>
                        • <strong>Achievement Standards:</strong> How well
                        students should perform
                      </div>
                      <div>
                        • <strong>Strands:</strong> Language (LA), Literature
                        (LE), Literacy (LY)
                      </div>
                      <div>
                        • <strong>Integration:</strong> Standards work together
                        across subjects
                      </div>
                    </div>
                  </div>
                )}
                {loading && (
                  <div className='text-sm text-[#666]'>
                    Loading standards...
                  </div>
                )}
                {error && <div className='text-sm text-red-600'>{error}</div>}
                {!loading && !error && (
                  <div className='space-y-2 max-h-[40vh] overflow-y-auto'>
                    {outcomes.length === 0 && (
                      <div className='text-sm text-[#666]'>
                        No standards found.
                      </div>
                    )}
                    {outcomes.map((o) => (
                      <label
                        key={o.id || o.Code}
                        className='block p-3 rounded-lg border bg-white hover:bg-[#fff8] cursor-pointer transition-colors'
                      >
                        <div className='flex items-start gap-3'>
                          <input
                            type='checkbox'
                            checked={Boolean(selected[o.id || o.Code])}
                            onChange={() => toggle(o.id || o.Code)}
                            className='mt-1 accent-[#888625]'
                          />
                          <div className='flex-1'>
                            <div className='text-sm font-semibold'>
                              {o.Code || o.code ? `${o.Code || o.code}: ` : ''}
                              {o['Content Description'] ||
                                o.content_description ||
                                o['Achievement Standard'] ||
                                o.achievement_standard ||
                                'Standard'}
                            </div>
                            {o['Elaboration'] || o.elaboration ? (
                              <div className='text-xs text-[#555] mt-1'>
                                {o['Elaboration'] || o.elaboration}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                <div className='flex items-center justify-between mt-3'>
                  <div className='flex items-center gap-2'>
                    <div className='text-xs text-[#666] font-semibold'>
                      Selected: {Object.values(selected).filter(Boolean).length}{' '}
                      standards
                    </div>
                    <button
                      onClick={() => setShowSelectionInfo(!showSelectionInfo)}
                      className='w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors'
                      title="What's this?"
                    >
                      ?
                    </button>
                  </div>
                </div>
                {showSelectionInfo && (
                  <div className='mt-2 p-3 rounded-lg bg-white border border-[#CBD5C0] text-xs relative'>
                    <button
                      onClick={() => setShowSelectionInfo(false)}
                      className='absolute top-1 right-1 w-4 h-4 rounded-full bg-[#888625]/20 text-[#888625] text-xs font-bold hover:bg-[#888625]/30 transition-colors flex items-center justify-center'
                      title='Close'
                    >
                      ×
                    </button>
                    <div className='font-semibold text-[#888625] mb-1'>
                      Selection Tips
                    </div>
                    <div className='space-y-1 text-[#666]'>
                      <div>
                        • <strong>3-5 standards:</strong> Optimal for focused
                        lesson planning
                      </div>
                      <div>
                        • <strong>Mix strands:</strong> Combine Language,
                        Literature, Literacy
                      </div>
                      <div>
                        • <strong>Progressive:</strong> Build from basic to
                        complex skills
                      </div>
                      <div>
                        • <strong>Relevant:</strong> Choose standards that match
                        your lesson goals
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <button
                  onClick={() => window.history.back()}
                  className='px-5 py-3 rounded-full font-semibold border border-[#CBD5C0] bg-white hover:border-[#333] transition'
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    // Navigate to next step (Class Profile) with selected standards
                    const selectedStandards = outcomes.filter(
                      (o) => selected[o.id || o.Code]
                    )
                    const params = new URLSearchParams({
                      authority,
                      version:
                        authority === 'VCAA'
                          ? version
                          : authority === 'ACARA'
                            ? 'v9'
                            : 'N/A',
                      level: authority === 'VCAA' ? level : '',
                      subject,
                      year,
                      minutes: String(minutes),
                      selectedStandards: JSON.stringify(
                        selectedStandards.map((s) => s.id || s.Code)
                      ),
                    })
                    window.location.href = `/generator/profile?${params.toString()}`
                  }}
                  disabled={
                    Object.values(selected).filter(Boolean).length === 0
                  }
                  className='px-5 py-3 rounded-full text-white font-semibold shadow-lg bg-[#888625] hover:bg-[#6f7220] ring-1 ring-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Next →
                </button>
                <span className='text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]'>
                  Step 2 of 5
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col border border-[#EFEFEF] h-full'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold'>Selected Standards Preview</h3>
              <span className='text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]'>
                Auto-updating
              </span>
            </div>

            <div className='rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0] mb-4'>
              <div className='text-xs text-[#666] mb-2 font-semibold'>
                Selected Standards
              </div>
              {Object.values(selected).filter(Boolean).length === 0 ? (
                <div className='text-sm text-[#666]'>
                  No standards selected yet.
                </div>
              ) : (
                <div className='space-y-2 max-h-[30vh] overflow-y-auto'>
                  {outcomes
                    .filter((o) => selected[o.id || o.Code])
                    .map((o) => (
                      <div
                        key={o.id || o.Code}
                        className='p-2 rounded bg-white border border-[#CBD5C0]'
                      >
                        <div className='text-sm font-semibold'>
                          {o.Code || o.code ? `${o.Code || o.code}: ` : ''}
                          {o['Content Description'] ||
                            o.content_description ||
                            o['Achievement Standard'] ||
                            o.achievement_standard ||
                            'Standard'}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className='rounded-xl border p-4 bg-white'>
              <div className='text-xs text-[#666] mb-2'>Next Steps</div>
              <ul className='list-disc ml-5 text-sm leading-6'>
                <li>Selected standards will inform lesson structure</li>
                <li>Trauma-informed scaffolds will be applied</li>
                <li>Culturally respectful activities will be suggested</li>
                <li>Assessment opportunities will be mapped</li>
              </ul>
            </div>

            <div className='mt-5 flex items-center justify-between flex-wrap gap-3'>
              <div className='text-xs text-[#666]'>
                Tip: Select 3-5 key standards for best results.
              </div>
            </div>

            <div className='mt-3 flex flex-wrap gap-2'>
              <a
                href='/resources/getting-started'
                className='text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]'
              >
                Getting Started Hub
              </a>
              <a
                href='/resources/teaching-strategies'
                className='text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]'
              >
                Teaching Strategies
              </a>
              <a
                href='/resources/assessment-planning'
                className='text-xs px-2 py-1 rounded-full bg-white border border-[#e9e9e9] hover:border-[#888625]'
              >
                Assessment & Planning
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
