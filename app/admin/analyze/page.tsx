'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setAnalysis(null)
    }
  }

  const runAnalysis = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('curriculumFile', file)

      const response = await fetch('/api/curriculum/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Excel File Analysis</CardTitle>
            <CardDescription>
              Analyze your Excel file structure to understand why the full import might be failing.
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
              onClick={runAnalysis} 
              disabled={!file || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze File Structure'}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900">Analysis Failed:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900">File Analysis Complete</h3>
                  <div className="text-green-700 space-y-2">
                    <p><strong>File:</strong> {analysis.fileName}</p>
                    <p><strong>Size:</strong> {(analysis.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                    <p><strong>Type:</strong> {analysis.fileType}</p>
                    <p><strong>Sheets:</strong> {analysis.sheetCount}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Sheet Analysis:</h3>
                  {analysis.sheets.map((sheet: any, index: number) => (
                    <Card key={index} className="bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Sheet: {sheet.name}
                        </CardTitle>
                        <CardDescription>
                          {sheet.nonEmptyRows} non-empty rows out of {sheet.rowCount} total rows
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Headers:</h4>
                          <div className="bg-white p-3 rounded-md border">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                              {sheet.headers.map((header: string, hIndex: number) => (
                                <div key={hIndex} className="bg-gray-100 p-2 rounded">
                                  {header}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Sample Data (First 3 Rows):</h4>
                          {sheet.sampleData.length > 0 ? (
                            <div className="bg-white p-3 rounded-md border max-h-60 overflow-y-auto">
                              {sheet.sampleData.map((row: string[], rIndex: number) => (
                                <div key={rIndex} className="border-b pb-2 mb-2 last:border-b-0">
                                  <div className="text-sm font-medium text-gray-600 mb-1">
                                    Row {rIndex + 1}:
                                  </div>
                                  <div className="text-sm space-y-1">
                                    {row.map((cell: string, cIndex: number) => (
                                      <div key={cIndex} className="flex">
                                        <span className="font-medium text-gray-500 w-32">
                                          {sheet.headers[cIndex] || `Col ${cIndex + 1}`}:
                                        </span>
                                        <span className="text-gray-800">
                                          {cell || '(empty)'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">No sample data available</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-900">Analysis Summary:</h3>
                  <div className="text-yellow-700 text-sm space-y-1 mt-2">
                    <p>• Total sheets: {analysis.sheetCount}</p>
                    <p>• Total non-empty rows: {analysis.sheets.reduce((sum: number, sheet: any) => sum + sheet.nonEmptyRows, 0)}</p>
                    <p>• Expected import: ~21,000 records</p>
                    <p>• Potential issue: Check if all sheets are being processed</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">What This Analysis Shows:</h3>
              <ul className="text-blue-700 text-sm space-y-1 mt-2">
                <li>• All sheet names and row counts</li>
                <li>• Column headers for each sheet</li>
                <li>• Sample data from each sheet</li>
                <li>• Total non-empty rows across all sheets</li>
                <li>• Helps identify why import might be incomplete</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
