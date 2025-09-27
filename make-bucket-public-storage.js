const { createClient } = require('@supabase/supabase-js')

// Use service role key to bypass RLS
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseServiceKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODYwNTEzNCwiZXhwIjoyMDc0MTgxMTM0fQ.6IZdZbWpuZw87Va0zqmuZgBVvVwqf0RnwjZDwNcchTY'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function makeBucketPublic() {
  console.log('🔧 Making bucket public using storage API...\n')

  try {
    // Try to make the bucket public using the storage API
    const { data, error } = await supabase.storage.updateBucket(
      'V9 CURRISULUM1',
      { public: true }
    )

    if (error) {
      console.error('❌ Error making bucket public:', error.message)
      return
    }

    console.log('✅ Bucket made public successfully!')
    console.log('📊 Bucket data:', data)

    // Test if the bucket is now accessible
    console.log('\n🧪 Testing bucket access...')

    const { data: testData, error: testError } = await supabase.storage
      .from('V9 CURRISULUM1')
      .list('curriculum')

    if (testError) {
      console.error('❌ Error testing bucket access:', testError.message)
      return
    }

    console.log('✅ Bucket is accessible!')
    console.log('📁 Files in curriculum folder:', testData)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

makeBucketPublic().catch(console.error)
