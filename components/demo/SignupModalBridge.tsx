'use client'
import { useEffect } from 'react'

export default function SignupModalBridge() {
  useEffect(() => {
    function handler() {
      // TODO: call your real modal open method (e.g., setState, useModalStore, etc.)
      // Example:
      // openModal("signup");
      const el = document.getElementById('open-signup-modal')
      el?.click?.()
    }
    window.addEventListener('open-signup-modal', handler as EventListener)
    return () =>
      window.removeEventListener('open-signup-modal', handler as EventListener)
  }, [])
  return null
}
