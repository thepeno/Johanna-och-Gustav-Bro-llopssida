import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { getHomePage, getSiteSettings } from '@/lib/data'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { asMedia } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getHomePage(), getSiteSettings()])
  const names = settings ? `${settings.partnerOne} & ${settings.partnerTwo}` : 'Bröllop'
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
      <main className="theme-ivory mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 px-6">
        <p className="label">Nästan klart</p>
        <h1 className="display text-4xl">Sidan saknar innehåll</h1>
        <p>
          Kör <code className="font-mono text-sm">pnpm seed</code> för exempelinnehåll, eller skapa en sida med slug
          <code className="font-mono text-sm"> home</code> och fyll i Site settings i{' '}
          <Link className="underline" href="/admin">
            /admin
          </Link>
          .
        </p>
      </main>
    )
  }

  const navItems = page.layout
    .filter((block) => block.navLabel && block.blockType !== 'hero')
    .map((block) => ({ anchor: block.anchor, label: block.navLabel as string }))

  return (
    <>
      <Nav items={navItems} settings={settings} />
      <main>
        <RenderBlocks blocks={page.layout} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  )
}
