# Notes

One lesson per entry. Update entries instead of duplicating them.

## Lessons

- **Payload richText fields type as `SerializedEditorState`.** `@payloadcms/richtext-lexical/react` (3.85) does not export `DefaultNodeTypes`; import `SerializedEditorState` from `@payloadcms/richtext-lexical/lexical` and pass the field value straight to `<RichText data>`.
- **eslint-config-next 16 is flat-config only.** Import `eslint-config-next/core-web-vitals` and `/typescript` into `defineConfig`; `FlatCompat` throws "Converting circular structure to JSON".
- **No setState inside effects (React Compiler lint).** The countdown uses `useSyncExternalStore` with a `null` server snapshot, which also avoids hydration mismatches.
- **Swedish headlines need line-height ≥ 1.** Below that the rings on Å/Ö collide with the line above.
- **Section theme values are legacy names.** The stored `ivory` / `espresso` / `olive` values are kept (changing them would mean migrating content), but since the card redesign every section is the same paper and the `.theme-*` rules only set the graphite ink variables.
- **The handwriting font has capitals only.** Lowercase maps to the same letters, so any input where case matters (the guest password) must use `font-plain`, or guests can't see what they typed.
- **Entrance animations pause in a hidden browser.** The card's fade-in (`.card-in`) and the pencil loop stay at their first frame in background tabs and some preview panes. Run `document.getAnimations().forEach(a => a.finish())` before taking screenshots.
- **Payload's console email adapter logs only `to` and `subject`.** With no `RESEND_API_KEY` the RSVP hook (`src/hooks/rsvpEmails.ts`) logs the full body itself when `payload.email.name === 'console'`, so local dev shows what would have been sent. Email hooks are wrapped in try/catch and use `Promise.allSettled`: a failed mail is logged, never surfaced to the guest.
- **Seed runs outside Next.** Hooks that call `revalidatePath` must check `context.disableRevalidate` (the seed passes it) and are wrapped in try/catch.

- **npm, not pnpm.** The project started on pnpm; a collaborator on pnpm 11 hit `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION` (a transitive dependency published hours earlier). Switched to npm with `package-lock.json` so that no extra tooling is needed beyond Node. Seed flags are passed as `npm run seed -- --reset`.
- **Next 16 calls middleware `proxy`.** The guest gate is `src/proxy.ts` (export `proxy`, Node runtime by default). It *rewrites* to `/guest-login` instead of redirecting, so the URL stays `/` and the home page can stay statically rendered: only the proxy reads the cookie. Server actions are POSTs to whichever path they're called from, so the RSVP action checks the guest cookie itself as well; the proxy alone isn't enough.
- **Turbopack won't follow a symlinked `node_modules`** ("points out of the filesystem root"). In a git worktree, run `npm ci` instead of linking to the main checkout's modules.
- **The RSVP form has its own page but no content of its own.** `/osa` renders the RSVP block from the home page's layout (and the home page skips it), so editors keep one place to change it. Links reach it through `sectionHref()`: any button or menu entry whose anchor matches the RSVP block's anchor goes to `/osa`.
- **After the password, go back via the Referer.** The proxy rewrites to the password screen without changing the URL, so the unlock action reads the `Referer` header to return the guest to that path (same-site paths only, never `/guest-login`).

## Open items

- Replace placeholder images with real photos (upload in /admin → Media, then swap in the blocks).
- Real venue, hotel, map and booking links in the Details block; toastmaster email in the FAQ.
- Set `RESEND_API_KEY`, `EMAIL_FROM_*` and `RSVP_NOTIFY_TO` before launch (RSVP emails only log to the console until then).
- Storage adapter for uploads before deploying to a serverless host.
- Set `GUEST_PASSWORD` on the host before launch (without it, production shows the password screen and nobody gets in).
- An English toggle (strings exist in `src/lib/i18n.ts`, content would need localization enabled in Payload).
