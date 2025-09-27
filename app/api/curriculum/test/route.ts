import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET(request: NextRequest) {
  try {
    console.log('=== TESTING SUPABASE CONNECTION ===')

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: 'Supabase credentials not configured',
          supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
          supabaseKey: supabaseKey ? 'Set' : 'Missing',
        },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test 1: Check if we can connect to Supabase
    console.log('Testing Supabase connection...')
    const { data: testData, error: testError } = await supabase
      .from('curriculum_data')
      .select('count', { count: 'exact', head: true })

    if (testError) {
      console.error('Supabase connection error:', testError)
      return NextResponse.json(
        {
          error: 'Failed to connect to Supabase',
          details: testError.message,
          code: testError.code,
        },
        { status: 500 }
      )
    }

    // Test 2: Check table structure
    console.log('Testing table structure...')
    const { data: sampleData, error: sampleError } = await supabase
      .from('curriculum_data')
      .select('*')
      .limit(1)

    if (sampleError) {
      console.error('Table structure error:', sampleError)
      return NextResponse.json(
        {
          error: 'Table structure issue',
          details: sampleError.message,
          code: sampleError.code,
        },
        { status: 500 }
      )
    }

    // Test 3: Try a simple insert
    console.log('Testing insert capability...')
    const testRecord = {
      learning_area: 'Test',
      subject: 'Test',
      level: 'Test',
      content_description: 'Test record for validation',
      topics: ['test'],
    }

    const { data: insertData, error: insertError } = await supabase
      .from('curriculum_data')
      .insert(testRecord)
      .select()

    if (insertError) {
      console.error('Insert test error:', insertError)
      return NextResponse.json(
        {
          error: 'Insert test failed',
          details: insertError.message,
          code: insertError.code,
        },
        { status: 500 }
      )
    }

    // Clean up test record
    if (insertData && insertData.length > 0) {
      await supabase.from('curriculum_data').delete().eq('id', insertData[0].id)
    }

    console.log('=== ALL TESTS PASSED ===')

    return NextResponse.json({
      success: true,
      message: 'All tests passed',
      current_records: testData,
      table_structure: 'OK',
      insert_capability: 'OK',
    })
  } catch (error) {
    console.error('=== TEST ERROR ===')
    console.error('Error details:', error)

    return NextResponse.json(
      {
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
