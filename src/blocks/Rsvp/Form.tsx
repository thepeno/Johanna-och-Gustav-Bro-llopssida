'use client'

import React, { useActionState, useState } from 'react'
import { submitRsvp, type RsvpState } from '@/actions/rsvp'
import type { Ui } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type Props = { ui: Ui; maxPartySize: number; askDietary: boolean; askSong: boolean; askMessage: boolean }

const field =
  'w-full border-0 border-b border-(--line) bg-transparent px-0 py-3 font-serif text-xl text-(--fg) placeholder:text-(--fg-soft)/60 focus:border-(--fg) focus:outline-none'

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string
  name: string
  error?: string[]
  optional?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="label flex items-baseline justify-between">
        {label}
        {optional && <span className="normal-case tracking-normal opacity-60">{optional}</span>}
      </label>
      {children}
      {error && (
        <p className="label text-red-400" role="alert">
          {error[0]}
        </p>
      )}
    </div>
  )
}

export function RsvpForm({ ui, maxPartySize, askDietary, askSong, askMessage }: Props) {
  const [state, action, pending] = useActionState<RsvpState, FormData>(submitRsvp, { status: 'idle' })
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [partySize, setPartySize] = useState(1)
  const errors = state.status === 'error' ? state.fieldErrors : undefined

  if (state.status === 'success') {
    return (
      <div className="border-t border-(--line) pt-8" aria-live="polite">
        <p className="display text-4xl">♡</p>
        <p className="mt-4 max-w-md font-serif text-2xl italic">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-8" noValidate>
      {/* Honeypot – hidden from people, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="label mb-3">{ui.attending}</legend>
        <div className="flex flex-wrap gap-3">
          {(['yes', 'no'] as const).map((value) => (
            <label
              key={value}
              className={cn(
                'label cursor-pointer border border-(--line) px-5 py-3 transition-colors',
                attending === value && 'border-(--fg) bg-(--fg) text-(--bg)',
              )}
            >
              <input
                type="radio"
                name="attending"
                value={value}
                className="sr-only"
                checked={attending === value}
                onChange={() => setAttending(value)}
              />
              {value === 'yes' ? ui.yes : ui.no}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label={ui.name} name="name" error={errors?.name}>
          <input id="name" name="name" type="text" autoComplete="name" required className={field} />
        </Field>
        <Field label={ui.email} name="email" error={errors?.email}>
          <input id="email" name="email" type="email" autoComplete="email" required className={field} />
        </Field>
      </div>

      {attending === 'yes' && maxPartySize > 1 && (
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label={ui.partySize} name="partySize" error={errors?.partySize}>
            <select
              id="partySize"
              name="partySize"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className={cn(field, 'appearance-none')}
            >
              {Array.from({ length: maxPartySize }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="text-ink">
                  {n}
                </option>
              ))}
            </select>
          </Field>
          {partySize > 1 && (
            <Field label={ui.guestNames} name="guestNames" error={errors?.guestNames}>
              <input id="guestNames" name="guestNames" type="text" className={field} />
            </Field>
          )}
        </div>
      )}

      {attending === 'yes' && askDietary && (
        <Field label={ui.dietary} name="dietary" optional={ui.optional} error={errors?.dietary}>
          <input id="dietary" name="dietary" type="text" className={field} />
        </Field>
      )}
      {attending === 'yes' && askSong && (
        <Field label={ui.song} name="song" optional={ui.optional} error={errors?.song}>
          <input id="song" name="song" type="text" className={field} />
        </Field>
      )}
      {askMessage && (
        <Field label={ui.message} name="message" optional={ui.optional} error={errors?.message}>
          <textarea id="message" name="message" rows={3} className={cn(field, 'resize-y')} />
        </Field>
      )}

      {state.status === 'error' && (
        <p className="label text-red-400" role="alert">
          {state.message}
        </p>
      )}

      <Button as="button" type="submit" disabled={pending} className="w-fit">
        {pending ? ui.sending : ui.send}
      </Button>
    </form>
  )
}
