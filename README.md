# Johanna & Gustav – bröllopssida

One-page wedding website. Editors build the page from blocks in Payload CMS; guests RSVP through a form that writes straight to the database.

**Stack:** Next.js 16 (App Router) · Payload CMS 3 · MongoDB · Tailwind CSS 4 · TypeScript · npm

## Getting started

```bash
cp .env.example .env        # then set PAYLOAD_SECRET to a long random string and GUEST_PASSWORD
npm install
npm run seed                # first admin user + the page content (the invitation card, placeholder photo)
npm run dev                 # http://localhost:3000  (admin at /admin)
```

Requires Node 20.9+ and a MongoDB reachable at `DATABASE_URL` (a free MongoDB Atlas cluster works; locally: `brew services start mongodb-community`).

Use npm (10+), which ships with Node. The lockfile is `package-lock.json`.

The seed creates the first admin from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` only when no user exists. Change that password after the first login. Re-running `npm run seed` leaves an existing home page alone; `npm run seed -- --reset` replaces the page and media (RSVPs are never touched).

## Content model

| Where | What |
| --- | --- |
| **Pages** | The page with slug `home` is rendered at `/`. Its `layout` is a list of blocks (below); the RSVP block is shown on its own page at `/osa` instead. Other slugs are ignored for now. |
| **Site settings** (global) | Names, date and time, venue line, language (`sv-SE` / `en-GB`), hashtag, contact email, footer note, countdown labels. |
| **Media** | Uploaded photos. Three sizes are generated (480 / 1000 / 1920 px) and a focal point can be set. |
| **RSVPs** | Guest replies. Admin-only; the public form never talks to this collection directly. |

### Blocks

Every block has an **anchor** (its `#hash`), an optional **nav label** (empty = not in the menu) and a **background** value (`ivory`, `espresso`, `olive`) kept from earlier designs. Every section is now the same card paper, so it no longer changes anything. The Text block's **label** is shown as its heading.

| Block | Purpose | Notable fields |
| --- | --- | --- |
| Hero | Opener | small-caps eyebrow ("Spara datumet"), headline (empty = the names), photo, paragraph under the date (falls back to weekday + venue), optional days-left line and CTA button |
| Our story | Text + up to two photos | rich text, milestones (date, title, text) |
| Schedule | Parts of the day side by side (Vigsel / Fest) | optional heading, events with title, place, address and time, optional button |
| Details | Practical info cards | venue, travel, accommodation, dress code, gifts… each with optional image and link |
| Gallery | Masonry photo grid | images with captions |
| RSVP form | Reply form, shown on its own page at `/osa` (buttons and menu links whose anchor is this block's anchor go there) | deadline (form closes after that day), max party size, toggles for dietary / song / message, success and closed messages |
| FAQ | Accordion | question + rich-text answer |
| Text | A statement in large type (the gift note) | small-caps label, text, optional button |

Add, remove and reorder blocks freely in the admin; the frontend renders whatever is in `layout`. To add a new block type: create `src/blocks/<Name>/config.ts` and `Component.tsx`, register both in `src/collections/Pages.ts` and `src/blocks/RenderBlocks.tsx`, then run `npm run generate:types`.

### RSVP flow

`/osa` (`src/app/(frontend)/osa/page.tsx`) → `src/blocks/Rsvp/Form.tsx` (client) → `src/actions/rsvp.ts` (server action) → Payload Local API. The action validates with zod, drops honeypot submissions, enforces the deadline and max party size from the block config, and rate-limits to 5 replies per 10 minutes per IP (in memory, per instance). Replies are listed under **Guests → RSVPs** in the admin and can be exported from there.

Every new reply triggers two plain-text emails from an `afterChange` hook on the collection (`src/hooks/rsvpEmails.ts`): a summary to the couple (`RSVP_NOTIFY_TO`, comma-separated; falls back to Site settings → contact email) and a confirmation to the guest in the site language with the wedding date. Mail goes through [Resend](https://resend.com) when `RESEND_API_KEY` is set (`EMAIL_FROM_ADDRESS` must be on a domain verified there); without it Payload logs the emails to the dev server console instead. Sending never blocks the reply: failures are logged and the guest still sees the success message.

### Guest password

The public page is behind one shared password, `GUEST_PASSWORD` in the environment. `src/proxy.ts` checks every request except `/admin`, `/api`, `/_next` and static files; without a valid cookie it shows `src/app/(frontend)/guest-login` in place of the page (the URL stays the same). The form posts to `src/actions/guestAccess.ts`, which allows 10 tries per 10 minutes per IP, compares the password without regard to case or surrounding spaces, and sets an httpOnly `guest_access` cookie for a year, then sends the guest back to the page they opened (so a shared `/osa` link lands on the form). The cookie is an HMAC of the password signed with `PAYLOAD_SECRET`, so changing `GUEST_PASSWORD` signs every guest out. The screen's text follows Site settings → language. The RSVP action checks the cookie as well, since server actions can be posted to any path.

Why an env var and not a Site settings field: the Site settings global is publicly readable at `/api/globals/site-settings`, so a password stored there would need its own field access rules to stay hidden. It would also need a database write to set it. Changing the env var means restarting or redeploying the server; on Vercel and similar hosts that's an edit in the dashboard.

If `GUEST_PASSWORD` is unset the gate is off in development, and in production nobody gets past it, so a missing variable can't leave the page open.

### Svenska / English

The site is in Swedish and English. Every text field in Pages, Site settings and Media is localized in Payload (`sv` default, `en`, with fallback to Swedish), so in `/admin` you pick the language at the top of the editor and translate field by field; anything not yet translated shows the Swedish text. Visitors switch with the word "English" / "Svenska" in the header (also on the password screen). The choice is kept in a `lang` cookie for a year; without one they see Site settings → Default language. Interface strings (form labels, errors, the password screen) live in `src/lib/i18n.ts`.

Each RSVP records the language the guest replied in (`language`), and their confirmation email is sent in it. The English copy of the seed content is in `src/seed/english.ts`; `npm run seed` writes both languages.

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
  app/(frontend)/          layout, page, osa/ (RSVP page), guest-login screen, styles.css (Tailwind theme + section themes)
  app/(payload)/           Payload admin and REST/GraphQL routes (generated)
```

## Design notes

The site is the printed invitation card, opened: the card's grey paper (`public/card/paper.jpg`), the pencil drawing of two sheep cut from the card (`public/card/sheep.png`), and every word in a font made from Gustav's handwriting (`design/handwriting/`). Graphite is the only colour. Buttons are words circled in pencil, form fields are ruled lines, and the photo sits on the paper as a small print. See `DESIGN.md` for the tokens and rules; colours and fonts live in `src/app/(frontend)/styles.css`.

To copy the card's facts into existing content (Site settings and the home page's opening, schedule and travel blocks), run `npx tsx --env-file=.env src/seed/apply-card.ts`.

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
