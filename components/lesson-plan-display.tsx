'use client'

import {
  BookOpen,
  Clock,
  Target,
  Users,
  FileText,
  Download,
  Printer,
  CheckCircle,
  Lightbulb,
  Heart,
  Shield,
} from 'lucide-react'
import AnimatedMascot from './AnimatedMascot'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { LessonPlan } from '@/src/domain/lessonPlan'
import { useDemo } from '@/contexts/DemoContext'

interface LessonPlanDisplayProps {
  lessonPlan: LessonPlan
  onPrint?: () => void
  onExport?: () => void
}

export function LessonPlanDisplay({
  lessonPlan,
  onPrint,
  onExport,
}: LessonPlanDisplayProps) {
  const { isDemo } = useDemo()
  const totalMinutes = lessonPlan.lessonTimeline.reduce(
    (sum, item) => sum + item.minutes,
    0
  )

  return (
    <div className='space-y-6'>
      {/* Header */}
      <Card>
        <CardHeader className='relative'>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <CardTitle className='text-2xl'>{lessonPlan.title}</CardTitle>
              <CardDescription className='text-base'>
                {lessonPlan.overview}
              </CardDescription>
            </div>
            <div className='flex gap-2 relative'>
              <Button
                variant='outline'
                size='sm'
                onClick={onPrint}
                disabled={isDemo}
              >
                <Printer className='h-4 w-4 mr-2' />
                Print
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={onExport}
                disabled={isDemo}
              >
                <Download className='h-4 w-4 mr-2' />
                Export
              </Button>
              {isDemo && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-70px',
                    right: 0,
                    zIndex: 10,
                    maxWidth: 260,
                    background: 'white',
                    borderRadius: 16,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                    padding: '16px',
                    border: '1px solid #e0e7ef',
                    fontSize: 14,
                    color: '#1e293b',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                  }}
                  className='animate-fade-in'
                >
                  <span style={{ fontSize: 24, marginRight: 8 }}>💡</span>
                  <span>
                    <strong>
                      Export to Word/PDF is available after signup!
                    </strong>
                    <br />
                    <span style={{ color: '#64748b' }}>
                      Sign up to unlock downloads and keep your lesson plans
                      forever.
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
          {isDemo && (
            <div className='absolute top-0 right-0 mt-[-32px] mr-[-32px] md:mt-[-40px] md:mr-[-40px]'>
              <AnimatedMascot className='w-24 h-24 md:w-32 md:h-32' />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Target className='h-5 w-5' />
            Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {lessonPlan.learningGoals.map((goal, index) => (
              <li key={index} className='flex items-start gap-2'>
                <CheckCircle className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Linked Curriculum */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BookOpen className='h-5 w-5' />
            Linked Curriculum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {isDemo ? (
              <>
                <div className='p-3 border rounded-lg'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Badge variant='outline' className='font-mono'>
                      VCEEN008
                    </Badge>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    English VCAA 8.1 (Persuasive Texts)
                  </p>
                  <p className='text-xs text-gray-500 mt-2'>
                    <em>
                      Example only. In the real app, you can select multiple
                      curriculum codes to match your lesson focus!
                    </em>
                  </p>
                </div>
                <div className='mt-2 text-[14px] text-blue-700'>
                  <strong>Tip:</strong> When you create or edit a lesson, you
                  can select <strong>multiple curriculum links</strong> from the
                  official VCAA database. This helps you align your lesson with
                  exactly the right standards—no more guessing or manual lookup!
                </div>
              </>
            ) : (
              <>
                {lessonPlan.linkedCurriculum.map((item, index) => (
                  <div key={index} className='p-3 border rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Badge variant='outline' className='font-mono'>
                        {item.code}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timing Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Clock className='h-5 w-5' />
            Lesson Timeline ({totalMinutes} minutes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {lessonPlan.lessonTimeline.map((item, index) => (
              <div key={index} className='flex gap-4 p-4 border rounded-lg'>
                <div className='flex-shrink-0 w-16 text-center'>
                  <div className='bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto'>
                    <span className='text-sm font-bold'>{item.minutes}</span>
                  </div>
                  <div className='text-xs text-muted-foreground mt-1'>min</div>
                </div>
                <div className='flex-1 space-y-2'>
                  <h4 className='font-medium'>{item.activity}</h4>
                  {item.teacherMoves && item.teacherMoves.length > 0 && (
                    <div>
                      <div className='text-sm font-medium text-blue-600 mb-1'>
                        Teacher Moves:
                      </div>
                      <ul className='text-sm text-muted-foreground list-disc list-inside'>
                        {item.teacherMoves.map((move, idx) => (
                          <li key={idx}>{move}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.studentTasks && item.studentTasks.length > 0 && (
                    <div>
                      <div className='text-sm font-medium text-green-600 mb-1'>
                        Student Tasks:
                      </div>
                      <ul className='text-sm text-muted-foreground list-disc list-inside'>
                        {item.studentTasks.map((task, idx) => (
                          <li key={idx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {lessonPlan.resources.map((resource, index) => (
              <li key={index} className='flex items-start gap-2'>
                <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0' />
                <span>{resource}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Indigenous Perspectives */}
      {lessonPlan.indigenousPerspectives && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Heart className='h-5 w-5 text-red-600' />
              Indigenous Perspectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm'>{lessonPlan.indigenousPerspectives}</p>
          </CardContent>
        </Card>
      )}

      {/* Trauma-Informed Strategies */}
      {lessonPlan.traumaInformedStrategies &&
        lessonPlan.traumaInformedStrategies.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-blue-600' />
                Trauma-Informed Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2'>
                {lessonPlan.traumaInformedStrategies.map((strategy, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0' />
                    <span className='text-sm'>{strategy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

      {/* Differentiation */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Users className='h-5 w-5' />
            Differentiation
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h4 className='font-medium text-green-600 mb-2'>
              Access & Support
            </h4>
            <ul className='space-y-1'>
              {lessonPlan.differentiation.access.map((item, index) => (
                <li key={index} className='flex items-start gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <h4 className='font-medium text-blue-600 mb-2'>
              Extension & Challenge
            </h4>
            <ul className='space-y-1'>
              {lessonPlan.differentiation.extension.map((item, index) => (
                <li key={index} className='flex items-start gap-2 text-sm'>
                  <div className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Target className='h-5 w-5' />
            Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>
              Style: {lessonPlan.assessment.style}
            </h4>
            <div className='mb-3'>
              <h5 className='text-sm font-medium mb-1'>Methods:</h5>
              <ul className='space-y-1'>
                {lessonPlan.assessment.methods.map((method, index) => (
                  <li key={index} className='flex items-start gap-2 text-sm'>
                    <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0' />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {lessonPlan.assessment.successCriteria &&
            lessonPlan.assessment.successCriteria.length > 0 && (
              <div>
                <h4 className='font-medium mb-2'>Success Criteria</h4>
                <ul className='space-y-1'>
                  {lessonPlan.assessment.successCriteria.map(
                    (criterion, index) => (
                      <li
                        key={index}
                        className='flex items-start gap-2 text-sm'
                      >
                        <CheckCircle className='h-3 w-3 text-green-600 mt-1 flex-shrink-0' />
                        <span>{criterion}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Notes for Teacher */}
      {lessonPlan.notesForTeacher && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Lightbulb className='h-5 w-5 text-yellow-600' />
              Notes for Teacher
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm whitespace-pre-wrap'>
              {lessonPlan.notesForTeacher}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Compliance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Compliance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='bg-muted/50 p-4 rounded-lg'>
            <p className='text-sm whitespace-pre-wrap'>
              {lessonPlan.complianceSummary}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
