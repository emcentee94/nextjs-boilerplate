import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    console.log('=== TEST IMPORT STARTED ===')
    
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
    
    // Test with just the first sheet and first 10 rows
    const sheetName = workbook.SheetNames[0]
    console.log(`Testing with sheet: ${sheetName}`)
    
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
    
    console.log(`Sheet has ${data.length} rows`)
    
    if (data.length < 2) {
      return NextResponse.json({ error: 'Sheet has no data' }, { status: 400 })
    }
    
    // Get headers
    const headers = data[0].map(h => String(h).trim().toLowerCase())
    console.log('Headers:', headers)
    
    // Process only first 5 rows for testing
    const testOutcomes = []
    const maxRows = Math.min(5, data.length - 1)
    
    for (let i = 1; i <= maxRows; i++) {
      const row = data[i]
      if (!row || row.length === 0) continue
      
      const outcome: any = {}
      
      // Simple mapping for testing
      headers.forEach((header, index) => {
        if (row[index] !== undefined && row[index] !== '') {
          const value = String(row[index]).trim()
          if (value && value !== 'undefined' && value !== 'null') {
            // Map to our expected fields
            if (header.includes('learning area')) {
              outcome.learning_area = value
            } else if (header.includes('subject')) {
              outcome.subject = value
            } else if (header.includes('level')) {
              outcome.level = value
            } else if (header.includes('content description')) {
              outcome.content_description = value
            } else if (header.includes('elaboration')) {
              outcome.elaboration = value
            }
          }
        }
      })
      
      // Set defaults if missing
      if (!outcome.learning_area) outcome.learning_area = 'Test'
      if (!outcome.subject) outcome.subject = 'Test'
      if (!outcome.level) outcome.level = 'Test'
      if (!outcome.content_description) outcome.content_description = 'Test content'
      
      outcome.topics = ['test']
      
      testOutcomes.push(outcome)
    }
    
    console.log('Test outcomes prepared:', testOutcomes.length)
    console.log('Sample outcome:', testOutcomes[0])
    
    // Try to insert test data
    console.log('Attempting to insert test data...')
    
    const { data: insertData, error: insertError } = await supabase
      .from('curriculum_data')
      .insert(testOutcomes)
      .select()
    
    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ 
        error: 'Insert failed', 
        details: insertError.message,
        code: insertError.code
      }, { status: 500 })
    }
    
    console.log('Test insert successful:', insertData?.length, 'records')
    
    // Clean up test data
    if (insertData && insertData.length > 0) {
      const ids = insertData.map(record => record.id)
      await supabase
        .from('curriculum_data')
        .delete()
        .in('id', ids)
      console.log('Test data cleaned up')
    }
    
    console.log('=== TEST IMPORT COMPLETED ===')
    
    return NextResponse.json({
      success: true,
      message: 'Test import successful',
      test_records: testOutcomes.length,
      sample_outcome: testOutcomes[0],
      insert_result: insertData?.length || 0
    })

  } catch (error) {
    console.error('=== TEST IMPORT ERROR ===')
    console.error('Error details:', error)
    
    return NextResponse.json({ 
      error: 'Test import failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
