import React from 'react'

/**
 * Editors can wrap a code in `backticks` (e.g. a booking code like `Wedding10`).
 * The handwriting has capitals only, so those parts are set in the plain face,
 * where upper and lower case can be told apart.
 */
export function WithCodes({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-plain text-[1.18em] leading-none tracking-normal whitespace-nowrap">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  )
}
