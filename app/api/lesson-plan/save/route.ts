import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const insert = {
      user_id: user.id,
      title: body.title || `${body.subject || 'Lesson'} – ${body.year_level || 'F-10'}`,
      learning_area: body.learning_area || body.subject || 'General',
      subject: body.subject || 'General',
      year_level: body.year_level || 'F',
      duration_minutes: body.duration_minutes ?? 60,
      selected_curriculum_ids: body.selected_curriculum_ids || [],
      achievement_standards: body.achievement_standards || [],
      learning_intentions: body.learning_intentions || null,
      success_criteria: body.success_criteria || null,
      trauma_informed_profile: body.trauma_informed_profile || {},
      include_indigenous_perspectives: Boolean(body.include_indigenous_perspectives),
      indigenous_pedagogy_methods: body.indigenous_pedagogy_methods || [],
      lesson_structure: body.lesson_structure || {},
      differentiation_strategies: body.differentiation_strategies || {},
      assessment_strategies: body.assessment_strategies || {},
      resources: body.resources || {},
      status: body.status || 'draft',
    }

    const { data, error } = await supabase
      .from('lesson_plans')
      .insert([insert])
      .select('id, title, status, created_at')
      .single()

    if (error) {
      console.error('Save lesson plan error:', error)
      return NextResponse.json({ error: 'Failed to save lesson plan' }, { status: 500 })
    }

    return NextResponse.json({ success: true, plan: data })
  } catch (e) {
    console.error('Save API exception:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


