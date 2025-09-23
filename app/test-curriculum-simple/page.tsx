"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TestCurriculumSimplePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const testDirectFetch = async () => {
    setLoading(true)
    setError("")
    setResult("")
    
    try {
      console.log("🔄 Testing direct fetch...")
      
      const url = 'https://kpdusbhqiswdiyzdwxpw.supabase.co/storage/v1/object/public/V9%20CURRISULUM1/curriculum/learning_areas.json'
      console.log("URL:", url)
      
      const response = await fetch(url)
      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Data received:", data)
      console.log("Data type:", typeof data)
      console.log("Is array:", Array.isArray(data))
      console.log("Data length:", Array.isArray(data) ? data.length : "N/A")
      
      if (Array.isArray(data) && data.length > 0) {
        console.log("First item:", data[0])
        
        // Show first few items with content
        const itemsWithContent = data.filter((item: any) => 
          item["Content Description"] || item["Achievement Standard"] || item["Description"]
        )
        
        setResult(`✅ Success! Loaded ${data.length} total items. Found ${itemsWithContent.length} items with content. First item with content: ${JSON.stringify(itemsWithContent[0] || data[0], null, 2)}`)
      } else {
        setResult(`⚠️ Data is not an array or is empty. Data: ${JSON.stringify(data, null, 2)}`)
      }
      
    } catch (err) {
      console.error("❌ Error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const testService = async () => {
    setLoading(true)
    setError("")
    setResult("")
    
    try {
      console.log("🔄 Testing curriculum service...")
      
      // Dynamic import to avoid SSR issues
      const { CurriculumService } = await import("@/lib/curriculum-service")
      
      const data = await CurriculumService.fetchAllCurriculumData()
      console.log("Service data:", data)
      
      setResult(`✅ Service Success! Learning Areas: ${data.learning_areas.length}, Achievement Standards: ${data.achievement_standards.length}`)
      
    } catch (err) {
      console.error("❌ Service Error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Simple Curriculum Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={testDirectFetch} disabled={loading}>
                {loading ? "Loading..." : "Test Direct Fetch"}
              </Button>
              <Button onClick={testService} variant="outline" disabled={loading}>
                {loading ? "Loading..." : "Test Service"}
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">Error:</p>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">Result:</p>
                <pre className="text-green-700 text-sm mt-2 whitespace-pre-wrap">{result}</pre>
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium">Instructions:</p>
              <ol className="text-blue-700 text-sm mt-2 list-decimal list-inside space-y-1">
                <li>Click "Test Direct Fetch" to test the raw URL</li>
                <li>Click "Test Service" to test the curriculum service</li>
                <li>Check the browser console for detailed logs</li>
                <li>Look for any error messages above</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
