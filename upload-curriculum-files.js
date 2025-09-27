const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Supabase configuration
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxMzQsImV4cCI6MjA3NDE4MTEzNH0.i5Zr4pKkbqRMiIaYO0yZflkgwKv2qPI5EBj6nQPmR5I'

// Supabase key is now hardcoded above

const supabase = createClient(supabaseUrl, supabaseKey)

// Files to upload
const filesToUpload = [
  {
    localPath: 'C:\\Users\\evamc\\Downloads\\achievement_standards.json',
    bucketPath: 'curriculum/achievement_standards.json',
    description: 'Achievement Standards',
  },
  {
    localPath: 'C:\\Users\\evamc\\Downloads\\cross_curriculum_priorities.json',
    bucketPath: 'curriculum/cross_curriculum_priorities.json',
    description: 'Cross-Curriculum Priorities',
  },
  {
    localPath: 'C:\\Users\\evamc\\Downloads\\general_capabilities.json',
    bucketPath: 'curriculum/general_capabilities.json',
    description: 'General Capabilities',
  },
  {
    localPath: 'C:\\Users\\evamc\\Downloads\\learning_areas.json',
    bucketPath: 'curriculum/learning_areas.json',
    description: 'Learning Areas',
  },
]

async function uploadFiles() {
  console.log('🚀 Starting upload of curriculum files to Supabase Storage...\n')

  for (const file of filesToUpload) {
    try {
      console.log(`📁 Uploading ${file.description}...`)

      // Check if file exists
      if (!fs.existsSync(file.localPath)) {
        console.error(`❌ File not found: ${file.localPath}`)
        continue
      }

      // Read file content
      const fileContent = fs.readFileSync(file.localPath)
      const fileSize = (fileContent.length / 1024 / 1024).toFixed(2)

      console.log(`   📊 File size: ${fileSize} MB`)

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('V9 CURRISULUM1')
        .upload(file.bucketPath, fileContent, {
          contentType: 'application/json',
          upsert: true, // Overwrite if exists
        })

      if (error) {
        console.error(
          `❌ Upload failed for ${file.description}:`,
          error.message
        )
        continue
      }

      console.log(`✅ Successfully uploaded ${file.description}`)
      console.log(`   📍 Path: ${file.bucketPath}`)
      console.log(
        `   🔗 URL: ${supabaseUrl}/storage/v1/object/public/V9%20CURRISULUM1/${encodeURIComponent(file.bucketPath)}`
      )
      console.log('')
    } catch (error) {
      console.error(`❌ Error uploading ${file.description}:`, error.message)
    }
  }

  console.log('🎉 Upload process completed!')
}

// Run the upload
uploadFiles().catch(console.error)
