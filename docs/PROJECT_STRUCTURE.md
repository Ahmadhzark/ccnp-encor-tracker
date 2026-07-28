# Project structure

A conventional, feature‑light React + Vite + TypeScript layout. Everything is
grouped by responsibility, which keeps the codebase easy to navigate and extend.

```
.
├── .github/workflows/deploy.yml   # CI: build & publish to GitHub Pages
├── docs/                          # This documentation set
├── public/                        # Static assets copied as-is (icons, robots, sitemap)
│   ├── icon-192.png · icon-512.png · apple-touch-icon.png
│   ├── robots.txt
│   └── sitemap.xml
├── index.html                     # HTML shell, meta/SEO tags, pre-paint theme script
├── vite.config.ts                 # Vite + PWA config
├── tsconfig*.json                 # TypeScript (strict)
├── .env.example                   # Optional build-time vars (none required)
├── LICENSE.md
├── README.md
└── src/
    ├── main.tsx                   # App entry: ErrorBoundary + ThemeProvider + Router
    ├── App.tsx                    # Route table
    ├── data/
    │   ├── curriculum.ts          # SINGLE SOURCE OF TRUTH: dates, topics, 150 labs
    │   └── types.ts               # Curriculum domain types
    ├── store/                     # Zustand stores (state + persistence)
    │   ├── useProgress.ts         # Topics/labs/sessions/settings (IndexedDB)
    │   ├── useNotes.ts            # Notes (localStorage)
    │   ├── useStudyTimer.ts       # Study-session timer (localStorage)
    │   ├── useStats.ts · useAnalytics.ts · useToast.ts
    │   └── types.ts
    ├── lib/                       # Pure logic, no React
    │   ├── stats.ts · analytics.ts # Derived metrics
    │   ├── plan.ts · time.ts       # Runtime study-plan dates
    │   ├── today.ts · milestones.ts
    │   ├── backup.ts               # Export / import
    │   └── db.ts                   # IndexedDB helper
    ├── theme/ThemeProvider.tsx    # Theme state + system integration
    ├── styles/
    │   ├── tokens.css             # Design tokens + the 4 themes
    │   └── global.css             # Reset & base styles
    ├── layout/AppShell.tsx        # Sidebar, top bar, mobile tab bar, FAB
    ├── components/                # Reusable UI (Card, Button, Icon, rings, charts, …)
    │   └── ErrorBoundary.tsx      # Top-level render safety net
    └── pages/                     # One folder-less module per route
        ├── Dashboard.tsx
        ├── Topics.tsx · Labs.tsx · Log.tsx
        ├── Analytics.tsx · Goals.tsx
        ├── Flashcards.tsx · Notes.tsx
        ├── Settings.tsx · About.tsx
        └── *.module.css           # Scoped styles per page/component
```

## Conventions

- **CSS Modules** (`*.module.css`) co‑located next to each component/page for scoped styles; global tokens in `src/styles`.
- **`lib/` is pure** (no React) so logic stays testable; **`store/` holds state**; **`pages/` and `components/` hold UI**.
- **`data/curriculum.ts` is the only place** to change the syllabus, dates, topics and labs.
- Types are explicit; the project builds under TypeScript **strict** mode.
