"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Upload, 
  Database, 
  Search, 
  BarChart3, 
  Settings, 
  TestTube,
  FileText,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-foreground">
              Taughtful Admin
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Admin Dashboard</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage curriculum data, import files, and monitor system health
            </p>
          </div>

          {/* Admin Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Curriculum Import */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Curriculum Import
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Import curriculum data from Excel or CSV files
                </p>
                <div className="space-y-2">
                  <Link href="/admin/import">
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                  </Link>
                  <Link href="/admin/step-by-step">
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Step-by-Step Import
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View and manage curriculum data
                </p>
                <div className="space-y-2">
                  <Link href="/admin/analyze">
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyze Data
                    </Button>
                  </Link>
                  <Link href="/admin/search">
                    <Button className="w-full" variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Search Data
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor system status and performance
                </p>
                <div className="space-y-2">
                  <Link href="/admin/diagnose">
                    <Button className="w-full" variant="outline">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Diagnose Issues
                    </Button>
                  </Link>
                  <Link href="/admin/validate-schema">
                    <Button className="w-full" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Validate Schema
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Testing Tools */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-purple-600" />
                  Testing Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Test and debug system functionality
                </p>
                <div className="space-y-2">
                  <Link href="/admin/test">
                    <Button className="w-full" variant="outline">
                      <TestTube className="w-4 h-4 mr-2" />
                      Run Tests
                    </Button>
                  </Link>
                  <Link href="/admin/debug">
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Debug Mode
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Import Testing */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-orange-600" />
                  Import Testing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Test import functionality with sample data
                </p>
                <div className="space-y-2">
                  <Link href="/admin/test-import">
                    <Button className="w-full" variant="outline">
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Import
                    </Button>
                  </Link>
                  <Link href="/admin/test-minimal-insert">
                    <Button className="w-full" variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Minimal Insert Test
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Tools */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Advanced Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced debugging and analysis tools
                </p>
                <div className="space-y-2">
                  <Link href="/admin/debug-import">
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Debug Import
                    </Button>
                  </Link>
                  <Link href="/admin/test-small-batch">
                    <Button className="w-full" variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Small Batch Test
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                    <p className="text-2xl font-bold">-</p>
                  </div>
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Import</p>
                    <p className="text-2xl font-bold">-</p>
                  </div>
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">System Status</p>
                    <p className="text-2xl font-bold text-green-600">OK</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
