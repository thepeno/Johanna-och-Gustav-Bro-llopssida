"""Build a handwriting font from a photographed alphabet sheet.

Usage: build.py sheet.jpg out_dir
Each character is written twice; the first becomes the default glyph, the
second an alternate that `calt` swaps in for every other letter.
"""
import sys, os, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
import potrace
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.recordingPen import RecordingPen
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from fontTools.agl import UV2AGL

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

ROWS = [
    "AABBCCDDEEFFGGHHIIJJ",
    "KKLLMMNNOOPPQQRRSSTT",
    "UUVVXXYYZZÅÅÄÄÖÖ",
    "11223344556677889900",
    "++--!!??",
]
THRESH = 0.72
UP = 8            # upsample factor before tracing, for smoother outlines
UPM = 1000
CAP = 700         # cap height in font units
SB = 55           # side bearing
SPACE = 330

im = np.asarray(Image.open(src).convert('L')).astype(float)
norm = im / ndi.gaussian_filter(im, 40)
ink = norm < THRESH
lab, n = ndi.label(ink)
objs = ndi.find_objects(lab)
sizes = ndi.sum(ink, lab, range(1, n + 1))
comps = []
for i, (sl, sz) in enumerate(zip(objs, sizes)):
    y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
    if sz < 12 or (x1 - x0) < 4 and (y1 - y0) > 200:   # specks, paper edge
        continue
    if y1 - y0 > 150:
        continue
    comps.append(dict(y0=y0, y1=y1, x0=x0, x1=x1, id=i + 1, size=int(sz)))

# Rows: cluster by vertical centre
comps.sort(key=lambda c: (c['y0'] + c['y1']) / 2)
rows, cur = [], [comps[0]]
for c in comps[1:]:
    if (c['y0'] + c['y1']) / 2 - (cur[-1]['y0'] + cur[-1]['y1']) / 2 > 60:
        rows.append(cur); cur = [c]
    else:
        cur.append(c)
rows.append(cur)
assert len(rows) == len(ROWS), [len(r) for r in rows]

glyph_imgs = {}   # name -> (mask, baseline_y_in_mask, ...)
cells = []
for r, (row, chars) in enumerate(zip(rows, ROWS)):
    row.sort(key=lambda c: c['x0'])
    # merge horizontally overlapping parts (diacritics, dots)
    groups = []
    for c in row:
        if groups:
            g = groups[-1]
            ov = min(g['x1'], c['x1']) - max(g['x0'], c['x0'])
            if ov > 0.4 * min(g['x1'] - g['x0'], c['x1'] - c['x0']):
                g['parts'].append(c['id'])
                if c['size'] > g['body'][2]:      # the biggest part is the letter body
                    g['body'] = (c['y0'], c['y1'], c['size'])
                for k, f in (('x0', min), ('y0', min), ('x1', max), ('y1', max)):
                    g[k] = f(g[k], c[k])
                continue
        groups.append(dict(c, parts=[c['id']], body=(c['y0'], c['y1'], c['size'])))
    assert len(groups) == len(chars), (r, len(groups), len(chars))
    # baseline per row: line fitted through the bottoms of glyphs that sit on it
    xs = np.array([(g['x0'] + g['x1']) / 2 for g in groups])
    ys = np.array([g['y1'] for g in groups], float)
    if r == 4:   # + and - float; use ! and ? for the baseline
        sel = np.array([ch in '!?' for ch in chars])
        k, m = np.polyfit(xs[sel], ys[sel], 0)[0] * 0, np.median(ys[sel])
    else:
        k, m = np.polyfit(xs, ys, 1)
    for idx, (g, ch) in enumerate(zip(groups, chars)):
        alt = idx % 2 == 1
        g['char'], g['alt'] = ch, alt
        fit = k * (g['x0'] + g['x1']) / 2 + m
        if ch in '+-!?Q':
            g['baseline'] = fit          # floating marks and Q's tail keep the row's line
        else:
            # sit on the glyph's own bottom, keeping at most a pixel of the hand's bounce
            g['baseline'] = g['body'][1] + float(np.clip(fit - g['body'][1], -1.0, 1.0))
        cells.append(g)

# global scale: median height of plain capitals (no diacritics) -> CAP
plain = [g['y1'] - g['y0'] for g in cells if g['char'].isalpha() and g['char'] not in 'ÅÄÖQJ']
px_cap = float(np.median(plain))
scale = CAP / px_cap
print('cap px', px_cap, 'scale', scale)
# The rows were written at different sizes: pull every glyph most of the way
# to the common cap height, keeping a little of the hand's natural variation.
KEEP = 0.2
punct = [g['body'][1] - g['body'][0] for g in cells if g['char'] in '!?']
for g in cells:
    h = g['body'][1] - g['body'][0]
    if g['char'] in '!?':
        ref = float(np.median(punct))
    elif g['char'] in '+-':
        ref = float(np.median(punct)) * 0.95   # written alongside ! and ?
        h = ref
    elif g['char'] == 'Q':
        h *= 0.92                               # Q's tail dips below the baseline
        ref = px_cap
    else:
        ref = px_cap
    g['scale'] = scale * (ref / h) ** (1 - KEEP) * (h / px_cap) ** 0 if g['char'] not in '+-' else CAP / ref
    if g['char'] in '!?':
        g['scale'] = CAP * 0.92 / ref


def trace(g):
    pad = 4
    y0, y1, x0, x1 = g['y0'] - pad, g['y1'] + pad, g['x0'] - pad, g['x1'] + pad
    crop = norm[y0:y1, x0:x1]
    keep = np.isin(lab[y0:y1, x0:x1], g['parts'])
    keep = ndi.binary_dilation(keep, iterations=2)   # include the soft edge
    crop = np.where(keep, crop, 1.0)
    big = np.asarray(Image.fromarray((crop * 255).clip(0, 255).astype(np.uint8))
                     .resize(((x1 - x0) * UP, (y1 - y0) * UP), Image.BICUBIC)).astype(float) / 255
    big = ndi.gaussian_filter(big, UP * 0.35)
    bmp = potrace.Bitmap(big >= THRESH)   # potracer treats False as ink
    path = bmp.trace(turdsize=UP * UP * 3, alphamax=1.0, opticurve=True, opttolerance=0.3)
    rec = RecordingPen()
    # pixel (x, y) in upsampled crop -> font units, baseline at y=0, left edge at 0
    def tf(p):
        px, py = p.x, p.y
        X = (x0 + px / UP - g['x0']) * g['scale']
        Y = (g['baseline'] - (y0 + py / UP)) * g['scale']
        return (round(X, 1), round(Y, 1))
    for curve in path:
        rec.moveTo(tf(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                rec.lineTo(tf(seg.c)); rec.lineTo(tf(seg.end_point))
            else:
                rec.curveTo(tf(seg.c1), tf(seg.c2), tf(seg.end_point))
        rec.closePath()
    width = (g['x1'] - g['x0']) * g['scale']
    return rec, width


def gname(ch, alt):
    base = UV2AGL.get(ord(ch), 'uni%04X' % ord(ch))
    return base + ('.alt' if alt else '')


glyphs = {}   # name -> (RecordingPen, width)
for g in cells:
    glyphs[gname(g['char'], g['alt'])] = trace(g)


def shifted(rec, dx, dy=0, sx=1, sy=1):
    r = RecordingPen()
    rec.replay(TransformPen(r, (sx, 0, 0, sy, dx, dy)))
    return r


def combine(*parts):
    r = RecordingPen()
    for p in parts:
        p.replay(r)
    return r


def bounds(rec):
    from fontTools.pens.boundsPen import BoundsPen
    b = BoundsPen(None); rec.replay(b); return b.bounds


# --- derived glyphs -------------------------------------------------------
def split_dot(name):
    """Return (stroke, dot) of ! or ? : the dot is the lowest contour."""
    rec, w = glyphs[name]
    contours, cur = [], []
    for op, args in rec.value:
        cur.append((op, args))
        if op == 'closePath':
            contours.append(cur); cur = []
    def ymax(c):
        return max(p[1] for op, a in c for p in a)
    contours.sort(key=ymax)
    dot = RecordingPen(); dot.value = [x for x in contours[0]]
    return dot


def dots_of(name, base):
    rec, _ = glyphs[name]
    top = bounds(glyphs[base][0])[3]
    out, cont = RecordingPen(), []
    for op, a in rec.value:
        cont.append((op, a))
        if op == 'closePath':
            if min(p[1] for o, aa in cont for p in aa) > top * 0.98:
                out.value += cont
            cont = []
    return out


DOTS = dots_of('Odieresis.alt', 'O.alt')   # the only Ö on the sheet with two separate dots

for alt in (False, True):
    sfx = '.alt' if alt else ''
    # W from two Vs
    v1, w1 = glyphs['V' + sfx]
    v2, w2 = glyphs['V' + ('' if alt else '.alt')]
    off = w1 * 0.72
    glyphs['W' + sfx] = (combine(v1, shifted(v2, off)), off + w2)
    # period / colon from the dot of !
    dot = split_dot('exclam' + sfx)
    x0, y0, x1, y1 = bounds(dot)
    d = shifted(dot, -x0, -y0)
    dw = x1 - x0
    glyphs['period' + sfx] = (d, dw)
    glyphs['colon' + sfx] = (combine(d, shifted(d, 0, CAP * 0.42)), dw)
    # comma: the dot stretched down into a short tail
    glyphs['comma' + sfx] = (shifted(d, 0, -CAP * 0.08, 1, 1.9), dw)
    # Ü from U + the two dots of the Ö that has separate dots
    o_rec, ow = glyphs['Odieresis.alt']
    o_plain, _ = glyphs['O.alt']
    ob = bounds(o_plain)
    dots = RecordingPen()
    cont = []
    for op, a in o_rec.value:
        cont.append((op, a))
        if op == 'closePath':
            if min(p[1] for o, aa in cont for p in aa) > ob[3] * 0.98:
                dots.value += cont
            cont = []
    u, uw = glyphs['U' + sfx]
    db = bounds(dots)
    glyphs['Udieresis' + sfx] = (combine(u, shifted(dots, (uw - (db[2] - db[0])) / 2 - db[0], 0)), uw)
    # apostrophe: top third of I
    i_rec, iw = glyphs['I' + sfx]
    glyphs['quotesingle' + sfx] = (shifted(i_rec, 0, CAP * 0.62, 1, 0.38), iw)
    q, qw = glyphs['quotesingle' + sfx]
    glyphs['quotedbl' + sfx] = (combine(q, shifted(q, qw * 1.1)), qw * 2.1)
    # slash: the I leaned over
    lean = RecordingPen()
    i_rec.replay(TransformPen(lean, (1, 0, 0.42, 1, 0, 0)))
    glyphs['slash' + sfx] = (lean, bounds(lean)[2])
    # dashes: the hyphen drawn longer
    h, hw = glyphs['hyphen' + sfx]
    glyphs['endash' + sfx] = (shifted(h, 0, 0, 1.6), hw * 1.6)
    glyphs['emdash' + sfx] = (shifted(h, 0, 0, 2.6), hw * 2.6)
    # brackets: a narrowed C, and the same C mirrored
    c, cw = glyphs['C' + sfx]
    glyphs['parenleft' + sfx] = (shifted(c, 0, -CAP * 0.1, 0.5, 1.2), cw * 0.5)
    glyphs['parenright' + sfx] = (shifted(c, cw * 0.5, -CAP * 0.1, -0.5, 1.2), cw * 0.5)
    # É: E with an acute made from the apostrophe, leaned and shortened
    e, ew = glyphs['E' + sfx]
    acute = RecordingPen()
    q.replay(TransformPen(acute, (1, 0, 0.9, 0.55, 0, 0)))
    ab = bounds(acute)
    glyphs['Eacute' + sfx] = (combine(e, shifted(acute, (ew - (ab[2] - ab[0])) / 2 - ab[0], CAP * 1.08 - ab[1])), ew)

    # Hyphen and plus: centred at mid cap height
    for nm in ('hyphen', 'plus', 'endash', 'emdash'):
        r_, w_ = glyphs[nm + sfx]
        b_ = bounds(r_)
        glyphs[nm + sfx] = (shifted(r_, 0, CAP * 0.42 - (b_[1] + b_[3]) / 2), w_)

    # Ä, Ö and Ü: the plain letter with two separate dots, as on the card
    for base, nm in (('A', 'Adieresis'), ('O', 'Odieresis'), ('U', 'Udieresis')):
        b_rec, bw = glyphs[base + sfx]
        db_ = bounds(DOTS)
        dw_ = db_[2] - db_[0]
        glyphs[nm + sfx] = (combine(b_rec, shifted(DOTS, (bw - dw_) / 2 - db_[0], CAP * 1.07 - db_[1])), bw)

    # comma: the dot with a short tail running down and left
    tail = RecordingPen()
    d.replay(TransformPen(tail, (0.55, 0, -0.3, 2.6, dw * 0.25, -CAP * 0.2)))
    glyphs['comma' + sfx] = (combine(d, tail), dw)

    # #: two leaning strokes crossed by two short dashes
    sl, slw = glyphs['slash' + sfx]
    sl2 = shifted(sl, 0, CAP * 0.05, 0.75, 0.85)
    hy, hyw = glyphs['hyphen' + sfx]
    hb = bounds(hy)
    bar = shifted(hy, -hb[0], -(hb[1] + hb[3]) / 2, (slw * 1.3) / max(hb[2] - hb[0], 1), 0.8)
    glyphs['numbersign' + sfx] = (combine(sl2, shifted(sl2, slw * 0.45), shifted(bar, 0, CAP * 0.3), shifted(bar, 0, CAP * 0.6)), slw * 1.3)


# --- assemble font --------------------------------------------------------
names = ['.notdef', 'space'] + sorted(glyphs)
cmap = {32: 'space', 0xA0: 'space'}
for name in glyphs:
    if name.endswith('.alt'):
        continue
    ch = next((chr(u) for u, n_ in UV2AGL.items() if n_ == name), None)
    if ch is None and name.startswith('uni'):
        ch = chr(int(name[3:], 16))
    cmap[ord(ch)] = name
    if ch.lower() != ch:
        cmap[ord(ch.lower())] = name   # all-caps hand: lowercase uses the same letters
for ch in "‘’":
    cmap[ord(ch)] = 'quotesingle'
for ch in '“”„':
    cmap[ord(ch)] = 'quotedbl'
cmap[ord('&')] = 'plus'   # the invitation writes "Gustav + Johanna"

charstrings, metrics = {}, {}
for name in names:
    pen = T2CharStringPen(0, None)
    if name in glyphs:
        rec, w = glyphs[name]
        rec.replay(TransformPen(pen, (1, 0, 0, 1, SB, 0)))
        adv = round(w + 2 * SB)
        lsb = round(bounds(rec)[0] + SB) if bounds(rec) else 0
    elif name == 'space':
        adv, lsb = SPACE, 0
    else:
        adv, lsb = 500, 0
    charstrings[name] = pen.getCharString()
    metrics[name] = (adv, lsb)

fam = 'Gustavs Hand'
fb = FontBuilder(UPM, isTTF=False)
fb.setupGlyphOrder(names)
fb.setupCharacterMap(cmap)
fb.setupCFF('GustavsHand-Regular', {'FullName': fam}, charstrings, {})
fb.setupHorizontalMetrics(metrics)
fb.setupHorizontalHeader(ascent=950, descent=-250)
fb.setupNameTable({'familyName': fam, 'styleName': 'Regular'})
fb.setupOS2(sTypoAscender=950, sTypoDescender=-250, sTypoLineGap=0, usWinAscent=1000, usWinDescent=300,
            sCapHeight=CAP, sxHeight=CAP)
fb.setupPost()

base = [n_ for n_ in names if n_ + '.alt' in glyphs]
fea = f"""
languagesystem DFLT dflt;
languagesystem latn dflt;
@def = [{' '.join(base)}];
@alt = [{' '.join(n_ + '.alt' for n_ in base)}];
feature calt {{
  sub @def @def' by @alt;
}} calt;
"""
addOpenTypeFeaturesFromString(fb.font, fea)

fb.save(os.path.join(out, 'GustavsHand.otf'))
fb.font.flavor = 'woff2'
fb.font.save(os.path.join(out, 'GustavsHand.woff2'))
print('glyphs', len(names), 'mapped', len(cmap))
