'use server'

import { cookies } from 'next/headers'
import { LANG_COOKIE, isLang } from '@/lib/data'

/** Remember the visitor's language for a year. Setting the cookie re-renders the page in it. */
export async function setLanguage(lang: string) {
  if (!isLang(lang)) return
  ;(await cookies()).set(LANG_COOKIE, lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
}
