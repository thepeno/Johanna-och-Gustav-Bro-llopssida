# Johanna & Gustav – bröllopssida

One-page wedding website. Editors build the page from blocks in Payload CMS; guests RSVP through a form that writes straight to the database.

**Stack:** Next.js 16 (App Router) · Payload CMS 3 · MongoDB · Tailwind CSS 4 · TypeScript

## Getting started

```bash
cp .env.example .env        # then set PAYLOAD_SECRET to a long random string
pnpm install
pnpm seed                   # first admin user + demo content with placeholder images
pnpm dev                    # http://localhost:3000  (admin at /admin)
```

Requires Node 20+ and a MongoDB reachable at `DATABASE_URL` (locally: `brew services start mongodb-community`).

The seed creates the first admin from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` only when no user exists. Change that password after the first login. Re-running `pnpm seed` leaves an existing home page alone; `pnpm seed --reset` replaces the page and media (RSVPs are never touched).

## Content model

| Where | What |
| --- | --- |
| **Pages** | The page with slug `home` is rendered at `/`. Its `layout` is a list of blocks (below). Other slugs are ignored for now. |
| **Site settings** (global) | Names, date and time, venue line, language (`sv-SE` / `en-GB`), hashtag, contact email, footer note, countdown labels. |
| **Media** | Uploaded photos. Three sizes are generated (480 / 1000 / 1920 px) and a focal point can be set. |
| **RSVPs** | Guest replies. Admin-only; the public form never talks to this collection directly. |

### Blocks

Every block has an **anchor** (its `#hash`), an optional **nav label** (empty = not in the menu) and a **theme**: `ivory`, `espresso` or `olive`, so sections can alternate like the reference design.

| Block | Purpose | Notable fields |
| --- | --- | --- |
| Hero | Full-screen opener | background image, eyebrow, tagline (falls back to date + venue), countdown, CTA button |
| Our story | Text + two staggered photos | rich text, numbered milestones (01. 02. 03.) |
| Schedule | Timeline of the day | events with time, title, location, description |
| Details | Practical info cards | venue, travel, accommodation, dress code, gifts… each with optional image and link |
| Gallery | Masonry photo grid | images with captions |
| RSVP form | Reply form | deadline (form closes after that day), max party size, toggles for dietary / song / message, success and closed messages |
| FAQ | Accordion | question + rich-text answer |

Add, remove and reorder blocks freely in the admin; the frontend renders whatever is in `layout`. To add a new block type: create `src/blocks/<Name>/config.ts` and `Component.tsx`, register both in `src/collections/Pages.ts` and `src/blocks/RenderBlocks.tsx`, then run `pnpm generate:types`.

### RSVP flow

`src/blocks/Rsvp/Form.tsx` (client) → `src/actions/rsvp.ts` (server action) → Payload Local API. The action validates with zod, drops honeypot submissions, enforces the deadline and max party size from the block config, and rate-limits to 5 replies per 10 minutes per IP (in memory, per instance). Replies are listed under **Guests → RSVPs** in the admin and can be exported from there.

Every new reply triggers two plain-text emails from an `afterChange` hook on the collection (`src/hooks/rsvpEmails.ts`): a summary to the couple (`RSVP_NOTIFY_TO`, comma-separated; falls back to Site settings → contact email) and a confirmation to the guest in the site language with the wedding date. Mail goes through [Resend](https://resend.com) when `RESEND_API_KEY` is set (`EMAIL_FROM_ADDRESS` must be on a domain verified there); without it Payload logs the emails to the dev server console instead. Sending never blocks the reply: failures are logged and the guest still sees the success message.

## Project layout

```
src/
  payload.config.ts        Payload setup (collections, global, Mongo, Lexical)
  collections/             Pages, Rsvps, Media, Users
  globals/SiteSettings.ts
  fields/section.ts        anchor / navLabel / theme + label / heading fields shared by blocks
  blocks/<Name>/           config.ts (Payload) + Component.tsx (React)
  blocks/RenderBlocks.tsx  blockType → component
  components/              Nav, Footer, Section, Countdown, Img, RichText, ui/Button
  actions/rsvp.ts          server action for the form
  lib/                     data loaders, i18n strings, utils
  seed/                    seed script, demo content, placeholder image generator
  app/(frontend)/          layout, page, styles.css (Tailwind theme + section themes)
  app/(payload)/           Payload admin and REST/GraphQL routes (generated)
```

## Design notes

Inspired by editorial photography templates: condensed uppercase serif headlines (Bodoni Moda), italic serif body (Cormorant Garamond), tiny tracked mono labels (DM Mono), numbered lists and full-bleed colour sections. Colours and fonts are tokens in `src/app/(frontend)/styles.css`; each theme sets `--bg`, `--fg`, `--fg-soft`, `--line` so components look right on any section colour.

## Scripts

| Command | |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js |
| `pnpm seed [--reset]` | Demo content |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after changing collections or blocks |
| `pnpm generate:importmap` | Regenerate the admin import map after adding custom admin components |
| `pnpm lint` / `pnpm typecheck` | Checks |

## Deploying

Any Node host works (Vercel, Railway, a VPS). Set `DATABASE_URL`, `PAYLOAD_SECRET` and `NEXT_PUBLIC_SERVER_URL`. Uploaded files are stored on disk under `media/`; on serverless hosts swap in a Payload storage adapter (S3, Vercel Blob, Cloudflare R2).
