import type { Metadata } from 'next'
import { Bodoni_Moda, Cormorant_Garamond, DM_Mono } from 'next/font/google'
import React from 'react'
import { getSiteSettings } from '@/lib/data'
import './styles.css'

const display = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
  display: 'swap',
})
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' })

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
    <html lang={lang} className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
