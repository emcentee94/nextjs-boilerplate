import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DemoDashboard from './demo-dashboard'

export default async function DemoPage() {
  const supabase = await createClient()

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 Taughtful Demo Mode
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Experience the full teacher dashboard without signing up. This is a preview of what Taughtful can do for your lesson planning.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Demo Features:</strong> Curriculum selection, lesson plan creation, sample data, and all dashboard functionality.
                <br />
                <strong>Note:</strong> Changes won't be saved in demo mode.
              </p>
            </div>
          </div>

          <DemoDashboard />
        </div>
      </div>
    </div>
  )
}
