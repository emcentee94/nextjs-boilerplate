'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestPage() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runTests = async () => {
    setIsTesting(true)
    setError(null)
    setTestResults(null)

    try {
      const response = await fetch('/api/curriculum/test')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Test failed')
      }

      setTestResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test failed')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Database Connection Test</CardTitle>
            <CardDescription>
              Test the Supabase connection and database schema to identify any issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={runTests} 
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? 'Running Tests...' : 'Run Database Tests'}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900">Test Failed:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {testResults && (
              <div className="space-y-4">
                {testResults.success ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900">✅ All Tests Passed!</h3>
                    <div className="text-green-700 space-y-2">
                      <p><strong>Message:</strong> {testResults.message}</p>
                      <p><strong>Current Records:</strong> {testResults.current_records}</p>
                      <p><strong>Table Structure:</strong> {testResults.table_structure}</p>
                      <p><strong>Insert Capability:</strong> {testResults.insert_capability}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-900">❌ Tests Failed</h3>
                    <div className="text-red-700 space-y-2">
                      <p><strong>Error:</strong> {testResults.error}</p>
                      {testResults.details && (
                        <p><strong>Details:</strong> {testResults.details}</p>
                      )}
                      {testResults.code && (
                        <p><strong>Code:</strong> {testResults.code}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">What This Test Checks:</h3>
              <ul className="text-blue-700 text-sm space-y-1 mt-2">
                <li>• Supabase connection and credentials</li>
                <li>• Database table existence and structure</li>
                <li>• Insert and delete permissions</li>
                <li>• Current record count</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
