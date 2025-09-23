import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileTest from './profile-test'

export default async function TestProfile() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Profile System Test
          </h1>
          
          <div className="space-y-6">
            {/* User Information */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Current User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p><strong>Created:</strong> {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}</p>
                  <p><strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
                  <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
                </div>
              </div>
            </div>

            {/* Profile Test Component */}
            <ProfileTest user={user} />

            {/* Email Status */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Email Status</h2>
              {user.email_confirmed_at ? (
                <div className="text-green-600">
                  <p>✅ Email is confirmed</p>
                  <p className="text-sm text-gray-600">
                    Confirmed at: {new Date(user.email_confirmed_at).toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="text-yellow-600">
                  <p>⚠️ Email is not confirmed</p>
                  <p className="text-sm text-gray-600">
                    You may need to check your email for a confirmation link.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
              <div className="flex flex-wrap gap-2">
                <a
                  href="/"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go Home
                </a>
                <a
                  href="/test-supabase"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Test Connection
                </a>
                <a
                  href="/notes"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  View Notes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
