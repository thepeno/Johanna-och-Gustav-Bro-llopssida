'use client'

import React, { useActionState, useState } from 'react'
import { unlockSite, type GuestAccessState } from '@/actions/guestAccess'
import type { Ui } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

export function GuestLoginForm({ ui }: { ui: Ui }) {
  const [state, action, pending] = useActionState<GuestAccessState, FormData>(unlockSite, {})
  const [show, setShow] = useState(false)

  return (
    <form action={action} className="mt-8 flex w-full flex-col gap-6 text-left">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="label text-(--fg)">
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
          // The plain face: the hand has capitals only, so typed case would be invisible
          className="min-h-12 w-full rounded-none border-0 border-b-[1.5px] border-(--line) bg-transparent px-0 py-2 font-plain text-lg tracking-normal text-(--fg) focus:border-(--fg) focus:outline-none"
        />
        <label className="label flex min-h-11 w-fit cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            className="size-4 accent-graphite"
          />
          {ui.gateShow}
        </label>
        {state.error && (
          <p id="password-error" className="label text-error" role="alert">
            {state.error}
          </p>
        )}
      </div>
      <Button as="button" type="submit" disabled={pending} className="mt-2 self-center">
        {pending ? ui.gateChecking : ui.gateSubmit}
      </Button>
    </form>
  )
}
