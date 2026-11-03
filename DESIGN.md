---
name: Johanna & Gustav
description: The wedding invitation card, opened. One sheet of cool grey card paper, graphite pencil, and every word in Gustav's own hand-lettered capitals.
colors:
  graphite: "#262626"
  graphite-soft: "#4f5150"
  pencil-line: "#7c7d7d"
  paper: "#e6e8e8"
  print-white: "#f7f7f4"
  error-red: "#8a2a22"
typography:
  display:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.14em"
  headline:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.16em"
  title:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 2.1vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
  invitation:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(0.97rem, min(4vw, 2.6svh), 1.6rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.09em"
  body:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "0.07em"
  body-md:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "0.07em"
  label:
    fontFamily: "Gustavs Hand, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.08em"
  plain:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  field-gap: "36px"
  heading-gap: "48px"
  heading-gap-md: "64px"
  section: "80px"
  section-md: "112px"
  column: "56rem"
  sheet: "64rem"
components:
  button-loop:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
    height: "48px"
  input-ruled:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 0"
    height: "48px"
  input-ruled-plain:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.plain}"
    rounded: "{rounded.none}"
    padding: "8px 0"
    height: "48px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    height: "48px"
  photo-print:
    backgroundColor: "{colors.print-white}"
    padding: "0.6rem 0.6rem 2.4rem"
    rounded: "{rounded.none}"
---

# Design System: Johanna & Gustav

## Overview

**Creative North Star: "The Card, Opened"**

The site is the printed invitation the guests were sent, unfolded into a scrolling sheet. There is one ground, the card's own cool grey paper with its grain tiled from a photograph of the card, and one ink, graphite pencil. Gustav's pencil sheep, cut from the card, sits at the top of the first screen; every word below it, body text included, is set in Gustavs Hand, a font built from his own capitals (`design/handwriting/build.py`). The page reads like further lines written on the same sheet, not like a wedding template.

Density is low and the measure is narrow. Lines are widely letter- and word-spaced, as on the card, and grouped by blank space rather than by boxes or bands. Hierarchy is carried by space, position and the pencil loop, never by weight or large size, because a pencil stroke does not get thicker when you write bigger. The only object laid on the paper is a photo, a small black-and-white print with a white border, slightly askew.

This world replaces the earlier Squarespace-Morais system (cream and white bands, Helvetica headlines with a Caslon italic). Nothing from that system carries forward except the stored section theme names, kept so old content still renders.

**Key Characteristics:**
- One paper, one graphite ink; no second surface, no colour bands.
- Every word in Gustavs Hand, capitals only, widely spaced.
- Sizes held close together; hierarchy from space and position.
- Actions are words circled in a hand-drawn pencil loop.
- Fields are written on a single ruled pencil line.
- The photo print is the only lifted object; everything else is flat on the paper.
- Motion is the card settling in once, and the pencil loop drawing itself.

## Colors

A monochrome pencil-on-card palette: a cool, barely blue grey paper and near-black graphite.

### Primary
- **Graphite** (#262626): all text, the pencil loop, the select chevron, focus outlines and the active state of ruled lines. It is the only ink.

### Neutral
- **Card Paper** (#e6e8e8): the single ground for every section, the guest login and the open mobile menu, always under the tiled card-grain photo (`/card/paper.jpg`, 1024px tile). Sampled from the card.
- **Soft Graphite** (#4f5150): small print, corner notes, secondary lines in schedule and details, answers in the FAQ (6.9:1 on the paper).
- **Pencil Line** (#7c7d7d): resting ruled lines under fields and between FAQ rows. Canonically graphite mixed at 55% into transparency, so the paper grain shows through; it reads as a lighter pencil stroke and darkens to full graphite on focus.
- **Print White** (#f7f7f4): only the border of the photo print. It is a material, not a surface for content.

### Functional
- **Error Red** (#8a2a22): form error messages and the ruled line of an invalid field. Nothing else.

### Named Rules
**The One Sheet Rule.** Every section is the same paper. The stored section themes (ivory, espresso, olive) all resolve to the same graphite on the same paper; they exist for content compatibility and must not be revived as alternating bands.

**The Graphite Only Rule.** Graphite is the only colour that carries meaning. Error red is the single functional exception and appears only beside a failed field.

## Typography

**Display Font:** Gustavs Hand (with Helvetica Neue, Helvetica, Arial fallback)
**Body Font:** Gustavs Hand, the same face
**Plain Font:** Helvetica Neue, Helvetica, Arial, only where the hand cannot show the content

**Character:** One hand for everything: uneven, upright pencil capitals, spaced out the way someone letters a card slowly. Lowercase maps to the capitals, so case does not exist on the site. Weight is always 400.

### Hierarchy
- **Display** (400, clamp(2.25rem, 5vw, 3rem), 1.1, 0.14em): only the closing "OSA" in the footer, circled in pencil. This is the largest the hand gets before its stroke reads as marker.
- **Headline** (400, clamp(1.35rem, 2.2vw, 1.65rem), 1.45, 0.16em, word-spacing 0.35em, balanced): section headings and schedule event titles, barely larger than the text, centred like the names on the card.
- **Title** (400, clamp(1.15rem, 2.1vw, 1.5rem), 1.4, 0.16em): the names line under the sheep and on the guest login.
- **Invitation** (400, clamp(0.97rem, min(4vw, 2.6svh), 1.6rem), 1.65, 0.09em, word-spacing 0.3em / 0.45em from 768px): the card's lines on the first screen, sized by both width and height so the longest line fits a phone and the whole card fits the first viewport. Keeps the card's own line breaks; an empty line starts a new group.
- **Body** (400, 1.1875rem / 1.3125rem from 768px, 1.85, 0.07em, word-spacing 0.3em): all running text. Measure is held to about 34–36rem.
- **Label** (400, 0.9375rem / 1rem from 768px, 1.7, 0.08em, soft graphite): corner notes, field labels, the nav, milestone dates, footer small print.
- **Plain** (Helvetica, 400, normal tracking): the password field and the footer email address only.

### Named Rules
**The Pencil Doesn't Thicken Rule.** Sizes stay between roughly 15px and 48px and the weight never changes. A new level of importance is made with more space around it, a position (centred, a corner), or a pencil loop, not with a bigger or bolder setting.

**The One Hand Rule.** Every word is in Gustavs Hand. The plain face is used only when the hand physically cannot render the content (visible case in a password, an @ in an address), and then for the whole string; never mix the two faces within one line.

## Layout

A single centred column on one continuous sheet. The first screen is a full-viewport card (min-height 100svh, max width 64rem): the sheep centred in the upper part at about a quarter to a third of the screen height (width min(56vw, 15rem, 30svh) on phones, min(20rem, 26svh) from 768px), the names centred beneath, then the invitation as a left-aligned block that is itself centred on the page (`w-fit`). The two corner notes sit on the bottom edge: the reply link bottom-left, the dress code bottom-right.

Sections below use a 56rem sheet with 20px side gutters (40px from 768px) and 80px vertical padding (112px from 768px). Headings are centred with 48px (64px) of space before content; intros and prose drop back to a left-aligned measure of about 34rem. Repeated items (schedule events, detail entries, milestones) form a narrow grid that is centred as a whole, with wide gutters (96px between columns, 48–56px between rows), going to two columns from 640px and three from 1024px. Forms stack fields with 36px between them, two columns from 640px for short fields.

Photo prints break the grid gently: each is rotated between -1.5° and 2°, alternating, and galleries flow as two columns (three from 768px).

### Named Rules
**The Space Is the Hierarchy Rule.** Groups are separated by blank paper, never by a band, card or divider. If a section needs to feel more important, give it more room.

## Elevation & Depth

The system is flat: everything is written directly on the paper and the paper's grain is the only texture. There is exactly one lifted object, the photo print, which carries a soft two-layer shadow as if laid on the card.

### Shadow Vocabulary
- **Laid print** (`box-shadow: 0 1px 1px rgb(38 38 38 / 0.12), 0 10px 26px -8px rgb(38 38 38 / 0.28)`): only on photo prints.

### Named Rules
**The Single Print Rule.** Only a photograph may be lifted off the paper. Text, buttons, fields, menus and panels never take a shadow, fill or box.

## Shapes

No radius anywhere; nothing is a rectangle that needs one, because nothing is boxed. Form language is the pencil stroke: 1.5px ruled lines (fields, FAQ rows, link underlines at 0.32em offset), a 1.5px dashed focus outline 5px off the element, and the irregular hand-drawn loop. Strokes keep their width when stretched (`vector-effect: non-scaling-stroke`). Photos are 4:5, desaturated to greyscale, inside a white border that is deeper at the bottom like an instant print.

## Components

### Buttons (the circled word)
A word circled in pencil, as you would mark an answer on a card.
- **Shape:** no box; an open, hand-drawn SVG loop (1.6px graphite, round caps) stretched around the word, extending 0.9em past each side and 0.45em above and below.
- **Primary:** transparent, graphite text at 1.15em with 0.12em tracking, minimum 48px tall, horizontal margin 0.9em so the loop has room.
- **Hover / Focus:** the loop redraws itself (650ms, pencil ease) and thickens to 2.2px. Focus also shows the dashed outline.
- **Disabled:** 50% opacity, no pointer events.
- **Large variant:** the footer "OSA" set at Display size with a tighter loop.

### Inputs / Fields
- **Style:** written on a ruled line: transparent, no radius, a single 1.5px pencil-line rule underneath, no side or top borders, 48px minimum height, text in the hand at body size.
- **Focus:** the rule darkens to full graphite; no glow, no outline.
- **Error:** the rule turns error red and a label-size message in error red follows.
- **Select:** same ruled line, with an inline 1.5px graphite chevron on the right.
- **Password:** same ruled line, set in the plain face so case is visible.

### Choice (the circled answer)
The signature interaction. Radio answers ("Ja, jag kommer" / "Tyvärr, jag kan inte") are words at 1.15em; the chosen one gets a pencil loop that draws itself in (650ms). The native radio is visually hidden; keyboard focus shows a 1.5px dashed outline 0.7em off the word.

### Navigation
- **Style:** no bar. A monogram ("G + J") top-left and a line of label-size links top-right, absolutely positioned over the card, graphite, underlined only on hover.
- **Mobile:** the links collapse to one word, "Meny" / "Stäng", which opens a full-screen sheet of the same paper with the links centred at Headline size.

### Photo Print
A small black-and-white photograph laid on the card: print-white border (0.6rem, 2.4rem at the bottom), greyscale image at 4:5, the laid-print shadow, a slight rotation. Used for the hero photo, story images, detail images and the gallery.

### FAQ Rows
Native disclosure rows separated by 1.5px pencil lines, at least 56px tall; the answer opens below in soft graphite.

## Do's and Don'ts

### Do:
- **Do** set every word in Gustavs Hand at weight 400, widely tracked (0.07em body, 0.16em headings).
- **Do** keep every section on the same card paper with its tiled grain.
- **Do** make actions a word circled with the pencil loop, and answers a word that gets circled when chosen.
- **Do** write fields on a single 1.5px ruled line that darkens to graphite on focus.
- **Do** create hierarchy with space, centring and corner positions before reaching for size.
- **Do** lay photos as greyscale prints with a white border, a soft shadow and a slight tilt.
- **Do** switch a whole string to the plain face when the hand cannot render it (visible case, an @).
- **Do** keep motion to the one load sequence (lines fade up 8px in reading order, 900ms, 90ms apart) and the pencil-loop draw, both off under reduced motion with the content fully visible.

### Don't:
- **Don't** introduce a second surface colour or alternate section bands; the theme values are inert.
- **Don't** add a second accent colour; error red is for errors only.
- **Don't** set display text larger than 3rem or use bold; the pencil stroke would turn into marker.
- **Don't** put text, buttons, fields or menus in boxes, fills or shadows; the photo print is the only lifted object.
- **Don't** use filled or bordered rectangular buttons, or rounded corners.
- **Don't** mix the hand and the plain face inside one word or line.
- **Don't** put a navigation bar over the card.
