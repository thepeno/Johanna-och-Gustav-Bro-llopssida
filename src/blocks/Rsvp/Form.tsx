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

const field =
  'w-full rounded-none border border-(--line) bg-(--field) px-4 py-3 font-serif text-base text-(--fg) transition-colors focus:border-(--fg) focus:outline-none'

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
      <label htmlFor={name} className="font-sans text-[0.9375rem]">
        {label}
        {optional && <span className="text-(--fg-soft)"> ({optional})</span>}
      </label>
      {children}
      {error && (
        <p className="text-[0.9375rem] text-error" role="alert">
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
        <p className="display text-3xl md:text-4xl">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-7" noValidate>
      {/* Honeypot – hidden from people, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 font-sans text-[0.9375rem]">{ui.attending}</legend>
        <div className="flex flex-col gap-1">
          {(['yes', 'no'] as const).map((value) => (
            <label key={value} className="flex min-h-11 cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="attending"
                value={value}
                className="size-[18px] accent-ink"
                checked={attending === value}
                onChange={() => setAttending(value)}
              />
              {value === 'yes' ? ui.yes : ui.no}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2">
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
            className={field}
          />
        </Field>
      </div>

      {attending === 'yes' && maxPartySize > 1 && (
        <div className="grid gap-7 sm:grid-cols-2">
          <Field label={ui.partySize} name="partySize" error={errors?.partySize}>
            <select
              id="partySize"
              name="partySize"
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className={cn(field, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%23111%27 fill=%27none%27/%3E%3C/svg%3E")] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10')}
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
            className={cn(field, 'resize-y')}
          />
        </Field>
      )}

      {state.status === 'error' && (
        <p className="text-center text-error" role="alert">
          {state.message}
        </p>
      )}

      <Button as="button" type="submit" disabled={pending} className="mx-auto mt-2 w-full sm:w-fit">
        {pending ? ui.sending : ui.send}
      </Button>
    </form>
  )
}
