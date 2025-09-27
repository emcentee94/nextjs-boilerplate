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

export default function DebugPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setDebugInfo(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setDebugInfo(null)

    try {
      const formData = new FormData()
      formData.append('curriculumFile', file)

      const response = await fetch('/api/curriculum/debug', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setDebugInfo(data.debug_info)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <Card>
          <CardHeader>
            <CardTitle>Excel File Structure Debug</CardTitle>
            <CardDescription>
              Analyze your Excel file structure to understand why the import
              might be failing.
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
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              className='w-full'
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze File Structure'}
            </Button>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <h3 className='font-medium text-red-900'>Error:</h3>
                <p className='text-red-700'>{error}</p>
              </div>
            )}

            {debugInfo && (
              <div className='space-y-4'>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <h3 className='font-medium text-green-900'>
                    File Analysis Complete
                  </h3>
                  <div className='text-green-700 space-y-2'>
                    <p>
                      <strong>File:</strong> {debugInfo.file_name}
                    </p>
                    <p>
                      <strong>Size:</strong>{' '}
                      {(debugInfo.file_size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Type:</strong> {debugInfo.file_type}
                    </p>
                    <p>
                      <strong>Sheets:</strong> {debugInfo.sheet_names.length}
                    </p>
                  </div>
                </div>

                <div className='bg-gray-50 p-4 rounded-lg'>
                  <h3 className='font-medium text-gray-900 mb-2'>
                    Sheet Names:
                  </h3>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    {debugInfo.sheet_names.map(
                      (sheet: string, index: number) => (
                        <div
                          key={index}
                          className='text-sm bg-white p-2 rounded border'
                        >
                          {sheet}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {debugInfo.sheet_details.map((sheet: any, index: number) => (
                  <div key={index} className='bg-white border rounded-lg p-4'>
                    <h3 className='font-medium text-gray-900 mb-2'>
                      Sheet: {sheet.sheet_name} ({sheet.row_count} rows)
                    </h3>

                    <div className='space-y-3'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-700'>
                          Headers:
                        </h4>
                        <div className='text-sm text-gray-600 bg-gray-50 p-2 rounded'>
                          {sheet.headers.join(' | ')}
                        </div>
                      </div>

                      {sheet.sample_rows.length > 0 && (
                        <div>
                          <h4 className='text-sm font-medium text-gray-700'>
                            Sample Data:
                          </h4>
                          {sheet.sample_rows.map(
                            (row: any[], rowIndex: number) => (
                              <div
                                key={rowIndex}
                                className='text-sm text-gray-600 bg-gray-50 p-2 rounded mb-1'
                              >
                                Row {rowIndex + 1}: {row.join(' | ')}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
