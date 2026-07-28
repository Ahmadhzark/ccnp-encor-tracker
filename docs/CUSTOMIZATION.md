# Customization

Everything you'll want to change lives in a handful of well‑commented files.
No build tooling knowledge required.

## 1. Study plan, topics & labs — `src/data/curriculum.ts`

This is the single source of truth for the whole app.

- **Dates** (top of the file):
  ```ts
  export const START = "2026-07-16"; // first day of week 1
  export const EXAM  = "2026-12-31"; // exam / finish date
  ```
  Every week's dates, the "current week", the countdown and pace recalculate from `START` automatically. End users can also override these in **Settings** without touching code.
- **Topics** — edit the `RAW_TOPICS` array (`id`, `name`, `hours`, `week`, `blurb`). `blurb` is the "exam angle" shown on cards and flashcards.
- **Labs** — edit the `LABS` array (150 entries). Each has `id`, `name`, `difficulty` (`E`/`M`/`H`), `minutes`, `tech`, `week`, `topic`.
- **Domains & targets** — `DOMAINS`, `TOTAL_HOURS`, `TOTAL_LABS`.

## 2. Themes & colors — `src/styles/tokens.css`

Four full themes ship (Copper, Midnight, Ocean, Meadow), each a complete token block. To tweak a theme, edit its variables. To **add** a theme:

1. Add a token block: `:root[data-theme="mytheme"] { --ground: …; --surface: …; --brand: …; /* …all tokens… */ }`.
2. Add it to the picker list in `src/theme/ThemeProvider.tsx` (`THEMES` array: `value`, `label`, `scheme`, swatch colors).
3. Add its id to the pre‑paint allow‑list in `index.html`.

The signature gradient per theme is `--grad-1/2/3` (also in `tokens.css`).

## 3. Branding & links

- **App name / title / theme‑color / social tags** — `index.html` (`<title>`, meta tags) and the PWA manifest in `vite.config.ts`.
- **Your links & other products** — `src/pages/About.tsx` (`LINKS` and `TRACKERS` arrays).
- **Sidebar footer** — `src/layout/AppShell.tsx` (`navFoot`).
- **Favicon** — the inline emoji in `index.html`; **app icons** — `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`.

## 4. Copy & text

Page intros live in each page component under `src/pages/`. Search for the heading text and edit in place.

## 5. Greeting name

The dashboard greeting uses the name from **Settings → Profile**; there's no hard‑coded name to change.

## After customizing

```bash
npm run build   # verify it compiles
npm run preview # eyeball the result
```
