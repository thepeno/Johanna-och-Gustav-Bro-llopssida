import { ImageResponse } from 'next/og'
import { cardAssets, ink } from './share-card'

// What WhatsApp, iMessage and Messenger show when the link is shared. Their
// crawlers only ever see the password screen, so this is the card, not a photo.
export const alt = 'Gustav + Johanna'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const { font, sheep, names, date } = await cardAssets()
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: ink,
          fontFamily: 'Hand',
        }}
      >
        <img src={sheep} width={330} height={268} alt="" />
        <div style={{ marginTop: 44, fontSize: 64, letterSpacing: '0.08em', wordSpacing: '0.35em' }}>{names}</div>
        {date && <div style={{ marginTop: 18, fontSize: 30, letterSpacing: '0.08em', }}>{date}</div>}
      </div>
    ),
    { ...size, fonts: [{ name: 'Hand', data: font, style: 'normal', weight: 400 }] },
  )
}
