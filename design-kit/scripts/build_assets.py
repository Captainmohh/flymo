"""Builds the AITA design-kit asset folder from aita-frontend/public."""
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(r"c:\Users\mohad\Desktop\AIPROJECTS\AI_TicketAssistant")
PUB = ROOT / "aita-frontend" / "public"
KIT = ROOT / "design-kit"
A = KIT / "assets"
for d in ["logo", "illustrations", "icons", "favicon"]:
    (A / d).mkdir(parents=True, exist_ok=True)

# --- originals ---
shutil.copy(PUB / "newlogo.png", A / "logo" / "aita-mark-navy.png")
shutil.copy(PUB / "logo.png", A / "logo" / "aita-mark-legacy-white-bg.png")
shutil.copy(PUB / "hero-illustration.svg.svg", A / "illustrations" / "hero-travel-planning.svg")
shutil.copy(ROOT / "aita-frontend" / "app" / "favicon.ico", A / "favicon" / "favicon.ico")
for s in ["file", "globe", "window", "next", "vercel"]:
    shutil.copy(PUB / f"{s}.svg", A / "icons" / f"{s}.svg")


def trim(img: Image.Image, pad_ratio=0.04) -> Image.Image:
    bbox = img.getchannel("A").point(lambda a: 255 if a > 10 else 0).getbbox()
    img = img.crop(bbox)
    w, h = img.size
    side = max(w, h)
    pad = int(side * pad_ratio)
    canvas = Image.new("RGBA", (side + 2 * pad, side + 2 * pad), (0, 0, 0, 0))
    canvas.paste(img, ((canvas.width - w) // 2, (canvas.height - h) // 2), img)
    return canvas


def recolor(img: Image.Image, rgb) -> Image.Image:
    alpha = img.getchannel("A")
    solid = Image.new("RGBA", img.size, rgb + (255,))
    solid.putalpha(alpha)
    return solid


# Square, trimmed master from the transparent logo
mark = trim(Image.open(PUB / "newlogo.png").convert("RGBA"))
mark.save(A / "logo" / "aita-mark-navy-square.png")
recolor(mark, (255, 255, 255)).save(A / "logo" / "aita-mark-white.png")
recolor(mark, (1, 24, 72)).save(A / "logo" / "aita-mark-midnight.png")

# Legacy logo: knock out the white background -> transparent
legacy = Image.open(PUB / "logo.png").convert("L")
alpha = legacy.point(lambda v: max(0, min(255, int((235 - v) * 255 / 175))))
legacy_t = Image.new("RGBA", legacy.size, (1, 24, 72, 255))
legacy_t.putalpha(alpha)
trim(legacy_t).save(A / "logo" / "aita-mark-legacy-transparent.png")

# App icons: navy tile with white mark, and white tile with navy mark
def app_icon(size, bg, fg_img, radius_ratio=0.22):
    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    from PIL import ImageDraw
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], int(size * radius_ratio), fill=255)
    bg_layer = Image.new("RGBA", (size, size), bg + (255,))
    tile.paste(bg_layer, (0, 0), m)
    inner = int(size * 0.72)
    fg = fg_img.resize((inner, inner), Image.LANCZOS)
    tile.paste(fg, ((size - inner) // 2, (size - inner) // 2), fg)
    return tile

white_mark = recolor(mark, (255, 255, 255))
for s in [512, 192, 180, 32]:
    app_icon(s, (1, 24, 72), white_mark).save(A / "favicon" / f"app-icon-navy-{s}.png")
app_icon(512, (255, 255, 255), mark).save(A / "favicon" / "app-icon-light-512.png")
ico_src = app_icon(256, (1, 24, 72), white_mark)
ico_src.save(A / "favicon" / "favicon-aita.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

print("done")
for p in sorted(A.rglob("*")):
    if p.is_file():
        print(p.relative_to(KIT), p.stat().st_size)
