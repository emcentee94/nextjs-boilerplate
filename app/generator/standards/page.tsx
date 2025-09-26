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

  useEffect(() => {
    setAuthority(authorityParam)
    setVersion(versionParam)
    setSubject(subjectParam)
    setYear(yearParam)
    setMinutes(minutesParam)
    setLevel(levelParam)
  }, [authorityParam, versionParam, subjectParam, yearParam, minutesParam, levelParam])

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
        Standards linked to {subject} ({authority} {version})
      </div>
    </div>
  )
}


