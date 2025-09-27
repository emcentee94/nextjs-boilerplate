import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://placeholder.supabase.co'
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder-key'

// Only create client if we have real credentials
export const supabase =
  supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder')
    ? null
    : createClient(supabaseUrl, supabaseKey)

// Types for the new comprehensive schema
export interface User {
  id: string
  email: string
  name?: string
  school?: string
  year_levels?: string[]
  subjects?: string[]
  biggest_challenge?: string
  subscription_tier: string
  subscription_expires_at?: string
  created_at: string
  updated_at: string
  last_login_at: string
}

export interface CurriculumData {
  id: string
  learning_area: string
  subject: string
  level: string
  strand?: string
  sub_strand?: string
  content_description: string
  elaboration?: string
  achievement_standard?: string
  content_descriptor_code?: string
  cross_curriculum_priority?: string
  general_capability?: string
  topics: string[]
  created_at: string
}

export interface LessonPlan {
  id: string
  user_id: string
  title: string
  learning_area: string
  subject: string
  year_level: string
  duration_minutes: number
  selected_curriculum_ids: string[]
  achievement_standards: string[]
  learning_intentions?: string
  success_criteria?: string
  trauma_informed_profile: any
  include_indigenous_perspectives: boolean
  indigenous_pedagogy_methods: string[]
  cultural_safety_verified: boolean
  lesson_structure: any
  differentiation_strategies: any
  assessment_strategies: any
  resources: any
  ai_model_used?: string
  generation_prompts: any
  generation_time_seconds?: number
  status: string
  generation_step: number
  is_template: boolean
  view_count: number
  export_count: number
  last_edited_at: string
  created_at: string
  updated_at: string
}

export interface LessonEnhancement {
  id: string
  lesson_plan_id: string
  user_id: string
  enhancement_type: string
  request_text: string
  generated_content: any
  approved: boolean
  teacher_modifications?: string
  ai_model_used?: string
  generation_time_seconds?: number
  created_at: string
  updated_at: string
}

export interface LessonFeedback {
  id: string
  lesson_plan_id?: string
  enhancement_id?: string
  user_id: string
  feedback_type: string
  rating?: number
  approved?: boolean
  comments?: string
  suggestions?: string
  metadata: any
  cultural_appropriateness_score?: number
  requires_community_review: boolean
  created_at: string
}

export interface UsageAnalytics {
  id: string
  user_id?: string
  lesson_plan_id?: string
  event_type: string
  event_data: any
  session_id?: string
  user_agent?: string
  ip_address?: string
  created_at: string
}

export interface LessonTemplate {
  id: string
  created_by?: string
  title: string
  description?: string
  learning_area: string
  subject: string
  year_levels: string[]
  template_data: any
  trauma_informed_strategies: string[]
  indigenous_pedagogy_methods: string[]
  is_public: boolean
  is_verified: boolean
  usage_count: number
  rating_average: number
  rating_count: number
  tags: string[]
  created_at: string
  updated_at: string
}

// Auth helper functions
export const auth = {
  async signIn(email: string, password: string) {
    if (!supabase) {
      return {
        data: null,
        error: {
          message:
            'Supabase not configured. Please set up your environment variables.',
        },
      }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signUp(email: string, password: string) {
    if (!supabase) {
      return {
        data: null,
        error: {
          message:
            'Supabase not configured. Please set up your environment variables.',
        },
      }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    if (!supabase) {
      return null
    }
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  },

  async getSession() {
    if (!supabase) {
      return null
    }
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  },
}

// Curriculum data functions
export const curriculum = {
  async searchCurriculum(filters: {
    searchTerm?: string
    learningArea?: string
    subject?: string
    level?: string
    limit?: number
  }) {
    if (!supabase) {
      return { data: [], error: { message: 'Supabase not configured' } }
    }

    let query = supabase.from('curriculum_data').select('*')

    if (filters.learningArea) {
      query = query.eq('learning_area', filters.learningArea)
    }

    if (filters.subject) {
      query = query.eq('subject', filters.subject)
    }

    if (filters.level) {
      query = query.eq('level', filters.level)
    }

    if (filters.searchTerm) {
      query = query.or(
        `content_description.ilike.%${filters.searchTerm}%,elaboration.ilike.%${filters.searchTerm}%,topics.cs.{${filters.searchTerm}}`
      )
    }

    const { data, error } = await query.limit(filters.limit || 50)
    return { data, error }
  },

  async getLearningAreas() {
    if (!supabase) {
      return { data: [], error: { message: 'Supabase not configured' } }
    }
    const { data, error } = await supabase
      .from('curriculum_data')
      .select('learning_area')
      .order('learning_area')

    // Get unique learning areas
    const uniqueAreas = [
      ...new Set(data?.map((item) => item.learning_area) || []),
    ]
    return { data: uniqueAreas, error }
  },

  async getSubjects(learningArea?: string) {
    if (!supabase) {
      return { data: [], error: { message: 'Supabase not configured' } }
    }

    let query = supabase
      .from('curriculum_data')
      .select('subject')
      .order('subject')

    if (learningArea) {
      query = query.eq('learning_area', learningArea)
    }

    const { data, error } = await query

    // Get unique subjects
    const uniqueSubjects = [...new Set(data?.map((item) => item.subject) || [])]
    return { data: uniqueSubjects, error }
  },

  async getYearLevels(learningArea?: string, subject?: string) {
    if (!supabase) {
      return { data: [], error: { message: 'Supabase not configured' } }
    }

    let query = supabase.from('curriculum_data').select('level').order('level')

    if (learningArea) {
      query = query.eq('learning_area', learningArea)
    }

    if (subject) {
      query = query.eq('subject', subject)
    }

    const { data, error } = await query

    // Get unique year levels
    const uniqueLevels = [...new Set(data?.map((item) => item.level) || [])]
    return { data: uniqueLevels, error }
  },

  async importData(outcomes: Omit<CurriculumData, 'id' | 'created_at'>[]) {
    if (!supabase) {
      return { data: [], error: { message: 'Supabase not configured' } }
    }
    const { data, error } = await supabase
      .from('curriculum_data')
      .insert(outcomes)
      .select()

    return { data, error }
  },
}

// Lesson plan functions
export const lessons = {
  async getUserLessons(userId: string) {
    if (!supabase) {
      return { data: [], error: { message: 'Supabase not configured' } }
    }
    const { data, error } = await supabase
      .from('lesson_plans')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    return { data, error }
  },

  async createLesson(
    lesson: Omit<
      LessonPlan,
      'id' | 'created_at' | 'updated_at' | 'last_edited_at'
    >
  ) {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase not configured' } }
    }
    const { data, error } = await supabase
      .from('lesson_plans')
      .insert(lesson)
      .select()
      .single()

    return { data, error }
  },

  async updateLesson(id: string, updates: Partial<LessonPlan>) {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase not configured' } }
    }
    const { data, error } = await supabase
      .from('lesson_plans')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
        last_edited_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  async deleteLesson(id: string) {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } }
    }
    const { error } = await supabase.from('lesson_plans').delete().eq('id', id)

    return { error }
  },

  async getLesson(id: string) {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase not configured' } }
    }
    const { data, error } = await supabase
      .from('lesson_plans')
      .select('*')
      .eq('id', id)
      .single()

    return { data, error }
  },
}

// User functions
export const users = {
  async getCurrentUserProfile() {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase not configured' } }
    }
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { data: null, error: { message: 'No user found' } }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return { data, error }
  },

  async updateProfile(updates: Partial<User>) {
    if (!supabase) {
      return { data: null, error: { message: 'Supabase not configured' } }
    }
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { data: null, error: { message: 'No user found' } }

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single()

    return { data, error }
  },
}

// Analytics functions
export const analytics = {
  async trackEvent(event: {
    event_type: string
    event_data?: any
    lesson_plan_id?: string
    session_id?: string
  }) {
    if (!supabase) {
      return { error: { message: 'Supabase not configured' } }
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { error } = await supabase.from('usage_analytics').insert({
      user_id: user?.id,
      lesson_plan_id: event.lesson_plan_id,
      event_type: event.event_type,
      event_data: event.event_data || {},
      session_id: event.session_id,
      user_agent:
        typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    })

    return { error }
  },
}
