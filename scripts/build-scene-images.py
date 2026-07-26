#!/usr/bin/env python3
"""
Generate web-sized WebP derivatives of the nine scene backgrounds.

The Figma export ships each scene as a 4096px PNG, 2-15 MB apiece. The carousel
renders all nine at once, so a first visit was pulling roughly 59 MB of images
before the app was usable -- unshippable on mobile data. This produces two
derivatives per scene:

  public/scenes/<slug>-bg.webp     1920w, used as the full-screen wallpaper
  public/scenes/<slug>-thumb.webp   480w, used in the scene carousel

Run from the repo root:  python3 scripts/build-scene-images.py

Re-run after changing any source art; the output is committed so that a normal
`npm run build` needs neither Python nor Pillow.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets"
OUT = ROOT / "public" / "scenes"

# Keyed by the slug used in src/data/scenes.ts. The values are the Figma export
# hashes, which is the only name the source files have.
SCENES = {
    "anime-cafe": "32b4a6522df786276011078a70b99fc849ecfb5a",
    "cozy-study": "72d56391dae37a8ecd91f0a519d3e3b293989dd0",
    "late-night-coding": "9c730196e9eeb1f72fa56232fdc3c8eb2dcd2428",
    "office-with-a-view": "2d31031bf66a52f6b4227de4cacfcc640b147883",
    "cocktail-lounge": "2e1e50656e46b4f478e6c20270297a0df4471478",
    "afternoon-daydream": "492cfe147a6d419c26f2458be3d723a356423e9c",
    "rainy-stroll": "5b450a7110e000ba2f5c2131ad2b26158a225c8a",
    "electric-stroll": "350b03cd9be970d67a928d470d8f344a995bc729",
    "neighborhood-ride": "4d82157e1d7e2352cf54ca9ae0151bc85a6a338a",
}

# (suffix, target width, quality). The thumbnail renders at 120 CSS px, so 480w
# still covers a 3x display with room to spare.
VARIANTS = [("bg", 1920, 82), ("thumb", 480, 80)]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total_before = 0
    total_after = 0

    # The loading screen's backdrop is on the critical path -- it is the very
    # first thing painted -- and the original is a 2.9 MB 5824px PNG.
    with Image.open(SRC / "718793307914dbf89f1f24aded5dc3a91340a13f.png") as im:
        im = im.convert("RGB")
        height = round(im.height * 1920 / im.width)
        dest = OUT / "loading-bg.webp"
        im.resize((1920, height), Image.LANCZOS).save(dest, "WEBP", quality=80, method=6)
        print(f"{dest.relative_to(ROOT)}  1920x{height}  {dest.stat().st_size // 1024} kB")

    for slug, digest in SCENES.items():
        source = SRC / f"{digest}.png"
        if not source.exists():
            raise SystemExit(f"missing source art for {slug}: {source}")

        total_before += source.stat().st_size
        with Image.open(source) as im:
            im = im.convert("RGB")
            for suffix, width, quality in VARIANTS:
                height = round(im.height * width / im.width)
                resized = im.resize((width, height), Image.LANCZOS)
                dest = OUT / f"{slug}-{suffix}.webp"
                resized.save(dest, "WEBP", quality=quality, method=6)
                total_after += dest.stat().st_size
                print(f"{dest.relative_to(ROOT)}  {width}x{height}  {dest.stat().st_size // 1024} kB")

    print(f"\nsources {total_before // 1024 // 1024} MB -> derivatives {total_after // 1024} kB")


if __name__ == "__main__":
    main()
