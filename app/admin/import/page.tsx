'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CurriculumImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsUploading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('curriculumFile', file)

      const response = await fetch('/api/curriculum/import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Curriculum Data Import</CardTitle>
            <CardDescription>
              Upload your curriculum workbook (Excel or CSV) to import curriculum data into the database.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Supported formats: Excel (.xlsx, .xls) and CSV files
              </p>
            </div>

            {file && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">Selected File:</h3>
                <p className="text-blue-700">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Type: {file.type || 'Unknown'}
                </p>
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={!file || isUploading}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : 'Upload and Import'}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900">Error:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900">Success!</h3>
                <div className="text-green-700 space-y-2">
                  <p><strong>Message:</strong> {result.message}</p>
                  <p><strong>Imported Count:</strong> {result.imported_count}</p>
                  <p><strong>File Type:</strong> {result.file_type}</p>
                  <p><strong>File Name:</strong> {result.file_name}</p>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-900">Expected File Format:</h3>
              <div className="text-yellow-700 text-sm space-y-1">
                <p><strong>Required columns:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>learning_area (e.g., "English", "Mathematics")</li>
                  <li>subject (e.g., "English", "Mathematics")</li>
                  <li>level (e.g., "Foundation", "Year 1", "Year 2")</li>
                  <li>content_description (the main curriculum outcome)</li>
                </ul>
                <p><strong>Optional columns:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>strand, sub_strand, elaboration, achievement_standard</li>
                  <li>content_descriptor_code, cross_curriculum_priority</li>
                  <li>general_capability, topics (semicolon-separated)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
