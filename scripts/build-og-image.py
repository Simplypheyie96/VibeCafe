"""Render public/og-image.png: the VibeCafe cassette lockup on the brand ground.

Colours are sampled from the shipped icon set rather than re-picked, so the
social card and the home-screen icon are the same two values. Geometry is the
tape from public/logo.svg, transformed out of its 512 viewBox.

Everything is drawn 4x and downsampled, because Pillow does not antialias
strokes; supersampling is what keeps the reel circles from looking stepped.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1200, 630
SS = 4  # supersample factor

GROUND = (0x1B, 0x16, 0x13)  # icon background, and <meta name="theme-color">
CREAM = (0xE8, 0xDC, 0xC4)  # the tape mark in icon-512.png
GLOW_IN = (0x26, 0x1E, 0x19)  # warm lift at centre
GLOW_OUT = (0x15, 0x10, 0x0E)  # falloff at the corners

FONTS = Path.home() / "Library/Fonts"
OUT = Path("/Users/simplypheyie/Documents/Code/VibeCafe Web App 2/public/og-image.png")


def ground(w, h):
    """Ground with a soft warm radial, averaging out to GROUND overall."""
    base = Image.new("RGB", (w, h), GLOW_OUT)
    top = Image.new("RGB", (w, h), GLOW_IN)
    # radial_gradient is square and 0-at-centre; stretching it to the 1200x630
    # frame gives an ellipse, which is what we want -- a circular falloff on a
    # wide card would leave the short edges noticeably darker than the long ones.
    mask = Image.radial_gradient("L").resize((w, h), Image.LANCZOS)
    return Image.composite(base, top, mask)


def tape(draw, cx, cy, size):
    """The logo.svg cassette, centred on (cx, cy) and `size` px wide.

    logo.svg draws in a 512 box under `scale(1.18)` about the centre. Rather
    than bake that in, the transform is applied here so the two files can be
    diffed against each other by eye.
    """
    S = 1.18
    k = size / (316 * S)  # the outer rect's width is the mark's visual width

    def pt(x, y):
        return (cx + (256 + S * (x - 256) - 256) * k, cy + (256 + S * (y - 256) - 256) * k)

    def w(v):
        return max(1, round(v * S * k))

    x0, y0 = pt(98, 159)
    x1, y1 = pt(98 + 316, 159 + 194)
    draw.rounded_rectangle([x0, y0, x1, y1], radius=33 * S * k, outline=CREAM, width=w(24))

    for rx in (190, 322):
        for r, width, fill in ((44, w(20), None), (10, 0, CREAM)):
            a, b = pt(rx - r, 256 - r)
            c, d = pt(rx + r, 256 + r)
            if fill:
                draw.ellipse([a, b, c, d], fill=fill)
            else:
                draw.ellipse([a, b, c, d], outline=CREAM, width=width)


def tracked(draw, text, font, cx, y, tracking, fill):
    """Draw `text` centred on cx with letter-spacing Pillow will not do itself."""
    widths = [draw.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    for ch, cw in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill)
        x += cw + tracking


def layer(render):
    """Render onto a transparent full-size layer and return it with its bbox.

    Ink bounds are what the eye balances, and they are not the em box: Space
    Grotesk leaves a different amount of air above a cap than below a baseline,
    so laying this out from nominal font sizes puts visible gaps in the wrong
    place. Measuring the pixels avoids guessing.
    """
    lay = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0))
    render(ImageDraw.Draw(lay))
    return lay, lay.getbbox()


cx = W * SS // 2
wordmark = ImageFont.truetype(str(FONTS / "SpaceGrotesk-Medium.ttf"), 92 * SS)
tagline = ImageFont.truetype(str(FONTS / "SpaceGrotesk-Regular.ttf"), 23 * SS)
# The tagline is the same cream dropped toward the ground rather than a third
# colour, so the palette stays at two values.
muted = tuple(round(g + (c - g) * 0.55) for c, g in zip(CREAM, GROUND))

parts = [
    layer(lambda d: tape(d, cx, H * SS // 2, 300 * SS)),
    layer(lambda d: tracked(d, "VibeCafe", wordmark, cx, H * SS // 2, 2 * SS, CREAM)),
    layer(lambda d: tracked(d, "LOFI · CHILL · FOCUS", tagline, cx, H * SS // 2, 9 * SS, muted)),
]

# Optical gaps, not equal ones: the wordmark belongs to the mark, the tagline
# is subordinate to the wordmark, and the spacing should say so.
GAPS = [52 * SS, 26 * SS]

heights = [b[3] - b[1] for _, b in parts]
stack = sum(heights) + sum(GAPS)
y = (H * SS - stack) // 2

img = ground(W * SS, H * SS)
for i, (lay, bbox) in enumerate(parts):
    img.paste(lay, (0, y - bbox[1]), lay)
    y += heights[i] + (GAPS[i] if i < len(GAPS) else 0)

img.resize((W, H), Image.LANCZOS).save(OUT, optimize=True)
print(f"wrote {OUT} ({OUT.stat().st_size:,} bytes)")

# A square centre crop is what Safari's share sheet and Slack actually show, so
# the lockup has to survive it. Assert rather than trust the eye.
ink = Image.open(OUT).convert("RGB")
left, top, right, bottom = ImageDraw.Draw(ink) and Image.eval(
    Image.open(OUT).convert("L"), lambda p: 255 if p > 60 else 0
).getbbox()
sq = ((W - H) // 2, 0, (W + H) // 2, H)
print(f"ink bounds     {left},{top} -> {right},{bottom}")
print(f"centre square  {sq[0]},{sq[1]} -> {sq[2]},{sq[3]}")
assert left >= sq[0] and right <= sq[2], "lockup would be clipped by a square crop"
print("square crop    safe")
