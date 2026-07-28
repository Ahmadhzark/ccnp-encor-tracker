# Deployment

The app builds to **static files** (`dist/`) — no server, database or environment
variables required. Host it anywhere. Two facts make deployment painless:

- **Relative base** (`base: './'` in `vite.config.ts`) → works from a domain root **or** a sub‑path.
- **Hash routing** (`/#/path`) → no server rewrite rules needed; deep links never 404.

Build first:
```bash
npm run build   # → dist/
```

---

## GitHub Pages (included workflow)

A ready‑made workflow at `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

1. Push the repo to GitHub (see [GITHUB.md](GITHUB.md)).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The Action builds and deploys automatically.
4. Your site: `https://<username>.github.io/<repo>/`.

> Public repos get Pages for free. Private repos need a paid GitHub plan.

## Vercel

See the step‑by‑step [VERCEL.md](VERCEL.md). In short: import the repo, framework preset **Vite**, build `npm run build`, output `dist`, deploy.

## Netlify

1. **Add new site → Import from Git**, pick the repo.
2. Build command `npm run build`, publish directory `dist`.
3. Deploy. (Hash routing means no `_redirects` file is needed.)

## Cloudflare Pages

1. **Create a project → Connect to Git**.
2. Framework preset **Vite** (or None), build `npm run build`, output `dist`.
3. Save and deploy.

## Any static host / VPS (nginx)

Upload the contents of `dist/` to your web root and serve it. Example nginx block:

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /var/www/ccnp-tracker;   # the uploaded dist/ folder
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}
```

## Docker (optional)

```dockerfile
# Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t ccnp-tracker .
docker run -p 8080:80 ccnp-tracker   # http://localhost:8080
```

## Custom domain

- **GitHub Pages:** Settings → Pages → Custom domain, then add the DNS records your registrar shows.
- **Vercel/Netlify/Cloudflare:** Project → Domains → add domain and follow the DNS steps.
- After setting a domain, update the URLs in `index.html` (canonical/OG), `public/robots.txt` and `public/sitemap.xml`.
