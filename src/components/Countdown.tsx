'use client'

import { useSyncExternalStore } from 'react'

// Days left, as a sentence. A slow clock (once a minute) as an external store:
// the server snapshot is null so hydration never mismatches.
const subscribe = (notify: () => void) => {
  const id = setInterval(notify, 60_000)
  return () => clearInterval(id)
}
const getNow = () => Math.floor(Date.now() / 60_000)
const getServerNow = () => null

export function DaysLeft({ date, days, suffix }: { date: string; days: string; suffix: string }) {
  const minute = useSyncExternalStore(subscribe, getNow, getServerNow)
  if (minute == null) return <span>&nbsp;</span>
  const left = Math.ceil((new Date(date).getTime() - minute * 60_000) / 86_400_000)
  if (left <= 0) return null
  return (
    <span>
      {left} {days} {suffix}
    </span>
  )
}
