# Notes

One lesson per entry. Update entries instead of duplicating them.

## Lessons

- **Payload richText fields type as `SerializedEditorState`.** `@payloadcms/richtext-lexical/react` (3.85) does not export `DefaultNodeTypes`; import `SerializedEditorState` from `@payloadcms/richtext-lexical/lexical` and pass the field value straight to `<RichText data>`.
- **eslint-config-next 16 is flat-config only.** Import `eslint-config-next/core-web-vitals` and `/typescript` into `defineConfig`; `FlatCompat` throws "Converting circular structure to JSON".
- **No setState inside effects (React Compiler lint).** The countdown uses `useSyncExternalStore` with a `null` server snapshot, which also avoids hydration mismatches.
- **Theme tokens need `--bg` as well as `--fg`.** Anything that inverts (selected radio, button hover) must use `text-(--bg)`; a fallback to ivory is invisible on the ivory section.
- **Swedish headlines need line-height ≥ 1.** At 0.95 the rings on Å/Ö collide with the line above in Bodoni Moda.
- **Seed runs outside Next.** Hooks that call `revalidatePath` must check `context.disableRevalidate` (the seed passes it) and are wrapped in try/catch.

## Open items

- Replace placeholder images with real photos (upload in /admin → Media, then swap in the blocks).
- Real venue, hotel, map and booking links in the Details block; toastmaster email in the FAQ.
- Email notification to the couple on each RSVP (Payload `afterChange` hook + Resend adapter) if wanted.
- Storage adapter for uploads before deploying to a serverless host.
- Optional: password-protect the page for guests only, and an English toggle (strings exist in `src/lib/i18n.ts`, content would need localization enabled in Payload).
