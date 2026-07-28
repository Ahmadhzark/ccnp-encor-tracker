# GitHub guide

Everything you need to put this project on GitHub and ship updates — from zero.

## 1. Create a repository

**Web:** go to <https://github.com/new>, name it, leave it empty (no README/.gitignore), create.

**CLI (GitHub CLI):** install from <https://cli.github.com>, then `gh auth login`.

## 2. Initialise Git locally

From the project folder:
```bash
git init -b main
git add .
git commit -m "chore: initial commit"
```

`node_modules/` and `dist/` are already excluded via `.gitignore`.

## 3. Connect and push

**With the GitHub CLI (creates the repo and pushes in one step):**
```bash
gh repo create my-ccnp-tracker --public --source=. --remote=origin --push
```

**Or manually, against a repo you made on the web:**
```bash
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

## 4. Everyday workflow

```bash
git add .
git commit -m "feat: add wireless lab set"
git push
```

### Conventional commit examples
Clear history sells better and reads well:
```
feat: add spaced-repetition review to the dashboard
fix: prevent horizontal overflow on long topic names
docs: write the deployment guide
style: tidy the labs card spacing
refactor: extract the pace calculation into lib/stats
chore: bump dependencies
```

## 5. Branches & pull requests

```bash
git checkout -b feature/flashcards
# …work…
git push -u origin feature/flashcards
```
Open a Pull Request on GitHub, review the diff, then **Squash and merge**. Delete the branch after merging.

## 6. Releases & version tags

Follow [semantic versioning](https://semver.org): `MAJOR.MINOR.PATCH`.
```bash
git tag -a v1.0.0 -m "v1.0.0 — initial release"
git push origin v1.0.0
```
Then GitHub → **Releases → Draft a new release**, pick the tag, paste the relevant [CHANGELOG](CHANGELOG.md) section, and attach a ZIP of the product if you're selling it.

## 7. GitHub Actions

The included `.github/workflows/deploy.yml` builds and deploys to Pages on every push to `main`. Watch runs under the **Actions** tab. To enable Pages: **Settings → Pages → Source: GitHub Actions**.

## 8. Repository & security settings

- **Settings → General** — default branch `main`, enable "Automatically delete head branches".
- **Settings → Branches** — add a protection rule on `main` (require PRs / status checks) for team work.
- **Security → Code security** — enable Dependabot alerts.
- Never commit secrets. `.env*` is gitignored; keep it that way.

## 9. Best practices

- Small, focused commits with conventional messages.
- One feature per branch/PR.
- Tag every release and keep the CHANGELOG current.
- Keep `main` always deployable (CI builds it on every push).
