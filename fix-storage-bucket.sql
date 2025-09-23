-- Fix Storage Bucket and Policies for Curriculum Files
-- Run this in your Supabase SQL Editor

-- Make the bucket public
UPDATE storage.buckets 
SET public = true 
WHERE name = 'V9 CURRISULUM1';

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access for curriculum files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload curriculum files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update curriculum files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete curriculum files" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous users can upload curriculum files" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous users can update curriculum files" ON storage.objects;

-- Create policy to allow public read access to curriculum files
CREATE POLICY "Public read access for curriculum files" ON storage.objects
FOR SELECT USING (bucket_id = 'V9 CURRISULUM1' AND name LIKE 'curriculum/%');

-- Create policy to allow authenticated users to upload curriculum files
CREATE POLICY "Authenticated users can upload curriculum files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'V9 CURRISULUM1' 
  AND name LIKE 'curriculum/%'
  AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to update curriculum files
CREATE POLICY "Authenticated users can update curriculum files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'V9 CURRISULUM1' 
  AND name LIKE 'curriculum/%'
  AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to delete curriculum files
CREATE POLICY "Authenticated users can delete curriculum files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'V9 CURRISULUM1' 
  AND name LIKE 'curriculum/%'
  AND auth.role() = 'authenticated'
);

-- Create policy for anonymous users to upload (for the script)
CREATE POLICY "Anonymous users can upload curriculum files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'V9 CURRISULUM1' 
  AND name LIKE 'curriculum/%'
);

-- Allow anonymous users to update curriculum files
CREATE POLICY "Anonymous users can update curriculum files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'V9 CURRISULUM1' 
  AND name LIKE 'curriculum/%'
);

-- Verify the bucket is now public
SELECT name, id, public FROM storage.buckets WHERE name = 'V9 CURRISULUM1';
