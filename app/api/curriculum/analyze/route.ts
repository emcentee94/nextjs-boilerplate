import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

export async function POST(request: NextRequest) {
  try {
    console.log('=== FILE ANALYSIS STARTED ===')

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

    const analysis = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      sheetCount: workbook.SheetNames.length,
      sheets: [],
    }

    // Analyze each sheet
    for (const sheetName of workbook.SheetNames) {
      console.log(`Analyzing sheet: ${sheetName}`)

      const worksheet = workbook.Sheets[sheetName]
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

      const headers =
        data.length > 0 ? data[0].map((h) => String(h).trim()) : []
      const rowCount = data.length - 1 // Exclude header

      // Count non-empty rows
      let nonEmptyRows = 0
      for (let i = 1; i < data.length; i++) {
        const row = data[i]
        if (row && row.some((cell) => cell && String(cell).trim() !== '')) {
          nonEmptyRows++
        }
      }

      // Get sample data (first 3 non-empty rows)
      const sampleData = []
      for (let i = 1; i < Math.min(4, data.length); i++) {
        const row = data[i]
        if (row && row.some((cell) => cell && String(cell).trim() !== '')) {
          sampleData.push(row.map((cell) => String(cell).trim()))
        }
      }

      const sheetAnalysis = {
        name: sheetName,
        rowCount: rowCount,
        nonEmptyRows: nonEmptyRows,
        headers: headers,
        sampleData: sampleData,
      }

      analysis.sheets.push(sheetAnalysis)
      console.log(
        `Sheet ${sheetName}: ${nonEmptyRows} non-empty rows out of ${rowCount} total`
      )
    }

    console.log('=== FILE ANALYSIS COMPLETED ===')

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('=== ANALYSIS ERROR ===')
    console.error('Error details:', error)

    return NextResponse.json(
      {
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
