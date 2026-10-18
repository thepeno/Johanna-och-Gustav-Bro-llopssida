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
    <main className="theme-ivory flex min-h-svh flex-col items-center justify-center bg-cream px-5 py-16 text-center text-ink">
      <div className="flex w-full max-w-md flex-col items-center">
        <h1 className="display text-[clamp(3rem,12vw,4.5rem)] leading-[1.02]">
          {settings?.partnerOne ?? 'Johanna'} &amp; {settings?.partnerTwo ?? 'Gustav'}
        </h1>
        {dateLine && <p className="mt-4 text-lg">{dateLine}</p>}
        <p className="mt-12 text-(--fg-soft)">{ui.gateIntro}</p>
        <GuestLoginForm ui={ui} />
      </div>
    </main>
  )
}
