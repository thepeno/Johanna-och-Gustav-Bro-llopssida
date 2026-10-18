import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'

type Props = {
  media: Media
  size?: 'thumbnail' | 'card' | 'large'
  sizes?: string
  priority?: boolean
  className?: string
  fill?: boolean
}

/** next/image around a Payload upload, picking a generated size when it exists. */
export function Img({ media, size = 'card', sizes = '100vw', priority, className, fill }: Props) {
  const variant = media.sizes?.[size]
  const src = variant?.url || media.url
  const width = variant?.width || media.width || 1600
  const height = variant?.height || media.height || 1067
  if (!src) return null
  const style = media.focalX != null && media.focalY != null ? { objectPosition: `${media.focalX}% ${media.focalY}%` } : undefined
  return fill ? (
    <Image src={src} alt={media.alt} fill sizes={sizes} priority={priority} className={cn('object-cover', className)} style={style} />
  ) : (
    <Image src={src} alt={media.alt} width={width} height={height} sizes={sizes} priority={priority} className={className} style={style} />
  )
}
