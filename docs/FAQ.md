# FAQ

**Do I need a server, database or account?**
No. The app is 100% client‑side. All progress is stored in the visitor's browser.

**Where is my data stored, and is it private?**
On your device only (IndexedDB + localStorage). Nothing is uploaded anywhere. Use **Settings → Backup & restore** to move it between devices.

**Will I lose progress if I clear my browser?**
Yes — clearing site data erases local progress. Export a backup periodically; it's a single JSON file.

**Does it work offline?**
Yes. It's a PWA — install it (browser "Install app" / Add to Home Screen) and it works with no connection.

**What are the requirements to run/build it?**
Node.js 20+ and npm. That's it. See [INSTALLATION.md](INSTALLATION.md).

**How do I change the topics, labs or exam date?**
Edit `src/data/curriculum.ts`. Exam and start dates can also be changed by end users in **Settings**. See [CUSTOMIZATION.md](CUSTOMIZATION.md).

**How do I rebrand it (name, colors, logo, links)?**
Update `index.html`, `vite.config.ts` (PWA manifest), `src/styles/tokens.css` (themes) and `src/pages/About.tsx` (links). See [CUSTOMIZATION.md](CUSTOMIZATION.md).

**Can I deploy it for free?**
Yes — GitHub Pages, Vercel, Netlify and Cloudflare Pages all have free tiers. See [DEPLOYMENT.md](DEPLOYMENT.md).

**Do deep links / refresh break on static hosts?**
No. The app uses hash routing (`/#/…`), so every host serves deep links without rewrite rules.

**Is there a backend/API to secure?**
No. There are no secrets and no server. `.env` is optional and gitignored.

**Can I sell what I build with it?**
Depends on your license tier — see [LICENSE.md](../LICENSE.md).
