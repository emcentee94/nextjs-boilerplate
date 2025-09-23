'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function TestImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setTestResults(null)
    }
  }

  const runTestImport = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsTesting(true)
    setError(null)
    setTestResults(null)

    try {
      const formData = new FormData()
      formData.append('curriculumFile', file)

      const response = await fetch('/api/curriculum/test-import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Test import failed')
      }

      setTestResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test import failed')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Import (Small Sample)</CardTitle>
            <CardDescription>
              Test the import process with a small sample of your Excel file to identify issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Select Excel File
              </label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {file && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">Selected File:</h3>
                <p className="text-blue-700">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            <Button 
              onClick={runTestImport} 
              disabled={!file || isTesting}
              className="w-full"
            >
              {isTesting ? 'Testing Import...' : 'Test Import (First 5 Rows)'}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900">Test Failed:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {testResults && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900">✅ Test Import Successful!</h3>
                  <div className="text-green-700 space-y-2">
                    <p><strong>Message:</strong> {testResults.message}</p>
                    <p><strong>Test Records:</strong> {testResults.test_records}</p>
                    <p><strong>Insert Result:</strong> {testResults.insert_result} records</p>
                  </div>
                </div>

                {testResults.sample_outcome && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Sample Outcome:</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Learning Area:</strong> {testResults.sample_outcome.learning_area}</p>
                      <p><strong>Subject:</strong> {testResults.sample_outcome.subject}</p>
                      <p><strong>Level:</strong> {testResults.sample_outcome.level}</p>
                      <p><strong>Content Description:</strong> {testResults.sample_outcome.content_description?.substring(0, 100)}...</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">What This Test Does:</h3>
              <ul className="text-yellow-700 text-sm space-y-1 mt-2">
                <li>• Processes only the first 5 rows of your Excel file</li>
                <li>• Tests the Excel parsing logic</li>
                <li>• Tests the database insert process</li>
                <li>• Cleans up test data automatically</li>
                <li>• Shows you exactly what data is being processed</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
