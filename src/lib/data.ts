import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { HOME_SLUG } from '@/collections/Pages'

export const getPayloadClient = () => getPayload({ config })

// Visitors pick Svenska or English in the header; the choice lives in a cookie.
// Without one they get the default language from Site settings.
export type Lang = 'sv' | 'en'
export const LANG_COOKIE = 'lang'
export const isLang = (value: unknown): value is Lang => value === 'sv' || value === 'en'
export const intlLocale = (lang: Lang) => (lang === 'en' ? 'en-GB' : 'sv-SE') as 'en-GB' | 'sv-SE'

const findSettings = cache(async (lang: Lang) => {
  const payload = await getPayloadClient()
  try {
    return await payload.findGlobal({ slug: 'site-settings', depth: 1, locale: lang, fallbackLocale: 'sv' })
  } catch {
    return null
  }
})

export const getLang = cache(async (): Promise<Lang> => {
  const chosen = (await cookies()).get(LANG_COOKIE)?.value
  if (isLang(chosen)) return chosen
  return (await findSettings('sv'))?.locale === 'en-GB' ? 'en' : 'sv'
})

/** Site settings in the visitor's language. `locale` is the active language, so dates and UI strings follow it. */
export const getSiteSettings = cache(async () => {
  const lang = await getLang()
  const settings = await findSettings(lang)
  return settings ? { ...settings, locale: intlLocale(lang) } : null
})

export const getHomePage = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: HOME_SLUG } },
    depth: 2,
    limit: 1,
    locale: await getLang(),
    fallbackLocale: 'sv',
  })
  return docs[0] ?? null
})
