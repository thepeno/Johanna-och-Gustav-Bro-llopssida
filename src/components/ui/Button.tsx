import React from 'react'
import { cn } from '@/lib/utils'

type Props = (React.ComponentPropsWithoutRef<'a'> & { as?: 'a' }) | (React.ComponentPropsWithoutRef<'button'> & { as: 'button' })

/** A word underlined in pencil, a little larger than the text around it. The line darkens on hover. */
export function Button(props: Props) {
  const base =
    'pencil-action inline-flex min-h-12 items-center justify-center px-1 text-[1.1em] tracking-[0.12em] text-(--fg) disabled:pointer-events-none disabled:opacity-50'
  if (props.as === 'button') {
    const { as: _as, className, ...rest } = props
    return <button {...rest} className={cn(base, 'cursor-pointer', className)} />
  }
  const { as: _as, className, ...rest } = props
  return <a {...rest} className={cn(base, className)} />
}
