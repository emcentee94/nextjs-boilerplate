import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to extract keywords from text
function extractKeywords(text: string): string[] {
  if (!text) return []

  // Simple keyword extraction - you can enhance this
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter(
      (word) =>
        ![
          'that',
          'this',
          'with',
          'from',
          'they',
          'have',
          'been',
          'were',
          'said',
          'each',
          'which',
          'their',
          'time',
          'will',
          'about',
          'would',
          'there',
          'could',
          'other',
          'after',
          'first',
          'well',
          'also',
          'new',
          'want',
          'because',
          'any',
          'these',
          'give',
          'day',
          'may',
          'say',
          'use',
          'her',
          'many',
          'some',
          'very',
          'when',
          'much',
          'then',
          'them',
          'can',
          'only',
          'think',
          'come',
          'over',
          'also',
          'back',
          'after',
          'use',
          'two',
          'how',
          'our',
          'work',
          'first',
          'well',
          'way',
          'even',
          'new',
          'want',
          'because',
          'any',
          'these',
          'give',
          'day',
          'may',
          'say',
          'use',
          'her',
          'many',
          'some',
          'very',
          'when',
          'much',
          'then',
          'them',
          'can',
          'only',
          'think',
          'come',
          'over',
          'also',
          'back',
          'after',
          'use',
          'two',
          'how',
          'our',
          'work',
          'first',
          'well',
          'way',
          'even',
        ].includes(word)
    )

  // Return unique keywords, limited to 10
  return [...new Set(words)].slice(0, 10)
}

// Helper function to parse CSV content
function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n').filter((line) => line.trim())

  if (lines.length < 2) {
    throw new Error('File must contain at least a header and one data row')
  }

  // Parse headers
  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))

  // Map headers to expected fields
  const fieldMapping: { [key: string]: string } = {
    learning_area: 'learning_area',
    subject: 'subject',
    level: 'level',
    strand: 'strand',
    sub_strand: 'sub_strand',
    content_description: 'content_description',
    elaboration: 'elaboration',
    achievement_standard: 'achievement_standard',
    content_descriptor_code: 'content_descriptor_code',
    cross_curriculum_priority: 'cross_curriculum_priority',
    general_capability: 'general_capability',
    topics: 'topics',
  }

  // Parse data rows
  const outcomes = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim().replace(/"/g, ''))
    const outcome: any = {}

    headers.forEach((header, index) => {
      const fieldName = fieldMapping[header.toLowerCase()]
      if (fieldName && values[index]) {
        if (fieldName === 'topics') {
          outcome[fieldName] = values[index]
            .split(';')
            .map((t) => t.trim())
            .filter((t) => t)
        } else {
          outcome[fieldName] = values[index]
        }
      }
    })

    if (
      outcome.learning_area &&
      outcome.subject &&
      outcome.level &&
      outcome.content_description
    ) {
      // Extract keywords from content description and elaboration
      const keywords = extractKeywords(
        (outcome.content_description || '') + ' ' + (outcome.elaboration || '')
      )
      outcome.topics = [...(outcome.topics || []), ...keywords].slice(0, 10)

      outcomes.push(outcome)
    }
  }

  return outcomes
}

// Helper function to parse Excel content
function parseExcel(buffer: ArrayBuffer): any[] {
  const workbook = XLSX.read(buffer, { type: 'array' })
  const outcomes: any[] = []

  console.log('Excel sheets found:', workbook.SheetNames)

  // Process each sheet
  workbook.SheetNames.forEach((sheetName) => {
    console.log(`Processing sheet: ${sheetName}`)
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

    if (data.length < 2) {
      console.log(`Skipping empty sheet: ${sheetName}`)
      return // Skip empty sheets
    }

    console.log(`Sheet ${sheetName} has ${data.length} rows`)

    // Get headers from first row
    const headers = data[0].map((h) => String(h).trim().toLowerCase())
    console.log(`Headers in ${sheetName}:`, headers)

    // Flexible field mapping for all sheets
    const fieldMapping: { [key: string]: string } = {
      'learning area': 'learning_area',
      subject: 'subject',
      level: 'level',
      'level description': 'level_description',
      code: 'content_descriptor_code',
      pathway: 'pathway',
      sequence: 'sequence',
      strand: 'strand',
      'sub-strand': 'sub_strand',
      'content description': 'content_description',
      elaboration: 'elaboration',
      topics: 'topics',
      'achievement standard': 'achievement_standard',
      'cross-curriculum priority': 'cross_curriculum_priority',
      'organising ideas title': 'organising_ideas_title',
      description: 'description',
      'organising idea indicator': 'organising_idea_indicator',
      'general capability': 'general_capability',
      element: 'element',
      'sub-element': 'sub_element',
      indicator: 'indicator',
    }

    let sheetOutcomes = 0

    // Process data rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      if (!row || row.length === 0) continue

      const outcome: any = {}

      headers.forEach((header, index) => {
        const fieldName = fieldMapping[header]
        if (fieldName && row[index] !== undefined && row[index] !== '') {
          const value = String(row[index]).trim()
          if (value && value !== 'undefined' && value !== 'null') {
            if (fieldName === 'topics') {
              outcome[fieldName] = value
                .split(';')
                .map((t) => t.trim())
                .filter((t) => t)
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
        // Extract keywords from available text content
        const textForKeywords =
          (outcome.content_description || '') +
          ' ' +
          (outcome.elaboration || '') +
          ' ' +
          (outcome.achievement_standard || '') +
          ' ' +
          (outcome.description || '') +
          ' ' +
          (outcome.learning_area || '') +
          ' ' +
          (outcome.subject || '') +
          ' ' +
          (outcome.level || '') +
          ' ' +
          (outcome.strand || '') +
          ' ' +
          (outcome.sub_strand || '')

        const keywords = extractKeywords(textForKeywords)
        outcome.topics = [...(outcome.topics || []), ...keywords].slice(0, 10)

        outcomes.push(outcome)
        sheetOutcomes++
      }
    }

    console.log(`Sheet ${sheetName} processed: ${sheetOutcomes} outcomes`)
  })

  console.log(`Total outcomes parsed: ${outcomes.length}`)
  return outcomes
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== IMPORT STARTED ===')

    const formData = await request.formData()
    const file = formData.get('curriculumFile') as File

    if (!file) {
      console.log('ERROR: No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File received:', file.name, file.size, 'bytes')

    // Validate file type
    const allowedTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ]

    if (
      !allowedTypes.includes(file.type) &&
      !file.name.endsWith('.csv') &&
      !file.name.endsWith('.xlsx') &&
      !file.name.endsWith('.xls')
    ) {
      console.log('ERROR: Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a CSV or Excel file.' },
        { status: 400 }
      )
    }

    let outcomes: any[] = []

    // Handle different file types
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      console.log('Processing CSV file...')
      const csvText = await file.text()
      outcomes = parseCSV(csvText)
    } else if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel' ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')
    ) {
      console.log('Processing Excel file...')
      const buffer = await file.arrayBuffer()
      outcomes = parseExcel(buffer)
    } else {
      console.log('ERROR: Unsupported file format')
      return NextResponse.json(
        { error: 'Unsupported file format' },
        { status: 400 }
      )
    }

    console.log('Parsed outcomes:', outcomes.length)

    if (outcomes.length === 0) {
      console.log('ERROR: No valid outcomes found')
      return NextResponse.json(
        { error: 'No valid curriculum outcomes found in file' },
        { status: 400 }
      )
    }

    // Check if Supabase is available
    if (!supabase) {
      console.log('ERROR: Supabase not configured')
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Batch insert into Supabase (in chunks of 1000 to avoid timeout)
    const batchSize = 1000
    let totalInserted = 0

    console.log('Starting database insert...')

    for (let i = 0; i < outcomes.length; i += batchSize) {
      const batch = outcomes.slice(i, i + batchSize)
      console.log(
        `Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(outcomes.length / batchSize)} (${batch.length} records)`
      )

      const { data, error } = await supabase
        .from('curriculum_data')
        .insert(batch)

      if (error) {
        console.error('Database error:', error)
        return NextResponse.json(
          {
            error: 'Failed to import curriculum data',
            details: error.message,
            imported_so_far: totalInserted,
            batch_number: Math.floor(i / batchSize) + 1,
          },
          { status: 500 }
        )
      }

      totalInserted += batch.length
      console.log(
        `Batch ${Math.floor(i / batchSize) + 1} inserted successfully. Total: ${totalInserted}`
      )
    }

    console.log('=== IMPORT COMPLETED ===')
    console.log('Total inserted:', totalInserted)

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${totalInserted} curriculum outcomes`,
      imported_count: totalInserted,
      file_type: file.type,
      file_name: file.name,
    })
  } catch (error) {
    console.error('=== IMPORT ERROR ===')
    console.error('Error details:', error)
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    )

    return NextResponse.json(
      {
        error: 'Import failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
