import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the request body
    const { user, email_data } = await req.json()

    console.log('Email hook triggered:', {
      user_email: user.email,
      action_type: email_data.email_action_type,
      timestamp: new Date().toISOString(),
    })

    // Log the notification (this will appear in Supabase logs)
    console.log('NOTIFICATION: New user action', {
      email: user.email,
      action: email_data.email_action_type,
      user_id: user.id,
      timestamp: new Date().toISOString(),
      user_metadata: user.user_metadata,
    })

    // For now, we'll just log the notification
    // You can configure SMTP or use a service like Resend later
    // The important thing is that this hook is triggered for every signup/login

    // Return success response
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Email hook error:', error)

    // Return error response but don't fail the auth flow
    return new Response(
      JSON.stringify({ error: 'Email notification failed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 to not break auth flow
      }
    )
  }
})
