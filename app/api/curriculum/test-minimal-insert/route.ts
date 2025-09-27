import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    console.log('=== MINIMAL INSERT TEST STARTED ===')

    // Test 1: Try inserting a single record with minimal fields
    console.log('Test 1: Inserting minimal record...')
    const minimalRecord = {
      learning_area: 'Test',
      subject: 'Test',
      level: 'Test',
      content_description: 'Test content description',
    }

    const { data: insert1, error: error1 } = await supabase
      .from('curriculum_data')
      .insert(minimalRecord)
      .select()

    if (error1) {
      console.error('Minimal insert error:', error1)
      return NextResponse.json(
        {
          error: 'Minimal insert failed',
          details: error1.message,
          code: error1.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 1: Minimal insert successful')

    // Clean up
    if (insert1 && insert1.length > 0) {
      await supabase.from('curriculum_data').delete().eq('id', insert1[0].id)
      console.log('Test 1: Cleaned up')
    }

    // Test 2: Try inserting a record with more fields
    console.log('Test 2: Inserting record with more fields...')
    const moreFieldsRecord = {
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

    const { data: insert2, error: error2 } = await supabase
      .from('curriculum_data')
      .insert(moreFieldsRecord)
      .select()

    if (error2) {
      console.error('More fields insert error:', error2)
      return NextResponse.json(
        {
          error: 'More fields insert failed',
          details: error2.message,
          code: error2.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 2: More fields insert successful')

    // Clean up
    if (insert2 && insert2.length > 0) {
      await supabase.from('curriculum_data').delete().eq('id', insert2[0].id)
      console.log('Test 2: Cleaned up')
    }

    // Test 3: Try inserting multiple records
    console.log('Test 3: Inserting multiple records...')
    const multipleRecords = [
      {
        learning_area: 'Mathematics',
        subject: 'Mathematics',
        level: 'Year 1',
        content_description:
          'Develop confidence with number sequences to and from 100',
      },
      {
        learning_area: 'Science',
        subject: 'Science',
        level: 'Year 2',
        content_description: 'Observe and describe the properties of materials',
      },
    ]

    const { data: insert3, error: error3 } = await supabase
      .from('curriculum_data')
      .insert(multipleRecords)
      .select()

    if (error3) {
      console.error('Multiple records insert error:', error3)
      return NextResponse.json(
        {
          error: 'Multiple records insert failed',
          details: error3.message,
          code: error3.code,
        },
        { status: 500 }
      )
    }

    console.log('Test 3: Multiple records insert successful')

    // Clean up
    if (insert3 && insert3.length > 0) {
      const ids = insert3.map((record) => record.id)
      await supabase.from('curriculum_data').delete().in('id', ids)
      console.log('Test 3: Cleaned up')
    }

    console.log('=== MINIMAL INSERT TEST COMPLETED ===')

    return NextResponse.json({
      success: true,
      message: 'All minimal insert tests passed',
      tests: {
        minimalInsert: 'Passed',
        moreFieldsInsert: 'Passed',
        multipleRecordsInsert: 'Passed',
      },
    })
  } catch (error) {
    console.error('=== MINIMAL INSERT TEST ERROR ===')
    console.error('Error details:', error)

    return NextResponse.json(
      {
        error: 'Minimal insert test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
