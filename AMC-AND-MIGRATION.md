# Maintenance (AMC) & Future Migration Plan

This document describes how the Clean UP site is **operated during the 1-year
Annual Maintenance Contract (AMC)** — where the code stays in *your* (the
developer's) repo and *you* deploy to the client's Cloudflare — and how to
**migrate ownership to the client later**, including push-to-deploy automation.

---

## Part 1 — The AMC model (current setup)

- **Code lives in your repo**: `github.com/AanandAB/Cleanup`.
- **You deploy to the client's Cloudflare Workers** — the client does not need
  GitHub, a terminal, or any technical involvement.
- **Client requests a change** → you make it → you deploy → done.

This keeps a clean separation: the client owns their live site + data, you own
the code and the release process.

### What you need from the client (one time)

To deploy into *their* Cloudflare account, collect these four items:

| Item | Where the client finds it |
|------|---------------------------|
| **Account ID** | Cloudflare dashboard → any zone → right sidebar → "Account ID" (32 hex chars) |
| **API token** | Dashboard → My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" template, scope to the account, also add **Account → D1 → Edit** permission |
| **D1 database ID** | Workers & Pages → D1 → their `cleanup-db` → copy the database id |
| **Domain** | The domain they want (must be added to Cloudflare — free) |

> The API token is a secret — store it in your password manager / `.env`, never
> commit it. It can be revoked by the client at any time.

### How you deploy (every change)

```bash
# 1. Make the content/code change, then commit + push to YOUR repo
git add -A && git commit -m "describe change" && git push

# 2. (Only if the database schema changed) apply migrations to THEIR D1
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... \
  npx wrangler d1 migrations apply cleanup-db --remote

# 3. Deploy to THEIR Workers
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npm run deploy
```

The client's `database_id` must already be set in `wrangler.jsonc` (see
DEPLOYMENT.md step 4).

---

## Part 2 — Future migration to the client's git

When the AMC ends and the client wants to own the code, hand it over in one of
two ways:

### Option A — Transfer the repo (recommended)

1. In your repo: **Settings → General → Danger Zone → Transfer ownership**.
2. Transfer to the client's GitHub user/org. All history, issues, and the
   `DEPLOYMENT.md` handover guide go with it.
3. Nothing else to move — the code is self-contained.

### Option B — Push a fresh copy to a repo the client creates

1. Client creates an empty repo (no README) on their GitHub.
2. You push:

   ```bash
   git remote add client https://github.com/CLIENT/cleanup-website.git
   git push client main
   ```

Either way, the client now has the code. The remaining step is enabling
**auto-deploy** below.

---

## Part 3 — Push-to-deploy automation (GitHub Actions)

The repo already contains `.github/workflows/deploy.yml`. Once the client has
the repo, every push to `main` automatically builds and deploys to Cloudflare
Workers — no terminal needed.

### Steps for the client (or you, on their behalf)

1. In the client's GitHub repo: **Settings → Secrets and variables → Actions →
   New repository secret**. Add two secrets:

   | Secret name | Value |
   |-------------|-------|
   | `CLOUDFLARE_API_TOKEN` | The same scoped token from Part 1 |
   | `CLOUDFLARE_ACCOUNT_ID` | The 32-char account ID from Part 1 |

2. Confirm the client's `database_id` is set in `wrangler.jsonc`.

3. Done. Now any commit to `main` triggers the workflow, which:
   1. Applies any new D1 migrations (idempotent),
   2. Builds with OpenNext,
   3. Deploys to the client's Cloudflare Workers.

### How the auto-deploy stays safe in your repo

The workflow is guarded with `if: ${{ secrets.CLOUDFLARE_API_TOKEN != '' }}`.
In your repo (where you deploy manually and don't set that secret), the job is
**skipped** — your pushes never run or fail the workflow. The moment the client
adds the secret in their repo, the same file activates automatically.

### Day-to-day after migration

- Client edits content in the admin panel → live immediately, no deploy.
- Client (or you) edits code → commit + push → GitHub Actions deploys automatically.
- The workflow's deploy is logged under the repo's **Actions** tab for visibility.

---

## Quick reference

| Phase | Where code lives | How deploys happen |
|-------|------------------|--------------------|
| AMC (now) | Your repo (`AanandAB/Cleanup`) | You run `npm run deploy` with the client's token |
| After migration | Client's repo | Push to `main` → GitHub Actions auto-deploys |
