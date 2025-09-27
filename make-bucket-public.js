const { createClient } = require('@supabase/supabase-js')

// Use service role key to bypass RLS
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co'
const supabaseServiceKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODYwNTEzNCwiZXhwIjoyMDc0MTgxMTM0fQ.6IZdZbWpuZw87Va0zqmuZgBVvVwqf0RnwjZDwNcchTY'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function makeBucketPublic() {
  console.log('🔧 Making bucket public...\n')

  try {
    // Update the bucket to be public
    const { data, error } = await supabase
      .from('storage.buckets')
      .update({ public: true })
      .eq('name', 'V9 CURRISULUM1')

    if (error) {
      console.error('❌ Error making bucket public:', error.message)
      return
    }

    console.log('✅ Bucket made public successfully!')

    // Verify the bucket is now public
    const { data: bucketData, error: bucketError } = await supabase
      .from('storage.buckets')
      .select('name, public')
      .eq('name', 'V9 CURRISULUM1')

    if (bucketError) {
      console.error('❌ Error verifying bucket:', bucketError.message)
      return
    }

    console.log('📊 Bucket status:', bucketData[0])

    if (bucketData[0].public) {
      console.log('🎉 Bucket is now public! URLs should work.')
    } else {
      console.log('⚠️  Bucket is still private.')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

makeBucketPublic().catch(console.error)
