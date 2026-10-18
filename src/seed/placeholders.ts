import sharp from 'sharp'
import path from 'path'
import os from 'os'
import fs from 'fs/promises'

// Soft, photo-like placeholder images in the site palette so the demo page has
// something to show before real photos are uploaded through /admin.
const palettes: Record<string, [string, string, string]> = {
  dusk: ['#7f8158', '#2a1412', '#cfc6b6'],
  linen: ['#e4dfd5', '#cfc6b6', '#7f8158'],
  moss: ['#666841', '#7f8158', '#efece6'],
  cocoa: ['#3b1f1b', '#2a1412', '#7f8158'],
  blush: ['#d9c7bb', '#cfc6b6', '#3b1f1b'],
  stone: ['#b8b2a4', '#e4dfd5', '#666841'],
}

export type PlaceholderSpec = { name: string; width: number; height: number; palette: keyof typeof palettes }

const svg = ({ width, height, palette }: PlaceholderSpec) => {
  const [a, b, c] = palettes[palette]
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.round(width / 9)}"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <ellipse cx="${width * 0.7}" cy="${height * 0.3}" rx="${width * 0.35}" ry="${height * 0.3}" fill="${c}" opacity="0.55" filter="url(#blur)"/>
  <ellipse cx="${width * 0.25}" cy="${height * 0.8}" rx="${width * 0.3}" ry="${height * 0.25}" fill="${a}" opacity="0.6" filter="url(#blur)"/>
</svg>`
}

export async function renderPlaceholders(specs: PlaceholderSpec[]) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'wedding-seed-'))
  const files: Record<string, string> = {}
  for (const spec of specs) {
    const file = path.join(dir, `${spec.name}.jpg`)
    await sharp(Buffer.from(svg(spec))).jpeg({ quality: 82 }).toFile(file)
    files[spec.name] = file
  }
  return files
}
