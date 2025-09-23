-- 🚀 TAUGHTFUL SUPABASE SCHEMA
-- Complete database setup for production-ready lesson planning platform

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fast text search

-- =====================================================
-- USERS TABLE - Teacher profiles and authentication
-- =====================================================
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    school TEXT,
    year_levels TEXT[], -- e.g., ['Foundation', 'Year 1', 'Year 2']
    subjects TEXT[], -- e.g., ['English', 'Mathematics', 'Science']
    biggest_challenge TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'individual', 'school', 'district')),
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CURRICULUM DATA TABLE - Australian Curriculum v9
-- =====================================================
CREATE TABLE public.curriculum_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    learning_area TEXT NOT NULL,
    subject TEXT NOT NULL,
    level TEXT NOT NULL, -- Foundation, Year 1-10
    strand TEXT,
    sub_strand TEXT,
    content_description TEXT NOT NULL,
    elaboration TEXT,
    achievement_standard TEXT,
    content_descriptor_code TEXT,
    cross_curriculum_priority TEXT,
    general_capability TEXT,
    topics TEXT[], -- Searchable keywords
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- LESSON PLANS TABLE - Core lesson storage
-- =====================================================
CREATE TABLE public.lesson_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Basic Information
    title TEXT NOT NULL,
    learning_area TEXT NOT NULL,
    subject TEXT NOT NULL,
    year_level TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    
    -- Curriculum Alignment
    selected_curriculum_ids UUID[], -- References to curriculum_data
    achievement_standards TEXT[],
    learning_intentions TEXT,
    success_criteria TEXT,
    
    -- Taughtful Specific Features
    trauma_informed_profile JSONB DEFAULT '{}', -- Stores trauma-informed strategies
    include_indigenous_perspectives BOOLEAN DEFAULT FALSE,
    indigenous_pedagogy_methods TEXT[], -- 8 Ways of Learning methods used
    cultural_safety_verified BOOLEAN DEFAULT FALSE,
    
    -- Lesson Structure (I Do, We Do, You Do)
    lesson_structure JSONB DEFAULT '{}', -- Full lesson plan structure
    differentiation_strategies JSONB DEFAULT '{}',
    assessment_strategies JSONB DEFAULT '{}',
    resources JSONB DEFAULT '{}',
    
    -- Generation Metadata
    ai_model_used TEXT,
    generation_prompts JSONB DEFAULT '{}', -- Store prompts for reproducibility
    generation_time_seconds INTEGER,
    
    -- Status Tracking
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'complete', 'published', 'archived')),
    generation_step INTEGER DEFAULT 0, -- Track which step user is on (0-6)
    is_template BOOLEAN DEFAULT FALSE,
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    export_count INTEGER DEFAULT 0,
    last_edited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- LESSON ENHANCEMENTS TABLE - Iterative improvements
-- =====================================================
CREATE TABLE public.lesson_enhancements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lesson_plan_id UUID REFERENCES public.lesson_plans(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    enhancement_type TEXT NOT NULL CHECK (enhancement_type IN (
        'keywords_definitions',
        'direct_instruction_content',
        'assessment_resources',
        'activity_extensions',
        'differentiation_support',
        'cultural_connections'
    )),
    
    request_text TEXT NOT NULL, -- Natural language request from teacher
    generated_content JSONB NOT NULL, -- AI-generated enhancement
    approved BOOLEAN DEFAULT FALSE,
    teacher_modifications TEXT, -- Any changes teacher made
    
    ai_model_used TEXT,
    generation_time_seconds INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FEEDBACK TABLE - Cultural safety & quality tracking
-- =====================================================
CREATE TABLE public.lesson_feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lesson_plan_id UUID REFERENCES public.lesson_plans(id) ON DELETE CASCADE,
    enhancement_id UUID REFERENCES public.lesson_enhancements(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    
    feedback_type TEXT NOT NULL CHECK (feedback_type IN (
        'cultural_safety_approval',
        'cultural_safety_concern',
        'pedagogy_approval',
        'content_quality',
        'differentiation_effectiveness',
        'user_experience',
        'export_success'
    )),
    
    -- Feedback Data
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    approved BOOLEAN,
    comments TEXT,
    suggestions TEXT,
    metadata JSONB DEFAULT '{}', -- Additional context
    
    -- Cultural Safety Specific
    cultural_appropriateness_score INTEGER CHECK (cultural_appropriateness_score >= 1 AND cultural_appropriateness_score <= 5),
    requires_community_review BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USAGE ANALYTICS TABLE - Product improvement data
-- =====================================================
CREATE TABLE public.usage_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_plan_id UUID REFERENCES public.lesson_plans(id) ON DELETE CASCADE,
    
    event_type TEXT NOT NULL CHECK (event_type IN (
        'lesson_started',
        'lesson_completed',
        'lesson_exported',
        'enhancement_requested',
        'curriculum_searched',
        'trauma_profile_updated',
        'indigenous_perspective_added',
        'cultural_safety_verified'
    )),
    
    event_data JSONB DEFAULT '{}', -- Store event-specific data
    session_id TEXT, -- Track user sessions
    user_agent TEXT,
    ip_address INET,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TEMPLATES TABLE - Shareable lesson templates
-- =====================================================
CREATE TABLE public.lesson_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    
    title TEXT NOT NULL,
    description TEXT,
    learning_area TEXT NOT NULL,
    subject TEXT NOT NULL,
    year_levels TEXT[] NOT NULL,
    
    template_data JSONB NOT NULL, -- Complete lesson structure
    trauma_informed_strategies TEXT[],
    indigenous_pedagogy_methods TEXT[],
    
    is_public BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE, -- Verified by education experts
    usage_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    
    tags TEXT[], -- For searchability
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_subscription ON public.users(subscription_tier, subscription_expires_at);

-- Curriculum data indexes
CREATE INDEX idx_curriculum_learning_area_subject ON public.curriculum_data(learning_area, subject);
CREATE INDEX idx_curriculum_level ON public.curriculum_data(level);
CREATE INDEX idx_curriculum_topics_gin ON public.curriculum_data USING GIN(topics);
CREATE INDEX idx_curriculum_content_search ON public.curriculum_data USING GIN(to_tsvector('english', content_description || ' ' || COALESCE(elaboration, '')));

-- Lesson plans indexes
CREATE INDEX idx_lesson_plans_user_id ON public.lesson_plans(user_id);
CREATE INDEX idx_lesson_plans_status ON public.lesson_plans(status);
CREATE INDEX idx_lesson_plans_subject_level ON public.lesson_plans(learning_area, subject, year_level);
CREATE INDEX idx_lesson_plans_created_at ON public.lesson_plans(created_at DESC);
CREATE INDEX idx_lesson_plans_indigenous ON public.lesson_plans(include_indigenous_perspectives) WHERE include_indigenous_perspectives = true;

-- Analytics indexes
CREATE INDEX idx_usage_analytics_user_event ON public.usage_analytics(user_id, event_type, created_at);
CREATE INDEX idx_usage_analytics_lesson ON public.usage_analytics(lesson_plan_id, event_type);

-- Templates indexes
CREATE INDEX idx_templates_public ON public.lesson_templates(is_public, is_verified) WHERE is_public = true;
CREATE INDEX idx_templates_subject_level ON public.lesson_templates(learning_area, subject);
CREATE INDEX idx_templates_tags_gin ON public.lesson_templates USING GIN(tags);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_enhancements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_templates ENABLE ROW LEVEL SECURITY;

-- Note: curriculum_data is public read-only, no RLS needed

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Lesson plans policies
CREATE POLICY "Users can view own lesson plans" ON public.lesson_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson plans" ON public.lesson_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson plans" ON public.lesson_plans
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lesson plans" ON public.lesson_plans
    FOR DELETE USING (auth.uid() = user_id);

-- Lesson enhancements policies
CREATE POLICY "Users can view own enhancements" ON public.lesson_enhancements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enhancements" ON public.lesson_enhancements
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enhancements" ON public.lesson_enhancements
    FOR UPDATE USING (auth.uid() = user_id);

-- Feedback policies
CREATE POLICY "Users can view own feedback" ON public.lesson_feedback
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback" ON public.lesson_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON public.usage_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON public.usage_analytics
    FOR INSERT WITH CHECK (true); -- Allow system to insert analytics

-- Templates policies
CREATE POLICY "Anyone can view public templates" ON public.lesson_templates
    FOR SELECT USING (is_public = true OR auth.uid() = created_by);

CREATE POLICY "Users can create templates" ON public.lesson_templates
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own templates" ON public.lesson_templates
    FOR UPDATE USING (auth.uid() = created_by);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_plans_updated_at BEFORE UPDATE ON public.lesson_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_enhancements_updated_at BEFORE UPDATE ON public.lesson_enhancements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_templates_updated_at BEFORE UPDATE ON public.lesson_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle user creation (called by auth trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, created_at, last_login_at)
    VALUES (NEW.id, NEW.email, NOW(), NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- CURRICULUM SEARCH FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION search_curriculum(
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
) AS $$
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
$$ LANGUAGE plpgsql;

-- =====================================================
-- INITIAL DATA SETUP
-- =====================================================

-- Insert some sample curriculum data (you'll replace this with your full import)
INSERT INTO public.curriculum_data (learning_area, subject, level, strand, sub_strand, content_description, elaboration, topics) VALUES
('English', 'English', 'Foundation', 'Language', 'Language variation and change', 'Understand that English is one of many languages spoken in Australia and that different languages may be spoken by family, classmates and community', 'recognising that Australia is a linguistically diverse country with more than 400 languages spoken', ARRAY['multilingualism', 'diversity', 'languages']),
('Mathematics', 'Mathematics', 'Year 1', 'Number and Algebra', 'Number and place value', 'Develop confidence with number sequences to and from 100 by ones from any starting point', 'Skip counting by twos, fives and tens starting from zero', ARRAY['counting', 'sequences', 'patterns']);

-- Create a test user profile completion procedure
CREATE OR REPLACE FUNCTION complete_user_profile(
    user_uuid UUID,
    user_name TEXT,
    user_school TEXT,
    user_year_levels TEXT[],
    user_subjects TEXT[],
    user_challenge TEXT
)
RETURNS void AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SAMPLE QUERIES FOR TESTING
-- =====================================================

-- Test curriculum search
-- SELECT * FROM search_curriculum('counting', 'Mathematics', NULL, NULL, 10);

-- Test user lesson plan count
-- SELECT u.name, COUNT(lp.id) as lesson_count 
-- FROM users u 
-- LEFT JOIN lesson_plans lp ON u.id = lp.user_id 
-- GROUP BY u.id, u.name;

-- 🎉 SCHEMA SETUP COMPLETE!
-- Your Taughtful database is ready for production use.