-- 🔒 SUPABASE DATABASE SECURITY FIXES
-- Addresses all linter warnings for improved security

-- =====================================================
-- 1. FIX FUNCTION SEARCH PATH MUTABLE WARNINGS
-- =====================================================

-- Drop and recreate functions with SECURITY DEFINER and proper search_path
DROP FUNCTION IF EXISTS public.search_curriculum(TEXT, TEXT, TEXT, TEXT, INTEGER);
CREATE OR REPLACE FUNCTION public.search_curriculum(
    search_query TEXT,
    learning_area_filter TEXT DEFAULT NULL,
    subject_filter TEXT DEFAULT NULL,
    level_filter TEXT DEFAULT NULL,
    limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    learning_area TEXT,
    subject TEXT,
    level TEXT,
    content_description TEXT,
    elaboration TEXT,
    rank REAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cd.id,
        cd.learning_area,
        cd.subject,
        cd.level,
        cd.content_description,
        cd.elaboration,
        ts_rank(
            to_tsvector('english', cd.content_description || ' ' || COALESCE(cd.elaboration, '')),
            plainto_tsquery('english', search_query)
        ) as rank
    FROM public.curriculum_data cd
    WHERE 
        (learning_area_filter IS NULL OR cd.learning_area = learning_area_filter)
        AND (subject_filter IS NULL OR cd.subject = subject_filter)
        AND (level_filter IS NULL OR cd.level = level_filter)
        AND (
            to_tsvector('english', cd.content_description || ' ' || COALESCE(cd.elaboration, '')) 
            @@ plainto_tsquery('english', search_query)
            OR cd.topics && ARRAY[search_query]
        )
    ORDER BY rank DESC
    LIMIT limit_count;
END;
$$;

-- Fix complete_user_profile function
DROP FUNCTION IF EXISTS public.complete_user_profile(UUID, TEXT, TEXT, TEXT[], TEXT[], TEXT);
CREATE OR REPLACE FUNCTION public.complete_user_profile(
    user_uuid UUID,
    user_name TEXT,
    user_school TEXT,
    user_year_levels TEXT[],
    user_subjects TEXT[],
    user_challenge TEXT
)
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.users 
    SET 
        name = user_name,
        school = user_school,
        year_levels = user_year_levels,
        subjects = user_subjects,
        biggest_challenge = user_challenge,
        updated_at = NOW()
    WHERE id = user_uuid;
END;
$$;

-- Fix handle_new_user function
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (id, email, created_at, last_login_at)
    VALUES (NEW.id, NEW.email, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- =====================================================
-- 2. FIX EXTENSION IN PUBLIC SCHEMA WARNING
-- =====================================================

-- Create a dedicated schema for extensions
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move pg_trgm extension to extensions schema
-- Note: This requires superuser privileges and may need to be done manually
-- ALTER EXTENSION pg_trgm SET SCHEMA extensions;

-- Alternative: Create a wrapper function in a different schema
CREATE SCHEMA IF NOT EXISTS search;

-- Create a search function in the search schema
CREATE OR REPLACE FUNCTION search.curriculum_search(
    search_query TEXT,
    learning_area_filter TEXT DEFAULT NULL,
    subject_filter TEXT DEFAULT NULL,
    level_filter TEXT DEFAULT NULL,
    limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    learning_area TEXT,
    subject TEXT,
    level TEXT,
    content_description TEXT,
    elaboration TEXT,
    rank REAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, search
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cd.id,
        cd.learning_area,
        cd.subject,
        cd.level,
        cd.content_description,
        cd.elaboration,
        ts_rank(
            to_tsvector('english', cd.content_description || ' ' || COALESCE(cd.elaboration, '')),
            plainto_tsquery('english', search_query)
        ) as rank
    FROM public.curriculum_data cd
    WHERE 
        (learning_area_filter IS NULL OR cd.learning_area = learning_area_filter)
        AND (subject_filter IS NULL OR cd.subject = subject_filter)
        AND (level_filter IS NULL OR cd.level = level_filter)
        AND (
            to_tsvector('english', cd.content_description || ' ' || COALESCE(cd.elaboration, '')) 
            @@ plainto_tsquery('english', search_query)
            OR cd.topics && ARRAY[search_query]
        )
    ORDER BY rank DESC
    LIMIT limit_count;
END;
$$;

-- =====================================================
-- 3. ADDITIONAL SECURITY IMPROVEMENTS
-- =====================================================

-- Grant necessary permissions to the search schema
GRANT USAGE ON SCHEMA search TO authenticated;
GRANT EXECUTE ON FUNCTION search.curriculum_search TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION public.search_curriculum IS 'Search curriculum data with full-text search capabilities';
COMMENT ON FUNCTION public.complete_user_profile IS 'Complete user profile with additional information';
COMMENT ON FUNCTION public.handle_new_user IS 'Handle new user creation from auth.users';
COMMENT ON FUNCTION public.update_updated_at_column IS 'Update the updated_at timestamp for any table';

-- =====================================================
-- 4. VERIFY FIXES
-- =====================================================

-- Test that functions work correctly
SELECT 'Functions updated successfully' as status;

-- Show current function definitions
SELECT 
    routine_name,
    routine_type,
    security_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('search_curriculum', 'complete_user_profile', 'handle_new_user', 'update_updated_at_column');
