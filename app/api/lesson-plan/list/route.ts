import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || undefined
    const limit = Number(searchParams.get('limit') || 20)
    const offset = Number(searchParams.get('offset') || 0)

    let q = supabase
      .from('lesson_plans')
      .select('id, title, status, created_at, updated_at, subject, year_level, duration_minutes')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) q = q.eq('status', status)

    const { data, error } = await q
    if (error) {
      console.error('List plans error:', error)
      return NextResponse.json({ error: 'Failed to list plans' }, { status: 500 })
    }
    return NextResponse.json({ plans: data || [] })
  } catch (e) {
    console.error('List API exception:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


