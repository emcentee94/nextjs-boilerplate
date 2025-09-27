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

export default function StepByStepPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setResults(null)
    }
  }

  const runStepByStep = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResults(null)

    try {
      const formData = new FormData()
      formData.append('curriculumFile', file)

      const response = await fetch('/api/curriculum/step-by-step', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Step-by-step analysis failed')
      }

      setResults(data.results)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Step-by-step analysis failed'
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Import Analysis</CardTitle>
            <CardDescription>
              Analyze each step of the import process to identify exactly where
              it's failing.
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
              onClick={runStepByStep}
              disabled={!file || isAnalyzing}
              className='w-full'
            >
              {isAnalyzing
                ? 'Analyzing Step-by-Step...'
                : 'Run Step-by-Step Analysis'}
            </Button>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <h3 className='font-medium text-red-900'>Analysis Failed:</h3>
                <p className='text-red-700'>{error}</p>
              </div>
            )}

            {results && (
              <div className='space-y-6'>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <h3 className='font-medium text-green-900'>
                    Analysis Complete
                  </h3>
                  <div className='text-green-700 space-y-2'>
                    <p>
                      <strong>File:</strong> {results.fileName}
                    </p>
                    <p>
                      <strong>Size:</strong>{' '}
                      {(results.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p>
                      <strong>Sheets:</strong> {results.sheetCount}
                    </p>
                    <p>
                      <strong>Total Outcomes:</strong> {results.totalOutcomes}
                    </p>
                    <p>
                      <strong>Database Status:</strong> {results.databaseStatus}
                    </p>
                    {results.currentRecords && (
                      <p>
                        <strong>Current Records:</strong>{' '}
                        {results.currentRecords}
                      </p>
                    )}
                  </div>
                </div>

                {results.errors && results.errors.length > 0 && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <h3 className='font-medium text-red-900'>Errors Found:</h3>
                    <ul className='text-red-700 text-sm space-y-1 mt-2'>
                      {results.errors.map((error: string, index: number) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className='space-y-4'>
                  <h3 className='text-xl font-semibold'>Sheet Analysis:</h3>
                  {results.sheets.map((sheet: any, index: number) => (
                    <Card
                      key={index}
                      className={sheet.error ? 'bg-red-50' : 'bg-gray-50'}
                    >
                      <CardHeader>
                        <CardTitle className='text-lg'>
                          Sheet: {sheet.name}
                        </CardTitle>
                        <CardDescription>
                          {sheet.error ? (
                            <span className='text-red-600'>
                              Error: {sheet.error}
                            </span>
                          ) : (
                            `${sheet.outcomes} outcomes from ${sheet.rowCount} rows`
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className='space-y-4'>
                        {sheet.headers && (
                          <div>
                            <h4 className='font-semibold mb-2'>Headers:</h4>
                            <div className='bg-white p-3 rounded-md border'>
                              <div className='grid grid-cols-2 md:grid-cols-3 gap-2 text-sm'>
                                {sheet.headers.map(
                                  (header: string, hIndex: number) => (
                                    <div
                                      key={hIndex}
                                      className='bg-gray-100 p-2 rounded'
                                    >
                                      {header}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {sheet.errors && sheet.errors.length > 0 && (
                          <div>
                            <h4 className='font-semibold mb-2 text-red-700'>
                              Row Errors:
                            </h4>
                            <div className='bg-white p-3 rounded-md border border-red-200'>
                              <ul className='text-red-600 text-sm space-y-1'>
                                {sheet.errors.map(
                                  (error: string, eIndex: number) => (
                                    <li key={eIndex}>• {error}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <h3 className='font-medium text-yellow-900'>
                    Analysis Summary:
                  </h3>
                  <div className='text-yellow-700 text-sm space-y-1 mt-2'>
                    <p>• Total sheets processed: {results.sheetCount}</p>
                    <p>• Total outcomes found: {results.totalOutcomes}</p>
                    <p>• Database connection: {results.databaseStatus}</p>
                    <p>• Errors found: {results.errors?.length || 0}</p>
                    <p>• Expected import: ~21,000 records</p>
                  </div>
                </div>
              </div>
            )}

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <h3 className='font-medium text-blue-900'>
                What This Analysis Shows:
              </h3>
              <ul className='text-blue-700 text-sm space-y-1 mt-2'>
                <li>• Step-by-step processing of each sheet</li>
                <li>• Detailed error reporting for each step</li>
                <li>• Database connection status</li>
                <li>• Row-by-row processing results</li>
                <li>• Helps identify exactly where the import fails</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
