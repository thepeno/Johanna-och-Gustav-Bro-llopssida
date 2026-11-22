import { ImageResponse } from 'next/og'
import { cardAssets, ink } from './share-card'

// Browser-tab icon: the couple's initials in Gustav's handwriting (the sheep is
// too detailed to read at 32 pixels).
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  const { font, names } = await cardAssets()
  const initials = names
    .split('+')
    .map((n) => n.trim()[0])
    .join('+')
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: ink,
          fontFamily: 'Hand',
          fontSize: 34,
        }}
      >
        {initials}
      </div>
    ),
    { ...size, fonts: [{ name: 'Hand', data: font, style: 'normal', weight: 400 }] },
  )
}
