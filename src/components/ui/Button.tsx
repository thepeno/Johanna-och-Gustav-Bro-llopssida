import React from 'react'
import { cn } from '@/lib/utils'
import { PencilLoop } from '@/components/PencilLoop'

type Props = (React.ComponentPropsWithoutRef<'a'> & { as?: 'a' }) | (React.ComponentPropsWithoutRef<'button'> & { as: 'button' })

/** A word circled in pencil, as you'd mark the answer on a card. The loop redraws on hover. */
export function Button(props: Props) {
  const base =
    'loop-hover relative mx-[0.9em] inline-flex min-h-12 items-center justify-center px-2 py-1 text-[1.15em] tracking-[0.12em] text-(--fg) no-underline disabled:pointer-events-none disabled:opacity-50'
  const inner = (children: React.ReactNode) => (
    <>
      <PencilLoop />
      <span className="relative">{children}</span>
    </>
  )
  if (props.as === 'button') {
    const { as: _as, className, children, ...rest } = props
    return (
      <button {...rest} className={cn(base, 'cursor-pointer', className)}>
        {inner(children)}
      </button>
    )
  }
  const { as: _as, className, children, ...rest } = props
  return (
    <a {...rest} className={cn(base, className)}>
      {inner(children)}
    </a>
  )
}
