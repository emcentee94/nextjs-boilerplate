// lib/hooks.ts
'use client'

import { useState, useEffect } from 'react'

export function useIsDemo() {
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    // This code runs only on the client
    try {
      const userItem = localStorage.getItem('taughtful_user')
      if (userItem) {
        const user = JSON.parse(userItem)
        if (user && user.demo) {
          setIsDemo(true)
        }
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error)
      setIsDemo(false)
    }
  }, [])

  return isDemo
}
