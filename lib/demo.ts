export const DEMO_LS_KEY = 'demoMode'

export function getIsDemoFromEnv() {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
}

export function getIsDemoFromQuery() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('demo') === '1'
}

export function getIsDemoFromLocalStorage() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(DEMO_LS_KEY) === 'true'
}

export function setDemoInLocalStorage(enabled: boolean) {
  if (typeof window === 'undefined') return
  localStorage.setItem(DEMO_LS_KEY, enabled ? 'true' : 'false')
}

export function isDemoMode(): boolean {
  // During SSR, only check environment variable
  if (typeof window === 'undefined') {
    return getIsDemoFromEnv()
  }

  return (
    getIsDemoFromEnv() || getIsDemoFromQuery() || getIsDemoFromLocalStorage()
  )
}
