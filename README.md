# Clean UP — Cleaning Company Website

A modern, fast marketing + CMS website for **Clean UP**, a professional cleaning
company based in Kuthuparamba, Kerala (Kannur district). Built for the client to
own, edit, and deploy on their own Cloudflare account — no monthly SaaS fees.

## What's included

- **Public site** — homepage, 3 service pages (house deep cleaning, glass, interlock),
  location pages, projects/portfolio, photo gallery, about, contact, free-estimate
  form, privacy/terms/refund.
- **Custom CMS (admin panel)** — edit contact details, services, projects (with a
  multi-image gallery), and a photo/video gallery. No third-party CMS.
- **SEO** — per-page titles/descriptions/keywords, sitemap, robots.txt, JSON-LD
  (LocalBusiness + Organization + breadcrumbs).
- **Live Google reviews** (optional) — pulls your business's recent Google reviews.
- **Dark/light mode**, smooth scroll, animations, WhatsApp + phone CTAs.

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4 |
| Hosting | Cloudflare Workers (via OpenNext) |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle |
| Auth | PBKDF2 + HMAC-signed cookie (edge-safe, no bcrypt) |

## Local development

Prerequisites: Node.js 20+ and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Local D1 (SQLite) is wired automatically via wrangler/miniflare — no setup needed.

### Seed local data (optional)

The local database is seeded with the 3 real works + settings + services. To
re-seed from the content files:

```bash
npx tsx scripts/gen-seed-sql.ts
npx wrangler d1 execute cleanup-db --local --file seed.sql
```

### Local admin login

- URL: http://localhost:3000/admin
- Username: `admin`
- Password: `admin123` (local dev only — set a real one on production, see below)

## Image storage — how it works

Photos are **resized and compressed in the browser** (max 1000px, JPEG quality
0.75) and stored directly in D1 as base64 data URLs. Videos use a YouTube/URL link.
This was chosen deliberately so the whole site runs on Cloudflare's **free tier
with no payment card**:

- No R2 (object storage) needed — R2 requires a card on file.
- Small images ≈ 50–150 KB each, so D1's free 5 GB easily holds a full portfolio.

Uploading a 5 MB phone photo in the admin results in a ~100 KB stored image — the
site never ships the original.

## CMS quick reference

| Admin page | What it edits |
|------------|---------------|
| `/admin/settings` | Phone, WhatsApp, email, address, hours, socials |
| `/admin/services` | Service names, descriptions, features, FAQs |
| `/admin/projects` | Works — title, location, type, description, image gallery (add/remove) |
| `/admin/gallery` | Site-wide photo/video gallery |

## Deploying to Cloudflare

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full step-by-step handover guide
(fork → D1 → secrets → deploy → custom domain).
