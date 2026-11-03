---
version: 1
slug: "src-app-frontend-page-tsx"
primary_target: "src/app/(frontend)/page.tsx"
related_targets: ["src/app/(frontend)/osa/page.tsx","src/app/(frontend)/guest-login/page.tsx"]
---

## Surface

The wedding one-pager (`/`), with the reply page (`/osa`) and the guest password page (`/guest-login`) in the same world. Visitor mode: Persuade. Guests open a link, understand when and where, and reply.

Audience: Swedish-speaking family (including older relatives on phones), friends on phones, guests who need English. Action: reply (OSA) on `/osa`. Content: the invitation card's text and facts, one black-and-white photo of the couple, travel places, the gift note.

## Direction contract

THESIS: The website is the invitation card, opened. The page refuses the wedding-template site (big photo hero, script names, alternating colour bands) and the Squarespace-Morais look it replaces. It is one sheet of the card's cool grey paper, with Gustav's pencil sheep and his hand-lettered capitals carrying every word.

OWN-WORLD: The card's paper (#e6e8e8 with its own grain, tiled from the card photo) is the only ground. Graphite ink (#262626) is the only colour, plus a softer graphite for small print. Every word is set in Gustav's Hand, a font made from his capitals, widely spaced like the card. The sheep drawing is cut from the card. Lines are pencil: 1.5px graphite rules, form fields written on a ruled line, and buttons as a hand-drawn loop around a word. There are no boxes, fills, shadows or second colour. The photo is the one object laid on the paper, a small black-and-white print with a white border.

STORY: The guest sees the card they were sent and knows it is the same invitation. They read the day (ceremony 13:00 at Förkärla kyrka, then party at Agdatorps gård), see the dress code and the reply link in the corners, scroll through the day, travel and gifts as further lines on the same sheet, and reply.

FIRST VIEWPORT: As the card. The sheep is centred in the upper third, at about 30% of the screen height (roughly 220–300px), so the whole card and both corner notes fit the first screen. "Gustav + Johanna" is centred under it at small size. Below that, the invitation is a left-aligned block centred on the page, with the card's line breaks and space between groups. Bottom-left corner: "OSA senast 15 juni", a pencil-underlined link to `/osa` and the primary action. Bottom-right corner: "Klädsel: mörk kostym". There is no nav bar over the card, only a quiet menu link at the top right.

FORM: The invitation card itself, pinned by the user's brief; the roll was run for the record and its assignment yields to the pin. seed:7eaf968dc84bd21e

Signature interaction: on the reply form, choosing "Kommer" or "Kommer inte" draws a pencil loop around the answer. Motion grammar: the sheep and card lines settle in once on load (a short fade with a slight rise, already visible with reduced motion); nothing else moves except the pencil loop.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Party times (the card only says "senare") and the RSVP deadline are not confirmed.
- English versions of the card text.
