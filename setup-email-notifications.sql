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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT SELECT, INSERT, UPDATE ON auth.users TO postgres;
