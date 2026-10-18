import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'
import { cn } from '@/lib/utils'

type Props = { data?: SerializedEditorState | null; className?: string }

export function RichText({ data, className }: Props) {
  if (!data) return null
  return <LexicalRichText data={data} className={cn('prose-wedding', className)} />
}
