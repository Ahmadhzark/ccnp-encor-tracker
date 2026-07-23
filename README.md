# CCNP ENCOR 350-401 — Progress Tracker

A clean, installable web app for tracking your study progress toward the Cisco
**CCNP ENCOR 350-401** exam. It ships with the full 24-week study plan, all six
exam domains (weighted by their real blueprint share), the topic list, and a
starter lab set — so you open it and start ticking things off.

Everything you record stays **in your browser** on your device. There is no
server, no account, and no database to set up. It works offline and can be
installed to a phone or desktop like a native app.

---

## What's inside

- **Dashboard** — overall weighted progress, current week/day, streak, and pace.
- **Topics** — every blueprint topic as a card with an "exam angle" (the thing
  most likely tested), a confidence rating, notes, bookmarks and revision count.
- **Labs** — hands-on labs with difficulty, time and technology, plus per-lab
  notes, reflections and file attachments.
- **Log** — record study hours per day; sessions add up within a day.
- **Analytics** — a contribution-style heatmap and charts of where your time and
  progress are going.
- **Goals** — milestones and targets to keep the plan on schedule.
- **Light / dark theme**, mobile-first layout, and offline (PWA) support.

---

## Requirements

- **Node.js 20 or newer** (includes `npm`). Check with `node -v`.

That's the only prerequisite for running or building the app.

---

## Getting started

Open a terminal in this folder and run:

```bash
npm install       # install dependencies (first time only)
npm run dev        # start the app in development mode
```

Then open the URL it prints (usually **http://localhost:5173**) in your browser.

### All scripts

| Command | What it does |
|---|---|
| `npm run dev` | Run locally with hot reload while you use it. |
| `npm run build` | Produce an optimized static build in the `dist/` folder. |
| `npm run preview` | Serve the built `dist/` folder to check the production build. |
| `npm run lint` | Check the code with the linter. |

---

## Making it your own study plan

The entire schedule is calculated from a single start date. To point the plan at
your own study window, open **`src/data/curriculum.ts`** and edit the values at
the top:

```ts
export const START = "2026-07-16"; // first day of week 1 (YYYY-MM-DD)
export const EXAM  = "2026-12-31"; // your exam date (YYYY-MM-DD)
```

Every week's dates, the "current week", days remaining and pace all recalculate
from `START` automatically — this is the only place you need to change.

---

## Where your data lives

All progress (ticked topics, lab notes, logged hours) is saved in your browser's
local storage on the device you use it on. That means:

- It is private to you and never leaves your machine.
- It is **per-device / per-browser** — using a different browser or a private
  window starts fresh.
- Clearing your browser's site data will erase your progress, so treat it like
  any local file and back it up if it matters.

To wipe progress and start over, use the reset control inside the app.

---

## Publishing it online (optional)

Because the build is plain static files, you can host it anywhere:

1. Run `npm run build`.
2. Upload the contents of the generated **`dist/`** folder to any static host —
   Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any web server.

No backend or environment variables are required.

---

## Putting it in Git

This project is ready to be tracked with Git. From this folder:

```bash
git init
git add .
git commit -m "Initial commit: CCNP ENCOR progress tracker"
```

To push it to a new GitHub repository:

```bash
# 1. Create an empty repo on github.com (do not add a README or .gitignore).
# 2. Connect it and push (replace the URL with your repo's):
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

`node_modules/` and build output are already excluded via `.gitignore`, so only
the source is committed. After the first push, the normal cycle is:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

---

## Tech stack

React 19 · TypeScript · Vite · React Router · Zustand · PWA. No runtime backend.
