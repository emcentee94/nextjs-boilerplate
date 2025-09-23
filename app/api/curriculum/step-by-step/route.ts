import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    console.log('=== STEP-BY-STEP IMPORT STARTED ===')
    
    const formData = await request.formData()
    const file = formData.get('curriculumFile') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Step 1: File received:', file.name, file.size, 'bytes')

    // Step 2: Parse Excel file
    console.log('Step 2: Parsing Excel file...')
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    
    console.log('Step 3: Excel sheets found:', workbook.SheetNames)
    
    const results = {
      fileName: file.name,
      fileSize: file.size,
      sheetCount: workbook.SheetNames.length,
      sheets: [],
      totalOutcomes: 0,
      errors: []
    }
    
    // Step 4: Process each sheet
    for (const sheetName of workbook.SheetNames) {
      console.log(`Step 4: Processing sheet: ${sheetName}`)
      
      try {
        const worksheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
        
        if (data.length < 2) {
          console.log(`Step 4: Skipping empty sheet: ${sheetName}`)
          results.sheets.push({
            name: sheetName,
            rowCount: 0,
            outcomes: 0,
            error: 'Empty sheet'
          })
          continue
        }
        
        console.log(`Step 4: Sheet ${sheetName} has ${data.length} rows`)
        
        // Get headers
        const headers = data[0].map(h => String(h).trim().toLowerCase())
        console.log(`Step 4: Headers in ${sheetName}:`, headers)
        
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

        let sheetOutcomes = 0
        const sheetErrors = []
        
        // Process data rows
        for (let i = 1; i < data.length; i++) {
          try {
            const row = data[i]
            if (!row || row.length === 0) continue
            
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
                }
              }
            })
            
            // Set subject from learning area if not specified
            if (!outcome.subject && outcome.learning_area) {
              outcome.subject = outcome.learning_area
            }
            
            // Accept ANY row that has at least one field populated
            // This includes rows that might be partially blank
            const hasAnyContent = Object.keys(outcome).length > 0
            
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
              
              sheetOutcomes++
            }
          } catch (rowError) {
            sheetErrors.push(`Row ${i}: ${rowError instanceof Error ? rowError.message : 'Unknown error'}`)
          }
        }
        
        console.log(`Step 4: Sheet ${sheetName} processed: ${sheetOutcomes} outcomes`)
        
        results.sheets.push({
          name: sheetName,
          rowCount: data.length - 1,
          outcomes: sheetOutcomes,
          headers: headers,
          errors: sheetErrors
        })
        
        results.totalOutcomes += sheetOutcomes
        
      } catch (sheetError) {
        console.error(`Step 4: Error processing sheet ${sheetName}:`, sheetError)
        results.errors.push(`Sheet ${sheetName}: ${sheetError instanceof Error ? sheetError.message : 'Unknown error'}`)
        results.sheets.push({
          name: sheetName,
          rowCount: 0,
          outcomes: 0,
          error: sheetError instanceof Error ? sheetError.message : 'Unknown error'
        })
      }
    }
    
    console.log('Step 5: Total outcomes parsed:', results.totalOutcomes)
    
    // Step 6: Test database connection
    console.log('Step 6: Testing database connection...')
    try {
      const { data: testData, error: testError } = await supabase
        .from('curriculum_data')
        .select('count', { count: 'exact', head: true })
      
      if (testError) {
        throw testError
      }
      
      console.log('Step 6: Database connection successful')
      results.databaseStatus = 'Connected'
      results.currentRecords = testData
    } catch (dbError) {
      console.error('Step 6: Database connection failed:', dbError)
      results.errors.push(`Database: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`)
      results.databaseStatus = 'Failed'
    }
    
    console.log('=== STEP-BY-STEP IMPORT COMPLETED ===')
    
    return NextResponse.json({
      success: true,
      message: 'Step-by-step analysis complete',
      results: results
    })

  } catch (error) {
    console.error('=== STEP-BY-STEP IMPORT ERROR ===')
    console.error('Error details:', error)
    
    return NextResponse.json({ 
      error: 'Step-by-step import failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
