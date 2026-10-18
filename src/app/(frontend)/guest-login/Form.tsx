'use client'

import React, { useActionState, useState } from 'react'
import { unlockSite, type GuestAccessState } from '@/actions/guestAccess'
import type { Ui } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

export function GuestLoginForm({ ui }: { ui: Ui }) {
  const [state, action, pending] = useActionState<GuestAccessState, FormData>(unlockSite, {})
  const [show, setShow] = useState(false)

  return (
    <form action={action} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="label">
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
          className="w-full border-0 border-b border-(--line) bg-transparent px-0 py-3 font-serif text-2xl text-(--fg) focus:border-(--fg) focus:outline-none"
        />
        <label className="flex w-fit cursor-pointer items-center gap-3 py-2 text-lg text-(--fg-soft)">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            className="size-5 accent-(--color-sand)"
          />
          {ui.gateShow}
        </label>
        {state.error && (
          <p id="password-error" className="text-lg text-red-300" role="alert">
            {state.error}
          </p>
        )}
      </div>
      <Button as="button" type="submit" disabled={pending} className="w-full sm:w-fit">
        {pending ? ui.gateChecking : ui.gateSubmit}
      </Button>
    </form>
  )
}
