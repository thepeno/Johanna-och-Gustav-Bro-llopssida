import type { Metadata } from 'next'
import localFont from 'next/font/local'
import React from 'react'
import { getLang, getSiteSettings } from '@/lib/data'
import './styles.css'

// Gustav's handwriting, built from design/handwriting. Every word on the site is set in it.
const hand = localFont({ src: './fonts/GustavsHand.woff2', variable: '--font-handwriting', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title = settings ? `${settings.partnerOne} + ${settings.partnerTwo}` : 'Bröllop'
  return {
    title: { default: title, template: `%s · ${title}` },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang()
  return (
    <html lang={lang} className={hand.variable}>
      <body>{children}</body>
    </html>
  )
}
