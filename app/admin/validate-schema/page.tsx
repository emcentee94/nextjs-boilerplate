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

export default function ValidateSchemaPage() {
  const [isValidating, setIsValidating] = useState(false)
  const [validationResults, setValidationResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runValidation = async () => {
    setIsValidating(true)
    setError(null)
    setValidationResults(null)

    try {
      const response = await fetch('/api/curriculum/validate-schema')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Schema validation failed')
      }

      setValidationResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Schema validation failed')
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-2xl mx-auto px-4'>
        <Card>
          <CardHeader>
            <CardTitle>Database Schema Validation</CardTitle>
            <CardDescription>
              Validate the database schema and test insert operations to
              identify any issues.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Button
              onClick={runValidation}
              disabled={isValidating}
              className='w-full'
            >
              {isValidating ? 'Validating Schema...' : 'Run Schema Validation'}
            </Button>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <h3 className='font-medium text-red-900'>Validation Failed:</h3>
                <p className='text-red-700'>{error}</p>
              </div>
            )}

            {validationResults && (
              <div className='space-y-4'>
                {validationResults.success ? (
                  <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                    <h3 className='font-medium text-green-900'>
                      ✅ Schema Validation Successful!
                    </h3>
                    <div className='text-green-700 space-y-2'>
                      <p>
                        <strong>Message:</strong> {validationResults.message}
                      </p>
                      <div className='space-y-1'>
                        <p>
                          <strong>Tests:</strong>
                        </p>
                        <ul className='list-disc list-inside ml-4'>
                          <li>
                            Table Exists: {validationResults.tests.tableExists}
                          </li>
                          <li>
                            Table Structure:{' '}
                            {validationResults.tests.tableStructure}
                          </li>
                          <li>
                            Minimal Insert:{' '}
                            {validationResults.tests.minimalInsert}
                          </li>
                          <li>
                            Complex Insert:{' '}
                            {validationResults.tests.complexInsert}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <h3 className='font-medium text-red-900'>
                      ❌ Schema Validation Failed
                    </h3>
                    <div className='text-red-700 space-y-2'>
                      <p>
                        <strong>Error:</strong> {validationResults.error}
                      </p>
                      {validationResults.details && (
                        <p>
                          <strong>Details:</strong> {validationResults.details}
                        </p>
                      )}
                      {validationResults.code && (
                        <p>
                          <strong>Code:</strong> {validationResults.code}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <h3 className='font-medium text-blue-900'>
                What This Validation Checks:
              </h3>
              <ul className='text-blue-700 text-sm space-y-1 mt-2'>
                <li>• Table existence and accessibility</li>
                <li>• Table structure and column types</li>
                <li>• Insert permissions and constraints</li>
                <li>• Data type validation</li>
                <li>• Required field validation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
