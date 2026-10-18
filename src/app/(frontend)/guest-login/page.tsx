import type { Metadata } from 'next'
import React from 'react'
import { getSiteSettings } from '@/lib/data'
import { t } from '@/lib/i18n'
import { formatDate } from '@/lib/utils'
import { GuestLoginForm } from './Form'

// Shown by src/proxy.ts in place of any page until the guest has the cookie.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: { absolute: settings ? `${settings.partnerOne} & ${settings.partnerTwo}` : 'Bröllop' },
    robots: { index: false, follow: false },
  }
}

export default async function GuestLoginPage() {
  const settings = await getSiteSettings()
  const locale = settings?.locale || 'sv-SE'
  const ui = t(locale)
  const dateLine = settings?.weddingDate
    ? formatDate(settings.weddingDate, locale, { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <main className="theme-espresso flex min-h-svh flex-col justify-center bg-espresso px-5 py-16 text-ivory">
      <div className="mx-auto flex w-full max-w-md animate-fade-up flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="label">{ui.gateEyebrow}</p>
          <h1 className="display text-6xl sm:text-7xl">
            {settings?.partnerOne ?? 'Johanna'}
            <span className="font-serif font-normal italic"> &amp; </span>
            {settings?.partnerTwo ?? 'Gustav'}
          </h1>
          {dateLine && <p className="font-serif text-2xl italic text-(--fg-soft)">{dateLine}</p>}
        </div>
        <p className="text-xl">{ui.gateIntro}</p>
        <GuestLoginForm ui={ui} />
      </div>
    </main>
  )
}
