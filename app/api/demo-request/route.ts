import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendDemoRequestNotification } from '@/lib/email-smtp'
import { promises as fs } from 'fs'
import path from 'path'

// Use service role for server-side operations
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

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

    // Load existing demo requests
    const existingRequests = await loadDemoRequests()
    
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

    // Check if email already exists
    const existingIndex = existingRequests.findIndex(req => req.email === email)
    
    if (existingIndex !== -1) {
      // Update existing request
      existingRequests[existingIndex] = demoRequestData
    } else {
      // Add new request
      existingRequests.push(demoRequestData)
    }

    // Save updated requests
    await saveDemoRequests(existingRequests)

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