# Installation

A complete, beginner‑friendly guide to running the app on your computer.

## 1. Prerequisites

You need two free tools:

- **Node.js 20 or newer** (includes `npm`). This runs and builds the app.
- **Git** (optional, only needed to clone or publish to GitHub).

### Install Node.js

1. Go to <https://nodejs.org> and download the **LTS** installer for your OS.
2. Run the installer, accepting the defaults.
3. Verify it worked — open a terminal and run:
   ```bash
   node -v    # should print v20.x or higher
   npm -v
   ```

### Install Git (optional)

- Download from <https://git-scm.com/downloads> and install with defaults, or on macOS run `xcode-select --install`.
- Verify: `git --version`.

## 2. Get the code

If you downloaded a ZIP from the marketplace, unzip it and open a terminal **inside** the project folder (the one containing `package.json`).

If you're cloning from GitHub:
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

## 3. Install dependencies

```bash
npm install
```

This creates a `node_modules/` folder. It only needs to be done once (and again whenever dependencies change).

## 4. Run it locally

```bash
npm run dev
```

Open the URL it prints — usually **http://localhost:5173**. The app hot‑reloads as you edit files.

## 5. Environment variables

**None are required.** The app is fully client‑side with no backend or secrets.
An optional `.env.example` documents build‑time values if you want them — copy it to `.env` only if you need it:
```bash
cp .env.example .env
```

## 6. Production build

```bash
npm run build     # outputs static files to dist/
npm run preview   # serve dist/ locally to check the production build
```

`dist/` is a folder of plain static files you can host anywhere — see [DEPLOYMENT](DEPLOYMENT.md).

## 7. Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Type‑check + production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | Run the linter |

## Troubleshooting

- **`node: command not found`** — Node isn't installed or the terminal wasn't restarted after installing. Reopen the terminal.
- **`npm install` fails** — delete `node_modules/` and `package-lock.json`, then run `npm install` again. Ensure Node is v20+.
- **Port 5173 in use** — run `npm run dev -- --port 3000` (or any free port).
- **Blank page after build** — you're opening `dist/index.html` directly from the file system. Use `npm run preview` or a static server; the app expects to be served over HTTP.
