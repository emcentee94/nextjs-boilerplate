"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter, Target, BookOpen } from "lucide-react"
import Link from "next/link"
import { CurriculumService, type CurriculumItem } from "@/lib/curriculum-service"

const YEAR_LEVELS = [
  "Foundation",
  "Year 1","Year 2","Year 3","Year 4","Year 5",
  "Year 6","Year 7","Year 8","Year 9","Year 10"
]

function humanize(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

export default function SubjectDetailPage() {
  const params = useParams<{ subject: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const subjectSlug = params?.subject || "english"
  const subjectName = useMemo(() => humanize(subjectSlug), [subjectSlug])
  const [version, setVersion] = useState<'1.0' | '2.0'>(((searchParams?.get('version') as '1.0' | '2.0') || '1.0'))
  const [level, setLevel] = useState<string>(YEAR_LEVELS[4])
  const [contentItems, setContentItems] = useState<CurriculumItem[]>([])
  const [standards, setStandards] = useState<CurriculumItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    // keep version in URL for shareability
    const sp = new URLSearchParams(Array.from(searchParams?.entries?.() || []))
    sp.set('version', version)
    router.replace(`?${sp.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version])

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError("")
      try {
        const items = await CurriculumService.getCurriculumItemsForSubjectAndLevel(subjectName, level)
        const stds = await CurriculumService.getAchievementStandards(subjectName, level)
        setContentItems(items)
        setStandards(stds)
      } catch (e: any) {
        setError(e?.message || 'Failed to load curriculum content')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [subjectName, level])

  // Group content by strand
  const grouped = useMemo(() => {
    const groups: Record<string, CurriculumItem[]> = {}
    for (const item of contentItems) {
      const strand = (item["Strand"] || (item as any).strand || "General").toString()
      if (!groups[strand]) groups[strand] = []
      groups[strand].push(item)
    }
    return groups
  }, [contentItems])

  const relatedStandards = (strand?: string) => {
    const s = (strand || "").toString()
    return standards.filter(st => {
      const stStrand = (st["Strand"] || (st as any).strand || "").toString()
      if (stStrand && s) return stStrand === s
      return true
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE5DA] via-white to-[#FFF2E8]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/curriculum">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Curriculum
            </Link>
          </Button>
          <Badge variant="outline">Version {version}</Badge>
        </div>

        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#FD6585] to-[#FF9A2E] flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 font-fredoka">{subjectName}</h1>
          <p className="text-gray-600 font-nunito mt-2">Content descriptions with linked achievement standards</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" /> Level
            <select className="border rounded-md px-2 py-1 bg-white" value={level} onChange={(e)=> setLevel(e.target.value)}>
              {YEAR_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Version</span>
            <select className="border rounded-md px-2 py-1 bg-white" value={version} onChange={(e)=> setVersion(e.target.value as any)}>
              <option value="1.0">1.0</option>
              <option value="2.0">2.0</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">{error}</div>
        )}

        {isLoading ? (
          <div className="text-center text-sm text-gray-600">Loading…</div>
        ) : (
          <div className="space-y-8 max-w-5xl mx-auto">
            {Object.entries(grouped).map(([strand, items]) => (
              <Card key={strand} className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{strand}</CardTitle>
                      <CardDescription>Content descriptions</CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1"><Target className="w-3 h-3" /> {items.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((it) => (
                      <div key={(it["Code"] || (it as any).code || it.id) as string} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold">{(it["Code"] || (it as any).code) as string}</div>
                          <div className="text-xs text-gray-500">{level}</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-800">
                          {(it["Content Description"] || (it as any).content_description || it["Description"] || (it as any).description) as string}
                        </div>
                        {/* Linked standards (same strand first) */}
                        {standards.length > 0 && (
                          <div className="mt-3 bg-gray-50 border rounded-md p-3">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Related Achievement Standards</div>
                            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                              {relatedStandards(it["Strand"] as any).slice(0,3).map((st, idx) => (
                                <li key={(st["Code"] || (st as any).code || `${idx}`) as string}>
                                  {(st["Description"] || (st as any).description || st["Achievement Standard"] || (st as any).achievement_standard) as string}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


