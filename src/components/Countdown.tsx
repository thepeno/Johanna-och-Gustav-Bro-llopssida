'use client'

import React, { useSyncExternalStore } from 'react'

type Labels = { days: string; hours: string; minutes: string; seconds: string }

// A one-second clock as an external store: the server snapshot is null so the
// markup never mismatches on hydration, then the client ticks every second.
const subscribe = (notify: () => void) => {
  const id = setInterval(notify, 1000)
  return () => clearInterval(id)
}
const getNow = () => Math.floor(Date.now() / 1000)
const getServerNow = () => null

const split = (seconds: number) => ({
  days: Math.floor(seconds / 86_400),
  hours: Math.floor((seconds / 3_600) % 24),
  minutes: Math.floor((seconds / 60) % 60),
  seconds: Math.floor(seconds % 60),
})

export function Countdown({ date, labels }: { date: string; labels: Labels }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow)
  const target = Math.floor(new Date(date).getTime() / 1000)
  const parts = now == null ? null : split(Math.max(0, target - now))

  const units = (['days', 'hours', 'minutes', 'seconds'] as const).map((key) => ({
    key,
    value: parts ? String(parts[key]).padStart(2, '0') : '--',
    label: labels[key],
  }))

  return (
    <dl className="flex items-start justify-center gap-6 md:gap-12">
      {units.map((u) => (
        <div key={u.key} className="flex min-w-14 flex-col items-center md:min-w-20">
          <dd className="display text-3xl tabular-nums md:text-5xl">{u.value}</dd>
          <dt className="label mt-2 text-current/70">{u.label}</dt>
        </div>
      ))}
    </dl>
  )
}
