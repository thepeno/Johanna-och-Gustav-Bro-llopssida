import type { Page } from '@/payload-types'
import { RSVP_PATH } from '@/lib/utils'

export type NavLink = { href: string; label: string }

/** Menu entries and the reply link, shared by the home page and the RSVP page. */
export function siteLinks(page: Page) {
  const rsvpBlock = page.layout.find((block) => block.blockType === 'rsvp')
  const rsvp: NavLink | undefined = rsvpBlock ? { href: RSVP_PATH, label: rsvpBlock.navLabel || rsvpBlock.heading } : undefined
  const navItems: NavLink[] = page.layout
    .filter((block) => block.navLabel && block.blockType !== 'hero')
    .map((block) => (block.blockType === 'rsvp' ? rsvp! : { href: `/#${block.anchor}`, label: block.navLabel as string }))
  return { rsvp, rsvpAnchor: rsvpBlock?.anchor, navItems }
}
