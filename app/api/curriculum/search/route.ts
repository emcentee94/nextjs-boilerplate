import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const learningAreaId = searchParams.get('learningAreaId')
    const yearLevel = searchParams.get('yearLevel')
    const searchTerm = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('curriculum_data')
      .select('*')

    // Apply filters
    if (learningAreaId) {
      query = query.eq('learning_area', learningAreaId)
    }

    if (yearLevel) {
      query = query.eq('level', yearLevel)
    }

    if (searchTerm) {
      // Use full-text search for better results
      query = query.or(`
        content_description.ilike.%${searchTerm}%,
        elaboration.ilike.%${searchTerm}%,
        achievement_standard.ilike.%${searchTerm}%,
        learning_area.ilike.%${searchTerm}%,
        subject.ilike.%${searchTerm}%
      `)
    }

    const { data, error } = await query
      .order('content_descriptor_code')
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
