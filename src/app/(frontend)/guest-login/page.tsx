import type { Metadata } from 'next'
import React from 'react'
import { getSiteSettings } from '@/lib/data'
import { t } from '@/lib/i18n'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { GuestLoginForm } from './Form'
import sheep from '../../../../public/card/sheep.png'

// Shown by src/proxy.ts in place of any page until the guest has the cookie.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: { absolute: settings ? `${settings.partnerOne} + ${settings.partnerTwo}` : 'Bröllop' },
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
    <main className="theme-ivory flex min-h-svh flex-col items-center justify-center px-5 py-16 text-center">
      <div className="flex w-full max-w-sm flex-col items-center">
        <Image src={sheep} alt="" priority sizes="12rem" className="card-in h-auto w-48" />
        <h1 className="names card-in mt-8" style={{ '--i': 1 } as React.CSSProperties}>
          {settings?.partnerOne ?? 'Gustav'} + {settings?.partnerTwo ?? 'Johanna'}
        </h1>
        {dateLine && (
          <p className="label card-in mt-2" style={{ '--i': 2 } as React.CSSProperties}>
            {dateLine}
          </p>
        )}
        <p className="card-in mt-12" style={{ '--i': 3 } as React.CSSProperties}>
          {ui.gateIntro}
        </p>
        <GuestLoginForm ui={ui} />
      </div>
    </main>
  )
}
