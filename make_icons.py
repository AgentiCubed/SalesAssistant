"""Generate Sales Coach app icons: red rounded square + target + headset motif."""
from PIL import Image, ImageDraw
import math

RED = (204, 0, 0)
RED_DARK = (163, 0, 0)
WHITE = (255, 255, 255)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def make(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # vertical gradient background, rounded
    radius = int(size * 0.22)
    bg = Image.new("RGB", (size, size))
    bd = ImageDraw.Draw(bg)
    for y in range(size):
        bd.line([(0, y), (size, y)], fill=lerp(RED, RED_DARK, y / size))
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    img.paste(bg, (0, 0), mask)

    d = ImageDraw.Draw(img)
    cx, cy = size / 2, size / 2

    # concentric target rings (white)
    rings = [0.34, 0.24, 0.14]
    w = max(2, int(size * 0.035))
    for i, r in enumerate(rings):
        rr = size * r
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=WHITE, width=w)
    # center dot
    dot = size * 0.05
    d.ellipse([cx - dot, cy - dot, cx + dot, cy + dot], fill=WHITE)

    return img

for s in (180, 192, 512):
    make(s).save(f"icons/icon-{s}.png")
    print("wrote", s)
