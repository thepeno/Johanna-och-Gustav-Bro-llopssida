import type { Metadata } from 'next'
import { Cormorant_Garamond, EB_Garamond } from 'next/font/google'
import React from 'react'
import { getSiteSettings } from '@/lib/data'
import './styles.css'

const display = EB_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-display',
  display: 'swap',
})
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = settings ? `${settings.partnerOne} & ${settings.partnerTwo}` : 'Bröllop'
  return {
    title: { default: title, template: `%s · ${title}` },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const lang = (settings?.locale || 'sv-SE').split('-')[0]
  return (
    <html lang={lang} className={`${display.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
