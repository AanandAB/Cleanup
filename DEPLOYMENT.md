# Deployment & Handover Guide — Cloudflare (Free Tier)

Step-by-step guide to get this site live on **your own Cloudflare account**, on the
**free tier**, with no payment card required. Takes ~20 minutes.

> You only do this once. After that, every future deploy is just `npm run deploy`.

---

## 0. Prerequisites

- A **GitHub** account (to fork/host the code).
- A **Cloudflare** account (free — https://dash.cloudflare.com/sign-up).
- **Node.js 20+** and npm installed locally (https://nodejs.org).

---

## 1. Fork the repository

1. Go to the repo on GitHub → **Fork** → fork it into your account.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/cleanup-website.git
   cd cleanup-website
   npm install
   ```

---

## 2. Update your business details (one-time, important)

Open `src/lib/site.ts` and set the real values. The three you must change:

```ts
export const siteConfig = {
  // ...
  url: "https://your-domain.com",   // ← your real domain (used for SEO/sitemap)
  phone: "9074807315",              // ← your call number
  whatsapp: "918129321151",         // ← your WhatsApp (91 + number)
  email: "you@example.com",         // ← your email
  // social.instagram / social.facebook — set or leave as placeholders
};
```

> **`url` matters** — it's used for the sitemap, canonical tags, and social-share
> cards. Set it to your final domain *before* you deploy.

Also drop your logo at `public/logo.jpeg` (a square ~256px PNG/JPEG is ideal).

---

## 3. Log in to Cloudflare from the CLI

```bash
npx wrangler login
```

A browser opens — authorize the account. (This stores credentials locally.)

---

## 4. Create the D1 database

```bash
npx wrangler d1 create cleanup-db
```

It prints something like:

```
✅ Created database cleanup-db with id: 9f8a2e…-…-…-…
```

Copy that **database id** and paste it into `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "cleanup-db",
    "database_id": "PASTE-THE-ID-HERE",   // ← replace the 000000… placeholder
    "migrations_dir": "drizzle/migrations"
  }
]
```

---

## 5. Apply the database schema

```bash
npx wrangler d1 migrations apply cleanup-db --remote
```

---

## 6. Seed the content (services, projects, settings, gallery)

```bash
npx tsx scripts/gen-seed-sql.ts
npx wrangler d1 execute cleanup-db --remote --file seed.sql
```

---

## 7. Create your admin account (set YOUR password)

Replace `"YOUR-STRONG-PASSWORD"` with a real password:

```bash
node scripts/gen-admin-sql.cjs "YOUR-STRONG-PASSWORD"
npx wrangler d1 execute cleanup-db --remote --file seed-admin.sql
```

> This creates the admin user (username `admin`) with **your** password. Do not
> skip this — the default `admin123` must never ship to production.

---

## 8. Set the Worker secrets

```bash
npx wrangler secret put AUTH_SECRET
```

When prompted, paste a long random string (e.g. mash the keyboard, or generate one:
`openssl rand -base64 32`). This signs the admin login cookie — keep it private.

**Optional — live Google reviews:** if you want the site to pull your Google
Business reviews, also set these two secrets (see `.env.example` for how to get
them):

```bash
npx wrangler secret put GOOGLE_PLACES_API_KEY
npx wrangler secret put GOOGLE_PLACE_ID
```

If you skip this, the reviews section shows an honest placeholder + a
"Write a review" button. Nothing breaks.

---

## 9. Deploy

```bash
npm run deploy
```

This builds the site and deploys it to Cloudflare Workers. It prints a live URL
like `https://cleanup-website.<your-subdomain>.workers.dev`.

---

## 10. Connect your domain

1. In the Cloudflare dashboard → **Workers & Pages** → click your worker
   (named `cleanup-website`).
2. **Settings → Domains & Routes → Add → Custom Domain**.
3. Enter `your-domain.com` (and optionally `www.your-domain.com`).
4. If the domain's DNS isn't already on Cloudflare, follow the prompts to add the
   site to Cloudflare (free) — it'll set up the DNS records automatically.

> If you already changed `siteConfig.url` in step 2, your sitemap and canonical
> tags now point at the right domain.

---

## 11. Verify

1. Open your domain → the homepage should load.
2. Go to `/admin` → log in with `admin` + your password.
3. Edit something (e.g. Settings → phone), save, and confirm it appears on the
   live site.

---

## Updating the site later (everyday workflow)

Make content edits **in the admin panel** — no code or redeploy needed. To ship
code changes (e.g. you made a code tweak), just:

```bash
git add -A && git commit -m "describe change"
git push
npm run deploy
```

---

## Cloudflare free-tier limits (what you're working with)

| Service | Free allowance | Notes |
|---------|----------------|-------|
| Workers requests | 100,000 / day | More than enough for a local business site |
| D1 storage | 5 GB | Images are browser-compressed to ~50–150 KB, so ~30,000+ photos fit |
| D1 reads | 5 million / day | — |
| D1 writes | 100,000 / day | Only used when you save in the admin |
| R2 | (not used) | Images live in D1 as compressed data URLs — no card needed |

**Why images are stored this way:** the admin compresses every uploaded photo in
the browser (max 1000px, JPEG quality 0.75) and stores it as a data URL in D1.
This keeps the whole platform on the free tier with **no credit card**, because
Cloudflare's R2 object storage requires a card on file. If you later outgrow it
(thousands of photos), the upgrade path is to add an R2 bucket — the code has a
placeholder for it.

---

## Troubleshooting

- **`wrangler login` fails** → make sure you're on the latest wrangler:
  `npm i -D wrangler@latest`.
- **Deploy 401/unauthorized** → re-run `npx wrangler login`.
- **Admin login not working in production** → confirm `AUTH_SECRET` is set
  (`npx wrangler secret list`) and you created the admin user in step 7.
- **Sitemap shows the wrong domain** → update `siteConfig.url` (step 2) and redeploy.
- **Images look low-res** → the admin resizes to 1000px on purpose (free tier).
  For a full-res use case, move to R2.
