-- VCAA v2.0 alignment: add versioning and explicit content↔standard links

-- 1) Versioning and record typing on curriculum_data
ALTER TABLE public.curriculum_data
  ADD COLUMN IF NOT EXISTS version TEXT DEFAULT '1.0' CHECK (version IN ('1.0','2.0')),
  ADD COLUMN IF NOT EXISTS record_type TEXT DEFAULT 'content' CHECK (record_type IN ('content','standard'));

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_curriculum_version ON public.curriculum_data(version);
CREATE INDEX IF NOT EXISTS idx_curriculum_record_type ON public.curriculum_data(record_type);

-- 2) Explicit mapping table for content descriptions ↔ achievement standards
CREATE TABLE IF NOT EXISTS public.curriculum_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content_id UUID REFERENCES public.curriculum_data(id) ON DELETE CASCADE,
  standard_id UUID REFERENCES public.curriculum_data(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_curriculum_links_content ON public.curriculum_links(content_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_links_standard ON public.curriculum_links(standard_id);

-- Note: curriculum_data remains public read-only in this project; curriculum_links inherits that posture
-- (no RLS enabled) so it can be queried by the app to surface content↔standard relationships.


