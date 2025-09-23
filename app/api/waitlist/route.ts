import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

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

    // Log the submission (in production, you'd save to database or send email)
    console.log("New waitlist signup:", {
      email: validatedData.email,
      name: validatedData.name,
      yearLevels: validatedData.yearLevels,
      planningHeadache: validatedData.planningHeadache || "Not provided",
      timestamp: new Date().toISOString(),
    })

    // TODO: Add email notification functionality here when ready
    // This is where you'd integrate with Resend or another email service

    return NextResponse.json({ message: "Successfully joined waitlist!" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Waitlist signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
