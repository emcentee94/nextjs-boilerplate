# Email Notifications Setup for Taughtful

## Overview
This guide shows you how to set up email notifications to `hello@taughtful.com.au` for all user signups and logins using Supabase's built-in features (no Resend required).

## Option 1: Database Triggers (Recommended)

### Step 1: Run the SQL Migration
Go to your Supabase Dashboard → SQL Editor and run this SQL:

```sql
-- Setup email notifications for user signups and logins
-- This creates a function that will be triggered when users are created or updated

-- Create a function to send email notifications
CREATE OR REPLACE FUNCTION notify_user_action()
RETURNS TRIGGER AS $$
BEGIN
  -- Log the user action (this will appear in Supabase logs)
  RAISE LOG 'USER_ACTION: % - % - % - %', 
    TG_OP, 
    COALESCE(NEW.email, OLD.email), 
    COALESCE(NEW.id, OLD.id),
    NOW();
  
  -- You can extend this to send actual emails later
  -- For now, it just logs the action
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user signups (INSERT)
CREATE TRIGGER user_signup_notification
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION notify_user_action();

-- Create trigger for user logins (UPDATE of last_sign_in_at)
CREATE TRIGGER user_login_notification
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION notify_user_action();
```

### Step 2: Check Logs
After running this, you can see user signup/login notifications in:
- Supabase Dashboard → Logs → Postgres Logs
- Look for entries starting with "USER_ACTION:"

## Option 2: Auth Hooks (Advanced)

### Step 1: Deploy Edge Function
```bash
# Deploy the email notification function
supabase functions deploy send-email
```

### Step 2: Configure Auth Hook
1. Go to Supabase Dashboard → Authentication → Hooks
2. Add a new hook:
   - Hook Type: "Send Email"
   - Function: `send-email`
   - Events: Select "Sign up" and "Sign in"

## Option 3: SMTP Configuration (For Actual Emails)

If you want to send actual emails (not just logs), configure SMTP in your Supabase project:

### Step 1: Configure SMTP
1. Go to Supabase Dashboard → Authentication → Settings
2. Scroll down to "SMTP Settings"
3. Configure your SMTP provider (Gmail, SendGrid, etc.)

### Step 2: Update the Trigger Function
Replace the `notify_user_action()` function with:

```sql
CREATE OR REPLACE FUNCTION notify_user_action()
RETURNS TRIGGER AS $$
DECLARE
  email_subject TEXT;
  email_body TEXT;
BEGIN
  -- Determine action type
  IF TG_OP = 'INSERT' THEN
    email_subject := 'New User Signup - ' || NEW.email;
    email_body := 'A new user has signed up: ' || NEW.email || ' (ID: ' || NEW.id || ')';
  ELSIF TG_OP = 'UPDATE' THEN
    email_subject := 'User Login - ' || NEW.email;
    email_body := 'User logged in: ' || NEW.email || ' (ID: ' || NEW.id || ')';
  END IF;
  
  -- Send email notification
  PERFORM net.http_post(
    url := 'https://kpdusbhqiswdiyzdwxpw.supabase.co/functions/v1/send-email',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'to', 'hello@taughtful.com.au',
      'subject', email_subject,
      'html', '<h2>' || email_subject || '</h2><p>' || email_body || '</p>'
    )::text
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;
```

## Current Status

✅ **Form Submissions**: Already configured
- Waitlist signups → `hello@taughtful.com.au`
- Demo requests → `hello@taughtful.com.au`

🔄 **User Authentication**: Needs setup
- User signups → Not configured yet
- User logins → Not configured yet

## Testing

After setup, test by:
1. Creating a new user account
2. Logging in with an existing account
3. Checking Supabase logs for "USER_ACTION:" entries

## Next Steps

1. Run the SQL migration (Option 1) for immediate logging
2. Configure SMTP (Option 3) for actual email delivery
3. Test with a new user signup
4. Check logs to confirm notifications are working

## No Resend Required!

Supabase has built-in email capabilities. You can:
- Use Supabase's default SMTP
- Configure your own SMTP provider
- Use database triggers for notifications
- Use auth hooks for more advanced email handling

All without needing Resend or any external email service!
