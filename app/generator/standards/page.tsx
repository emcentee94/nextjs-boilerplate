"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function StandardsGenerator() {
  const searchParams = useSearchParams()

  const authorityParam = searchParams.get("authority") || "ACARA"
  const versionParam = searchParams.get("version") || (authorityParam === "ACARA" ? "v9" : "V1.0")
  const subjectParam = searchParams.get("subject") || "English"
  const yearParam = searchParams.get("year") || "5"
  const minutesParam = parseInt(searchParams.get("minutes") || "45", 10)
  const levelParam = searchParams.get("level") || "Standard"

  const [authority, setAuthority] = useState(authorityParam)
  const [version, setVersion] = useState(versionParam)
  const [subject, setSubject] = useState(subjectParam)
  const [year, setYear] = useState(yearParam)
  const [minutes, setMinutes] = useState(minutesParam)
  const [level, setLevel] = useState(levelParam)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [outcomes, setOutcomes] = useState<any[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setAuthority(authorityParam)
    setVersion(versionParam)
    setSubject(subjectParam)
    setYear(yearParam)
    setMinutes(minutesParam)
    setLevel(levelParam)
  }, [authorityParam, versionParam, subjectParam, yearParam, minutesParam, levelParam])

  useEffect(() => {
    const controller = new AbortController()
    async function fetchOutcomes() {
      try {
        setLoading(true)
        setError(null)
        setOutcomes([])
        setSelected({})
        // Map subject to learning area param expected by API
        const learningAreaId = subject
        const url = `/api/curriculum/search?learningAreaId=${encodeURIComponent(learningAreaId)}&yearLevel=${encodeURIComponent(year)}&limit=200`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed (${res.status})`)
        const data = await res.json()
        setOutcomes(Array.isArray(data.outcomes) ? data.outcomes : [])
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message || 'Failed to load standards')
      } finally {
        setLoading(false)
      }
    }
    fetchOutcomes()
    return () => controller.abort()
  }, [subject, year])

  function toggle(id: string) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Curriculum Standards</h1>

      <div className="space-y-3">
        <div>
          <span className="font-semibold">Curriculum:</span> {authority} {version}
        </div>
        <div>
          <span className="font-semibold">Subject:</span> {subject}
        </div>
        <div>
          <span className="font-semibold">Year:</span> {year}
        </div>
        {authority === "VCAA" && (
          <div>
            <span className="font-semibold">Level:</span> {level}
          </div>
        )}
        <div>
          <span className="font-semibold">Duration:</span> {minutes} minutes
        </div>
      </div>

      <div className="mt-8 p-4 border rounded-lg bg-[#F7FBF3]">
        <div className="mb-3 font-semibold">Standards linked to {subject} ({authority} {version})</div>
        {loading && <div className="text-sm">Loading…</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        {!loading && !error && (
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {outcomes.length === 0 && <div className="text-sm text-[#666]">No standards found.</div>}
            {outcomes.map((o) => (
              <label key={o.id || o.Code} className="block p-3 rounded border bg-white hover:bg-[#fff8] cursor-pointer">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(selected[o.id || o.Code])}
                    onChange={() => toggle(o.id || o.Code)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {(o.Code || o.code) ? `${o.Code || o.code}: ` : ''}{o["Content Description"] || o.content_description || o["Achievement Standard"] || o.achievement_standard || 'Standard'}
                    </div>
                    {o["Elaboration"] || o.elaboration ? (
                      <div className="text-xs text-[#555]">
                        {o["Elaboration"] || o.elaboration}
                      </div>
                    ) : null}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
        <div className="mt-3 text-xs text-[#666]">
          Selected: {Object.values(selected).filter(Boolean).length}
        </div>
      </div>
    </div>
  )
}


