import React from 'react'
import { cn } from '@/lib/utils'

/**
 * A hand-drawn pencil loop around a word, the way you'd circle an answer on a
 * card. It stretches to its parent (which must be `relative`); the stroke keeps
 * its width. With `draw`, it draws itself in when it appears.
 */
export function PencilLoop({ draw = false, className }: { draw?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      data-draw={draw}
      className={cn('pencil-loop pointer-events-none absolute -inset-x-[0.9em] -inset-y-[0.45em] h-[calc(100%+0.9em)] w-[calc(100%+1.8em)] overflow-visible', className)}
    >
      <path
        d="M 46 14 C 80 4, 150 3, 184 12 C 202 18, 199 42, 176 50 C 140 60, 52 59, 20 50 C 0 44, 2 22, 24 12 C 48 2, 98 -1, 140 3"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeDasharray={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
