import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('curriculumFile') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('=== EXCEL FILE DEBUG ===')
    console.log('File name:', file.name)
    console.log('File size:', file.size, 'bytes')
    console.log('File type:', file.type)

    // Parse Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    
    console.log('Workbook sheets:', workbook.SheetNames)
    
    const debugInfo = {
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      sheet_names: workbook.SheetNames,
      sheet_details: []
    }

    // Analyze each sheet
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName]
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]
      
      console.log(`\n--- Sheet: ${sheetName} ---`)
      console.log('Rows:', data.length)
      
      if (data.length > 0) {
        console.log('Headers:', data[0])
        console.log('First data row:', data[1])
        console.log('Second data row:', data[2])
      }
      
      debugInfo.sheet_details.push({
        sheet_name: sheetName,
        row_count: data.length,
        headers: data.length > 0 ? data[0] : [],
        sample_rows: data.slice(1, 4) // First 3 data rows
      })
    })

    return NextResponse.json({
      success: true,
      debug_info: debugInfo
    })

  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ 
      error: 'Debug failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
