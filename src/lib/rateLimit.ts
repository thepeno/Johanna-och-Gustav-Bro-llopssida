import { createHash } from 'node:crypto'
import { headers } from 'next/headers'

/** Tiny in-memory limiter (per server instance). Returns true once `key` has gone over `limit` in the window. */
export const createLimiter = (limit: number, windowMs: number) => {
  const hits = new Map<string, number[]>()
  return (key: string) => {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((ts) => now - ts < windowMs)
    recent.push(now)
    hits.set(key, recent)
    return recent.length > limit
  }
}

/** Short hash of the caller's IP, so raw addresses are never stored. */
export async function clientKey() {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local'
  return createHash('sha256').update(ip).digest('hex').slice(0, 16)
}
