# Contributing

Whether you're extending your own copy or proposing a change, here's the workflow
and the conventions the codebase follows.

## Getting set up

```bash
npm install
npm run dev
```

Requirements: Node.js 20+. See [INSTALLATION.md](INSTALLATION.md).

## Before you open a PR

```bash
npm run lint     # linter must be clean
npm run build    # must type-check (strict) and build successfully
```

## Conventions

- **TypeScript strict** — no `any` escapes; type things properly.
- **State** goes in `src/store/` (Zustand); **pure logic** in `src/lib/` (no React); **UI** in `src/components/` and `src/pages/`.
- **Curriculum data** only changes in `src/data/curriculum.ts`.
- **Styling** via co‑located CSS Modules and the design tokens in `src/styles/tokens.css` — avoid hard‑coded colors; use `var(--token)`.
- **Accessibility** — label interactive elements, keep focus states, respect `prefers-reduced-motion`.
- **Commits** — conventional style (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`). See [GITHUB.md](GITHUB.md).

## Branch & PR flow

1. `git checkout -b feature/short-name`
2. Make focused changes; keep commits small.
3. Ensure lint + build pass.
4. Push and open a PR describing the change and how you tested it.
5. Squash and merge; delete the branch.

## Reporting issues

Include steps to reproduce, expected vs actual behaviour, browser/OS, and a screenshot if it's visual.
