'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

interface User {
  id: string
  email?: string
  email_confirmed_at?: string
  created_at?: string
  last_sign_in_at?: string
}

interface ProfileTestProps {
  user: User
}

export default function ProfileTest({ user }: ProfileTestProps) {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const supabase = createClient()

  const loadProfile = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        setError(`Error loading profile: ${error.message}`)
      } else {
        setProfile(data)
        setSuccess('Profile loaded successfully!')
      }
    } catch (err) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: 'Test User',
          school: 'Test School',
          year_levels: ['Year 1', 'Year 2'],
          subjects: ['English', 'Mathematics'],
          biggest_challenge: 'Time management',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        setError(`Error updating profile: ${error.message}`)
      } else {
        setProfile(data)
        setSuccess('Profile updated successfully!')
      }
    } catch (err) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const resendConfirmation = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email || ''
      })

      if (error) {
        setError(`Error resending confirmation: ${error.message}`)
      } else {
        setSuccess('Confirmation email sent! Check your inbox.')
      }
    } catch (err) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Profile System Test</h2>
      
      <div className="space-y-4">
        {/* Load Profile Button */}
        <div>
          <button
            onClick={loadProfile}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load Profile from Database'}
          </button>
        </div>

        {/* Update Profile Button */}
        <div>
          <button
            onClick={updateProfile}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile with Test Data'}
          </button>
        </div>

        {/* Resend Confirmation Button */}
        {!user.email_confirmed_at && (
          <div>
            <button
              onClick={resendConfirmation}
              disabled={loading}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Resend Email Confirmation'}
            </button>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {/* Profile Data Display */}
        {profile && (
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Profile Data from Database:</h3>
            <pre className="text-xs bg-white p-3 rounded border overflow-auto">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
