import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import {
  LESSON_PLAN_JSON_SCHEMA,
  type LessonPlan,
} from '../../../../src/domain/lessonPlan'
import type { LessonRequest } from '../../../../types/lesson-plan'
import { CurriculumService } from '../../../../lib/curriculum-service'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

async function fetchCurriculumText(codes: string[]) {
  // Fetch curriculum data from our service
  const curriculumData = await CurriculumService.fetchAllCurriculumData()

  // Find matching curriculum items by code
  const results = []

  for (const code of codes) {
    // Search in learning areas first
    const learningAreaItem = curriculumData.learning_areas.find(
      (item) => (item['Code'] || item.code) === code
    )

    if (learningAreaItem) {
      results.push({
        code,
        description:
          learningAreaItem['Content Description'] ||
          learningAreaItem.content_description ||
          `Content description for ${code}`,
        achievementStandard:
          learningAreaItem['Achievement Standard'] ||
          learningAreaItem.achievement_standard ||
          `Achievement standard for ${code}`,
        strand: learningAreaItem['Strand'] || learningAreaItem.strand,
        subStrand:
          learningAreaItem['Sub-Strand'] || learningAreaItem.sub_strand,
      })
      continue
    }

    // Search in achievement standards
    const achievementStandardItem = curriculumData.achievement_standards.find(
      (item) => (item['Code'] || item.code) === code
    )

    if (achievementStandardItem) {
      results.push({
        code,
        description:
          achievementStandardItem['Description'] ||
          achievementStandardItem.description ||
          `Description for ${code}`,
        achievementStandard:
          achievementStandardItem['Achievement Standard'] ||
          achievementStandardItem.achievement_standard ||
          `Achievement standard for ${code}`,
      })
      continue
    }

    // If not found, create a placeholder
    results.push({
      code,
      description: `Official description text for ${code} from ACARA v9 curriculum.`,
      achievementStandard: `Relevant achievement standard snippet for ${code}.`,
    })
  }

  return results
}

function buildSystemMsg() {
  return `
You create practical, classroom-ready Australian lesson plans for F–10.
Constraints:
- Use ONLY the curriculum items provided (no invented codes).
- Prefer "invisible differentiation" and one-lesson-many-pathways.
- If Indigenous perspectives are ON, embed meaningful, respectful alignment (avoid tokenism).
- If trauma-informed is ON, add predictable routines, choice, low-cognitive-load scaffolds, and de-escalation-friendly language.
- Keep output concise and implementation-ready.
- Output MUST be valid JSON per the provided schema.
- Focus on Australian curriculum context and terminology.
- Ensure activities are age-appropriate and pedagogically sound.
  `.trim()
}

function buildUserMsg(req: LessonRequest, curriculum: any[]) {
  const { subject, yearLevels, items, durationMins, classProfile, options } =
    req
  const lines: string[] = []

  lines.push(`Subject: ${subject}`)
  lines.push(`Year levels: ${yearLevels.join(', ')}`)
  lines.push(`Duration (mins): ${durationMins}`)

  if (classProfile) {
    lines.push(`Class profile: ${JSON.stringify(classProfile)}`)
  }

  lines.push(`Options: ${JSON.stringify(options)}`)
  lines.push(`Selected curriculum (${items.length}):`)

  curriculum.forEach((c) => {
    lines.push(`- ${c.code}: ${c.description}`)
    if (c.achievementStandard) {
      lines.push(`  Achievement standard: ${c.achievementStandard}`)
    }
    if (c.strand) {
      lines.push(`  Strand: ${c.strand}`)
    }
    if (c.subStrand) {
      lines.push(`  Sub-strand: ${c.subStrand}`)
    }
  })

  lines.push(`
IMPORTANT: You must return ONLY valid JSON that matches this exact structure:
{
  "title": "string",
  "overview": "string", 
  "learningGoals": ["string"],
  "linkedCurriculum": [{"code": "string", "description": "string"}],
  "lessonTimeline": [{"minutes": number, "activity": "string", "teacherMoves": ["string"], "studentTasks": ["string"]}],
  "resources": ["string"],
  "indigenousPerspectives": "string",
  "traumaInformedStrategies": ["string"], 
  "differentiation": {"access": ["string"], "extension": ["string"]},
  "assessment": {"style": "Formative|Summative|Diagnostic", "methods": ["string"], "successCriteria": ["string"]},
  "notesForTeacher": "string",
  "complianceSummary": "string"
}

Return ONLY the JSON object. No other text, explanations, or formatting.`)

  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const body: LessonRequest = await request.json()

    if (!body || !body.items?.length) {
      return NextResponse.json(
        { error: 'No curriculum items provided.' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (
      !body.subject ||
      !body.yearLevels?.length ||
      !body.durationMins ||
      !body.options
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: subject, yearLevels, durationMins, or options.',
        },
        { status: 400 }
      )
    }

    // 1) Resolve curriculum text from our database
    const codes = body.items.map((i) => i.code)
    const curriculum = await fetchCurriculumText(codes)

    // 2) Build messages
    const system = buildSystemMsg()
    const user = buildUserMsg(body, curriculum)

    // 3) Call Anthropic with structured output
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 2000,
      system,
      messages: [{ role: 'user', content: user }],
      temperature: 0.4, // stable, less creative for compliance outputs
    })

    // 4) Parse content
    const contentBlock = response.content?.[0]
    if (!contentBlock || contentBlock.type !== 'text') {
      return NextResponse.json(
        { error: 'No JSON content returned from AI.' },
        { status: 500 }
      )
    }

    let json
    try {
      json = JSON.parse(contentBlock.text)
    } catch (parseError) {
      console.error('Failed to parse AI response:', contentBlock.text)
      return NextResponse.json(
        { error: 'Invalid JSON returned from AI.' },
        { status: 500 }
      )
    }

    // 5) Return to UI
    return NextResponse.json({ lessonPlan: json })
  } catch (error: any) {
    console.error('Lesson plan generation error:', error)

    // Handle specific Anthropic API errors
    if (error.status === 529 || error.message?.includes('overloaded')) {
      return NextResponse.json(
        {
          error:
            'AI service is currently overloaded. Please try again in a few minutes.',
        },
        { status: 503 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        {
          error:
            'Rate limit exceeded. Please wait a moment before trying again.',
        },
        { status: 429 }
      )
    }

    if (error.status === 401) {
      return NextResponse.json(
        {
          error: 'Authentication failed. Please check your API configuration.',
        },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        error:
          error?.message || 'Lesson plan generation failed. Please try again.',
      },
      { status: 500 }
    )
  }
}
