// Example: src/components/curriculum/LearningAreaList.tsx
import React from 'react'
import { LEARNING_AREAS } from '@/src/data/curriculum/learningAreas'

type Props = { version?: '1.0' | '2.0' }

export default function LearningAreaList({ version = '2.0' }: Props) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {LEARNING_AREAS.map((la) => (
        <div key={la.slug} className='rounded-2xl p-4 border shadow-sm'>
          <h3 className='text-xl font-semibold'>{la.name}</h3>
          <p className='mt-1 text-sm text-gray-600'>{la.overview}</p>
          <div className='mt-2 text-xs text-gray-500'>
            Showing Version {version}
          </div>
          <ul className='mt-3 list-disc pl-5'>
            {la.subjects.map((s) => (
              <li key={s.slug}>
                <a
                  className='underline'
                  href={`/curriculum/${s.slug}?version=${version}`}
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
