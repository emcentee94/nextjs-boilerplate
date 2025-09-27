'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReviewGenerator() {
  const searchParams = useSearchParams()

  const authorityParam = searchParams.get('authority') || 'ACARA'
  const versionParam =
    searchParams.get('version') || (authorityParam === 'ACARA' ? 'v9' : 'V1.0')
  const subjectParam = searchParams.get('subject') || 'English'
  const yearParam = searchParams.get('year') || '5'
  const minutesParam = parseInt(searchParams.get('minutes') || '45', 10)
  const levelParam = searchParams.get('level') || 'Standard'
  const selectedStandardsParam = searchParams.get('selectedStandards') || '[]'
  const classSizeParam = parseInt(searchParams.get('classSize') || '25', 10)
  const abilityRangeParam = searchParams.get('abilityRange') || 'Mixed'
  const specialNeedsParam = searchParams.get('specialNeeds') || '[]'
  const culturalBackgroundsParam =
    searchParams.get('culturalBackgrounds') || '[]'
  const pedagogyApproachParam =
    searchParams.get('pedagogyApproach') || 'Trauma-Informed'
  const scaffoldingLevelParam =
    searchParams.get('scaffoldingLevel') || 'Moderate'
  const indigenousPerspectivesParam =
    searchParams.get('indigenousPerspectives') === 'true'

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
  const [culturalBackgrounds, setCulturalBackgrounds] = useState<string[]>([])
  const [pedagogyApproach, setPedagogyApproach] = useState(
    pedagogyApproachParam
  )
  const [scaffoldingLevel, setScaffoldingLevel] = useState(
    scaffoldingLevelParam
  )
  const [indigenousPerspectives, setIndigenousPerspectives] = useState(
    indigenousPerspectivesParam
  )
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  useEffect(() => {
    setAuthority(authorityParam)
    setVersion(versionParam)
    setSubject(subjectParam)
    setYear(yearParam)
    setMinutes(minutesParam)
    setLevel(levelParam)
    setClassSize(classSizeParam)
    setAbilityRange(abilityRangeParam)
    setPedagogyApproach(pedagogyApproachParam)
    setScaffoldingLevel(scaffoldingLevelParam)
    setIndigenousPerspectives(indigenousPerspectivesParam)
    try {
      setSelectedStandards(JSON.parse(selectedStandardsParam))
      setSpecialNeeds(JSON.parse(specialNeedsParam))
      setCulturalBackgrounds(JSON.parse(culturalBackgroundsParam))
    } catch {
      setSelectedStandards([])
      setSpecialNeeds([])
      setCulturalBackgrounds([])
    }
  }, [
    authorityParam,
    versionParam,
    subjectParam,
    yearParam,
    minutesParam,
    levelParam,
    selectedStandardsParam,
    classSizeParam,
    abilityRangeParam,
    specialNeedsParam,
    culturalBackgroundsParam,
    pedagogyApproachParam,
    scaffoldingLevelParam,
    indigenousPerspectivesParam,
  ])

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

  const activeKey = 'review'

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      // Simulate lesson generation
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setGenerated(true)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setGenerating(false)
    }
  }

  if (generated) {
    return (
      <div className='min-h-screen w-full bg-[#FDE5DA] text-[#333]'>
        <div className='max-w-4xl mx-auto px-6 py-6 lg:py-8'>
          <div className='bg-white rounded-2xl shadow-xl p-8 text-center'>
            <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4'>
              <svg viewBox='0 0 24 24' className='w-8 h-8 text-green-600'>
                <path
                  fill='currentColor'
                  d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
                />
              </svg>
            </div>
            <h1 className='text-2xl font-bold mb-4'>Lesson Plan Generated!</h1>
            <p className='text-[#666] mb-6'>
              Your personalized lesson plan is ready for review.
            </p>
            <div className='flex flex-wrap gap-3 justify-center'>
              <button className='px-6 py-3 rounded-full text-white font-semibold bg-[#888625] hover:bg-[#6f7220]'>
                View Lesson Plan
              </button>
              <button className='px-6 py-3 rounded-full font-semibold border border-[#CBD5C0] bg-white hover:border-[#333]'>
                Download PDF
              </button>
              <button className='px-6 py-3 rounded-full font-semibold border border-[#CBD5C0] bg-white hover:border-[#333]'>
                Download DOCX
              </button>
            </div>
            <div className='mt-6'>
              <a
                href='/dashboard'
                className='text-sm text-[#888625] hover:underline'
              >
                ← Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                      d='M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm1 5v6l5 3-.8 1.4L11 14V7h2Z'
                    />
                  </svg>
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Review & Generate</h2>
                  <p className='text-sm text-[#666]'>
                    Review your selections and generate your lesson plan.
                  </p>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0]'>
                  <div className='text-xs text-[#666] mb-2 font-semibold'>
                    Lesson Overview
                  </div>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    <div>
                      <div className='text-[#666]'>Subject</div>
                      <div className='font-semibold'>{subject}</div>
                    </div>
                    <div>
                      <div className='text-[#666]'>Year</div>
                      <div className='font-semibold'>{year}</div>
                    </div>
                    <div>
                      <div className='text-[#666]'>Duration</div>
                      <div className='font-semibold'>{minutes} mins</div>
                    </div>
                    <div>
                      <div className='text-[#666]'>Class Size</div>
                      <div className='font-semibold'>{classSize} students</div>
                    </div>
                  </div>
                </div>

                <div className='rounded-xl border p-4 bg-white'>
                  <div className='text-xs text-[#666] mb-2 font-semibold'>
                    Curriculum Alignment
                  </div>
                  <div className='text-sm'>
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
                    <div className='text-[#666] mt-1'>
                      {selectedStandards.length} standards selected
                    </div>
                  </div>
                </div>

                <div className='rounded-xl border p-4 bg-white'>
                  <div className='text-xs text-[#666] mb-2 font-semibold'>
                    Teaching Approach
                  </div>
                  <div className='text-sm'>
                    <div className='font-semibold'>{pedagogyApproach}</div>
                    <div className='text-[#666] mt-1'>
                      {scaffoldingLevel} scaffolding •{' '}
                      {indigenousPerspectives
                        ? 'Indigenous perspectives included'
                        : 'Standard approach'}
                    </div>
                  </div>
                </div>

                <div className='rounded-xl border p-4 bg-white'>
                  <div className='text-xs text-[#666] mb-2 font-semibold'>
                    Class Profile
                  </div>
                  <div className='text-sm'>
                    <div className='font-semibold'>
                      {abilityRange} ability range
                    </div>
                    <div className='text-[#666] mt-1'>
                      {specialNeeds.length > 0 &&
                        `${specialNeeds.length} special needs • `}
                      {culturalBackgrounds.length > 0 &&
                        `${culturalBackgrounds.length} cultural backgrounds`}
                      {specialNeeds.length === 0 &&
                        culturalBackgrounds.length === 0 &&
                        'Standard class profile'}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <button
                  onClick={() => window.history.back()}
                  className='px-5 py-3 rounded-full font-semibold border border-[#CBD5C0] bg-white hover:border-[#333] transition'
                >
                  ← Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className='px-5 py-3 rounded-full text-white font-semibold shadow-lg bg-[#888625] hover:bg-[#6f7220] ring-1 ring-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {generating ? 'Generating...' : 'Generate Lesson Plan'}
                </button>
                <span className='text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]'>
                  Step 5 of 5
                </span>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex flex-col border border-[#EFEFEF] h-full'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold'>Lesson Preview</h3>
              <span className='text-xs px-2 py-1 rounded-full bg-[#888625]/10 text-[#888625] font-semibold border border-[#CBD5C0]'>
                Ready to generate
              </span>
            </div>

            <div className='space-y-4'>
              <div className='rounded-xl border p-4 bg-[#F7FBF3] border-[#CBD5C0]'>
                <div className='text-xs text-[#666] mb-2 font-semibold'>
                  What You'll Get
                </div>
                <ul className='list-disc ml-5 text-sm leading-6'>
                  <li>Complete lesson plan with clear objectives</li>
                  <li>Trauma-informed entry routine and activities</li>
                  <li>Differentiated tasks for {abilityRange} ability range</li>
                  <li>Assessment opportunities mapped to standards</li>
                  <li>Resources and materials list</li>
                  {indigenousPerspectives && (
                    <li>Indigenous perspectives integrated throughout</li>
                  )}
                </ul>
              </div>

              <div className='rounded-xl border p-4 bg-white'>
                <div className='text-xs text-[#666] mb-2 font-semibold'>
                  Personalization Features
                </div>
                <ul className='list-disc ml-5 text-sm leading-6'>
                  <li>Activities scaled for {classSize} students</li>
                  <li>{scaffoldingLevel} scaffolding support</li>
                  <li>{pedagogyApproach} teaching approach</li>
                  {specialNeeds.length > 0 && (
                    <li>Inclusive supports for special needs</li>
                  )}
                  {culturalBackgrounds.length > 0 && (
                    <li>Culturally respectful content</li>
                  )}
                </ul>
              </div>

              <div className='rounded-xl border p-4 bg-white'>
                <div className='text-xs text-[#666] mb-2 font-semibold'>
                  Export Options
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <svg viewBox='0 0 24 24' className='w-4 h-4 text-[#888625]'>
                      <path
                        fill='currentColor'
                        d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z'
                      />
                    </svg>
                    <span>PDF Download</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <svg viewBox='0 0 24 24' className='w-4 h-4 text-[#888625]'>
                      <path
                        fill='currentColor'
                        d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z'
                      />
                    </svg>
                    <span>DOCX Download</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5 flex items-center justify-between flex-wrap gap-3'>
              <div className='text-xs text-[#666]'>
                Tip: You can always edit the generated plan.
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
