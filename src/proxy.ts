import { NextResponse, type NextRequest } from 'next/server'
import { GUEST_COOKIE, hasGuestAccess } from '@/lib/guestAccess'

// Guests without a valid cookie get the password screen instead of the page.
// The URL stays the same; after a correct password the action sets the cookie and
// redirects to `/`. Payload's /admin and /api are not matched and work as before.
export async function proxy(request: NextRequest) {
  if (await hasGuestAccess(request.cookies.get(GUEST_COOKIE)?.value)) return NextResponse.next()
  const res = NextResponse.rewrite(new URL('/guest-login', request.url))
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}

export const config = {
  // Everything except Payload, Next internals and files with an extension (favicon, images…)
  matcher: ['/((?!admin|api|_next/|guest-login|opengraph-image|apple-icon|icon|.*\\.[a-zA-Z0-9]+$).*)'],
}
