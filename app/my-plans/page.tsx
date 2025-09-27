'use client'

import { useEffect, useState } from 'react'

type Plan = {
  id: string
  title: string
  status: string
  created_at: string
  updated_at?: string
  subject?: string
  year_level?: string
  duration_minutes?: number
}

export default function MyPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/lesson-plan/list')
        if (res.status === 401) {
          setError('Please sign in to view your plans.')
          setPlans([])
          return
        }
        if (!res.ok) throw new Error('Failed to load plans')
        const data = await res.json()
        if (active) setPlans(data.plans || [])
      } catch (e: any) {
        if (active) setError(e?.message || 'Failed to load plans')
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const freeLimit = 3
  const overFree = plans.length > freeLimit

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>My Plans</h1>
      {loading && <div>Loading…</div>}
      {error && <div className='text-red-600'>{error}</div>}

      {!loading && !error && (
        <div className='space-y-3'>
          {plans.length === 0 && (
            <div className='text-[#666]'>No plans yet.</div>
          )}
          {plans.map((p) => (
            <div
              key={p.id}
              className='p-4 border rounded-lg bg-white flex items-center justify-between'
            >
              <div>
                <div className='font-semibold'>{p.title}</div>
                <div className='text-xs text-[#666]'>
                  {p.subject} • Year {p.year_level} • {p.duration_minutes} mins
                </div>
                <div className='text-xs text-[#666]'>
                  {new Date(p.created_at).toLocaleString()} • {p.status}
                </div>
              </div>
              <div className='flex gap-2'>
                {p.status !== 'archived' && (
                  <button
                    onClick={async () => {
                      await fetch('/api/lesson-plan/archive', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: p.id }),
                      })
                      location.reload()
                    }}
                    className='px-3 py-1 text-sm rounded border'
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && overFree && (
        <div className='mt-6 p-4 rounded-lg border bg-[#FFF7ED]'>
          <div className='font-semibold'>
            You’ve reached the free plan limit.
          </div>
          <div className='text-sm'>
            Upgrade to save unlimited plans and access archive/history.
          </div>
        </div>
      )}
    </div>
  )
}
