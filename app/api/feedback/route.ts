import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()

    const payload = {
      session_id: body.sessionId || null,
      user_id: body.userId || null,
      email: body.email || null,
      answers: body.answers || {},
      ui_version: body.uiVersion || 'survey-v1',
      app_version: body.appVersion || null,
      path: body.path || null,
      user_agent: body.userAgent || null,
    }

    const { error } = await supabase.from('feedback').insert([payload])
    if (error) {
      console.error('Feedback insert error:', error)
      return NextResponse.json(
        { ok: false, error: 'Failed to store feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Feedback API exception:', e)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
