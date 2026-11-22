import React from 'react'
import { setLanguage } from '@/actions/language'
import { cn } from '@/lib/utils'

/**
 * One word that switches the whole site: "English" on the Swedish page, "Svenska"
 * on the English one, each written in its own language. A plain form, so it
 * works before any JavaScript has loaded.
 */
export function LanguageSwitch({ locale, className }: { locale?: string | null; className?: string }) {
  const english = locale === 'en-GB'
  const target = english ? 'sv' : 'en'
  return (
    <form action={setLanguage.bind(null, target)} className={className}>
      <button
        type="submit"
        lang={target}
        className={cn('label min-h-12 cursor-pointer px-2 text-(--fg) underline-offset-[0.3em] hover:underline')}
      >
        {english ? 'Svenska' : 'English'}
      </button>
    </form>
  )
}
