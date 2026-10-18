import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'
import { HOME_SLUG } from '@/collections/Pages'

export const getPayloadClient = () => getPayload({ config })

export const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient()
  try {
    return await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  } catch {
    return null
  }
})

export const getHomePage = cache(async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: HOME_SLUG } },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})
