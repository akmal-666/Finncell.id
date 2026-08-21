# fincell.id — Toko iPhone & Apple Ecosystem Garansi Resmi

> E-Commerce platform modern untuk toko iPhone garansi resmi Apple Indonesia dengan fitur Katalog, Trade-In, Promo, Blog CMS, SEO Engine, dan Manajemen Media Backblaze B2.

---

## 🏗 Architecture & Stack Overview

- **Monorepo Layout**: `pnpm` workspace + TypeScript
- **Frontend (`apps/web`)**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router DOM v6
- **Backend Worker (`apps/worker`)**: Hono v4 running on Cloudflare Workers edge network
- **Database**: Cloudflare D1 Database (SQLite at edge)
- **Storage**: Backblaze B2 Storage (S3-compatible Object Storage)
- **Deployment & CI/CD**: Cloudflare Pages (Frontend) + Cloudflare Workers (Backend) + GitHub Actions

---

## 🌿 Git Branching Strategy

| Branch | Purpose | Environment Target | Auto Deploy |
| :--- | :--- | :--- | :--- |
| `main` | Production release code | `fincell.id` / `api.fincell.id` | ✅ Yes (GitHub Actions) |
| `develop` | Staging / Pre-release testing | `staging.fincell.id` | 🔄 Staging pipeline |
| `feature/*` | Feature development branches | Local dev & PR review | ❌ CI Quality Gate only |

### Pull Request (PR) Policy
- Every PR targeting `main` or `develop` **must** pass the GitHub Actions CI Quality Gate (`.github/workflows/ci.yml`).
- Checks executed: `lint`, `typecheck`, `test`, `build`.
- **If any step fails**: The PR is blocked from merging automatically.

---

## 🛠 Local Setup & Installation

### Prerequisites
- Node.js `>= 18.0.0` (Recommended: Node 20 LTS)
- `pnpm` `>= 8.0.0` (`npm i -g pnpm`)
- Cloudflare Wrangler CLI (`npm i -g wrangler`)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-org/fincell.id.git
cd fincell.id
pnpm install
```

### 2. Configure Environment Variables

Create `.env` file inside `apps/web/`:
```env
VITE_API_BASE_URL=http://localhost:8787/api
VITE_STORE_NAME=fincell.id
```

Create `.env` file inside `apps/worker/`:
```env
ENVIRONMENT=development
PUBLIC_BASE_URL=http://localhost:8787
B2_KEY_ID=your_b2_key_id
B2_APPLICATION_KEY=your_b2_application_key
B2_BUCKET_NAME=fincell-media
```

---

## 🗄 Cloudflare D1 Setup & Migrations

### 1. Create D1 Database (Cloudflare Dashboard or CLI)
```bash
npx wrangler d1 create fincell-db-prod
```
Update `database_id` in `apps/worker/wrangler.json`.

### 2. Run Migrations Locally
```bash
cd apps/worker
npx wrangler d1 migrations apply fincell-db-dev --local
```

### 3. Run Migrations on Remote Production DB
```bash
cd apps/worker
npx wrangler d1 migrations apply fincell-db-prod --remote
```

### 4. Seed Default Admin User
Send a POST request to seed default admin:
```bash
curl -X POST http://localhost:8787/api/auth/seed
```
*Default Credentials*: `admin@fincell.id` / `admin123`

---

## 📦 Backblaze B2 Storage Setup

1. Create a Bucket on Backblaze B2 (e.g. `fincell-media`).
2. Set Bucket Access to **Public**.
3. Generate an Application Key with **Read & Write** permissions.
4. Bind B2 credentials as Cloudflare Worker Secrets (never expose to frontend):
```bash
cd apps/worker
npx wrangler secret put B2_KEY_ID
npx wrangler secret put B2_APPLICATION_KEY
npx wrangler secret put B2_BUCKET_NAME
```

---

## 🌐 Domain Configuration

| Hostname | Target Service | Cloudflare SSL/TLS |
| :--- | :--- | :--- |
| `fincell.id` | Cloudflare Pages (`fincell-web`) | Full (Strict) |
| `www.fincell.id` | Page Redirect -> `fincell.id` | Full (Strict) |
| `api.fincell.id` | Cloudflare Worker (`fincell-worker-prod`) | Full (Strict) |

---

## 🔑 GitHub Secrets Required

Configure the following secrets in GitHub Repository Settings (`Settings -> Secrets and variables -> Actions`):

- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Edit Workers & Pages permissions.
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare Account ID.
- `B2_KEY_ID` — Backblaze B2 Key ID.
- `B2_APPLICATION_KEY` — Backblaze B2 Application Key.
- `B2_BUCKET_NAME` — Backblaze B2 Bucket Name (`fincell-media`).

---

## 🚀 Deployment Pipeline

### Automated CI/CD (Recommended)
Pushing to the `main` branch automatically triggers `.github/workflows/deploy.yml`:
1. Runs lint, typecheck, tests, and build.
2. Applies pending D1 migrations to `fincell-db-prod`.
3. Deploys worker API to `api.fincell.id`.
4. Deploys Vite bundle to Cloudflare Pages (`fincell.id`).

### Manual CLI Deployment
```bash
# Build all packages
pnpm run build

# Deploy Worker API
cd apps/worker
npx wrangler deploy --env production

# Deploy Web Frontend
cd ../web
npx wrangler pages deploy dist --project-name=fincell-web --branch=main
```

---

## ⏪ Rollback Procedures

### 1. Worker API Rollback
To rollback the Cloudflare Worker to a previous deployment version:
```bash
cd apps/worker
npx wrangler deployments list
npx wrangler rollback [DEPLOYMENT_ID]
```

### 2. Frontend Pages Rollback
To rollback Cloudflare Pages:
1. Go to Cloudflare Dashboard -> **Pages** -> **`fincell-web`**.
2. Select **Deployments** tab.
3. Locate the last stable deployment, click **...** -> **Rollback to this deployment**.

### 3. D1 Database Rollback
If a migration caused issues, execute down migration or restore D1 backup snapshot:
```bash
npx wrangler d1 time-travel restore fincell-db-prod --timestamp="2026-08-21T00:00:00Z"
```

---

## 📜 Development Commands Quick Reference

```bash
# Start Web dev server (http://localhost:5173)
pnpm --filter web dev

# Start Worker dev server (http://localhost:8787)
pnpm --filter worker dev

# Run all TypeScript typechecks
pnpm run typecheck

# Run Worker QA API tests
pnpm run test

# Build production bundles
pnpm run build
```
