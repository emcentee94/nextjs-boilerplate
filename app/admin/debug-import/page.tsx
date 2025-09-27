'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function DebugImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDebugging, setIsDebugging] = useState(false)
  const [debugResults, setDebugResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setDebugResults(null)
    }
  }

  const runDebugImport = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsDebugging(true)
    setError(null)
    setDebugResults(null)

    try {
      const formData = new FormData()
      formData.append('curriculumFile', file)

      const response = await fetch('/api/curriculum/debug-import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Debug import failed')
      }

      setDebugResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Debug import failed')
    } finally {
      setIsDebugging(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-2xl mx-auto px-4'>
        <Card>
          <CardHeader>
            <CardTitle>Debug Import Process</CardTitle>
            <CardDescription>
              Debug the import process with detailed logging to identify exactly
              where it's failing.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <label
                htmlFor='file'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Select Excel File
              </label>
              <Input
                id='file'
                type='file'
                accept='.xlsx,.xls'
                onChange={handleFileChange}
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
            </div>

            {file && (
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h3 className='font-medium text-blue-900'>Selected File:</h3>
                <p className='text-blue-700'>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            <Button
              onClick={runDebugImport}
              disabled={!file || isDebugging}
              className='w-full'
            >
              {isDebugging ? 'Debugging Import...' : 'Debug Import (5 Rows)'}
            </Button>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <h3 className='font-medium text-red-900'>Debug Failed:</h3>
                <p className='text-red-700'>{error}</p>
              </div>
            )}

            {debugResults && (
              <div className='space-y-4'>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <h3 className='font-medium text-green-900'>
                    ✅ Debug Import Successful!
                  </h3>
                  <div className='text-green-700 space-y-2'>
                    <p>
                      <strong>Message:</strong> {debugResults.message}
                    </p>
                    <p>
                      <strong>Debug Records:</strong>{' '}
                      {debugResults.debug_records}
                    </p>
                    <p>
                      <strong>Insert Result:</strong>{' '}
                      {debugResults.insert_result} records
                    </p>
                  </div>
                </div>

                {debugResults.sample_outcome && (
                  <div className='bg-gray-50 p-4 rounded-lg'>
                    <h3 className='font-medium text-gray-900 mb-2'>
                      Sample Outcome:
                    </h3>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p>
                        <strong>Learning Area:</strong>{' '}
                        {debugResults.sample_outcome.learning_area}
                      </p>
                      <p>
                        <strong>Subject:</strong>{' '}
                        {debugResults.sample_outcome.subject}
                      </p>
                      <p>
                        <strong>Level:</strong>{' '}
                        {debugResults.sample_outcome.level}
                      </p>
                      <p>
                        <strong>Content Description:</strong>{' '}
                        {debugResults.sample_outcome.content_description?.substring(
                          0,
                          100
                        )}
                        ...
                      </p>
                      <p>
                        <strong>Topics:</strong>{' '}
                        {debugResults.sample_outcome.topics?.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
              <h3 className='font-medium text-yellow-900'>
                What This Debug Does:
              </h3>
              <ul className='text-yellow-700 text-sm space-y-1 mt-2'>
                <li>• Processes only the first 5 rows of your Excel file</li>
                <li>• Shows detailed logging of each step</li>
                <li>• Tests the Excel parsing logic</li>
                <li>• Tests the database insert process</li>
                <li>• Cleans up test data automatically</li>
                <li>• Shows you exactly what data is being processed</li>
                <li>• Helps identify the exact point of failure</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
