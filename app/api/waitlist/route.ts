import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendWaitlistNotification } from "../../../lib/email-smtp"

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  yearLevels: z.string().min(1, "Please select year levels"),
  planningHeadache: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = waitlistSchema.parse(body)

    // Log the submission
    console.log("New waitlist signup:", {
      email: validatedData.email,
      name: validatedData.name,
      yearLevels: validatedData.yearLevels,
      planningHeadache: validatedData.planningHeadache || "Not provided",
      timestamp: new Date().toISOString(),
    })

    // Send email notification
    try {
      const emailResult = await sendWaitlistNotification({
        name: validatedData.name,
        email: validatedData.email,
        yearLevels: validatedData.yearLevels,
        planningHeadache: validatedData.planningHeadache
      })
      
      if (emailResult.success === false) {
        console.warn('Email notification skipped:', emailResult.reason)
      } else {
        console.log('Waitlist notification email sent successfully')
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({ message: "Successfully joined waitlist!" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Waitlist signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
