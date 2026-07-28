<div align="center">

<!-- Replace with your product logo (recommended 480×480 PNG at docs/assets/logo.png) -->
<img src="docs/assets/logo.png" alt="Certflow CCNP ENCOR Tracker" width="120" onerror="this.style.display='none'" />

# Certflow · CCNP ENCOR 350‑401 Tracker

**A premium, offline‑first study tracker for the Cisco CCNP ENCOR 350‑401 exam.**

Topics · 150 hands‑on labs · study‑session timer · analytics · flashcards · notes · goals · 4 full themes — all in one installable web app, with zero backend.

![Version](https://img.shields.io/badge/version-1.0.0-6d5efc)
![React](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![Vite](https://img.shields.io/badge/Vite-8-646cff)
![PWA](https://img.shields.io/badge/PWA-offline-5a0fc8)
![License](https://img.shields.io/badge/license-Commercial-black)

<!-- Replace with a real screenshot/banner: docs/assets/banner.png -->
<img src="docs/assets/banner.png" alt="Product banner" width="880" onerror="this.style.display='none'" />

</div>

---

## ✨ Highlights

- **Command‑centre dashboard** — weighted progress ring, exam countdown, today's plan, a real **study‑session timer** that logs your hours, a **pace** read‑out, a weak‑areas **review** list, and streaks.
- **150 detailed labs** across all six exam domains, each with difficulty, time and technology.
- **Flashcards**, **topic‑linked notes**, **analytics**, and **achievements/goals**.
- **4 full themes** (Copper, Midnight, Ocean, Meadow) — not just an accent swap.
- **Offline‑first PWA** — installable to phone/desktop, works with no connection.
- **100% client‑side** — no server, no account, no database. Data stays on the device, with one‑click **backup / restore**.

## 🔗 Live demo

Deploy in minutes to GitHub Pages, Vercel, Netlify or any static host — see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
_(Add your live URL here once deployed.)_

## 🖼️ Screenshots

Place your captures in `docs/assets/` and they'll render here.

| Dashboard | Labs | Analytics |
|---|---|---|
| ![Dashboard](docs/assets/screenshot-dashboard.png) | ![Labs](docs/assets/screenshot-labs.png) | ![Analytics](docs/assets/screenshot-analytics.png) |

## 🚀 Quick start

```bash
npm install      # install dependencies (Node.js 20+)
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Full beginner walkthrough: [`docs/INSTALLATION.md`](docs/INSTALLATION.md).

## 🧩 Make it yours

Everything is data‑driven and documented:

- **Curriculum & dates** — `src/data/curriculum.ts` (start/exam dates, topics, 150 labs).
- **Themes & design tokens** — `src/styles/tokens.css`.
- **Branding & links** — `src/pages/About.tsx`, `src/layout/AppShell.tsx`.

See [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md).

## 📚 Documentation

| Guide | What it covers |
|---|---|
| [INSTALLATION](docs/INSTALLATION.md) | Prerequisites → running locally, step by step |
| [DEPLOYMENT](docs/DEPLOYMENT.md) | GitHub Pages, Vercel, Netlify, Cloudflare, VPS, Docker |
| [CUSTOMIZATION](docs/CUSTOMIZATION.md) | Curriculum, themes, branding, copy |
| [CONFIGURATION](docs/CONFIGURATION.md) | Build config, PWA, storage keys |
| [FEATURES](docs/FEATURES.md) | Every feature explained |
| [PROJECT_STRUCTURE](docs/PROJECT_STRUCTURE.md) | Folder‑by‑folder tour |
| [GITHUB](docs/GITHUB.md) | Repos, commits, releases, Actions |
| [VERCEL](docs/VERCEL.md) | One‑click Vercel deploy |
| [FAQ](docs/FAQ.md) · [SUPPORT](docs/SUPPORT.md) | Answers & help |
| [ROADMAP](docs/ROADMAP.md) · [CHANGELOG](docs/CHANGELOG.md) | What's next & version history |
| [CONTRIBUTING](docs/CONTRIBUTING.md) · [LICENSE](LICENSE.md) | Contributing & terms |

## 🛠️ Tech stack

React 19 · TypeScript (strict) · Vite 8 · React Router (hash) · Zustand · vite‑plugin‑pwa. No runtime backend.

## 📄 License

Commercial product — see [`LICENSE.md`](LICENSE.md). One purchase = one end product per license tier.

## 💬 Support & credits

Support: see [`docs/SUPPORT.md`](docs/SUPPORT.md). Built by **Certflow** — study tools for people chasing certifications.
