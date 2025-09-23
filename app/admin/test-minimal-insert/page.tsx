'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestMinimalInsertPage() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runMinimalInsertTest = async () => {
    setIsTesting(true)
    setError(null)
    setTestResults(null)

    try {
      const response = await fetch('/api/curriculum/test-minimal-insert', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Minimal insert test failed')
      }

      setTestResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Minimal insert test failed')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Minimal Insert Test</CardTitle>
            <CardDescription>
              Test basic insert operations to identify any database or schema issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={runMinimalInsertTest} 
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? 'Testing Minimal Inserts...' : 'Run Minimal Insert Test'}
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
                    <h3 className="font-medium text-green-900">✅ All Minimal Insert Tests Passed!</h3>
                    <div className="text-green-700 space-y-2">
                      <p><strong>Message:</strong> {testResults.message}</p>
                      <div className="space-y-1">
                        <p><strong>Tests:</strong></p>
                        <ul className="list-disc list-inside ml-4">
                          <li>Minimal Insert: {testResults.tests.minimalInsert}</li>
                          <li>More Fields Insert: {testResults.tests.moreFieldsInsert}</li>
                          <li>Multiple Records Insert: {testResults.tests.multipleRecordsInsert}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-900">❌ Minimal Insert Tests Failed</h3>
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
              <h3 className="font-medium text-blue-900">What This Test Does:</h3>
              <ul className="text-blue-700 text-sm space-y-1 mt-2">
                <li>• Tests inserting a single record with minimal fields</li>
                <li>• Tests inserting a record with more fields</li>
                <li>• Tests inserting multiple records at once</li>
                <li>• Cleans up test data automatically</li>
                <li>• Helps identify database connection or schema issues</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
