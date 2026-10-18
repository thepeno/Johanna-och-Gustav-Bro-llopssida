# Johanna & Gustav – bröllopssida

One-page wedding website. Editors build the page from blocks in Payload CMS; guests RSVP through a form that writes straight to the database.

**Stack:** Next.js 16 (App Router) · Payload CMS 3 · MongoDB · Tailwind CSS 4 · TypeScript · npm

## Getting started

```bash
cp .env.example .env        # then set PAYLOAD_SECRET to a long random string and GUEST_PASSWORD
npm install
npm run seed                # first admin user + the page content (Morais layout, placeholder photo)
npm run dev                 # http://localhost:3000  (admin at /admin)
```

Requires Node 20.9+ and a MongoDB reachable at `DATABASE_URL` (a free MongoDB Atlas cluster works; locally: `brew services start mongodb-community`).

Use npm (10+), which ships with Node. The lockfile is `package-lock.json`.

The seed creates the first admin from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` only when no user exists. Change that password after the first login. Re-running `npm run seed` leaves an existing home page alone; `npm run seed -- --reset` replaces the page and media (RSVPs are never touched).

## Content model

| Where | What |
| --- | --- |
| **Pages** | The page with slug `home` is rendered at `/`. Its `layout` is a list of blocks (below). Other slugs are ignored for now. |
| **Site settings** (global) | Names, date and time, venue line, language (`sv-SE` / `en-GB`), hashtag, contact email, footer note, countdown labels. |
| **Media** | Uploaded photos. Three sizes are generated (480 / 1000 / 1920 px) and a focal point can be set. |
| **RSVPs** | Guest replies. Admin-only; the public form never talks to this collection directly. |

### Blocks

Every block has an **anchor** (its `#hash`), an optional **nav label** (empty = not in the menu) and a **background**: Cream, White, or Cream panel on white (stored as `ivory`, `espresso`, `olive` from the first design), so sections can alternate like the Morais reference. The block **label** field is no longer shown on the page.

| Block | Purpose | Notable fields |
| --- | --- | --- |
| Hero | Opener | small-caps eyebrow ("Spara datumet"), headline (empty = the names), photo, paragraph under the date (falls back to weekday + venue), optional days-left line and CTA button |
| Our story | Text + up to two photos | rich text, milestones (date, title, text) |
| Schedule | Parts of the day side by side (Vigsel / Fest) | optional heading, events with title, place, address and time, optional button |
| Details | Practical info cards | venue, travel, accommodation, dress code, gifts… each with optional image and link |
| Gallery | Masonry photo grid | images with captions |
| RSVP form | Reply form | deadline (form closes after that day), max party size, toggles for dietary / song / message, success and closed messages |
| FAQ | Accordion | question + rich-text answer |
| Text | A statement in large type (the gift note) | small-caps label, text, optional button |

Add, remove and reorder blocks freely in the admin; the frontend renders whatever is in `layout`. To add a new block type: create `src/blocks/<Name>/config.ts` and `Component.tsx`, register both in `src/collections/Pages.ts` and `src/blocks/RenderBlocks.tsx`, then run `npm run generate:types`.

### RSVP flow

`src/blocks/Rsvp/Form.tsx` (client) → `src/actions/rsvp.ts` (server action) → Payload Local API. The action validates with zod, drops honeypot submissions, enforces the deadline and max party size from the block config, and rate-limits to 5 replies per 10 minutes per IP (in memory, per instance). Replies are listed under **Guests → RSVPs** in the admin and can be exported from there.

Every new reply triggers two plain-text emails from an `afterChange` hook on the collection (`src/hooks/rsvpEmails.ts`): a summary to the couple (`RSVP_NOTIFY_TO`, comma-separated; falls back to Site settings → contact email) and a confirmation to the guest in the site language with the wedding date. Mail goes through [Resend](https://resend.com) when `RESEND_API_KEY` is set (`EMAIL_FROM_ADDRESS` must be on a domain verified there); without it Payload logs the emails to the dev server console instead. Sending never blocks the reply: failures are logged and the guest still sees the success message.

### Guest password

The public page is behind one shared password, `GUEST_PASSWORD` in the environment. `src/proxy.ts` checks every request except `/admin`, `/api`, `/_next` and static files; without a valid cookie it shows `src/app/(frontend)/guest-login` in place of the page (the URL stays the same). The form posts to `src/actions/guestAccess.ts`, which allows 10 tries per 10 minutes per IP, compares the password without regard to case or surrounding spaces, and sets an httpOnly `guest_access` cookie for a year. The cookie is an HMAC of the password signed with `PAYLOAD_SECRET`, so changing `GUEST_PASSWORD` signs every guest out. The screen's text follows Site settings → language. The RSVP action checks the cookie as well, since server actions can be posted to any path.

Why an env var and not a Site settings field: the Site settings global is publicly readable at `/api/globals/site-settings`, so a password stored there would need its own field access rules to stay hidden. It would also need a database write to set it. Changing the env var means restarting or redeploying the server; on Vercel and similar hosts that's an edit in the dashboard.

If `GUEST_PASSWORD` is unset the gate is off in development, and in production nobody gets past it, so a missing variable can't leave the page open.

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
  actions/                 server actions: rsvp.ts (form), guestAccess.ts (guest password)
  proxy.ts                 guest password gate in front of the public page
  lib/                     data loaders, i18n strings, guest cookie, rate limiter, utils
  seed/                    seed script, demo content, placeholder image generator
  app/(frontend)/          layout, page, guest-login screen, styles.css (Tailwind theme + section themes)
  app/(payload)/           Payload admin and REST/GraphQL routes (generated)
```

## Design notes

Directly inspired by Squarespace's [Morais](https://www.squarespace.com/templates/morais-fluid-demo) wedding template: cream and white sections, everything centred, headings in regular-weight Helvetica Neue (Inter Tight on devices without it), body text in Libre Caslon Text, black outlined buttons, black-and-white photos. No eyebrows, section numbers or entrance animations. See `DESIGN.md` for the tokens and rules; colours and fonts live in `src/app/(frontend)/styles.css`.

## Scripts

| Command | |
| --- | --- |
| `npm run dev` / `npm run build` / `npm start` | Next.js |
| `npm run seed [-- --reset]` | Demo content |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing collections or blocks |
| `npm run generate:importmap` | Regenerate the admin import map after adding custom admin components |
| `npm run lint` / `npm run typecheck` | Checks |

## Deploying

Any Node host works (Vercel, Railway, a VPS). Set `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` and `GUEST_PASSWORD`. Uploaded files are stored on disk under `media/`; on serverless hosts swap in a Payload storage adapter (S3, Vercel Blob, Cloudflare R2).
