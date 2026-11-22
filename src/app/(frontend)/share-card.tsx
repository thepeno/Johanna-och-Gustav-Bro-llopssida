import fs from 'fs/promises'
import path from 'path'
import { getPayloadClient } from '@/lib/data'
import { formatDate } from '@/lib/utils'

// Shared by the link-preview image and the home-screen icon: the sheep drawing,
// Gustav's handwriting, and the names and date from Site settings (read once at
// build; a placeholder if the database can't be reached).
export const ink = '#262626'

export async function cardAssets() {
  const [font, sheep] = await Promise.all([
    fs.readFile(path.join(process.cwd(), 'design/handwriting/GustavsHand.otf')),
    fs.readFile(path.join(process.cwd(), 'public/card/sheep.png')),
  ])
  let names = 'Gustav + Johanna'
  let date = ''
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, locale: 'sv' })
    names = `${settings.partnerOne} + ${settings.partnerTwo}`
    date = formatDate(settings.weddingDate, 'sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    // keep the placeholder
  }
  return {
    font,
    sheep: `data:image/png;base64,${sheep.toString('base64')}`,
    names,
    date,
  }
}
