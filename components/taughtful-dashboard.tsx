'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  LibraryBig,
  Brain,
  HandHeart,
  Feather,
  Globe,
  Sparkles,
} from 'lucide-react'
import TaughtfulSurvey from './taughtful-survey'
import CurriculumSelector from './curriculum-selector'
import { useDemo } from '@/contexts/DemoContext'
import { exemplaryLesson } from '@/lib/demo-samples'
// import Highlight, { defaultProps } from 'prism-react-renderer';
// import { themes } from 'prism-react-renderer';

// Cursor-ready React component
// Update: Wired Class, Pedagogy & Scaffolds, and Review steps end-to-end.
// Added lightweight dev sanity tests. Removed smart quotes.

const steps = [
  { key: 'basics', label: 'Lesson Basics', icon: BookOpen },
  { key: 'curriculum', label: 'Curriculum Standards', icon: LibraryBig },
  { key: 'class', label: 'Class Profile', icon: Users },
  { key: 'pedagogy', label: 'Pedagogy & Scaffolds', icon: Feather },
  { key: 'generate', label: 'Review & Generate', icon: CheckCircle2 },
]

const subjects = [
  'English',
  'Mathematics',
  'Science',
  'Humanities',
  'Health & PE',
  'The Arts',
  'Technologies',
]

const yearLevels = ['F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const eightWays = [
  'Story Sharing: Approaching learning through narrative',
  'Learning Maps: Visualising processes explicitly',
  'Non-verbal: Using kinaesthetic and reflective practice',
  'Symbols and Images: Using images and metaphors',
  'Land Links: Place-based learning connected to Country',
  'Non-linear: Lateral thinking and innovation',
  'Deconstruct/Reconstruct: Watch then do, scaffold from whole to parts',
  'Community Links: Apply learning for community benefit',
]

function getWeightedEightWays(subject: string): string[] {
  let weights = []
  switch (subject) {
    case 'English':
      weights = [eightWays[0], eightWays[1], eightWays[3], eightWays[6]]
      break
    case 'Science':
      weights = [eightWays[1], eightWays[4], eightWays[5], eightWays[6]]
      break
    case 'Mathematics':
      weights = [eightWays[1], eightWays[3], eightWays[5], eightWays[6]]
      break
    case 'Humanities':
      weights = [eightWays[0], eightWays[3], eightWays[4], eightWays[7]]
      break
    case 'Health & PE':
      weights = [eightWays[2], eightWays[4], eightWays[6], eightWays[7]]
      break
    case 'The Arts':
      weights = [eightWays[0], eightWays[2], eightWays[3], eightWays[7]]
      break
    case 'Technologies':
      weights = [eightWays[1], eightWays[3], eightWays[5], eightWays[6]]
      break
    default:
      weights = eightWays
  }
  return weights
}

export default function TaughtfulDashboard() {
  const { isDemo } = useDemo()
  const [active, setActive] = useState('basics')
  const [displayName, setDisplayName] = useState<string>('Teacher')
  const [subject, setSubject] = useState('')
  const [year, setYear] = useState('')
  const [duration, setDuration] = useState(60)
  const [classSize, setClassSize] = useState(25)
  const [literacyTier, setLiteracyTier] = useState('Mixed')
  const [assessment, setAssessment] = useState('Formative')
  const [diff, setDiff] = useState(1) // 0 Light, 1 Balanced, 2 Full
  const [tiOn, setTiOn] = useState(true)
  const [indigLevel, setIndigLevel] = useState(1) // 0 none, 1 contextual, 2 deep
  const [aboriginalPedagogy, setAboriginalPedagogy] = useState(false)
  const [selectedEightWays, setSelectedEightWays] = useState<string[]>([])
  const [modalContent, setModalContent] = useState<{
    title: string
    body: string
    link: string
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLessonPlan, setGeneratedLessonPlan] = useState<Record<
    string,
    unknown
  > | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Curriculum selection state
  const [curriculumItems, setCurriculumItems] = useState<
    Record<string, unknown>[]
  >([])
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState<
    Record<string, unknown>[]
  >([])
  const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(false)
  const [curriculumError, setCurriculumError] = useState<string | null>(null)

  const canNextBasics = Boolean(subject && year)
  const canNextCurriculum = selectedCurriculumItems.length > 0
  const canNextClass = classSize > 0 && literacyTier && assessment

  useEffect(() => {
    // Load demo user (or real auth user if present) for greeting
    try {
      const raw =
        typeof window !== 'undefined'
          ? localStorage.getItem('taughtful_user')
          : null
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.name) {
          setDisplayName(parsed.name)
        }
      }
    } catch {
      // Ignore fetch errors
    }
    if (aboriginalPedagogy && subject) {
      setSelectedEightWays(getWeightedEightWays(subject))
    } else {
      setSelectedEightWays([])
    }
  }, [aboriginalPedagogy, subject])

  const fetchCurriculumItems = useCallback(async () => {
    setIsLoadingCurriculum(true)
    setCurriculumError(null)
    setCurriculumItems([])
    setSelectedCurriculumItems([])

    try {
      if (isDemo) {
        // Use demo curriculum data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading
        setCurriculumItems([
          {
            id: 'demo-1',
            code: 'VCEEN008',
            title: 'English VCAA 8.1 (Persuasive Texts)',
            description:
              'Create persuasive texts for different purposes and audiences',
          },
          {
            id: 'demo-2',
            code: 'VCEEN009',
            title: 'English VCAA 8.2 (Personal and Cultural Contexts)',
            description:
              'Analyze how language choices shape meaning and influence readers',
          },
        ])
      } else {
        const response = await fetch(
          `/api/curriculum/search?learningAreaId=${subject}&yearLevel=${year}&limit=100`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch curriculum items')
        }

        const data = await response.json()
        setCurriculumItems(data.outcomes || [])
      }
    } catch (err) {
      console.error('Curriculum fetch error:', err)
      setCurriculumError(
        (err as Error).message || 'Failed to load curriculum items'
      )
    } finally {
      setIsLoadingCurriculum(false)
    }
  }, [isDemo, subject, year])

  // Fetch curriculum items when subject and year are selected
  useEffect(() => {
    if (subject && year) {
      fetchCurriculumItems()
    }
  }, [subject, year, fetchCurriculumItems])

  // Removed unused toggleCurriculumItem function

  const handleGenerateLessonPlan = async () => {
    if (!subject || !year || selectedCurriculumItems.length === 0) {
      setError(
        'Please complete all required fields and select at least one curriculum standard before generating a lesson plan.'
      )
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedLessonPlan(null)

    try {
      if (isDemo) {
        // Use demo data instead of real API call
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate loading
        setGeneratedLessonPlan(exemplaryLesson)
      } else {
        // Convert selected curriculum items to the format expected by the API
        const curriculumItemsForAPI = selectedCurriculumItems.map((item) => ({
          code: item.code || item.id,
          title: item.title || `Curriculum item ${item.code}`,
        }))

        const request = {
          subject,
          yearLevels: [year],
          items: curriculumItemsForAPI,
          durationMins: duration,
          classProfile: {
            size: classSize,
            literacyTier: literacyTier.toLowerCase(),
            additionalNeeds: [],
          },
          options: {
            embedIndigenousPerspectives: indigLevel > 0,
            traumaInformedScaffolds: tiOn,
            differentiation: ['low', 'medium', 'high'][diff],
            assessmentStyle: assessment.toLowerCase(),
          },
        }

        const response = await fetch('/api/lesson-plan/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to generate lesson plan')
        }

        const data = await response.json()
        setGeneratedLessonPlan(data.lessonPlan)
      }
    } catch (err) {
      console.error('Lesson plan generation error:', err)
      setError(
        (err as Error).message ||
          'Failed to generate lesson plan. Please try again.'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='min-h-screen w-full bg-[#FDE5DA]'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h1 className='text-3xl font-black text-gray-900 font-fredoka tracking-wide'>
                G&apos;DAY, {displayName || 'TEACHER'} 👋
              </h1>
              <p className='text-lg text-gray-600 font-fredoka mt-1'>
                Let&apos;s create an amazing lesson plan together!
              </p>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] text-white px-4 py-2 rounded-full font-fredoka font-bold shadow-lg'
            >
              Beta
            </motion.div>
          </div>

          {/* Progress Stepper */}
          <div className='mb-8'>
            <Stepper active={active} setActive={setActive} />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 space-y-6'>
            <AnimatePresence mode='wait'>
              {active === 'basics' && (
                <motion.div
                  key='basics'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='rounded-2xl border-2 border-[#FD6585]/30 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <SectionHeader
                    icon={BookOpen}
                    title='Lesson Basics'
                    subtitle='Pick the essentials.'
                  />
                  <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <SelectField
                      label='Subject'
                      value={subject}
                      onChange={setSubject}
                      options={subjects}
                      placeholder='Select subject'
                    />
                    <SelectField
                      label='Year Level'
                      value={year}
                      onChange={setYear}
                      options={yearLevels}
                      placeholder='Select year level'
                    />
                    <SliderField
                      label='Duration (mins)'
                      value={duration}
                      onChange={setDuration}
                      min={30}
                      max={120}
                      step={5}
                      icon={Clock}
                      suffix=' minutes'
                    />
                  </div>
                  <NavButtons
                    onPrev={() => setActive('basics')}
                    onNext={() => setActive('curriculum')}
                    nextEnabled={canNextBasics}
                  />
                </motion.div>
              )}

              {active === 'curriculum' && (
                <motion.div
                  key='curriculum'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='rounded-2xl border-2 border-[#888625]/30 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <SectionHeader
                    icon={LibraryBig}
                    title='Curriculum Standards'
                    subtitle='Select the specific curriculum outcomes you want to focus on.'
                  />

                  <div className='mt-6'>
                    <CurriculumSelector
                      curriculumItems={curriculumItems}
                      selectedItems={selectedCurriculumItems}
                      onSelectionChange={setSelectedCurriculumItems}
                      isLoading={isLoadingCurriculum}
                      error={curriculumError}
                      onRetry={fetchCurriculumItems}
                      subject={subject}
                      year={year}
                    />
                  </div>

                  <NavButtons
                    onPrev={() => setActive('basics')}
                    onNext={() => setActive('class')}
                    nextEnabled={canNextCurriculum}
                  />
                </motion.div>
              )}

              {active === 'class' && (
                <motion.div
                  key='class'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='rounded-2xl border-2 border-[#3B82F6]/30 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <SectionHeader
                    icon={Users}
                    title='Class Profile'
                    subtitle='Calibrate scaffolds to your learners.'
                  />
                  <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <SliderField
                      label='Class Size'
                      value={classSize}
                      onChange={setClassSize}
                      min={5}
                      max={35}
                      step={1}
                      icon={Users}
                      suffix='students'
                    />
                    <SelectField
                      label='Literacy Tier'
                      value={literacyTier}
                      onChange={setLiteracyTier}
                      options={['Emerging', 'Mixed', 'Fluent']}
                      placeholder='Select literacy tier'
                    />
                    <SelectField
                      label='Assessment Style'
                      value={assessment}
                      onChange={setAssessment}
                      options={['Formative', 'Summative', 'Diagnostic']}
                      placeholder='Select assessment'
                    />
                  </div>
                  <NavButtons
                    onPrev={() => setActive('basics')}
                    onNext={() => setActive('pedagogy')}
                    nextEnabled={Boolean(canNextClass)}
                  />
                </motion.div>
              )}

              {active === 'pedagogy' && (
                <motion.div
                  key='pedagogy'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='rounded-2xl border-2 border-[#10B981]/30 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <SectionHeader
                    icon={Feather}
                    title='Pedagogy & Scaffolds'
                    subtitle='Center trauma-informed practice and embed Indigenous perspectives.'
                  />

                  {/* Trauma-informed toggle */}
                  <div className='mt-6 rounded-2xl border-2 border-[#FD6585]/20 p-5 bg-gradient-to-br from-[#fff9fb] to-[#ffeef2] hover:border-[#FD6585]/40 transition-all duration-300'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-xl bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] p-2 text-white shadow-md'>
                        <HandHeart className='h-5 w-5' />
                      </div>
                      <h3 className='font-semibold font-fredoka text-gray-900'>
                        Trauma-Informed Scaffolds
                      </h3>
                      <Toggle checked={tiOn} onChange={setTiOn} />
                    </div>
                    <p className='text-sm text-gray-600 mt-2 font-fredoka'>
                      These supports emphasize regulation, routine, and
                      relationships.{' '}
                      <button
                        className='underline text-[#FD6585] hover:text-[#FF9A2E] transition-colors'
                        onClick={() =>
                          setModalContent({
                            title: 'Trauma-Informed Scaffolds',
                            body: 'Strategies include predictable routines, co-regulation activities, calm entry/exit, and relational check-ins.',
                            link: '/resources#trauma-informed',
                          })
                        }
                      >
                        Learn more
                      </button>
                    </p>
                  </div>

                  {/* Indigenous perspectives depth */}
                  <div className='mt-6 rounded-2xl border-2 border-[#888625]/20 p-5 bg-gradient-to-br from-[#fbfff4] to-[#f0f8e8] hover:border-[#888625]/40 transition-all duration-300'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-xl bg-gradient-to-br from-[#888625] to-[#4CAF50] p-2 text-white shadow-md'>
                        <Brain className='h-5 w-5' />
                      </div>
                      <h3 className='font-semibold font-fredoka text-gray-900'>
                        Embedding Indigenous Perspectives
                      </h3>
                    </div>
                    <p className='text-sm text-gray-600 mt-2 font-fredoka'>
                      Respectful integration of First Nations knowledge. Choose
                      the depth that suits context.{' '}
                      <button
                        className='underline text-[#888625] hover:text-[#4CAF50] transition-colors'
                        onClick={() =>
                          setModalContent({
                            title: 'Embedding Indigenous Perspectives',
                            body: 'Contextual embedding may include Country acknowledgments or examples. Deep integration uses Indigenous pedagogies in lesson structure.',
                            link: '/resources#indigenous',
                          })
                        }
                      >
                        Learn more
                      </button>
                    </p>
                    <div className='mt-3 flex gap-2'>
                      {[0, 1, 2].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setIndigLevel(lvl)}
                          className={`${indigLevel === lvl ? 'bg-gradient-to-r from-[#888625] to-[#4CAF50] text-white shadow-lg' : 'bg-white border-2 border-[#888625]/30 hover:border-[#888625]/60'} rounded-xl px-4 py-2 text-sm font-fredoka font-semibold transition-all duration-300 hover:scale-105`}
                        >
                          {lvl === 0
                            ? 'Not included'
                            : lvl === 1
                              ? 'Contextual'
                              : 'Deep integration'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aboriginal Pedagogy (8 Ways) */}
                  <div className='mt-6 rounded-2xl border-2 border-[#3B82F6]/20 p-5 bg-gradient-to-br from-[#f0faff] to-[#e6f3ff] hover:border-[#3B82F6]/40 transition-all duration-300'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] p-2 text-white shadow-md'>
                        <Globe className='h-5 w-5' />
                      </div>
                      <h3 className='font-semibold font-fredoka text-gray-900'>
                        Aboriginal Pedagogy (8 Ways)
                      </h3>
                      <Toggle
                        checked={aboriginalPedagogy}
                        onChange={setAboriginalPedagogy}
                      />
                    </div>
                    <p className='text-sm text-gray-600 mt-2 font-fredoka'>
                      Includes Story Sharing, Learning Maps, Land Links and
                      more.{' '}
                      <button
                        className='underline text-[#3B82F6] hover:text-[#8B5CF6] transition-colors'
                        onClick={() =>
                          setModalContent({
                            title: 'Aboriginal Pedagogy (8 Ways)',
                            body: 'The 8 Ways framework focuses on Aboriginal processes of knowledge transmission and is adapted locally. It is a culturally safe entry point for embedding Aboriginal pedagogies.',
                            link: '/resources#8ways',
                          })
                        }
                      >
                        Learn more
                      </button>
                    </p>
                    {aboriginalPedagogy && selectedEightWays.length > 0 && (
                      <ul className='list-disc list-inside text-sm text-gray-700 mt-2 font-fredoka'>
                        {selectedEightWays.map((w: string) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className='mt-6'>
                    <label className='block text-sm font-medium mb-3 font-fredoka text-gray-900'>
                      Scaffold depth
                    </label>
                    <div className='flex gap-2'>
                      {[0, 1, 2].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setDiff(lvl)}
                          className={`${diff === lvl ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white shadow-lg' : 'bg-white border-2 border-[#F59E0B]/30 hover:border-[#F59E0B]/60'} rounded-xl px-4 py-2 text-sm font-fredoka font-semibold transition-all duration-300 hover:scale-105`}
                        >
                          {['Light', 'Balanced', 'Full'][lvl]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <NavButtons
                    onPrev={() => setActive('class')}
                    onNext={() => setActive('generate')}
                  />
                </motion.div>
              )}

              {active === 'generate' && (
                <motion.div
                  key='generate'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='rounded-2xl border-2 border-[#F59E0B]/30 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <SectionHeader
                    icon={CheckCircle2}
                    title='Review & Generate'
                    subtitle='Quick recap before we craft your plan.'
                  />
                  <div className='mt-6'>
                    <div className='rounded-2xl border-2 border-[#FD6585]/20 p-6 bg-gradient-to-br from-[#fff9fb] to-[#ffeef2]'>
                      <h4 className='font-semibold mb-4 font-fredoka text-gray-900 flex items-center gap-2'>
                        <div className='rounded-xl bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] p-2 text-white shadow-md'>
                          <CheckCircle2 className='h-5 w-5' />
                        </div>
                        Live Preview
                      </h4>
                      <PreviewCard
                        subject={subject}
                        year={year}
                        duration={duration}
                        classSize={classSize}
                        literacyTier={literacyTier}
                        assessment={assessment}
                        tiOn={tiOn}
                        diff={diff}
                        indigLevel={indigLevel}
                        aboriginalPedagogy={aboriginalPedagogy}
                        selectedEightWays={selectedEightWays}
                        selectedCurriculumItems={selectedCurriculumItems}
                      />
                    </div>
                  </div>
                  <NavButtons
                    onPrev={() => setActive('pedagogy')}
                    onNext={() => {}}
                  />

                  <div className='mt-6 flex justify-center'>
                    <motion.button
                      onClick={handleGenerateLessonPlan}
                      disabled={isGenerating}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-4 rounded-2xl font-fredoka font-bold text-lg shadow-lg transition-all duration-300 ${
                        isGenerating
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white hover:shadow-xl'
                      }`}
                    >
                      {isGenerating ? (
                        <div className='flex items-center gap-2'>
                          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                          Generating... (this may take a few minutes)
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <Sparkles className='w-5 h-5' />
                          Generate Lesson Plan
                        </div>
                      )}
                    </motion.button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl'
                    >
                      <p className='text-red-700 text-sm font-fredoka'>
                        {error}
                      </p>
                      {error.includes('overloaded') && (
                        <button
                          onClick={handleGenerateLessonPlan}
                          disabled={isGenerating}
                          className='mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-xl font-fredoka font-semibold transition-all duration-300 hover:scale-105'
                        >
                          Try Again
                        </button>
                      )}
                    </motion.div>
                  )}

                  {generatedLessonPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className='mt-8'
                    >
                      <h3 className='text-2xl font-bold mb-6 font-fredoka text-gray-900 flex items-center gap-2'>
                        <div className='rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] p-2 text-white shadow-md'>
                          <CheckCircle2 className='h-6 w-6' />
                        </div>
                        Generated Lesson Plan
                      </h3>
                      <div className='bg-white border-2 border-[#10B981]/20 rounded-2xl p-6 max-h-96 overflow-y-auto shadow-lg'>
                        <h4 className='text-xl font-semibold mb-3 font-fredoka text-gray-900'>
                          {generatedLessonPlan.title}
                        </h4>
                        <p className='text-gray-700 mb-4 font-fredoka'>
                          {generatedLessonPlan.overview}
                        </p>

                        <div className='mb-4'>
                          <h5 className='font-semibold mb-2 font-fredoka text-gray-900'>
                            Learning Goals:
                          </h5>
                          <ul className='list-disc list-inside text-sm text-gray-700 font-fredoka'>
                            {generatedLessonPlan.learningGoals?.map(
                              (goal: string, index: number) => (
                                <li key={index}>{goal}</li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className='mb-4'>
                          <h5 className='font-semibold mb-2 font-fredoka text-gray-900'>
                            Lesson Timeline:
                          </h5>
                          <div className='space-y-3'>
                            {generatedLessonPlan.lessonTimeline?.map(
                              (
                                item: Record<string, unknown>,
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className='border-l-4 border-[#FD6585] pl-4 bg-gradient-to-r from-[#fff9fb] to-transparent p-3 rounded-r-xl'
                                >
                                  <div className='font-medium text-sm font-fredoka text-gray-900'>
                                    {item.minutes} minutes: {item.activity}
                                  </div>
                                  <div className='text-xs text-gray-600 mt-1 font-fredoka'>
                                    <strong>Teacher:</strong>{' '}
                                    {item.teacherMoves?.join(', ')}
                                  </div>
                                  <div className='text-xs text-gray-600 font-fredoka'>
                                    <strong>Students:</strong>{' '}
                                    {item.studentTasks?.join(', ')}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {generatedLessonPlan.resources &&
                          generatedLessonPlan.resources.length > 0 && (
                            <div className='mb-4'>
                              <h5 className='font-semibold mb-2 font-fredoka text-gray-900'>
                                Resources:
                              </h5>
                              <ul className='list-disc list-inside text-sm text-gray-700 font-fredoka'>
                                {generatedLessonPlan.resources.map(
                                  (resource: string, index: number) => (
                                    <li key={index}>{resource}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {generatedLessonPlan.traumaInformedStrategies &&
                          generatedLessonPlan.traumaInformedStrategies.length >
                            0 && (
                            <div className='mb-4'>
                              <h5 className='font-semibold mb-2 font-fredoka text-gray-900'>
                                Trauma-Informed Strategies:
                              </h5>
                              <ul className='list-disc list-inside text-sm text-gray-700 font-fredoka'>
                                {generatedLessonPlan.traumaInformedStrategies.map(
                                  (strategy: string, index: number) => (
                                    <li key={index}>{strategy}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}

                        {generatedLessonPlan.indigenousPerspectives && (
                          <div className='mb-4'>
                            <h5 className='font-semibold mb-2 font-fredoka text-gray-900'>
                              Indigenous Perspectives:
                            </h5>
                            <p className='text-sm text-gray-700 font-fredoka'>
                              {generatedLessonPlan.indigenousPerspectives}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className='mt-6'>
                        <TaughtfulSurvey />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {modalContent && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl p-6 max-w-lg shadow-xl'>
            <h2 className='text-lg font-bold mb-2'>{modalContent.title}</h2>
            <p className='text-sm text-[#333] mb-4'>{modalContent.body}</p>
            {modalContent.link && (
              <a
                href={modalContent.link}
                className='block text-sm text-blue-600 underline mb-4'
                target='_blank'
                rel='noopener noreferrer'
              >
                Go to resources page
              </a>
            )}
            <button
              onClick={() => setModalContent(null)}
              className='px-4 py-2 bg-[#333] text-white rounded'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Dev sanity tests (lightweight) ---
if (
  typeof window !== 'undefined' &&
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NODE_ENV !== 'production'
) {
  const sci = getWeightedEightWays('Science')
  console.assert(
    sci.includes('Land Links: Place-based learning connected to Country'),
    'Science should prefer Land Links'
  )
  const eng = getWeightedEightWays('English')
  console.assert(
    eng.includes('Story Sharing: Approaching learning through narrative'),
    'English should prefer Story Sharing'
  )
}

// --- Supporting Components ---
function Stepper({
  active,
  setActive,
}: {
  active: string
  setActive: (step: string) => void
}) {
  return (
    <div className='flex flex-wrap gap-3'>
      {steps.map((step) => (
        <motion.button
          key={step.key}
          onClick={() => setActive(step.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center px-4 py-3 rounded-2xl text-sm font-fredoka font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
            active === step.key
              ? 'bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] text-white border-2 border-[#FD6585]/60'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#FD6585]/40 hover:text-[#FD6585]'
          }`}
        >
          <div
            className={`rounded-xl p-1.5 mr-3 ${
              active === step.key ? 'bg-white/20' : 'bg-gray-100'
            }`}
          >
            <step.icon
              className={`h-4 w-4 ${
                active === step.key ? 'text-white' : 'text-gray-600'
              }`}
            />
          </div>
          {step.label}
          {active === step.key && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='ml-2 w-2 h-2 bg-white rounded-full'
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
}) {
  return (
    <div className='flex items-center gap-4'>
      <div className='rounded-2xl bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] p-3 text-white shadow-lg'>
        <Icon className='h-6 w-6' />
      </div>
      <div>
        <h2 className='font-bold text-xl font-fredoka text-gray-900'>
          {title}
        </h2>
        <p className='text-sm text-gray-600 font-fredoka'>{subtitle}</p>
      </div>
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label className='block text-sm font-medium mb-2 font-fredoka text-gray-900'>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-fredoka text-gray-900 focus:border-[#FD6585] focus:ring-2 focus:ring-[#FD6585]/20 transition-all duration-300 hover:border-[#FD6585]/60'
      >
        <option value=''>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  icon: Icon,
  suffix,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  icon: React.ComponentType<{ className?: string }>
  suffix: string
}) {
  return (
    <div>
      <label className='block text-sm font-medium mb-2 font-fredoka text-gray-900'>
        {label}
      </label>
      <div className='flex items-center gap-3'>
        {Icon && (
          <div className='rounded-xl bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] p-2 text-white shadow-md'>
            <Icon className='h-4 w-4' />
          </div>
        )}
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider'
          style={{
            background: `linear-gradient(to right, #FD6585 0%, #FD6585 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <span className='text-sm text-gray-700 font-fredoka font-semibold min-w-[3rem] text-center'>
          {value}
          {suffix ? ` ${suffix}` : ''}
        </span>
      </div>
    </div>
  )
}

function NavButtons({
  onPrev,
  onNext,
  nextEnabled = true,
}: {
  onPrev: () => void
  onNext: () => void
  nextEnabled?: boolean
}) {
  return (
    <div className='mt-8 flex justify-between'>
      {onPrev ? (
        <motion.button
          onClick={onPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#FD6585]/60 text-gray-700 hover:text-[#FD6585] rounded-xl font-fredoka font-semibold transition-all duration-300 hover:shadow-lg'
        >
          ← Back
        </motion.button>
      ) : (
        <span />
      )}
      {onNext && (
        <motion.button
          onClick={onNext}
          disabled={!nextEnabled}
          whileHover={nextEnabled ? { scale: 1.05 } : {}}
          whileTap={nextEnabled ? { scale: 0.95 } : {}}
          className={`px-6 py-3 rounded-xl font-fredoka font-semibold transition-all duration-300 ${
            nextEnabled
              ? 'bg-gradient-to-r from-[#FD6585] to-[#FF9A2E] hover:from-[#FD6585]/90 hover:to-[#FF9A2E]/90 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next →
        </motion.button>
      )}
    </div>
  )
}

function PreviewCard({
  subject,
  year,
  duration,
  classSize,
  literacyTier,
  assessment,
  tiOn,
  diff,
  indigLevel,
  aboriginalPedagogy,
  selectedEightWays,
  selectedCurriculumItems,
}: {
  subject: string
  year: string
  duration: number
  classSize: number
  literacyTier: string
  assessment: string
  tiOn: boolean
  diff: number
  indigLevel: number
  aboriginalPedagogy: boolean
  selectedEightWays: string[]
  selectedCurriculumItems: Record<string, unknown>[]
}) {
  return (
    <div className='space-y-3 text-sm font-fredoka'>
      <div className='grid grid-cols-2 gap-3'>
        <div className='bg-white/50 rounded-xl p-3'>
          <p className='font-semibold text-gray-900'>Subject:</p>
          <p className='text-gray-700'>{subject || '—'}</p>
        </div>
        <div className='bg-white/50 rounded-xl p-3'>
          <p className='font-semibold text-gray-900'>Year:</p>
          <p className='text-gray-700'>{year || '—'}</p>
        </div>
        <div className='bg-white/50 rounded-xl p-3'>
          <p className='font-semibold text-gray-900'>Duration:</p>
          <p className='text-gray-700'>{duration} mins</p>
        </div>
        <div className='bg-white/50 rounded-xl p-3'>
          <p className='font-semibold text-gray-900'>Class:</p>
          <p className='text-gray-700'>
            {classSize} students • {literacyTier}
          </p>
        </div>
        <div className='bg-white/50 rounded-xl p-3'>
          <p className='font-semibold text-gray-900'>Assessment:</p>
          <p className='text-gray-700'>{assessment}</p>
        </div>
        <div className='bg-white/50 rounded-xl p-3'>
          <p className='font-semibold text-gray-900'>Trauma-informed:</p>
          <p className='text-gray-700'>
            {tiOn ? '✅ Included' : '❌ Not included'}
          </p>
        </div>
      </div>

      <div className='bg-white/50 rounded-xl p-3'>
        <p className='font-semibold text-gray-900 mb-2'>Scaffold depth:</p>
        <p className='text-gray-700'>{['Light', 'Balanced', 'Full'][diff]}</p>
      </div>

      <div className='bg-white/50 rounded-xl p-3'>
        <p className='font-semibold text-gray-900 mb-2'>
          Indigenous perspectives:
        </p>
        <p className='text-gray-700'>
          {['Not included', 'Contextual', 'Deep integration'][indigLevel]}
        </p>
      </div>

      <div className='bg-white/50 rounded-xl p-3'>
        <p className='font-semibold text-gray-900 mb-2'>
          Aboriginal Pedagogy (8 Ways):
        </p>
        <p className='text-gray-700'>
          {aboriginalPedagogy ? '✅ Enabled' : '❌ Not included'}
        </p>
        {aboriginalPedagogy && selectedEightWays.length > 0 && (
          <ul className='list-disc list-inside text-xs text-gray-600 mt-2'>
            {selectedEightWays.map((way: string) => (
              <li key={way}>{way}</li>
            ))}
          </ul>
        )}
      </div>

      <div className='bg-white/50 rounded-xl p-3'>
        <p className='font-semibold text-gray-900 mb-2'>
          Selected Curriculum Standards:
        </p>
        <p className='text-gray-700'>
          {selectedCurriculumItems?.length || 0} items selected
        </p>
        {selectedCurriculumItems && selectedCurriculumItems.length > 0 && (
          <ul className='list-disc list-inside text-xs text-gray-600 max-h-20 overflow-y-auto mt-2'>
            {selectedCurriculumItems.map(
              (item: Record<string, unknown>, index: number) => (
                <li key={item.id || index}>
                  {item.code}:{' '}
                  {item.title || item.description || 'Curriculum Standard'}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

// Removed unused Badge function

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`ml-auto relative h-7 w-12 rounded-full transition-all duration-300 ${
        checked ? 'bg-gradient-to-r from-[#FD6585] to-[#FF9A2E]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
          checked ? 'translate-x-5' : ''
        }`}
      ></span>
    </button>
  )
}
