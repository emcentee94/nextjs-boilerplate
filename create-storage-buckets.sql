-- Create storage buckets for Taughtful
-- Run this in Supabase SQL Editor

-- Create curriculum-data bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'curriculum-data',
  'curriculum-data', 
  true,
  52428800, -- 50MB
  ARRAY['application/json', 'text/plain', 'text/csv']
)
ON CONFLICT (id) DO NOTHING;

-- Create assets bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'assets',
  'assets',
  true,
  52428800, -- 50MB
  ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for public access
CREATE POLICY "Public read access for curriculum-data" ON storage.objects
FOR SELECT USING (bucket_id = 'curriculum-data');

CREATE POLICY "Public read access for assets" ON storage.objects
FOR SELECT USING (bucket_id = 'assets');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload to curriculum-data" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'curriculum-data' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can upload to assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'assets' 
  AND auth.role() = 'authenticated'
);

-- Allow service role to manage all files
CREATE POLICY "Service role full access" ON storage.objects
FOR ALL USING (auth.role() = 'service_role');
