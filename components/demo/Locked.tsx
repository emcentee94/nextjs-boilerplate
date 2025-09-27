'use client'
import * as React from 'react'
import { useDemo } from '@/contexts/DemoContext'

type LockedProps = {
  children: React.ReactElement // typically a Button or IconButton
  onLocked?: () => void // optional hook for analytics
  reason?: string
}

export function Locked({ children, onLocked, reason }: LockedProps) {
  const { isDemo } = useDemo()

  if (!isDemo) return children

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onLocked?.()
    const evt = new CustomEvent('open-signup-modal', {
      detail: { source: 'locked-action' },
    })
    window.dispatchEvent(evt)
  }

  return React.cloneElement(children, {
    onClick: handleClick,
    'aria-disabled': true,
    className: [
      children.props.className ?? '',
      'cursor-not-allowed opacity-70',
    ].join(' '),
    title: reason ?? 'Sign up to unlock this feature',
  })
}
