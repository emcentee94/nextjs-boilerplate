'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  CurriculumService,
  type CurriculumItem,
} from '@/lib/curriculum-service'
import type {
  LessonRequest,
  LessonPlan,
  CurriculumItem as LessonCurriculumItem,
} from '@/types/lesson-plan'
import {
  LEARNING_AREAS,
  listAllSubjects,
} from '@/src/data/curriculum/learningAreas'
import { X, Plus, BookOpen, Clock, Users, Target } from 'lucide-react'

interface LessonPlanGeneratorProps {
  onLessonPlanGenerated?: (lessonPlan: LessonPlan) => void
}

export function LessonPlanGenerator({
  onLessonPlanGenerated,
}: LessonPlanGeneratorProps) {
  const [subjects, setSubjects] = useState<string[]>([])
  const [yearLevels, setYearLevels] = useState<string[]>([])
  const [availableCurriculumItems, setAvailableCurriculumItems] = useState<
    CurriculumItem[]
  >([])
  const [selectedCurriculumItems, setSelectedCurriculumItems] = useState<
    LessonCurriculumItem[]
  >([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLessonPlan, setGeneratedLessonPlan] =
    useState<LessonPlan | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<LessonRequest>>({
    subject: '',
    yearLevels: [],
    durationMins: 50,
    classProfile: {
      size: 25,
      literacyTier: 'mixed',
    },
    options: {
      embedIndigenousPerspectives: true,
      traumaInformedScaffolds: true,
      differentiation: 'medium',
      assessmentStyle: 'formative',
    },
  })

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Use the new learning areas data for subjects
        const allSubjects = listAllSubjects()
        const subjectsData = allSubjects.map((subject) => subject.name)

        const levelsData = await CurriculumService.getLevels()
        setSubjects(subjectsData)
        setYearLevels(levelsData)
      } catch (error) {
        console.error('Failed to load initial data:', error)
      }
    }
    loadInitialData()
  }, [])

  // Load curriculum items when subject and year level change
  useEffect(() => {
    const loadCurriculumItems = async () => {
      if (formData.subject && formData.yearLevels?.length) {
        try {
          console.log(
            'Loading curriculum items for:',
            formData.subject,
            formData.yearLevels[0]
          )
          const items =
            await CurriculumService.getCurriculumItemsForSubjectAndLevel(
              formData.subject,
              formData.yearLevels[0]
            )
          console.log('Found curriculum items:', items.length)
          setAvailableCurriculumItems(items)
        } catch (error) {
          console.error('Failed to load curriculum items:', error)
        }
      }
    }
    loadCurriculumItems()
  }, [formData.subject, formData.yearLevels])

  const handleSubjectChange = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }))
    setSelectedCurriculumItems([]) // Clear selections when subject changes
  }

  const handleYearLevelChange = (yearLevel: string) => {
    setFormData((prev) => ({
      ...prev,
      yearLevels: [yearLevel],
    }))
    setSelectedCurriculumItems([]) // Clear selections when year level changes
  }

  const handleAddCurriculumItem = (item: CurriculumItem) => {
    const code = item['Code'] || item.code
    if (
      code &&
      !selectedCurriculumItems.find((selected) => selected.code === code)
    ) {
      setSelectedCurriculumItems((prev) => [
        ...prev,
        {
          code,
          title:
            item['Content Description'] || item.content_description || code,
        },
      ])
    }
  }

  const handleRemoveCurriculumItem = (code: string) => {
    setSelectedCurriculumItems((prev) =>
      prev.filter((item) => item.code !== code)
    )
  }

  const handleGenerateLessonPlan = async () => {
    if (
      !formData.subject ||
      !formData.yearLevels?.length ||
      selectedCurriculumItems.length === 0
    ) {
      alert(
        'Please select a subject, year level, and at least one curriculum item.'
      )
      return
    }

    setIsGenerating(true)
    try {
      const request: LessonRequest = {
        subject: formData.subject,
        yearLevels: formData.yearLevels,
        items: selectedCurriculumItems,
        durationMins: formData.durationMins || 50,
        classProfile: formData.classProfile,
        options: formData.options!,
      }

      const response = await fetch('/api/lesson-plan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setGeneratedLessonPlan(data.lessonPlan)
      onLessonPlanGenerated?.(data.lessonPlan)
    } catch (error) {
      console.error('Failed to generate lesson plan:', error)
      alert('Failed to generate lesson plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BookOpen className='h-5 w-5' />
            Lesson Plan Generator
          </CardTitle>
          <CardDescription>
            Generate AI-powered lesson plans aligned with the Australian
            Curriculum
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Subject and Year Level Selection */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Subject</label>
              <Select
                value={formData.subject}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select subject' />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Year Level</label>
              <Select
                value={formData.yearLevels?.[0] || ''}
                onValueChange={handleYearLevelChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select year level' />
                </SelectTrigger>
                <SelectContent>
                  {yearLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Duration (minutes)</label>
            <Input
              type='number'
              value={formData.durationMins}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  durationMins: parseInt(e.target.value) || 50,
                }))
              }
              min='10'
              max='120'
            />
          </div>

          {/* Class Profile */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium flex items-center gap-2'>
              <Users className='h-4 w-4' />
              Class Profile
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Class Size</label>
                <Input
                  type='number'
                  value={formData.classProfile?.size || 25}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      classProfile: {
                        ...prev.classProfile,
                        size: parseInt(e.target.value) || 25,
                      },
                    }))
                  }
                  min='1'
                  max='40'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Literacy Tier</label>
                <Select
                  value={formData.classProfile?.literacyTier || 'mixed'}
                  onValueChange={(value: 'mixed' | 'lower' | 'higher') =>
                    setFormData((prev) => ({
                      ...prev,
                      classProfile: {
                        ...prev.classProfile,
                        literacyTier: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='mixed'>Mixed</SelectItem>
                    <SelectItem value='lower'>Lower</SelectItem>
                    <SelectItem value='higher'>Higher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium flex items-center gap-2'>
              <Target className='h-4 w-4' />
              Lesson Options
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='indigenous'
                  checked={formData.options?.embedIndigenousPerspectives}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      options: {
                        ...prev.options!,
                        embedIndigenousPerspectives: !!checked,
                      },
                    }))
                  }
                />
                <label htmlFor='indigenous' className='text-sm font-medium'>
                  Embed Indigenous Perspectives
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='trauma-informed'
                  checked={formData.options?.traumaInformedScaffolds}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      options: {
                        ...prev.options!,
                        traumaInformedScaffolds: !!checked,
                      },
                    }))
                  }
                />
                <label
                  htmlFor='trauma-informed'
                  className='text-sm font-medium'
                >
                  Trauma-Informed Scaffolds
                </label>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Differentiation Level
                  </label>
                  <Select
                    value={formData.options?.differentiation || 'medium'}
                    onValueChange={(value: 'low' | 'medium' | 'high') =>
                      setFormData((prev) => ({
                        ...prev,
                        options: {
                          ...prev.options!,
                          differentiation: value,
                        },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='medium'>Medium</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>
                    Assessment Style
                  </label>
                  <Select
                    value={formData.options?.assessmentStyle || 'formative'}
                    onValueChange={(
                      value:
                        | 'formative'
                        | 'summative'
                        | 'rubric-upload'
                        | 'acara-standard'
                        | 'vcaa'
                    ) =>
                      setFormData((prev) => ({
                        ...prev,
                        options: {
                          ...prev.options!,
                          assessmentStyle: value,
                        },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='formative'>Formative</SelectItem>
                      <SelectItem value='summative'>Summative</SelectItem>
                      <SelectItem value='rubric-upload'>
                        Rubric Upload
                      </SelectItem>
                      <SelectItem value='acara-standard'>
                        ACARA Standard
                      </SelectItem>
                      <SelectItem value='vcaa'>VCAA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Items Selection */}
          {formData.subject && formData.yearLevels?.length && (
            <div className='space-y-4'>
              <h3 className='text-lg font-medium'>Curriculum Items</h3>

              {/* Selected Items */}
              {selectedCurriculumItems.length > 0 && (
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Selected Items</label>
                  <div className='flex flex-wrap gap-2'>
                    {selectedCurriculumItems.map((item) => (
                      <Badge
                        key={item.code}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {item.code}
                        <button
                          onClick={() => handleRemoveCurriculumItem(item.code)}
                          className='ml-1 hover:bg-destructive/20 rounded-full p-0.5'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Items */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Available Items</label>
                <div className='max-h-60 overflow-y-auto space-y-2 border rounded-md p-3'>
                  {availableCurriculumItems.slice(0, 20).map((item) => {
                    const code = item['Code'] || item.code
                    const description =
                      item['Content Description'] || item.content_description
                    const isSelected = selectedCurriculumItems.some(
                      (selected) => selected.code === code
                    )

                    if (!code || isSelected) return null

                    return (
                      <div
                        key={code}
                        className='flex items-start gap-2 p-2 hover:bg-muted/50 rounded'
                      >
                        <button
                          onClick={() => handleAddCurriculumItem(item)}
                          className='mt-1 p-1 hover:bg-primary/10 rounded'
                        >
                          <Plus className='h-4 w-4' />
                        </button>
                        <div className='flex-1 min-w-0'>
                          <div className='font-mono text-sm font-medium'>
                            {code}
                          </div>
                          <div className='text-sm text-muted-foreground line-clamp-2'>
                            {description}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerateLessonPlan}
            disabled={
              isGenerating ||
              !formData.subject ||
              !formData.yearLevels?.length ||
              selectedCurriculumItems.length === 0
            }
            className='w-full'
            size='lg'
          >
            {isGenerating ? (
              <>
                <Clock className='h-4 w-4 mr-2 animate-spin' />
                Generating Lesson Plan... (this may take a few minutes)
              </>
            ) : (
              <>
                <BookOpen className='h-4 w-4 mr-2' />
                Generate Lesson Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
