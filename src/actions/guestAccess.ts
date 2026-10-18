'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSiteSettings } from '@/lib/data'
import { t } from '@/lib/i18n'
import { GUEST_COOKIE, GUEST_COOKIE_MAX_AGE, checkGuestPassword } from '@/lib/guestAccess'
import { clientKey, createLimiter } from '@/lib/rateLimit'

export type GuestAccessState = { error?: string }

// 10 tries / 10 min / IP: plenty for typos, too few to guess
const tooMany = createLimiter(10, 10 * 60_000)

export async function unlockSite(_prev: GuestAccessState, formData: FormData): Promise<GuestAccessState> {
  const ui = t((await getSiteSettings())?.locale)
  if (tooMany(await clientKey())) return { error: ui.tooMany }

  const password = formData.get('password')
  const token = typeof password === 'string' ? await checkGuestPassword(password) : null
  if (!token) return { error: ui.gateWrong }

  ;(await cookies()).set(GUEST_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: GUEST_COOKIE_MAX_AGE,
  })
  redirect(await returnPath())
}

// The proxy shows the password screen at whatever URL the guest opened, so the
// form posts from that page. Send them back there (same-site paths only).
async function returnPath() {
  const referer = (await headers()).get('referer')
  if (!referer) return '/'
  try {
    const { pathname, search } = new URL(referer)
    return pathname.startsWith('/') && !pathname.startsWith('//') && !pathname.startsWith('/guest-login') ? pathname + search : '/'
  } catch {
    return '/'
  }
}
