-- User Activity Audit and Notification System
-- This migration creates a comprehensive logging system for user signups and logins
-- with both database persistence and email notification capabilities

-- Create user_activity_log table for persistent logging
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    activity_type TEXT NOT NULL, -- 'signup', 'login'
    user_metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON public.user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_email ON public.user_activity_log(email);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_activity_type ON public.user_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON public.user_activity_log(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (for API operations)
CREATE POLICY "Service role can manage user_activity_log" ON public.user_activity_log
    FOR ALL USING (auth.role() = 'service_role');

-- Create policy for authenticated users to read their own activity
CREATE POLICY "Users can read own activity" ON public.user_activity_log
    FOR SELECT USING (auth.uid() = user_id);

-- Create enhanced function that logs to table AND sends email
CREATE OR REPLACE FUNCTION notify_user_action()
RETURNS TRIGGER AS $$
DECLARE
    activity_type TEXT;
    user_email TEXT;
    user_id UUID;
    user_metadata JSONB;
BEGIN
    -- Determine activity type
    IF TG_OP = 'INSERT' THEN
        activity_type := 'signup';
        user_email := NEW.email;
        user_id := NEW.id;
        user_metadata := jsonb_build_object(
            'signup_method', NEW.app_metadata->>'provider',
            'email_confirmed', NEW.email_confirmed_at IS NOT NULL,
            'phone_confirmed', NEW.phone_confirmed_at IS NOT NULL,
            'created_at', NEW.created_at,
            'raw_app_metadata', NEW.app_metadata,
            'raw_user_metadata', NEW.user_metadata
        );
    ELSIF TG_OP = 'UPDATE' AND OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at THEN
        activity_type := 'login';
        user_email := NEW.email;
        user_id := NEW.id;
        user_metadata := jsonb_build_object(
            'login_method', NEW.app_metadata->>'provider',
            'last_sign_in_at', NEW.last_sign_in_at,
            'email_confirmed', NEW.email_confirmed_at IS NOT NULL,
            'phone_confirmed', NEW.phone_confirmed_at IS NOT NULL,
            'raw_app_metadata', NEW.app_metadata,
            'raw_user_metadata', NEW.user_metadata
        );
    ELSE
        RETURN COALESCE(NEW, OLD);
    END IF;

    -- Insert into user_activity_log table
    INSERT INTO public.user_activity_log (user_id, email, activity_type, user_metadata)
    VALUES (
        user_id,
        user_email,
        activity_type,
        user_metadata
    );

    -- Log to Supabase logs for immediate visibility
    RAISE LOG 'USER_ACTION: % - % - % - % - %', 
        activity_type, 
        user_email, 
        user_id,
        user_metadata->>'signup_method',
        NOW();
    
    -- TODO: Add email sending logic here
    -- This will be extended to send emails to hello@taughtful.com.au
    -- Options:
    -- 1. Use Supabase Edge Function with SMTP
    -- 2. Use Supabase's built-in email service
    -- 3. Use external webhook to your email service
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS user_signup_notification ON auth.users;
DROP TRIGGER IF EXISTS user_login_notification ON auth.users;

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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT SELECT, INSERT, UPDATE ON auth.users TO postgres;
GRANT ALL ON public.user_activity_log TO postgres;
GRANT ALL ON public.user_activity_log TO service_role;

-- Create a view for easy querying of recent user activity
CREATE OR REPLACE VIEW public.recent_user_activity AS
SELECT 
    ual.id,
    ual.user_id,
    ual.email,
    ual.activity_type,
    ual.created_at,
    ual.user_metadata,
    CASE 
        WHEN ual.activity_type = 'signup' THEN ual.user_metadata->>'signup_method'
        WHEN ual.activity_type = 'login' THEN ual.user_metadata->>'login_method'
        ELSE 'unknown'
    END as auth_method,
    ual.user_metadata->>'email_confirmed' as email_confirmed
FROM public.user_activity_log ual
ORDER BY ual.created_at DESC;

-- Grant access to the view
GRANT SELECT ON public.recent_user_activity TO postgres;
GRANT SELECT ON public.recent_user_activity TO service_role;
GRANT SELECT ON public.recent_user_activity TO authenticated;
