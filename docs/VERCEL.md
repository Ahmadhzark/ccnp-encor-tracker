# Deploying to Vercel

A beginner‑friendly walkthrough. Vercel's free tier is plenty for this app.

## 1. Create an account
Go to <https://vercel.com/signup> and sign up — the easiest option is **Continue with GitHub**.

## 2. Import the repository
1. Push the project to GitHub first (see [GITHUB.md](GITHUB.md)).
2. In Vercel: **Add New… → Project → Import** your repo.

## 3. Configure the build
Vercel auto‑detects Vite. Confirm:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## 4. Environment variables
**None required.** Leave this section empty. (If you later add optional `VITE_*` values, add them here — they're build‑time and public.)

## 5. Deploy
Click **Deploy**. In ~a minute you get a live URL like `https://your-project.vercel.app`.

## 6. Custom domain
**Project → Settings → Domains → Add.** Enter your domain and follow the DNS records Vercel shows at your registrar. After it's live, update the URLs in `index.html`, `public/robots.txt` and `public/sitemap.xml`.

## 7. Preview vs Production
- Every push to **`main`** → a new **Production** deployment.
- Every push to another branch / PR → a **Preview** deployment with its own URL. Great for testing before merging.

## 8. Redeploy & rollback
- **Redeploy:** push to the branch, or use **Deployments → ⋯ → Redeploy**.
- **Rollback:** **Deployments →** pick a previous successful one **→ Promote to Production**.

## 9. Monitoring
The **Deployments** and **Analytics** tabs show build logs, status and (optionally) traffic.

> Netlify and Cloudflare Pages follow the same idea — build `npm run build`, output `dist`. See [DEPLOYMENT.md](DEPLOYMENT.md).
