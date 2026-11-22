import { ImageResponse } from 'next/og'
import { cardAssets } from './share-card'

// Home-screen icon for guests who save the page on their phone: the sheep on white.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const { sheep } = await cardAssets()
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
        <img src={sheep} width={150} height={122} alt="" />
      </div>
    ),
    size,
  )
}
