---
name: Johanna & Gustav
description: A one-page wedding site after Squarespace's Morais, made warm, unhurried and personal.
colors:
  paper: "#efece6"
  paper-deep: "#e4dfd5"
  sand: "#cfc6b6"
  dark-roast: "#2a1412"
  dark-roast-soft: "#3b1f1b"
  sage: "#7f8158"
  sage-deep: "#666841"
  ink: "#1d1a17"
  ink-soft: "#5d574f"
typography:
  hero:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(3rem, 15vw, 9.5vw)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "normal"
  display:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "normal"
  headline:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.02
  lead:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.22em"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-md: "40px"
  section: "96px"
  section-md: "144px"
  heading-gap: "56px"
  heading-gap-md: "80px"
  container: "1280px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-outline-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-outline-on-dark-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.dark-roast}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  choice-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  choice-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-bar-solid:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "16px 40px"
---

# Design System: Johanna & Gustav

## Overview

**Creative North Star: "Squarespace's Morais, made personal"**

The site follows Squarespace's Morais, an editorial photography template: big italic serif headlines, tiny mono labels with wide letter-spacing, numbered lists, and full-width sections in alternating colours. This version makes it warm, unhurried and intimate. Paper-coloured pages, dark-roast and sage sections, slow fade-ins and plenty of whitespace make it read like a personal letter, not a product. Nothing hurries the guest along. There is one long page, one action (reply), and room to read.

It's a long-scroll page with a calm pace. Each section is one idea, set inside a 1280px column with generous vertical padding, and the theme alternates from section to section. Photos are square-cornered and usually full-bleed, in fixed aspect ratios. All depth comes from colour changes between sections, never from shadows.

The look must never drift toward three things: template wedding sites (script fonts, blush pink, floral clip art, gold foil), app or SaaS UI (rounded cards, drop shadows, bright accent buttons, icons everywhere) or rustic DIY (kraft paper, twine, chalkboard, mason jars).

**Key Characteristics:**
- Three section themes (Paper, Dark Roast, Sage) that editors choose block by block
- An italic serif for every headline, a soft serif for body text, and tiny uppercase mono labels
- Square corners everywhere, hairline rules, no shadows
- Numbered entries (01, 02, 03) as the main way to organise content
- Printed, not pressed: controls are outlines and underlines that fill in with ink on hover

## Colors

A warm, low-chroma palette of paper, coffee and leaf, with near-black ink in place of pure black.

### Primary
- **Dark Roast** (#2a1412): the dark theme. The hero, footer and password screen use it, and editors pick it for any section that should feel like evening. Text on it is Paper.
- **Sage** (#7f8158): the third section theme, a muted green-grey for one or two calm sections. Text on it is Paper, with Paper as the accent.

### Neutral
- **Paper** (#efece6): the default page and section background, and the text colour on dark sections.
- **Paper Deep** (#e4dfd5): a slightly darker paper, defined as a token for tonal variation.
- **Sand** (#cfc6b6): the accent on Dark Roast sections, and the tick colour of the password screen's "show" checkbox.
- **Dark Roast Soft** (#3b1f1b): a lighter step of Dark Roast, defined as a token for tonal variation.
- **Sage Deep** (#666841): a darker step of Sage, defined as a token.
- **Ink** (#1d1a17): body text and headlines on Paper. Never use #000.
- **Ink Soft** (#5d574f): secondary text and labels on Paper.

Every section theme sets five CSS variables: `--bg`, `--fg`, `--fg-soft`, `--line` (the foreground at 18–25% opacity, for hairlines) and `--accent`. Components only ever read these variables, so the same block works on all three themes.

### Named Rules
**The Theme Token Rule.** Components never name a colour directly. They use `--fg`, `--bg`, `--fg-soft` and `--line`. Anything that inverts on hover or selection uses `text-(--bg)`, because a hard-coded Paper is invisible on a Paper section.

**The No Pure Black Rule.** Text is Ink (#1d1a17) or Dark Roast; never #000 or #fff.

## Typography

**Display Font:** EB Garamond Italic, weight 400 (fallback Georgia, serif)
**Body Font:** Cormorant Garamond, weights 400/500/600, roman and italic (fallback Georgia, serif)
**Label Font:** DM Mono, weights 400/500 (fallback ui-monospace)

**Character:** Two Garamonds set the tone. One is a formal italic for names and headlines, the other a softer serif that reads like handwriting set in type. DM Mono adds small printer's notes around them: dates, numbers, labels.

### Hierarchy
- **Hero** (400 italic, 15vw on phones and 9.5vw on desktop, line-height 0.95): only the couple's names in the hero.
- **Display** (400 italic, 2.25rem rising to 3.75rem, line-height 1.02): section headlines (h2), the footer names, the password screen names (3.75–4.5rem).
- **Headline** (400 italic, 1.875–2.25rem, line-height 1.02): h3s for milestones, schedule times, detail cards and countdown digits.
- **Lead** (Cormorant italic, 1.25–1.5rem): taglines, locations, the footer note, success and closed messages.
- **Body** (Cormorant 400, 1.0625rem, line-height 1.6; intros at 1.125–1.25rem): running text, kept to about 36–42rem wide (`max-w-xl` / `max-w-2xl`).
- **Label** (DM Mono 400, 0.6875rem, letter-spacing 0.22em, uppercase, `--fg-soft`): eyebrows, nav links, field labels, numbering, buttons, dates.

### Named Rules
**The Å Ä Ö Rule.** Display type keeps a line-height of at least 1.02, so the rings and dots on Å, Ä and Ö don't touch the line above. The hero names use 0.95, which works only because names rarely carry them. Don't copy 0.95 elsewhere.

**The Two Voices Rule.** Any piece of text is either serif or mono label. Never set body text in mono, and never set labels in serif.

## Layout

There is one column per section: `max-width: 1280px`, side padding 20px (40px from 768px up), vertical padding 96px (144px from 768px up). A section heading sits 56–80px above its content. Inside sections, a 12-column grid splits content asymmetrically: text 5–6 columns, form or images 6 columns, FAQ heading 4 columns and answers 8. On phones everything stacks in one column.

Breakpoints are Tailwind's defaults: 640px (`sm`), 768px (`md`) and 1024px (`lg`). Lists are separated by hairline rules (`border-t` in `--line`, with a closing `border-b`), not by cards or boxes. Images keep fixed aspect ratios (4:5 and 3:4), and the Story block staggers two images vertically by 96px. The gallery is a masonry layout, two columns on phones and three from 768px.

Motion is slow and rare. Entry content uses `fade-up` (0.9s, `cubic-bezier(0.2, 0.7, 0.2, 1)`, rising 18px). Hover states fade over 300ms, and the nav changes from transparent to solid over 500ms. Nothing bounces.

## Elevation & Depth

The system is flat. Depth comes from the colour of whole sections: a Dark Roast hero, Paper content, a Sage section, a Dark Roast footer. There are no `box-shadow`s, with one exception: the scrolled nav bar draws a 1px hairline as `shadow-[0_1px_0_var(--line)]` over a backdrop blur, a border rather than a lift. The hero darkens its photo with a Dark Roast gradient (55% → 25% → 85%) so Paper text stays readable.

### Named Rules
**The Ink-on-Paper Rule.** Nothing floats. If something needs separating, use a hairline in `--line` or a change of section colour, never a shadow or a raised card.

## Shapes

Every corner is square (0px): images, buttons, fields, choice chips, the nav bar. Lines are 1px, either `--line` for structure or `currentColor` for interactive outlines and link underlines. The FAQ's open/close sign is a typographic `+` that rotates 45°, not an icon. Arrows are text characters (`↗`), not icon fonts.

## Components

Printed, not pressed. Controls look like ink on paper: outlines, underlines and type. They answer hover by filling with ink, never by lifting.

### Buttons
- **Shape:** square (0px), 1px `currentColor` outline.
- **Default:** transparent background, label type (DM Mono uppercase, letter-spacing 0.22em), padding 16px × 28px, takes the section's `--fg`.
- **Hover:** fills with `--fg` and the text turns `--bg`, over 300ms. On the hero the button's `--fg`/`--bg` are forced to Paper/Dark Roast.
- **Disabled:** 50% opacity, not clickable.
- **Text link:** label type with a 1px `currentColor` underline (`border-b`, padding-bottom 4px) and an optional `↗`.

### Choice chips (RSVP yes/no)
- **Style:** label type in a 1px `--line` outline, padding 12px × 20px, with a hidden radio inside.
- **Selected:** outline and fill in `--fg`, text in `--bg`.

### Inputs / Fields
- **Style:** no box. Only a 1px `--line` bottom border, transparent background, no side padding, 12px top and bottom, Cormorant at 1.25rem (1.5rem on the password screen), text in `--fg`.
- **Label:** label type above the field. "Optional" hints sit at the right in normal case at 60% opacity.
- **Focus:** the bottom border turns `--fg`. There is no glow or ring.
- **Error:** label-type text in red-400 (red-300 on Dark Roast) with `role="alert"` under the field. Red-400 on Paper has low contrast. That's a known gap, not part of the style.

### Navigation
- **Top of page:** transparent over the hero, Paper text, the couple's initials as a monogram on the left ("J & G", display type, letter-spacing 0.15em), label-type links on the right at 80% opacity, full opacity on hover.
- **Scrolled or open:** switches to the Paper theme at 95% opacity with a backdrop blur and a 1px hairline underneath.
- **Mobile:** a "Meny"/"Stäng" text button with a 24px rule beside it. The menu opens as a list of display-type links at 1.875rem.

### Numbered entry (signature)
Content in Story milestones, Details cards and the schedule is organised by number, not by boxes. Each entry has a label-type number ("01." with an optional date), a display-type title and body text in `--fg-soft`. Entries sit on hairline rules or in a 2–3 column grid.

### Countdown (signature)
Four units in a row. The digits are display type at 1.875–3rem with tabular figures, and the unit names are label type at 70% opacity. The server renders `--` so the page never mismatches on hydration.

## Do's and Don'ts

### Do:
- **Do** take every colour from the section's theme variables (`--fg`, `--bg`, `--fg-soft`, `--line`) so a block works on Paper, Dark Roast and Sage alike.
- **Do** set headlines in EB Garamond Italic 400 with a line-height of at least 1.02, and every small piece of metadata in DM Mono uppercase at 0.6875rem and letter-spacing 0.22em.
- **Do** organise content with label-type numbers (01, 02, 03) and hairline rules.
- **Do** keep corners square and lines at 1px.
- **Do** keep motion to the `fade-up` entrance and 300ms colour fades.
- **Do** leave room: sections get 96–144px of vertical padding, and running text stays under about 42rem wide.

### Don't:
- **Don't** drift toward template wedding sites: no script fonts, blush pink, floral clip art or gold foil.
- **Don't** use app or SaaS UI: no rounded cards, drop shadows, bright accent buttons or icon-heavy layouts.
- **Don't** go rustic DIY: no kraft paper, twine, chalkboard or mason-jar textures.
- **Don't** hard-code Paper or Ink in components. An inverted state that hard-codes Paper disappears on a Paper section.
- **Don't** use #000, #fff or any saturated colour outside the palette. The red error text is the only exception.
- **Don't** set display type tighter than a line-height of 1.02 outside the hero names.
