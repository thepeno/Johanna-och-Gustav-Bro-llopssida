import type { Metadata } from 'next'
import { Inter_Tight, Libre_Caslon_Text } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'
import { getSiteSettings } from '@/lib/data'
import './styles.css'

const book = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-book',
  display: 'swap',
})
// Fallback for devices without Helvetica Neue; not preloaded since Apple devices never need it
const grotesk = Inter_Tight({ subsets: ['latin'], weight: ['400'], variable: '--font-grotesk', display: 'swap', preload: false })
// Gustav's handwriting, built from design/handwriting (see the README there). Not used on the page yet.
const hand = localFont({ src: './fonts/GustavsHand.woff2', variable: '--font-handwriting', display: 'swap', preload: false })

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
    <html lang={lang} className={`${book.variable} ${grotesk.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  )
}
