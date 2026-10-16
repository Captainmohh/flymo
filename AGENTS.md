# AI Ticket Assistant (AITA)

AI-Powered Flight Ticket Assistant application designed to help users search flights, compare fares, and book tickets through an intuitive, conversational interface.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Language**: TypeScript (`strict` mode)
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **UI Components**: shadcn UI primitives built on `@base-ui/react`
- **Icons**: `lucide-react`
- **Fonts**: Geist Sans, Geist Mono, Space Grotesk

---

## 📁 Repository Structure

```text
AI_TicketAssistant/
├── AGENTS.md                  # Project instructions and AI agent guidelines
├── CLAUDE.md                  # Assistant memory pointer
└── aita-frontend/             # Next.js web application
    ├── app/                   # App Router pages and layouts
    │   ├── globals.css        # Global CSS variables & Tailwind v4 theme
    │   ├── layout.tsx         # Root layout (HTML, body, fonts, metadata)
    │   └── page.tsx           # Homepage (Header + Hero)
    ├── components/
    │   ├── layout/            # Composite page sections (Header, Hero, Sidebar)
    │   └── ui/                # Atomic UI primitives (button, etc.)
    ├── lib/                   # Utility helpers (e.g., utils.ts `cn`)
    ├── public/                # Static assets, logos, and illustrations
    ├── package.json           # Frontend dependencies & npm scripts
    └── tsconfig.json          # TypeScript configuration & path aliases (@/*)
```

---

## ⚡ Development Workflow & Commands

All development commands should be executed from within the `aita-frontend/` directory:

```bash
cd aita-frontend

# Start local development server (runs at http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start

# Run ESLint checks
npm run lint
```

---

## 📐 Coding Conventions & Guidelines

1. **Next.js App Router (React 19)**:
   - Components are **Server Components** by default.
   - Use `"use client"` only at the top of files that require browser APIs, React state (`useState`, `useReducer`), or event listeners.
   - Follow Next.js 16 conventions (do not import deprecated legacy APIs).

2. **Styling & Design System**:
   - Use Tailwind CSS v4 utility classes.
   - Global colors use OKLCH definitions (`bg-background`, `text-foreground`, `bg-card`, `text-primary`).
   - Merge class names dynamically using the [`cn`](file:///c:/Users/mohad/Desktop/AIPROJECTS/AI_TicketAssistant/aita-frontend/lib/utils.ts) utility from `@/lib/utils`.

3. **Component Structure**:
   - Generic UI primitives belong in `components/ui/`.
   - Layout and composite sections belong in `components/layout/`.
   - Route-specific page files belong in `app/<route>/page.tsx`.

4. **Code Quality**:
   - Maintain clean TypeScript types without loose `any`.
   - Ensure accessibility standards (proper `alt` on images, accessible button/link roles).
   - Preserve existing docstrings and comments.

