'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { isDemoMode as detectDemo, setDemoInLocalStorage } from '@/lib/demo'

type DemoContextType = {
  isDemo: boolean
  setDemo: (v: boolean) => void
}

const DemoContext = createContext<DemoContextType>({
  isDemo: false,
  setDemo: () => {},
})

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState<boolean>(false)

  useEffect(() => {
    const d = detectDemo()
    setIsDemo(d)
    setDemoInLocalStorage(d)
  }, [])

  const value = useMemo(() => ({ isDemo, setDemo: setIsDemo }), [isDemo])

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  return useContext(DemoContext)
}
