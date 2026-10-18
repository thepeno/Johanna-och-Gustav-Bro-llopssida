import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { getHomePage, getSiteSettings } from '@/lib/data'
import { siteLinks } from '@/lib/links'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RsvpBlockComponent } from '@/blocks/Rsvp/Component'

// The reply form on its own page, like Morais's /rsvp. Its content is the RSVP
// block on the home page, so editors still change it in one place.
export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  const block = page?.layout.find((b) => b.blockType === 'rsvp')
  return { title: block?.navLabel || block?.heading || 'OSA', robots: { index: false, follow: false } }
}

export default async function RsvpPage() {
  const [page, settings] = await Promise.all([getHomePage(), getSiteSettings()])
  const block = page?.layout.find((b) => b.blockType === 'rsvp')
  if (!page || !settings || !block) notFound()

  const { rsvp, navItems } = siteLinks(page)

  return (
    <>
      <Nav items={navItems} settings={settings} rsvp={rsvp} />
      <main>
        <RsvpBlockComponent block={block} settings={settings} standalone />
      </main>
      <Footer settings={settings} />
    </>
  )
}
