# Notes

One lesson per entry. Update entries instead of duplicating them.

## Lessons

- **Payload richText fields type as `SerializedEditorState`.** `@payloadcms/richtext-lexical/react` (3.85) does not export `DefaultNodeTypes`; import `SerializedEditorState` from `@payloadcms/richtext-lexical/lexical` and pass the field value straight to `<RichText data>`.
- **eslint-config-next 16 is flat-config only.** Import `eslint-config-next/core-web-vitals` and `/typescript` into `defineConfig`; `FlatCompat` throws "Converting circular structure to JSON".
- **No setState inside effects (React Compiler lint).** The countdown uses `useSyncExternalStore` with a `null` server snapshot, which also avoids hydration mismatches.
- **Theme tokens need `--bg` as well as `--fg`.** Anything that inverts (selected radio, button hover) must use `text-(--bg)`; a fallback to ivory is invisible on the ivory section.
- **Swedish headlines need line-height ≥ 1.** At 0.95 the rings on Å/Ö collide with the line above in Bodoni Moda.
- **Payload's console email adapter logs only `to` and `subject`.** With no `RESEND_API_KEY` the RSVP hook (`src/hooks/rsvpEmails.ts`) logs the full body itself when `payload.email.name === 'console'`, so local dev shows what would have been sent. Email hooks are wrapped in try/catch and use `Promise.allSettled`: a failed mail is logged, never surfaced to the guest.
- **Seed runs outside Next.** Hooks that call `revalidatePath` must check `context.disableRevalidate` (the seed passes it) and are wrapped in try/catch.

- **Pin pnpm with `packageManager`.** A collaborator on pnpm 11 hit `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION` because a transitive dependency (strtok3) in the lockfile was published hours earlier. Pinning `pnpm@9.9.0` via `packageManager` + `corepack enable` keeps everyone on the version the lockfile was built with.

## Open items

- Replace placeholder images with real photos (upload in /admin → Media, then swap in the blocks).
- Real venue, hotel, map and booking links in the Details block; toastmaster email in the FAQ.
- Set `RESEND_API_KEY`, `EMAIL_FROM_*` and `RSVP_NOTIFY_TO` before launch (RSVP emails only log to the console until then).
- Storage adapter for uploads before deploying to a serverless host.
- Optional: password-protect the page for guests only, and an English toggle (strings exist in `src/lib/i18n.ts`, content would need localization enabled in Payload).
