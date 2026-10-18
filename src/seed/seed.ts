import { getPayload } from 'payload'
import config from '@payload-config'
import { HOME_SLUG } from '@/collections/Pages'
import { images, layout, siteSettings, type ImageKey } from './content'
import { renderPlaceholders } from './placeholders'

const reset = process.argv.includes('--reset')
const context = { disableRevalidate: true }

async function run() {
  const payload = await getPayload({ config })

  // 1. First admin user
  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  if (userCount === 0) {
    const email = process.env.SEED_ADMIN_EMAIL
    const password = process.env.SEED_ADMIN_PASSWORD
    if (!email || !password) throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env to create the first admin')
    await payload.create({ collection: 'users', data: { email, password } })
    payload.logger.info(`Created admin user ${email}`)
  }

  // 2. Home page (skip unless --reset so edits made in /admin survive re-runs)
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: HOME_SLUG } }, limit: 1 })
  if (existing.totalDocs > 0 && !reset) {
    payload.logger.info('Home page already exists – run `pnpm seed --reset` to replace it')
    process.exit(0)
  }
  if (reset) {
    await payload.delete({ collection: 'pages', where: { slug: { equals: HOME_SLUG } }, context })
    await payload.delete({ collection: 'media', where: {}, context })
    payload.logger.info('Removed existing home page and media')
  }

  // 3. Placeholder images
  const specs = (Object.keys(images) as ImageKey[]).map((name) => ({ name, ...images[name] }))
  const files = await renderPlaceholders(specs)
  const ids = {} as Record<ImageKey, string>
  for (const spec of specs) {
    const doc = await payload.create({
      collection: 'media',
      data: { alt: images[spec.name].alt },
      filePath: files[spec.name],
      context,
    })
    ids[spec.name] = doc.id
  }
  payload.logger.info(`Uploaded ${specs.length} placeholder images`)

  // 4. Settings + page
  await payload.updateGlobal({ slug: 'site-settings', data: siteSettings, context })
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Johanna & Gustav',
      slug: HOME_SLUG,
      // Block shapes are validated by Payload at create time
      layout: layout(ids) as never,
      meta: {
        title: 'Johanna & Gustav gifter sig 19 juni 2027',
        description: 'Allt om dagen: schema, plats, boende och OSA.',
        image: ids.hero,
      },
    },
    context,
  })
  payload.logger.info('Seeded site settings and home page')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
