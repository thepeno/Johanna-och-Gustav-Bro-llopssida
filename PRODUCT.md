# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Guests**, three groups the site must serve equally:
  - Swedish-speaking family, including older relatives.
  - Friends, mostly on phones, opening the link from a group chat or a save-the-date.
  - Guests who don't speak Swedish and need the site in English.
  Their job: find out when, where and what is expected of them, and reply (RSVP) before the deadline.
- **The couple, Johanna and Gustav, as editors.** They build and update the page in Payload's admin (`/admin`) and read, follow up on and export the RSVPs there.

## Product Purpose

A one-page wedding website for Johanna and Gustav. It gives every guest the practical information about the day and collects their RSVP, including party size, guest names, dietary needs, a song request and a message. Success means every invited guest can reply without help, and the couple has complete, accurate replies in the admin to plan from (seating, catering, music).

## Positioning

A private site built for one wedding, not a template service. The couple own the content and the guest data: replies go straight into their own database and admin, with an Excel export, and are not held by a third-party wedding platform.

## Operating Context

- Guests usually arrive on a phone from a shared link, read once, reply, and come back closer to the day for schedule, travel and practical details.
- The couple edit content block by block in the admin (Hero, Our story, Schedule, Details, Gallery, RSVP, FAQ), reorder sections and pick each section's theme.
- Each RSVP sends an email to the couple and a confirmation to the guest (through Resend once configured).

## Capabilities and Constraints

- Stack: Next.js 16 (App Router), Payload CMS 3, MongoDB, Tailwind CSS 4, TypeScript, npm.
- One page: the `home` page's block layout is rendered at `/`.
- RSVP form: closes after the deadline day, limits party size, has toggles for dietary, song and message questions, a honeypot field and per-IP rate limiting. Typed values are kept after a failed submit.
- Language: the site language is set in Site settings (`sv-SE` / `en-GB`). Interface strings exist in both languages, but page content is not localised yet. **An English version for non-Swedish guests is required, not optional.**
- Access: guests enter a shared password before the page shows (`/guest-login`).
- The wedding, as on the invitation card: Saturday 14 August 2027. The ceremony is at 13:00 in Förkärla kyrka, Blekinge; the party follows later the same day at Agdatorps gård. Dress code: dark suit (mörk kostym). The site's domain is edmarknordahl.se.
- **Open:** the party's start and end times (the card only says "senare"), the RSVP deadline (15 June 2027 is set but not confirmed by the card).
- Before launch: email sending (`RESEND_API_KEY`, `EMAIL_FROM_*`, `RSVP_NOTIFY_TO`), a storage adapter for uploads if hosted serverless, and real links (venue, hotel, map, booking, toastmaster).

## Brand Commitments

- Names: written "Gustav + Johanna" on the invitation (Gustav first, a plus rather than an ampersand). Swedish is the primary language.
- The invitation card is the visual source: the pencil drawing of two sheep, Gustav's hand-lettered capitals and the card's paper. The site follows the card. The lettering is a font made from Gustav's handwriting (`design/handwriting/`), and the drawing is cut from the card's photo.

## Evidence on Hand

- Real content: the invitation card's text, the sheep drawing, the handwriting, and a black-and-white photo of the couple.
- Do not invent party times, hotel tips, travel details or FAQ answers. They must come from the couple.

## Product Principles

1. **Every guest can reply on their own.** On a phone, in Swedish or English, and for older relatives, without needing to ask anyone.
2. **Replies are complete and trustworthy.** No input is lost, and the couple can act on what's in the admin without chasing anyone.
3. **The couple control everything without a developer.** Content, sections and replies are managed in the admin.
4. **Private by default.** Behind a guest password, with guest data kept in the couple's own system.

## Accessibility & Inclusion

- Readable for older relatives on small screens: comfortable text sizes, clear contrast, large tap targets.
- Bilingual: Swedish first, English for guests who don't speak Swedish.
