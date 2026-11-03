# Gustavs Hand

The handwriting font in `src/app/(frontend)/fonts/GustavsHand.woff2`, built from a photo of a hand-written alphabet (`sheet.jpg`).

## What's in it

- A–Z, Å Ä Ö, 0–9 and `+ - ! ?`, each written twice. The first version is the normal letter; the second is an alternate that the font swaps in for every other letter (OpenType `calt`), so doubled letters like the TT in ATT don't look identical.
- Lowercase letters map to the same capitals, as on the invitation.
- Made from the drawn letters, not written separately: W (two Vs), Ü (U with Ö's dots), `.` `:` `,` (the dot from `!`), and `'`/`’` (the top of an I).
- Not included: `@ / & ( ) " é ü` and other characters. Text that uses them falls back to the site's sans.

## Using it

The `font-hand` Tailwind class (or `font-family: var(--font-hand)`) sets text in it. Nothing on the page uses it yet. Give it extra letter and word spacing, roughly `letter-spacing: 0.08em; word-spacing: 0.35em`, to look like the invitation.

## Rebuilding

To change letters: write them again with the same pen on plain paper, in the same rows and order as `sheet.jpg`, with every character written twice. Photograph the page flat in daylight, then run:

```
python3 -m venv .venv && .venv/bin/pip install pillow numpy scipy fonttools brotli potracer
.venv/bin/python build.py sheet.jpg out
cp out/GustavsHand.woff2 "../../src/app/(frontend)/fonts/"
```

The row contents are listed at the top of `build.py` (`ROWS`). To add characters (for example W, @ or &), add another row to the sheet and to `ROWS`. A sharper photo or a 600 dpi scan gives smoother edges: the current sheet has letters about 36 px tall.
