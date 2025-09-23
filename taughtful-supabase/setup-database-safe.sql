-- Taughtful Supabase Database Setup (Safe Version)
-- This version handles existing objects gracefully

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  school TEXT,
  year_levels TEXT[],
  subjects TEXT[],
  biggest_challenge TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'individual', 'school', 'district')),
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create curriculum_data table
CREATE TABLE IF NOT EXISTS public.curriculum_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  learning_area TEXT NOT NULL,
  subject TEXT NOT NULL,
  level TEXT NOT NULL,
  strand TEXT,
  sub_strand TEXT,
  content_description TEXT NOT NULL,
  elaboration TEXT,
  achievement_standard TEXT,
  content_descriptor_code TEXT,
  cross_curriculum_priority TEXT,
  general_capability TEXT,
  topics TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lesson_plans table
CREATE TABLE IF NOT EXISTS public.lesson_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  learning_area TEXT NOT NULL,
  subject TEXT NOT NULL,
  year_level TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  selected_curriculum_ids UUID[],
  achievement_standards TEXT[],
  learning_intentions TEXT,
  success_criteria TEXT,
  trauma_informed_profile JSONB DEFAULT '{}',
  include_indigenous_perspectives BOOLEAN DEFAULT FALSE,
  indigenous_pedagogy_methods TEXT[],
  cultural_safety_verified BOOLEAN DEFAULT FALSE,
  lesson_structure JSONB DEFAULT '{}',
  differentiation_strategies JSONB DEFAULT '{}',
  assessment_strategies JSONB DEFAULT '{}',
  resources JSONB DEFAULT '{}',
  ai_model_used TEXT,
  generation_prompts JSONB DEFAULT '{}',
  generation_time_seconds INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'complete', 'published', 'archived')),
  generation_step INTEGER DEFAULT 0,
  is_template BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  export_count INTEGER DEFAULT 0,
  last_edited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_plans ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Anyone can view curriculum data" ON public.curriculum_data;
DROP POLICY IF EXISTS "Users can view own lesson plans" ON public.lesson_plans;
DROP POLICY IF EXISTS "Users can insert own lesson plans" ON public.lesson_plans;
DROP POLICY IF EXISTS "Users can update own lesson plans" ON public.lesson_plans;
DROP POLICY IF EXISTS "Users can delete own lesson plans" ON public.lesson_plans;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view curriculum data" ON public.curriculum_data
  FOR SELECT USING (true);

CREATE POLICY "Users can view own lesson plans" ON public.lesson_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson plans" ON public.lesson_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson plans" ON public.lesson_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lesson plans" ON public.lesson_plans
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at, last_login_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    last_login_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist, then create new ones
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_lesson_plans_updated_at ON public.lesson_plans;

-- Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_plans_updated_at BEFORE UPDATE ON public.lesson_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (only if table is empty)
INSERT INTO public.curriculum_data (learning_area, subject, level, strand, sub_strand, content_description, elaboration, topics) 
SELECT * FROM (VALUES
('English', 'English', 'Foundation', 'Language', 'Language variation and change', 'Understand that English is one of many languages spoken in Australia and that different languages may be spoken by family, classmates and community', 'recognising that Australia is a linguistically diverse country with more than 400 languages spoken', ARRAY['multilingualism', 'diversity', 'languages']),
('Mathematics', 'Mathematics', 'Year 1', 'Number and Algebra', 'Number and place value', 'Develop confidence with number sequences to and from 100 by ones from any starting point', 'Skip counting by twos, fives and tens starting from zero', ARRAY['counting', 'sequences', 'patterns']),
('Science', 'Science', 'Year 2', 'Science Understanding', 'Biological sciences', 'Living things grow, change and have offspring similar to themselves', 'observing that all animals have offspring, usually with two parents', ARRAY['biology', 'life cycles', 'reproduction'])
) AS sample_data(learning_area, subject, level, strand, sub_strand, content_description, elaboration, topics)
WHERE NOT EXISTS (SELECT 1 FROM public.curriculum_data LIMIT 1);

-- Success message
SELECT 'Database setup completed successfully! 🎉' as message;