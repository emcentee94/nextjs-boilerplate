const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDUxMzQsImV4cCI6MjA3NDE4MTEzNH0.i5Zr4pKkbqRMiIaYO0yZflkgwKv2qPI5EBj6nQPmR5I'

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadFiles() {
  console.log('🚀 Starting upload...\n')

  // First, try to make the bucket public
  console.log('🔧 Attempting to make bucket public...')
  const { data: bucketData, error: bucketError } = await supabase
    .from('storage.buckets')
    .update({ public: true })
    .eq('name', 'V9 CURRISULUM1')

  if (bucketError) {
    console.log(
      '⚠️  Could not make bucket public (this is expected):',
      bucketError.message
    )
  } else {
    console.log('✅ Bucket made public')
  }

  const files = [
    {
      localPath: 'C:\\Users\\evamc\\Downloads\\achievement_standards.json',
      bucketPath: 'curriculum/achievement_standards.json',
      description: 'Achievement Standards',
    },
    {
      localPath:
        'C:\\Users\\evamc\\Downloads\\cross_curriculum_priorities.json',
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

  for (const file of files) {
    try {
      console.log(`📁 Uploading ${file.description}...`)

      if (!fs.existsSync(file.localPath)) {
        console.error(`❌ File not found: ${file.localPath}`)
        continue
      }

      const fileContent = fs.readFileSync(file.localPath)
      const fileSize = (fileContent.length / 1024 / 1024).toFixed(2)
      console.log(`   📊 File size: ${fileSize} MB`)

      const { data, error } = await supabase.storage
        .from('V9 CURRISULUM1')
        .upload(file.bucketPath, fileContent, {
          contentType: 'application/json',
          upsert: true,
        })

      if (error) {
        console.error(`❌ Upload failed:`, error.message)
        continue
      }

      console.log(`✅ Successfully uploaded ${file.description}`)
      console.log(`   📍 Path: ${file.bucketPath}`)
      console.log('')
    } catch (error) {
      console.error(`❌ Error:`, error.message)
    }
  }

  console.log('🎉 Upload completed!')
}

uploadFiles().catch(console.error)
