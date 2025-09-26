import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { data, error } = await supabase
      .from('lesson_plans')
      .update({ status: 'archived' })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, status')
      .single()

    if (error) {
      console.error('Archive error:', error)
      return NextResponse.json({ error: 'Failed to archive' }, { status: 500 })
    }
    return NextResponse.json({ success: true, plan: data })
  } catch (e) {
    console.error('Archive API exception:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


