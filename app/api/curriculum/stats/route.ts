import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    // Get total count
    const { count: totalRecords, error: countError } = await supabase
      .from('curriculum_data')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      throw new Error(`Count error: ${countError.message}`)
    }

    // Get learning areas breakdown
    const { data: learningAreaData, error: learningAreaError } = await supabase
      .from('curriculum_data')
      .select('learning_area')
      .order('learning_area')

    if (learningAreaError) {
      throw new Error(`Learning area error: ${learningAreaError.message}`)
    }

    // Get year levels breakdown
    const { data: yearLevelData, error: yearLevelError } = await supabase
      .from('curriculum_data')
      .select('level')
      .order('level')

    if (yearLevelError) {
      throw new Error(`Year level error: ${yearLevelError.message}`)
    }

    // Process learning areas
    const learningAreaCounts =
      learningAreaData?.reduce((acc: any, item) => {
        acc[item.learning_area] = (acc[item.learning_area] || 0) + 1
        return acc
      }, {}) || {}

    const learningAreaBreakdown = Object.entries(learningAreaCounts)
      .map(([learning_area, count]) => ({
        learning_area,
        count,
      }))
      .sort((a, b) => b.count - a.count)

    // Process year levels
    const yearLevelCounts =
      yearLevelData?.reduce((acc: any, item) => {
        acc[item.level] = (acc[item.level] || 0) + 1
        return acc
      }, {}) || {}

    const yearLevelBreakdown = Object.entries(yearLevelCounts)
      .map(([level, count]) => ({
        level,
        count,
      }))
      .sort((a, b) => a.level.localeCompare(b.level))

    // Get unique counts
    const uniqueLearningAreas = new Set(
      learningAreaData?.map((item) => item.learning_area) || []
    ).size
    const uniqueYearLevels = new Set(
      yearLevelData?.map((item) => item.level) || []
    ).size

    // Get sample records to check data quality
    const { data: sampleData, error: sampleError } = await supabase
      .from('curriculum_data')
      .select('*')
      .limit(5)

    if (sampleError) {
      throw new Error(`Sample error: ${sampleError.message}`)
    }

    return NextResponse.json({
      total_records: totalRecords || 0,
      learning_areas: uniqueLearningAreas,
      year_levels: uniqueYearLevels,
      learning_area_breakdown: learningAreaBreakdown,
      year_level_breakdown: yearLevelBreakdown,
      sample_records: sampleData,
      import_status:
        totalRecords && totalRecords > 15000 ? 'complete' : 'incomplete',
      expected_records: 21000,
      completion_percentage: totalRecords
        ? ((totalRecords / 21000) * 100).toFixed(1)
        : 0,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch statistics',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
