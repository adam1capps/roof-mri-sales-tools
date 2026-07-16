---
description: Run a pre-deploy checklist for a Roof MRI / ReDry Netlify site or Functions app before pushing.
argument-hint: "[repo path, default = current repo]"
allowed-tools: Read, Glob, Grep, Bash
---

Pre-deploy sanity check for a Netlify deploy. Target repo: `$ARGUMENTS`
(default: the current repo).

Inspect and report, per the three known deploy shapes:

**All sites**
- `netlify.toml` present and valid: correct `publish` dir, `build.command`
  (or none for static), and headers/redirects.
- No secrets committed: scan for API keys / tokens in tracked files; confirm
  `.env` is git-ignored and only `.env.example` is tracked.
- Referenced env vars exist in `.env.example` and are documented (they must be
  set in the Netlify UI, not committed).

**Static sales-tools / training deck** (publish dir = repo root or `public/`)
- No build step assumed; all asset paths resolve (no absolute local paths,
  images present under `images/`).
- Canonical external links resolve (Calendly, proposals.roof-mri.com,
  training.roof-mri.com).

**Netlify Functions (training platform)**
- `netlify/functions/*.js` are Node 20 ESM; imports resolve; `lib/` helpers present.
- Each function reads only documented env vars (`NEON_DATABASE_URL`,
  `SENDGRID_*`, `ADMIN_*`, etc.).

**Vite frontend (backend repo)**
- Base directory `frontend-build`, build `npm run build`, publish
  `frontend-build/dist`; `VITE_API_URL` documented.

Finish with a checklist of ✅ / ⚠️ / ❌ items and the exact commands to deploy
(`git push` for auto-deploy, or `netlify deploy --prod`). Report only — don't
change deploy config unless I ask.
