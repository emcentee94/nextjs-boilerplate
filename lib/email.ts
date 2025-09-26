import { Resend } from 'resend'
import { sendDemoRequestNotification as sendSMTPDemoRequest, sendWaitlistNotification as sendSMTPWaitlistNotification } from './email-smtp'

const resendApiKey = process.env.RESEND_API_KEY

// Only initialize Resend if API key is available
const resend = resendApiKey && resendApiKey !== 'your_resend_api_key_here' ? new Resend(resendApiKey) : null

export async function sendDemoRequestNotification(formData: {
  name: string
  email: string
  school?: string
  role?: string
  message?: string
}) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.warn('Resend API key not configured. Email notification skipped.')
      console.log('Demo Request Details:', {
        name: formData.name,
        email: formData.email,
        school: formData.school,
        role: formData.role,
        message: formData.message,
        timestamp: new Date().toISOString()
      })
      return { success: false, reason: 'Email service not configured' }
    }

    const { data, error } = await resend.emails.send({
      from: 'Taughtful <noreply@taughtful.com.au>',
      to: ['hello@taughtful.com.au'],
      subject: `New Demo Request - ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FD6585;">New Demo Access Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Request Details:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>School/Organization:</strong> ${formData.school || 'Not provided'}</p>
            <p><strong>Role:</strong> ${formData.role || 'Not provided'}</p>
            <p><strong>Message:</strong> ${formData.message || 'No additional message'}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2d5a2d;"><strong>✅ This request has been automatically stored in the database.</strong></p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This notification was sent automatically from the Taughtful demo request form.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send email notification')
    }

    console.log('Email sent successfully:', data)
    return data
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export async function sendWaitlistNotification(formData: {
  name: string
  email: string
  yearLevels: string
  planningHeadache?: string
}) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.warn('Resend API key not configured. Email notification skipped.')
      console.log('Waitlist Signup Details:', {
        name: formData.name,
        email: formData.email,
        yearLevels: formData.yearLevels,
        planningHeadache: formData.planningHeadache,
        timestamp: new Date().toISOString()
      })
      return { success: false, reason: 'Email service not configured' }
    }

    const { data, error } = await resend.emails.send({
      from: 'Taughtful <noreply@taughtful.com.au>',
      to: ['hello@taughtful.com.au'],
      subject: `New Waitlist Signup - ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FD6585;">New Waitlist Signup</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Signup Details:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Year Levels:</strong> ${formData.yearLevels}</p>
            <p><strong>Planning Challenge:</strong> ${formData.planningHeadache || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2d5a2d;"><strong>✅ This signup has been automatically logged.</strong></p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This notification was sent automatically from the Taughtful waitlist signup form.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send email notification')
    }

    console.log('Waitlist notification email sent successfully:', data)
    return data
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}
