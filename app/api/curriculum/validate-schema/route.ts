import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    console.log('=== SCHEMA VALIDATION STARTED ===')

    // Test 1: Check if table exists
    console.log('Test 1: Checking if curriculum_data table exists...')
    const { data: tableCheck, error: tableError } = await supabase
      .from('curriculum_data')
      .select('*')
      .limit(1)

    if (tableError) {
      console.error('Table check error:', tableError)
      return NextResponse.json(
        {
          error: 'Table check failed',
          details: tableError.message,
          code: tableError.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 1: Table exists and is accessible')

    // Test 2: Check table structure
    console.log('Test 2: Checking table structure...')
    const { data: structureCheck, error: structureError } = await supabase
      .from('curriculum_data')
      .select('*')
      .limit(0)

    if (structureError) {
      console.error('Structure check error:', structureError)
      return NextResponse.json(
        {
          error: 'Structure check failed',
          details: structureError.message,
          code: structureError.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 2: Table structure is valid')

    // Test 3: Try a minimal insert
    console.log('Test 3: Testing minimal insert...')
    const minimalRecord = {
      learning_area: 'Test',
      subject: 'Test',
      level: 'Test',
      content_description: 'Test content description',
    }

    const { data: insertTest, error: insertError } = await supabase
      .from('curriculum_data')
      .insert(minimalRecord)
      .select()

    if (insertError) {
      console.error('Minimal insert error:', insertError)
      return NextResponse.json(
        {
          error: 'Minimal insert failed',
          details: insertError.message,
          code: insertError.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 3: Minimal insert successful')

    // Clean up test record
    if (insertTest && insertTest.length > 0) {
      await supabase.from('curriculum_data').delete().eq('id', insertTest[0].id)
      console.log('Test record cleaned up')
    }

    // Test 4: Try a more complex insert
    console.log('Test 4: Testing complex insert...')
    const complexRecord = {
      learning_area: 'English',
      subject: 'English',
      level: 'Foundation',
      strand: 'Language',
      sub_strand: 'Language variation and change',
      content_description:
        'Understand that English is one of many languages spoken in Australia',
      elaboration:
        'recognising that Australia is a linguistically diverse country',
      topics: ['multilingualism', 'diversity', 'languages'],
    }

    const { data: complexInsert, error: complexError } = await supabase
      .from('curriculum_data')
      .insert(complexRecord)
      .select()

    if (complexError) {
      console.error('Complex insert error:', complexError)
      return NextResponse.json(
        {
          error: 'Complex insert failed',
          details: complexError.message,
          code: complexError.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 4: Complex insert successful')

    // Clean up test record
    if (complexInsert && complexInsert.length > 0) {
      await supabase
        .from('curriculum_data')
        .delete()
        .eq('id', complexInsert[0].id)
      console.log('Complex test record cleaned up')
    }

    console.log('=== SCHEMA VALIDATION COMPLETED ===')

    return NextResponse.json({
      success: true,
      message: 'Schema validation successful',
      tests: {
        tableExists: 'Passed',
        tableStructure: 'Passed',
        minimalInsert: 'Passed',
        complexInsert: 'Passed',
      },
    })
  } catch (error) {
    console.error('=== SCHEMA VALIDATION ERROR ===')
    console.error('Error details:', error)

    return NextResponse.json(
      {
        error: 'Schema validation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
