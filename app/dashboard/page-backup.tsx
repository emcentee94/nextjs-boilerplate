import { useState } from 'react'

export default function TeacherDashboard() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen bg-background'>
      <div>Dashboard Content</div>
    </div>
  )
}
