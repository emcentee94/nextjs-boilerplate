import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Fallback curriculum data URLs
const CURRICULUM_URLS = {
  learning_areas: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/learning_areas.json',
  achievement_standards: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/achievement_standards.json',
  cross_curriculum_priorities: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/cross_curriculum_priorities.json',
  general_capabilities: 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/general_capabilities.json'
}

// Fetch data from storage URLs as fallback
async function fetchFromStorage(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error)
    return []
  }
}

// Filter curriculum data based on parameters
function filterCurriculumData(data: any[], learningAreaId?: string, yearLevel?: string, searchTerm?: string) {
  return data.filter(item => {
    // Filter by learning area/subject
    if (learningAreaId) {
      const itemSubject = item["Subject"] || item.subject || item["Learning Area"] || item.learning_area
      if (!itemSubject?.toLowerCase().includes(learningAreaId.toLowerCase())) {
        return false
      }
    }

    // Filter by year level
    if (yearLevel) {
      const itemLevel = item["Level"] || item.level
      if (!itemLevel?.toLowerCase().includes(yearLevel.toLowerCase())) {
        return false
      }
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const content = item["Content Description"] || item.content_description || ''
      const elaboration = item["Elaboration"] || item.elaboration || ''
      const achievement = item["Achievement Standard"] || item.achievement_standard || ''
      const description = item["Description"] || item.description || ''
      
      if (!content.toLowerCase().includes(searchLower) &&
          !elaboration.toLowerCase().includes(searchLower) &&
          !achievement.toLowerCase().includes(searchLower) &&
          !description.toLowerCase().includes(searchLower)) {
        return false
      }
    }

    return true
  })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const learningAreaId = searchParams.get('learningAreaId')
    const yearLevel = searchParams.get('yearLevel')
    const searchTerm = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Try database first if Supabase is available
    if (supabase) {
      try {
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

        if (!error && data) {
          return NextResponse.json({ 
            outcomes: data || [],
            count: data?.length || 0,
            source: 'database'
          })
        }
      } catch (dbError) {
        console.log('Database query failed, falling back to storage:', dbError)
      }
    }

    // Fallback to storage URLs
    console.log('Using fallback storage URLs for curriculum data')
    
    const [learningAreas, achievementStandards] = await Promise.all([
      fetchFromStorage(CURRICULUM_URLS.learning_areas),
      fetchFromStorage(CURRICULUM_URLS.achievement_standards)
    ])

    // Combine all curriculum data
    const allData = [...learningAreas, ...achievementStandards]
    
    // Filter the data
    const filteredData = filterCurriculumData(allData, learningAreaId, yearLevel, searchTerm)
    
    // Limit results
    const limitedData = filteredData.slice(0, limit)

    return NextResponse.json({ 
      outcomes: limitedData,
      count: limitedData.length,
      source: 'storage'
    })

  } catch (error) {
    console.error('Curriculum search error:', error)
    return NextResponse.json({ 
      error: 'Search failed: ' + (error as Error).message 
    }, { status: 500 })
  }
}
