# Configuration

## Build & tooling

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite config — base path, React plugin, **PWA manifest** |
| `tsconfig*.json` | TypeScript (strict mode enabled) |
| `.oxlintrc.json` | Linter rules |
| `package.json` | Scripts & dependencies |

### Base path

`base: './'` in `vite.config.ts` makes the build path‑independent (works at a domain root or a sub‑path like GitHub Pages `/repo/`). Only change it if you have a specific absolute base requirement.

### PWA / manifest

Configured via `vite-plugin-pwa` in `vite.config.ts` — app `name`, `short_name`, `theme_color`, `background_color`, icons, and `registerType: 'autoUpdate'` (clients auto‑update on next load). Update these to rebrand the installed app.

## Environment variables

**The app needs none.** It is fully client‑side with no backend or secrets. See `.env.example` for optional build‑time values (Vite exposes only `VITE_*` variables, and only at build time — never put secrets in them).

## Where user data is stored

All progress stays in the visitor's browser on their device — nothing is sent anywhere.

| Data | Storage | Key |
|---|---|---|
| Topics, labs, sessions, settings | IndexedDB | `encor.progress` |
| Notes | localStorage | `encor.notes` |
| Study‑session timer | localStorage | `encor.timer` |
| Theme | localStorage | `encor.theme` |

Users can export/import everything as a JSON file from **Settings → Backup & restore**, and reset from **Settings → Reset progress**.

## Routing

Hash‑based (`react-router-dom` `HashRouter`) so any static host serves deep links without rewrite rules. Routes are declared in `src/App.tsx`.
