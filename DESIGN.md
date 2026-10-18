---
name: Johanna & Gustav
description: A one-page wedding site directly inspired by Squarespace's Morais. Cream paper, black ink, everything centred.
colors:
  cream: "#f5f1eb"
  cream-deep: "#ece6dc"
  white: "#ffffff"
  ink: "#111111"
  ink-soft: "#57524b"
  error: "#9b2c2c"
typography:
  hero:
    fontFamily: "Helvetica Neue, Helvetica, Inter Tight, Arial, sans-serif"
    fontSize: "clamp(3.25rem, 10vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Helvetica Neue, Helvetica, Inter Tight, Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Helvetica Neue, Helvetica, Inter Tight, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Libre Caslon Text, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  small:
    fontFamily: "Libre Caslon Text, Times New Roman, serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  ui:
    fontFamily: "Helvetica Neue, Helvetica, Inter Tight, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    letterSpacing: "0.01em"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  section: "80px"
  section-md: "112px"
  heading-gap: "48px"
  heading-gap-md: "64px"
  container: "1152px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
    height: "48px"
    width: "224px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
  input-box:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  nav-bar:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    padding: "28px 40px"
---

# Design System: Johanna & Gustav

## Overview

**Creative North Star: "Squarespace's Morais, made by a friend with taste"**

The page follows Squarespace's Morais wedding template closely. It should look like someone without much web experience made it, but someone with impeccable taste. Cream and white sections alternate down one long page. Everything is centred. Headings are a plain grotesque at regular weight, never bold. Everything you read is a bookish serif. Photos are black and white. There are no tricks: no eyebrows, no section numbers, no entrance animations, no sticky header changing colour, no ticking countdown.

The page is warm, unhurried and intimate. Each section is one heading, a few lines of text and maybe a photo or a short list, with generous space between. Its personality comes from restraint and good type, not decoration.

Three looks are off limits: template wedding sites (script fonts, blush pink, floral clip art, gold foil), app or SaaS UI (rounded cards, drop shadows, bright accent buttons, icons everywhere) and rustic DIY (kraft paper, twine, chalkboard, mason jars). The same goes for the developer-portfolio habits the first design had: tracked uppercase mono labels and 01 / 02 / 03 numbering.

**Key Characteristics:**
- Cream (#f5f1eb) and white sections alternate; one optional cream panel set on white
- Centred column, headings in regular-weight Helvetica Neue, body in Libre Caslon Text
- Black-and-white photographs inset in the column, never full-bleed
- Black 1px outlined buttons and boxed form fields, square corners, no shadows
- Nothing moves except colour on hover

## Colors

Two papers and one ink. Colour comes from the photographs, and they're black and white too.

### Neutral
- **Cream** (#f5f1eb): the page, the header, the footer, the hero and every second section. Form fields on a cream panel are white.
- **Cream Deep** (#ece6dc): a slightly darker cream, defined as a token for tonal variation.
- **White** (#ffffff): the alternate section background. Form fields on white are cream.
- **Ink** (#111111): all text, button outlines, the radio and checkbox fill, text selection.
- **Ink Soft** (#57524b): secondary text such as intros, locations and descriptions. It is 6.6:1 on cream.
- **Error** (#9b2c2c): form errors only. It is 6.5:1 on cream.

Each section theme sets `--bg`, `--fg`, `--fg-soft`, `--line` (ink at 22%) and `--field` (the input background). Components read only these. The stored theme values are still `ivory`, `espresso` and `olive`. They now mean Cream, White, and Cream panel on white, and the admin labels say so.

### Named Rules
**The Two Papers Rule.** Backgrounds are only cream or white. No colour fields, no dark sections, no gradients.

**The Colour Is in the Photos Rule.** Photos are shown in black and white (`grayscale`), so nothing on the page competes with the type.

## Typography

**Heading Font:** Helvetica Neue 400, the face Morais uses, on Apple devices. Inter Tight 400 is self-hosted for every other device (fallback Arial).
**Body Font:** Libre Caslon Text 400/700 with italic (fallback Times New Roman)

**Character:** A quiet Swiss grotesque for anything you glance at (names, headings, buttons, labels on form fields), and a warm book serif for anything you read. It's the pairing Morais uses, and it looks like a printed card rather than a website.

### Hierarchy
- **Hero** (400, clamp(3.25rem, 10vw, 6rem), line-height 1.02, -0.02em): the opening line ("Vi gifter oss") and the big date. Never larger than 6rem.
- **Display** (400, 2.25rem rising to 3rem, line-height 1.1, -0.02em): section headings (h2), always centred and balanced.
- **Headline** (400, 1.5–1.875rem): schedule items, detail cards, milestones.
- **Body** (Libre Caslon 400, 1.0625rem, line-height 1.75): running text, centred, 36rem wide at most.
- **Small** (Libre Caslon 400, 0.9375rem): captions, milestone dates, the contact email.
- **UI** (grotesque 400, 0.9375–1rem): nav links, button text, form field labels, in sentence case.

### Named Rules
**The No Eyebrow Rule.** Headings stand alone. No small labels above them, no "01 —" numbering, no tracked capitals. The block `label` field in the CMS is deliberately not rendered.

**The Regular Weight Rule.** Headings are weight 400. Size and space make them headings, never boldness.

## Layout

Everything sits in one centred column: max-width 1152px, side padding 20px (40px from 768px up), vertical section padding 80px (112px from 768px up). The heading sits 48–64px above its content. Text is centred. Lists of things (the schedule, detail cards, milestones) become centred columns in a grid: one on phones, two from 640px, three from 1024px. The FAQ is a single 42rem column with hairline rules. Breakpoints are Tailwind's defaults, 640 / 768 / 1024px.

The header is not fixed. The names are on the left; section links and an outlined reply button are on the right. On phones a two-line menu icon opens a full-screen cream overlay with the links in large grotesque. The hero is the announcement in large type, then a black-and-white photo inset (4:5 on phones, 3:2 from 640px), then the date set large, then one serif line and the reply button. The footer has the closing note, an em dash, a big underlined reply link, then the hashtag and email.

Motion is limited to colour changes on hover (200ms) and the FAQ plus rotating 45°. Nothing fades in and nothing parallaxes.

## Elevation & Depth

Completely flat. There are no shadows and no blur. Depth only comes from cream and white sections alternating, and from the one cream panel on white.

### Named Rules
**The Flat Paper Rule.** If two things need separating, use a 1px hairline in `--line` or a change of paper, never a shadow or a raised card.

## Shapes

Every corner is square: photos, buttons, inputs, the panel. Lines are 1px. The FAQ's open/close mark is a drawn 16px SVG plus, not a text character. Radios and checkboxes are native, tinted ink with `accent-color`, so they look the way people expect.

## Components

Plain, familiar and well spaced, like a good Squarespace site set up by someone careful.

### Buttons
- **Shape:** square, 1px ink outline, at least 48px tall and 224px wide.
- **Default:** transparent background, grotesque 1rem in sentence case, ink text.
- **Hover:** fills ink, and the text turns the section's paper colour (200ms).
- **Disabled:** 50% opacity, not clickable.
- **Links:** serif text with a 1px underline offset by 0.2em.

### Inputs / Fields
- **Style:** a full 1px box in `--line`, background `--field` (cream on white sections, white on cream), padding 12px × 16px, serif body text, square corners.
- **Label:** grotesque 0.9375rem above the field, in sentence case. "(frivilligt)" follows it in Ink Soft.
- **Focus:** the border turns ink and there is no glow. The global focus ring is a 1px ink outline offset by 4px.
- **Error:** Error-coloured text under the field with `role="alert"`.
- **Choice (attending):** native radio buttons stacked vertically with 44px tap rows, not styled chips.

### Navigation
- **Desktop:** names on the left (grotesque 1.125rem), section links at 0.9375rem that underline on hover, and the reply link as a small outlined box.
- **Mobile:** a two-line icon that becomes an X, opening a full-height cream overlay with centred links at 2.25rem.

### Hero (signature)
The announcement in large type, a black-and-white photo, the date in large type, then the weekday and venue with "244 dagar kvar" underneath. The day count updates once a minute and is blank on the server. The reply button comes last.

### Footer (signature)
The closing note, an em dash, the reply link at 3.75–4.5rem with a 1px underline, then the hashtag and contact email in small type. Lifted straight from Morais's closing RSVP.

## Do's and Don'ts

### Do:
- **Do** centre everything and keep running text under 36rem wide.
- **Do** set headings in the grotesque at weight 400 with -0.02em tracking, and everything people read in Libre Caslon Text.
- **Do** alternate cream and white sections, and use the cream panel on white at most once or twice a page.
- **Do** show photographs in black and white, inset in the column.
- **Do** use 1px ink outlines for buttons and 1px `--line` boxes for fields, square corners only.
- **Do** keep form labels and button text in sentence case, at readable sizes (0.9375rem or larger).

### Don't:
- **Don't** drift toward template wedding sites: no script fonts, blush pink, floral clip art or gold foil.
- **Don't** use app or SaaS UI: no rounded cards, drop shadows, bright accent buttons or icon-heavy layouts.
- **Don't** go rustic DIY: no kraft paper, twine, chalkboard or mason-jar textures.
- **Don't** put eyebrows or section numbers above headings, or use tracked uppercase labels.
- **Don't** add entrance animations, a sticky header that changes on scroll, or a ticking seconds countdown.
- **Don't** make headings bold or larger than 6rem.
