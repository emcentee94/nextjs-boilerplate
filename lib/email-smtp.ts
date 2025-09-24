const nodemailer = require('nodemailer')

// SMTP configuration - you'll need to add these to your .env.local
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // Gmail SMTP
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASS, // Your email password or app password
  },
}

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig)

export async function sendDemoRequestNotification(formData: {
  name: string
  email: string
  school?: string
  role?: string
  message?: string
}) {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP not configured. Email notification skipped.')
      console.log('Demo Request Details:', {
        name: formData.name,
        email: formData.email,
        school: formData.school,
        role: formData.role,
        message: formData.message,
        timestamp: new Date().toISOString()
      })
      return { success: false, reason: 'SMTP not configured' }
    }

    // Email content
    const mailOptions = {
      from: `"Taughtful Demo Requests" <${process.env.SMTP_USER}>`,
      to: 'hello@taughtful.com.au',
      subject: `New Demo Request - ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FD6585;">New Demo Access Request</h2>
          <p>A new demo access request has been submitted through the website.</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>School/Organization:</strong> ${formData.school || 'N/A'}</li>
            <li><strong>Role:</strong> ${formData.role || 'N/A'}</li>
            <li><strong>Message:</strong> ${formData.message || 'N/A'}</li>
          </ul>
          <p>This request has been automatically stored in the system.</p>
          <p>Best regards,<br/>Taughtful System</p>
        </div>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email notification:', error)
    return { success: false, reason: error instanceof Error ? error.message : 'Unknown email error' }
  }
}
