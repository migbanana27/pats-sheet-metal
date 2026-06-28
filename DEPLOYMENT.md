# Deploying Pat's Sheet Metal to the Web

This guide explains exactly how to get the site live, with **zero code changes**.

---

## Why not GitHub Pages?

GitHub Pages serves **only static files** (HTML/CSS/JS). This project is a
**Next.js server app** with:

- `output: "standalone"` in `next.config.ts` → produces a `server.js`, not `index.html`
- `POST /api/contact` route → needs a running Node server
- SQLite database via Prisma → needs a writable filesystem
- SMTP email via nodemailer → needs outbound network sockets

None of those can run on GitHub Pages. That is why you saw the
`404 File not found — provide an index.html` error.

To publish this site **unchanged**, use **Vercel** (free tier, 5-minute setup,
built by the same company that makes Next.js). Your code lives on GitHub; Vercel
serves the live site.

---

## Path A — Vercel (RECOMMENDED, zero code changes)

### Step 1 — Push the code to GitHub

1. Create a new repo on github.com (e.g. `pats-sheet-metal`). **Do not** add a
   README, .gitignore, or license — the project already has them.
2. In your terminal, from the project root:

   ```bash
   git remote add origin https://github.com/<your-username>/pats-sheet-metal.git
   git branch -M main
   git push -u origin main
   ```

   If you cloned this from somewhere else and want a fresh history, run
   `rm -rf .git && git init && git add . && git commit -m "init"` first.

### Step 2 — Connect Vercel

1. Go to <https://vercel.com/new>
2. Sign in with GitHub.
3. Click **Import Project** → select your `pats-sheet-metal` repo.
4. Vercel auto-detects Next.js. **Leave all build settings default.** Do NOT
   change Build Command or Output Directory.
5. Click **Environment Variables** and add (see `.env.example` for full list):

   | Key | Value | Required? |
   |---|---|---|
   | `DATABASE_URL` | `file:/tmp/custom.db` (works for testing) | Yes |
   | `SMTP_HOST` | your SMTP host (e.g. `smtp.gmail.com`) | No — without it, no email is sent |
   | `SMTP_PORT` | `587` | No |
   | `SMTP_SECURE` | `false` | No |
   | `SMTP_USER` | your SMTP username | No |
   | `SMTP_PASS` | your SMTP password / app password | No |
   | `SMTP_FROM` | `shop@patsheetmetal.com` | No |
   | `MAIL_TO` | where you want quote notifications sent | No |

6. Click **Deploy**. Vercel builds and deploys in ~2 minutes.
7. Your site is live at `https://pats-sheet-metal.vercel.app` (or similar).

### Step 3 — Database setup (required for the contact form)

The default config uses SQLite at `file:/tmp/custom.db`. On Vercel:

- `/tmp` is wiped on every cold start, so submissions will disappear between
  deployments. **This is fine for testing** but not for production.

**For production**, switch to a hosted Postgres:

1. Create a free Postgres on <https://neon.tech> or <https://supabase.com>.
2. Edit `prisma/schema.prisma` line 19:
   ```prisma
   datasource db {
     provider = "postgresql"   // was "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
3. Set the Vercel env var `DATABASE_URL` to your Neon/Supabase connection string.
4. Run locally: `npx prisma db push` to create the tables.
5. Redeploy on Vercel (just push to main — Vercel rebuilds automatically).

> ⚠️ Switching DB provider is the ONE code change you'll eventually want to make.
> The site will run unchanged on SQLite for testing, but submissions won't
> persist across Vercel cold starts.

### Step 4 — Custom domain (optional)

In Vercel: **Project → Settings → Domains → Add**. Enter your domain (e.g.
`patsheetmetal.com`), then add the CNAME/A records Vercel shows you at your
DNS provider. HTTPS is auto-provisioned.

---

## Path B — GitHub Pages (NOT recommended, requires code changes)

Only choose this if you cannot use Vercel. You will lose:

- The contact form's backend (DB write + email) — must be replaced with a
  third-party form service like Formspree, or removed entirely
- The `output: "standalone"` setting must be changed to `output: "export"` in
  `next.config.ts`
- A `basePath` must be set if your repo isn't named `<username>.github.io`
- An `index.html` will be generated in `out/`, which you push to a `gh-pages`
  branch

If you really need this path, ask me to prepare a static-export variant.

---

## Files removed from git tracking before this push

These were tracked in the original upload and have been removed from the git
index (they still exist on disk locally, just no longer committed):

| File | Reason |
|---|---|
| `.env` | Contains local absolute path; use `.env.example` instead |
| `db/custom.db` | Local SQLite DB with test data; regenerate per-host |
| `download/quote-emails/*.html` | Test quote submissions with personal info |
| `verify-pdf.png` | Debug screenshot |

`.gitignore` was updated to prevent these from being re-added accidentally.

---

## Quick troubleshooting

- **Build fails on Vercel with Prisma error** → add `postinstall` script:
  `"postinstall": "prisma generate"` in `package.json` (this IS a small change,
  but commonly needed). Vercel usually auto-detects Prisma though.
- **Contact form returns 500** → check Vercel logs. Usually a missing
  `DATABASE_URL` or DB not initialized. Run `npx prisma db push` locally
  against your production DB.
- **Images don't load** → make sure `public/images/` is committed to git.
  Verify with `git ls-files public/images/`.
- **404 on Vercel preview** → wait for the build to finish. First deploy
  takes ~2 minutes.
