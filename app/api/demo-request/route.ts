import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendDemoRequestNotification } from '@/lib/email-smtp'
import { promises as fs } from 'fs'
import path from 'path'

// Use service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'

// Only create Supabase client if key is available
const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

if (!supabaseKey) {
  console.warn('Missing Supabase environment variables - using file-based storage only')
}

// File-based storage for demo requests
const DEMO_REQUESTS_FILE = path.join(process.cwd(), 'demo-requests.json')

async function loadDemoRequests() {
  try {
    const data = await fs.readFile(DEMO_REQUESTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist or is empty, return empty array
    return []
  }
}

async function saveDemoRequests(requests: any[]) {
  try {
    await fs.writeFile(DEMO_REQUESTS_FILE, JSON.stringify(requests, null, 2))
  } catch (error) {
    console.error('Error saving demo requests:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, school, role, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Create demo request data
    const demoRequestData = {
      id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      school: school || null,
      role: role || null,
      message: message || null,
      submitted_at: new Date().toISOString(),
      status: 'pending'
    }

    // In production, require Supabase and insert first
    if (isProduction) {
      if (!supabase) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })
      }
      const { error: insertError } = await supabase
        .from('demo_requests')
        .upsert({
          name,
          email,
          school: school || null,
          role: role || null,
          message: message || null,
          submitted_at: new Date().toISOString(),
          status: 'pending'
        }, { onConflict: 'email' })
      if (insertError) {
        console.error('Supabase insert error:', insertError)
        return NextResponse.json({ error: 'Failed to save to Supabase' }, { status: 500 })
      }
    } else {
      // Development: keep file-based log as a fallback
      const existingRequests = await loadDemoRequests()
      const existingIndex = existingRequests.findIndex((req: any) => req.email === email)
      if (existingIndex !== -1) {
        existingRequests[existingIndex] = demoRequestData
      } else {
        existingRequests.push(demoRequestData)
      }
      await saveDemoRequests(existingRequests)

      // Also try Supabase if available in dev
      if (supabase) {
        const { error: insertError } = await supabase
          .from('demo_requests')
          .upsert({
            name,
            email,
            school: school || null,
            role: role || null,
            message: message || null,
            submitted_at: new Date().toISOString(),
            status: 'pending'
          }, { onConflict: 'email' })
        if (insertError) {
          console.warn('Supabase insert failed in dev; continuing with file log:', insertError)
        }
      }
    }

    // Send email notification
    try {
      const emailResult = await sendDemoRequestNotification({ name, email, school, role, message })
      if (emailResult.success === false) {
        console.warn('Email notification skipped:', emailResult.reason)
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully',
      requestId: demoRequestData.id
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve demo requests
export async function GET() {
  try {
    // Load demo requests from file
    const demoRequests = await loadDemoRequests()
    
    // Sort by submission date (newest first)
    const sortedRequests = demoRequests.sort((a, b) => 
      new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
    )

    return NextResponse.json({
      requests: sortedRequests,
      count: sortedRequests.length
    })

  } catch (error) {
    console.error('GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}