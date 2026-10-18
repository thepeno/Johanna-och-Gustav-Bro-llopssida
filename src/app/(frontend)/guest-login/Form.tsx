'use client'

import React, { useActionState, useState } from 'react'
import { unlockSite, type GuestAccessState } from '@/actions/guestAccess'
import type { Ui } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

export function GuestLoginForm({ ui }: { ui: Ui }) {
  const [state, action, pending] = useActionState<GuestAccessState, FormData>(unlockSite, {})
  const [show, setShow] = useState(false)

  return (
    <form action={action} className="mt-6 flex w-full flex-col gap-5 text-left">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-sans text-[0.9375rem]">
          {ui.gatePassword}
        </label>
        <input
          id="password"
          name="password"
          type={show ? 'text' : 'password'}
          autoComplete="current-password"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          required
          autoFocus
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? 'password-error' : undefined}
          className="w-full rounded-none border border-(--line) bg-white px-4 py-3 font-serif text-lg text-ink focus:border-ink focus:outline-none"
        />
        <label className="flex min-h-11 w-fit cursor-pointer items-center gap-3 text-(--fg-soft)">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            className="size-[18px] accent-ink"
          />
          {ui.gateShow}
        </label>
        {state.error && (
          <p id="password-error" className="text-error" role="alert">
            {state.error}
          </p>
        )}
      </div>
      <Button as="button" type="submit" disabled={pending} className="w-full">
        {pending ? ui.gateChecking : ui.gateSubmit}
      </Button>
    </form>
  )
}
