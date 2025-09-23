import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    console.log('=== DEBUG IMPORT STARTED ===')
    
    const formData = await request.formData()
    const file = formData.get('curriculumFile') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File received:', file.name, file.size, 'bytes')

    // Parse Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    
    console.log('Excel sheets found:', workbook.SheetNames)
    
    // Process only the first sheet and first 5 rows
    const sheetName = workbook.SheetNames[0]
    console.log(`Debugging with sheet: ${sheetName}`)
    
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
    
    console.log(`Sheet has ${data.length} rows`)
    
    if (data.length < 2) {
      return NextResponse.json({ error: 'Sheet has no data' }, { status: 400 })
    }
    
    // Get headers
    const headers = data[0].map(h => String(h).trim().toLowerCase())
    console.log('Headers:', headers)
    
    // Field mapping
    const fieldMapping: { [key: string]: string } = {
      'learning area': 'learning_area',
      'subject': 'subject',
      'level': 'level',
      'level description': 'level_description',
      'code': 'content_descriptor_code',
      'pathway': 'pathway',
      'sequence': 'sequence',
      'strand': 'strand',
      'sub-strand': 'sub_strand',
      'content description': 'content_description',
      'elaboration': 'elaboration',
      'topics': 'topics',
      'achievement standard': 'achievement_standard',
      'cross-curriculum priority': 'cross_curriculum_priority',
      'organising ideas title': 'organising_ideas_title',
      'description': 'description',
      'organising idea indicator': 'organising_idea_indicator',
      'general capability': 'general_capability',
      'element': 'element',
      'sub-element': 'sub_element',
      'indicator': 'indicator'
    }

    // Process only first 5 rows for debugging
    const debugOutcomes = []
    const maxRows = Math.min(5, data.length - 1)
    
    for (let i = 1; i <= maxRows; i++) {
      const row = data[i]
      if (!row || row.length === 0) continue
      
      console.log(`Processing row ${i}:`, row)
      
      const outcome: any = {}
      
      headers.forEach((header, index) => {
        const fieldName = fieldMapping[header]
        if (fieldName && row[index] !== undefined && row[index] !== '') {
          const value = String(row[index]).trim()
          if (value && value !== 'undefined' && value !== 'null') {
            if (fieldName === 'topics') {
              outcome[fieldName] = value.split(';').map(t => t.trim()).filter(t => t)
            } else {
              outcome[fieldName] = value
            }
            console.log(`  Mapped ${header} -> ${fieldName}: ${value}`)
          }
        }
      })
      
      // Set subject from learning area if not specified
      if (!outcome.subject && outcome.learning_area) {
        outcome.subject = outcome.learning_area
        console.log(`  Set subject from learning_area: ${outcome.subject}`)
      }
      
      // Accept ANY row that has at least one field populated
      const hasAnyContent = Object.keys(outcome).length > 0
      console.log(`  Row ${i} has content: ${hasAnyContent}, fields: ${Object.keys(outcome).join(', ')}`)
      
      if (hasAnyContent) {
        // Extract keywords
        const textForKeywords = (outcome.content_description || '') + ' ' +
                               (outcome.elaboration || '') + ' ' +
                               (outcome.achievement_standard || '') + ' ' +
                               (outcome.description || '') + ' ' +
                               (outcome.learning_area || '') + ' ' +
                               (outcome.subject || '') + ' ' +
                               (outcome.level || '') + ' ' +
                               (outcome.strand || '') + ' ' +
                               (outcome.sub_strand || '')
        
        const keywords = textForKeywords.toLowerCase()
          .replace(/[^\w\s]/g, ' ')
          .split(/\s+/)
          .filter(word => word.length > 3)
          .filter(word => !['that', 'this', 'with', 'from', 'they', 'have', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'would', 'there', 'could', 'other'].includes(word))
          .slice(0, 10)
        
        outcome.topics = [...(outcome.topics || []), ...keywords].slice(0, 10)
        console.log(`  Extracted keywords: ${outcome.topics.join(', ')}`)
        
        debugOutcomes.push(outcome)
        console.log(`  Added outcome ${i}:`, outcome)
      }
    }
    
    console.log('Debug outcomes prepared:', debugOutcomes.length)
    console.log('Sample outcome:', debugOutcomes[0])
    
    // Try to insert debug data
    console.log('Attempting to insert debug data...')
    
    const { data: insertData, error: insertError } = await supabase
      .from('curriculum_data')
      .insert(debugOutcomes)
      .select()
    
    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ 
        error: 'Insert failed', 
        details: insertError.message,
        code: insertError.code,
        debug_outcomes: debugOutcomes
      }, { status: 500 })
    }
    
    console.log('Debug insert successful:', insertData?.length, 'records')
    
    // Clean up debug data
    if (insertData && insertData.length > 0) {
      const ids = insertData.map(record => record.id)
      await supabase
        .from('curriculum_data')
        .delete()
        .in('id', ids)
      console.log('Debug data cleaned up')
    }
    
    console.log('=== DEBUG IMPORT COMPLETED ===')
    
    return NextResponse.json({
      success: true,
      message: 'Debug import successful',
      debug_records: debugOutcomes.length,
      sample_outcome: debugOutcomes[0],
      insert_result: insertData?.length || 0
    })

  } catch (error) {
    console.error('=== DEBUG IMPORT ERROR ===')
    console.error('Error details:', error)
    
    return NextResponse.json({ 
      error: 'Debug import failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
