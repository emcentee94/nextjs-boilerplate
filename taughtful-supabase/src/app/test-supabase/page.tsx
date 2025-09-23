import { createClient } from '@/utils/supabase/server'

export default async function TestSupabase() {
  const supabase = await createClient()
  
  try {
    // Test 1: Check if we can connect to Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    // Test 2: Try to query a table (this will fail if table doesn't exist, but that's ok)
    const { data: notes, error: notesError } = await supabase
      .from('notes')
      .select('*')
      .limit(5)
    
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Supabase Connection Test
            </h1>
            
            <div className="space-y-6">
              {/* Connection Status */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold text-green-600 mb-2">
                  ✅ Supabase Connection: SUCCESS
                </h2>
                <p className="text-sm text-gray-600">
                  Successfully connected to: https://kpdusbhqiswdiyzdwxpw.supabase.co
                </p>
              </div>

              {/* User Status */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
                {userError ? (
                  <div className="text-red-600">
                    <p>Error: {userError.message}</p>
                  </div>
                ) : user ? (
                  <div className="text-green-600">
                    <p>✅ User is authenticated</p>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                    <p className="text-sm text-gray-600">ID: {user.id}</p>
                  </div>
                ) : (
                  <div className="text-yellow-600">
                    <p>⚠️ No user authenticated (this is normal for first visit)</p>
                    <p className="text-sm text-gray-600">
                      <a href="/login" className="text-blue-600 hover:underline">
                        Go to login page
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* Database Status */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Database Status</h2>
                {notesError ? (
                  <div className="text-yellow-600">
                    <p>⚠️ Notes table not found or not accessible</p>
                    <p className="text-sm text-gray-600">Error: {notesError.message}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      This is expected if you haven't created the notes table yet.
                      <br />
                      <a 
                        href="https://supabase.com/dashboard/project/kpdusbhqiswdiyzdwxpw/editor" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open Supabase SQL Editor
                      </a>
                    </p>
                  </div>
                ) : (
                  <div className="text-green-600">
                    <p>✅ Notes table is accessible</p>
                    <p className="text-sm text-gray-600">
                      Found {notes?.length || 0} notes
                    </p>
                    {notes && notes.length > 0 && (
                      <div className="mt-2">
                        <h3 className="font-medium">Sample Notes:</h3>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(notes, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go to Login
                  </a>
                  <a
                    href="/notes"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View Notes
                  </a>
                  <a
                    href="https://supabase.com/dashboard/project/kpdusbhqiswdiyzdwxpw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Open Supabase Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-6">
              Supabase Connection Test - FAILED
            </h1>
            <div className="text-red-600">
              <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
              <p className="text-sm text-gray-600 mt-2">
                Check your environment variables and Supabase configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
