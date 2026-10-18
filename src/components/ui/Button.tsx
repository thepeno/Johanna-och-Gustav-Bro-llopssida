import React from 'react'
import { cn } from '@/lib/utils'

type Props = React.ComponentPropsWithoutRef<'a'> & { as?: 'a' } | (React.ComponentPropsWithoutRef<'button'> & { as: 'button' })

/** The Morais button: sans capitals in a plain black outline, filled on hover. */
export function Button(props: Props) {
  const base =
    'inline-flex min-h-14 min-w-60 items-center justify-center border border-(--fg) px-8 py-3 font-sans text-[1.0625rem] uppercase tracking-[0.05em] text-(--fg) transition-colors duration-200 hover:bg-(--fg) hover:text-(--bg) disabled:pointer-events-none disabled:opacity-50'
  if (props.as === 'button') {
    const { as: _as, className, ...rest } = props
    return <button {...rest} className={cn(base, className)} />
  }
  const { as: _as, className, ...rest } = props
  return <a {...rest} className={cn(base, className)} />
}
