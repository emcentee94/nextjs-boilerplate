const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Supabase configuration
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODYwNTEzNCwiZXhwIjoyMDc0MTgxMTM0fQ.6IZdZbWpuZw87Va0zqmuZgBVVwqf0RnwjZDwNcchTY'

const supabase = createClient(supabaseUrl, supabaseKey)

// Files to upload
const filesToUpload = [
  {
    localPath: 'C:\\Users\\evamc\\Downloads\\general_capabilities.json',
    bucketName: 'curriculum-data',
    fileName: 'general_capabilities.json',
    contentType: 'application/json',
  },
  {
    localPath: 'C:\\Users\\evamc\\Downloads\\t-aus logo (1).png',
    bucketName: 'assets',
    fileName: 'taughtful-logo.png',
    contentType: 'image/png',
  },
]

async function uploadFile(fileConfig) {
  try {
    console.log(`\n📤 Uploading ${fileConfig.fileName}...`)

    // Read the file
    const fileBuffer = fs.readFileSync(fileConfig.localPath)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(fileConfig.bucketName)
      .upload(fileConfig.fileName, fileBuffer, {
        contentType: fileConfig.contentType,
        upsert: true, // Overwrite if exists
      })

    if (error) {
      console.error(`❌ Error uploading ${fileConfig.fileName}:`, error)
      return false
    }

    console.log(`✅ Successfully uploaded ${fileConfig.fileName}`)
    console.log(`   📍 Path: ${data.path}`)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(fileConfig.bucketName)
      .getPublicUrl(fileConfig.fileName)

    console.log(`   🔗 Public URL: ${urlData.publicUrl}`)

    return true
  } catch (error) {
    console.error(`❌ Error reading/uploading ${fileConfig.fileName}:`, error)
    return false
  }
}

async function createBuckets() {
  console.log('🪣 Creating storage buckets...')

  const buckets = [
    { name: 'curriculum-data', public: true },
    { name: 'assets', public: true },
  ]

  for (const bucket of buckets) {
    try {
      const { data, error } = await supabase.storage.createBucket(bucket.name, {
        public: bucket.public,
        allowedMimeTypes:
          bucket.name === 'assets'
            ? ['image/*']
            : ['application/json', 'text/*'],
        fileSizeLimit: 50 * 1024 * 1024, // 50MB
      })

      if (error && !error.message.includes('already exists')) {
        console.error(`❌ Error creating bucket ${bucket.name}:`, error)
      } else {
        console.log(`✅ Bucket ${bucket.name} ready`)
      }
    } catch (error) {
      console.log(`ℹ️  Bucket ${bucket.name} may already exist`)
    }
  }
}

async function main() {
  console.log('🚀 Starting Supabase Storage upload...')
  console.log(`📡 Connecting to: ${supabaseUrl}`)

  // Create buckets first
  await createBuckets()

  // Upload files
  let successCount = 0
  for (const fileConfig of filesToUpload) {
    const success = await uploadFile(fileConfig)
    if (success) successCount++
  }

  console.log(
    `\n🎉 Upload complete! ${successCount}/${filesToUpload.length} files uploaded successfully.`
  )

  if (successCount === filesToUpload.length) {
    console.log('\n📋 Summary:')
    console.log('   • general_capabilities.json → curriculum-data bucket')
    console.log('   • taughtful-logo.png → assets bucket')
    console.log('\n🔗 Access your files via Supabase Dashboard > Storage')
  }
}

main().catch(console.error)
