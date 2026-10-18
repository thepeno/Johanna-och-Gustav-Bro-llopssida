// Shared guest password for the public page. Used by `src/proxy.ts` and server
// actions, so it sticks to Web Crypto (no node: imports).
//
// The cookie holds an HMAC of the password keyed with PAYLOAD_SECRET: it can't be
// forged without the secret, and changing GUEST_PASSWORD signs every guest out.

export const GUEST_COOKIE = 'guest_access'
export const GUEST_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // a year: guests enter it once

// Forgiving on purpose: phones capitalise the first letter and add trailing spaces
const normalise = (value: string) => value.trim().toLowerCase()

/** Without GUEST_PASSWORD the gate is off in development and locked in production. */
export const gateEnabled = () => Boolean(process.env.GUEST_PASSWORD) || process.env.NODE_ENV === 'production'

const encoder = new TextEncoder()

async function sign(message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(process.env.PAYLOAD_SECRET ?? ''),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(`guest:${message}`))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('')
}

const sameString = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Cookie value for the current password, or null when no password is set. */
export const guestToken = async () => {
  const password = process.env.GUEST_PASSWORD
  return password ? sign(normalise(password)) : null
}

export async function hasGuestAccess(cookieValue: string | undefined) {
  if (!gateEnabled()) return true
  const token = await guestToken()
  return Boolean(token && cookieValue && sameString(cookieValue, token))
}

/** Returns the cookie value to set when the password is right, otherwise null. */
export async function checkGuestPassword(input: string) {
  const token = await guestToken()
  if (!token) return null
  return sameString(await sign(normalise(input)), token) ? token : null
}
