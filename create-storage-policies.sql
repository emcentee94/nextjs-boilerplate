-- Storage Policies for Curriculum Files
-- Run this in your Supabase SQL Editor

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

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

-- Also create a policy for anonymous users to upload (for the script)
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
