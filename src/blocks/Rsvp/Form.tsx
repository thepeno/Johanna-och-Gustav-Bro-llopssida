'use client'

import React, { useActionState, useState } from 'react'
import { submitRsvp, type RsvpState } from '@/actions/rsvp'
import type { Ui } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type Props = {
  ui: Ui
  maxPartySize: number
  askDietary: boolean
  askSong: boolean
  askMessage: boolean
}

// A line to write on, as on a card: no box, just a pencil rule that darkens while you write.
// Typed text stays at 16px so phones don't zoom in on the field.
const field =
  'min-h-12 w-full rounded-none border-0 border-b-[1.5px] border-(--line) bg-transparent px-0 py-2 text-base text-(--fg) transition-colors focus:border-(--fg) focus:outline-none aria-[invalid=true]:border-error'

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
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="label text-(--fg)">
        {label}
        {optional && <span > ({optional})</span>}
      </label>
      {children}
      {error && (
        <p className="label text-error" role="alert">
          {error[0]}
        </p>
      )}
    </div>
  )
}

export function RsvpForm({ ui, maxPartySize, askDietary, askSong, askMessage }: Props) {
  const [state, action, pending] = useActionState<RsvpState, FormData>(submitRsvp, {
    status: 'idle',
  })
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [partySize, setPartySize] = useState(1)
  const errors = state.status === 'error' ? state.fieldErrors : undefined
  // React clears the form after every submit; on an error we refill it from what was sent
  const values = state.status === 'error' ? state.values : undefined

  if (state.status === 'success') {
    return (
      <div className="text-center" aria-live="polite">
        <p className="statement">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-9" noValidate>
      {/* Honeypot – hidden from people, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className="label mb-4 text-(--fg)">{ui.attending}</legend>
        {/* Both answers are the same graphite; the chosen one is underlined in pencil */}
        <div className="flex flex-wrap gap-x-12 gap-y-3">
          {(['yes', 'no'] as const).map((value) => (
            <label
              key={value}
              className={cn(
                'inline-flex min-h-12 cursor-pointer items-center text-[1.1em] decoration-[1.5px] underline-offset-[0.35em] transition-colors has-[:focus-visible]:outline-[1.5px] has-[:focus-visible]:outline-offset-[0.5em] has-[:focus-visible]:outline-dashed',
                attending === value ? 'text-(--fg) underline' : 'text-(--fg) hover:underline',
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

      <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-12">
        <Field label={ui.name} name="name" error={errors?.name}>
          <input
            id="name"
            name="name"
            defaultValue={values?.name}
            type="text"
            autoComplete="name"
            required
            className={field}
          />
        </Field>
        <Field label={ui.email} name="email" error={errors?.email}>
          <input
            id="email"
            name="email"
            defaultValue={values?.email}
            type="email"
            autoComplete="email"
            required
            // the plain face: the hand has no @ and shows every letter as a capital
            className={cn(field, 'font-plain tracking-normal')}
          />
        </Field>
      </div>

      {attending === 'yes' && maxPartySize > 1 && (
        <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-12">
          <Field label={ui.partySize} name="partySize" error={errors?.partySize}>
            <select
              id="partySize"
              name="partySize"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className={cn(field, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%23262626%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 fill=%27none%27/%3E%3C/svg%3E")] bg-[length:14px_9px] bg-[right_0.25rem_center] bg-no-repeat pr-8')}
            >
              {Array.from({ length: maxPartySize }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          {partySize > 1 && (
            <Field label={ui.guestNames} name="guestNames" error={errors?.guestNames}>
              <input
                id="guestNames"
                name="guestNames"
                defaultValue={values?.guestNames}
                type="text"
                className={field}
              />
            </Field>
          )}
        </div>
      )}

      {attending === 'yes' && askDietary && (
        <Field label={ui.dietary} name="dietary" optional={ui.optional} error={errors?.dietary}>
          <input
            id="dietary"
            name="dietary"
            defaultValue={values?.dietary}
            type="text"
            className={field}
          />
        </Field>
      )}
      {attending === 'yes' && askSong && (
        <Field label={ui.song} name="song" optional={ui.optional} error={errors?.song}>
          <input id="song" name="song" defaultValue={values?.song} type="text" className={field} />
        </Field>
      )}
      {askMessage && (
        <Field label={ui.message} name="message" optional={ui.optional} error={errors?.message}>
          <textarea
            id="message"
            name="message"
            defaultValue={values?.message}
            rows={3}
            className={cn(
              field,
              // ruled like notepaper: one pencil line under every line of text
              'resize-y border-b-0 py-0 leading-[2.5rem] [background-attachment:local] bg-[repeating-linear-gradient(transparent_0,transparent_calc(2.5rem-1.5px),var(--line)_calc(2.5rem-1.5px),var(--line)_2.5rem)]',
            )}
          />
        </Field>
      )}

      {state.status === 'error' && (
        <p className="text-error" role="alert">
          {state.message}
        </p>
      )}

      <Button as="button" type="submit" disabled={pending} className="mt-4 self-center">
        {pending ? ui.sending : ui.send}
      </Button>
    </form>
  )
}
