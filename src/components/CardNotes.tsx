import React from 'react'

export type CardNotesProps = { label?: string | null; href?: string | null; note?: string | null }

/**
 * The card's two small notes, the reply ("OSA senast 15 juni") and the dress
 * code, set side by side and centred. Each keeps its own line breaks.
 */
export function CardNotes({ label, href, note, className, style }: CardNotesProps & { className?: string; style?: React.CSSProperties }) {
  if (!label && !note) return null
  return (
    <div className={`label flex items-start justify-center gap-12 text-center sm:gap-20 ${className ?? ''}`} style={style}>
      {label &&
        (href ? (
          <a href={href} className="pencil-action max-w-[9.5em] text-(--fg) md:max-w-none">
            {label}
          </a>
        ) : (
          <p className="max-w-[9.5em] md:max-w-none">{label}</p>
        ))}
      {note && <p className="whitespace-pre">{note}</p>}
    </div>
  )
}
