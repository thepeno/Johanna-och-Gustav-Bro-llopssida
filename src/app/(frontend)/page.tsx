import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { getHomePage, getSiteSettings } from '@/lib/data'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { asMedia } from '@/lib/utils'
import { siteLinks } from '@/lib/links'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getHomePage(), getSiteSettings()])
  const names = settings ? `${settings.partnerOne} + ${settings.partnerTwo}` : 'Bröllop'
  const image = asMedia(page?.meta?.image)
  return {
    title: page?.meta?.title || names,
    description: page?.meta?.description || undefined,
    openGraph: image?.url ? { images: [{ url: image.url, alt: image.alt }] } : undefined,
  }
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([getHomePage(), getSiteSettings()])

  if (!page || !settings) {
    return (
      <main className="theme-ivory mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-6 px-6 text-center">
        <h1 className="statement">Sidan saknar innehåll</h1>
        <p>
          Kör <code className="font-plain text-base tracking-normal">npm run seed</code> för exempelinnehåll, eller skapa en sida med slug
          <code className="font-plain text-base tracking-normal"> home</code> och fyll i Site settings i{' '}
          <Link href="/admin">
            /admin
          </Link>
          .
        </p>
      </main>
    )
  }

  const { rsvp, rsvpAnchor, navItems } = siteLinks(page)
  // The reply form lives on its own page (/osa), so it is left out here
  const blocks = page.layout.filter((block) => block.blockType !== 'rsvp')

  return (
    <>
      <Nav items={navItems} settings={settings} rsvp={rsvp} />
      <main>
        <RenderBlocks blocks={blocks} settings={settings} rsvpAnchor={rsvpAnchor} />
      </main>
      <Footer settings={settings} rsvp={rsvp} />
    </>
  )
}
