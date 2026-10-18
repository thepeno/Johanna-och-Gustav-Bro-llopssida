import React from 'react'
import { cn } from '@/lib/utils'

type Props = React.ComponentPropsWithoutRef<'a'> & { as?: 'a' } | (React.ComponentPropsWithoutRef<'button'> & { as: 'button' })

/** Outlined, tracked-uppercase button in the reference's style. Inherits the section colour. */
export function Button(props: Props) {
  const base =
    'label inline-flex items-center justify-center gap-3 border border-current px-7 py-4 transition-colors duration-300 hover:bg-(--fg) hover:text-(--bg) disabled:opacity-50 disabled:pointer-events-none'
  if (props.as === 'button') {
    const { as: _as, className, ...rest } = props
    return <button {...rest} className={cn(base, className)} />
  }
  const { as: _as, className, ...rest } = props
  return <a {...rest} className={cn(base, className)} />
}
