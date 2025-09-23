import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const frameworkId = searchParams.get('frameworkId')
    const learningAreaId = searchParams.get('learningAreaId')
    const yearLevel = searchParams.get('yearLevel')
    const searchTerm = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('curriculum_outcomes')
      .select(`
        *,
        learning_areas(name, code),
        curriculum_frameworks(name)
      `)

    // Apply filters
    if (frameworkId) {
      query = query.eq('framework_id', frameworkId)
    }

    if (learningAreaId) {
      query = query.eq('learning_area_id', learningAreaId)
    }

    if (yearLevel) {
      query = query.eq('year_level', yearLevel)
    }

    if (searchTerm) {
      // Use full-text search for better results
      query = query.or(`
        title.ilike.%${searchTerm}%,
        description.ilike.%${searchTerm}%,
        code.ilike.%${searchTerm}%,
        elaboration.ilike.%${searchTerm}%
      `)
    }

    const { data, error } = await query
      .order('code')
      .limit(limit)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      outcomes: data || [],
      count: data?.length || 0
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Search failed: ' + (error as Error).message 
    }, { status: 500 })
  }
}
