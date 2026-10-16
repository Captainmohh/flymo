# AITA Design Kit

Brand and UI design kit for **AI Ticket Assistant / Flight Ticket Assistant**. Everything here comes from the `aita-frontend` codebase: `app/globals.css`, `layout.tsx`, `components/**` and `public/**`.

👉 **Open [`index.html`](index.html) in a browser** to see the interactive kit. It covers the logo, colour, type, shape, components, imagery and downloads.

## Contents

```text
design-kit/
├── index.html                  # Visual design-kit page (self-contained, no build step)
├── preview.png                 # Screenshot of the kit's cover
├── tokens/
│   ├── tokens.css              # CSS custom properties (light + .dark), mirrors globals.css
│   └── tokens.json             # W3C-style tokens for Figma / Tokens Studio
└── assets/
    ├── logo/
    │   ├── aita-mark-navy.png               # original public/newlogo.png (transparent)
    │   ├── aita-mark-navy-square.png        # trimmed + squared master  ← use this
    │   ├── aita-mark-white.png              # reversed, for navy backgrounds
    │   ├── aita-mark-midnight.png           # mono #011847 (exact UI navy)
    │   ├── aita-mark-legacy-transparent.png # public/logo.png with white removed
    │   └── aita-mark-legacy-white-bg.png    # original public/logo.png
    ├── illustrations/
    │   └── hero-travel-planning.svg         # public/hero-illustration.svg.svg (renamed)
    ├── favicon/
    │   ├── favicon-aita.ico                 # NEW branded favicon (16/32/48/64)
    │   ├── app-icon-navy-{512,192,180,32}.png
    │   ├── app-icon-light-512.png
    │   └── favicon.ico                      # current default Next.js favicon
    └── icons/                               # Next.js starter SVGs from /public
```

## Core tokens at a glance

| Role | Token | Value |
|---|---|---|
| Page background / Primary | `--background`, `--primary` | `oklch(0.228 0.093 260.8)` ≈ `#011847` |
| Text on navy | `--foreground` | `#FAFAFA` |
| Cards / header pill | `--card` | `#FFFFFF` |
| Logo ink | — | `#00226C` |
| Illustration accent | — | `#2352A5` |
| Fonts | heading / sans / mono | Space Grotesk / Geist / Geist Mono |
| Base radius | `--radius` | `0.625rem` (10px) |

## Things noticed in the codebase while building the kit

These have **not** been changed in the app. They're listed here so you can fix them when you're ready:

1. **`app/layout.tsx`**: `<html>` has `lang` and `className` set twice, which is a JSX/TS error. Keep only the second pair, the one that includes `spaceGrotesk.variable`.
2. **`globals.css`**: `--font-sans: var(--font-sans)` points at itself, so Geist never gets applied. Change it to `var(--font-geist-sans)`.
3. **`Header.tsx`**: `className="sm: w-[55px] sm: h-[50px]"` has stray spaces, so the responsive logo size doesn't work. Change it to `sm:w-[55px] sm:h-[50px]`.
4. **`public/hero-illustration.svg.svg`** has a double extension. The kit copy is renamed to `hero-travel-planning.svg`.
5. **Favicon / metadata**: the favicon is still the Next.js default and the title is "Create Next App". Use `favicon-aita.ico` and real metadata instead.
6. **Nav routes** `/About` and `/Contact` are capitalised. Next.js routes are case-sensitive, so lowercase them to match folder names.
7. **Licensing**: the hero illustration is a Freepik/Storyset asset. You need to credit it unless you have a Premium licence.

## Regenerating the derived assets

Run `python design-kit/scripts/build_assets.py` (needs Python + Pillow). It copies the originals from `aita-frontend/public` and rebuilds the white, midnight and app-icon variants.
