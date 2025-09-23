'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DiagnosePage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/curriculum/stats')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch stats')
      }
      
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Curriculum Data Diagnostics</CardTitle>
            <CardDescription>
              Check the status of your curriculum data import and identify any issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={fetchStats} disabled={loading} className="w-full">
              {loading ? 'Loading...' : 'Refresh Statistics'}
            </Button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900">Error:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {stats && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">Total Records</h3>
                    <p className="text-2xl font-bold text-blue-700">{stats.total_records}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900">Learning Areas</h3>
                    <p className="text-2xl font-bold text-green-700">{stats.learning_areas}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-900">Year Levels</h3>
                    <p className="text-2xl font-bold text-purple-700">{stats.year_levels}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Learning Areas Breakdown:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {stats.learning_area_breakdown?.map((item: any) => (
                      <div key={item.learning_area} className="text-sm">
                        <span className="font-medium">{item.learning_area}:</span> {item.count}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Year Levels Breakdown:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {stats.year_level_breakdown?.map((item: any) => (
                      <div key={item.level} className="text-sm">
                        <span className="font-medium">{item.level}:</span> {item.count}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-900">Import Analysis:</h3>
                  <div className="text-yellow-700 space-y-1">
                    <p><strong>Expected:</strong> ~21,000 records</p>
                    <p><strong>Actual:</strong> {stats.total_records} records</p>
                    <p><strong>Missing:</strong> {21000 - stats.total_records} records</p>
                    <p><strong>Completion:</strong> {((stats.total_records / 21000) * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {stats.total_records < 10000 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-900">⚠️ Import Issue Detected</h3>
                    <div className="text-red-700 space-y-2">
                      <p>Your import appears to be incomplete. Possible causes:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Excel file structure doesn't match expected format</li>
                        <li>Data validation filtering out records</li>
                        <li>Multiple sheets not being processed</li>
                        <li>Column headers don't match expected names</li>
                      </ul>
                      <p className="mt-2"><strong>Recommendation:</strong> Check your Excel file structure and try re-importing.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
