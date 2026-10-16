<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Ticket Assistant (AITA) Frontend

AI-Powered Flight Ticket Assistant application built with Next.js 16 and React 19.

---

## ⚡ Key Commands

```bash
# Run development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start

# Lint check
npm run lint
```

---

## 📐 Conventions & Guidelines

- **Next.js 16 & React 19**: Server Components by default; add `"use client"` only when interactive state/hooks (`useState`, `useEffect`) are needed.
- **Styling**: Tailwind CSS v4 with OKLCH theme variables in `app/globals.css`.
- **Imports**: Use `@/*` alias for imports within this directory (e.g., `@/components/...`, `@/lib/...`).
- **Icons & Primitives**: Use `lucide-react` for icons and shadcn / `@base-ui/react` primitives.
