const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Use the service role key for admin operations
const supabaseUrl = 'https://kpdusbhqiswdiyzdwxpw.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZHVzYmhxaXN3ZGl5emR3eHB3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODYwNTEzNCwiZXhwIjoyMDc0MTgxMTM0fQ.6IZdZbWpuZw87Va0zqmuZgBVVwqf0RnwjZDwNcchTY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadFile(localPath, bucketName, fileName, contentType) {
  try {
    console.log(`\n📤 Uploading ${fileName}...`);
    
    // Read file
    const fileBuffer = fs.readFileSync(localPath);
    
    // Upload with service role
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`❌ Error:`, error.message);
      return false;
    }

    console.log(`✅ Uploaded: ${data.path}`);
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    
    console.log(`🔗 URL: ${urlData.publicUrl}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Uploading files to Supabase Storage...');
  
  const files = [
    {
      localPath: 'C:\\Users\\evamc\\Downloads\\general_capabilities.json',
      bucket: 'curriculum-data',
      fileName: 'general_capabilities.json',
      contentType: 'application/json'
    },
    {
      localPath: 'C:\\Users\\evamc\\Downloads\\t-aus logo (1).png',
      bucket: 'assets', 
      fileName: 'taughtful-logo.png',
      contentType: 'image/png'
    }
  ];

  let success = 0;
  for (const file of files) {
    const result = await uploadFile(
      file.localPath,
      file.bucket,
      file.fileName,
      file.contentType
    );
    if (result) success++;
  }

  console.log(`\n🎉 ${success}/${files.length} files uploaded successfully!`);
}

main().catch(console.error);
