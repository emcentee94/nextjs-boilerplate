const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Use service role key to bypass RLS
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
// You need to get this from your Supabase dashboard > Settings > API
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY_HERE'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function uploadFiles() {
  console.log('🚀 Starting upload with service role...\n')

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
