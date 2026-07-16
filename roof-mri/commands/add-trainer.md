---
description: Walk the training-platform add-a-trainer flow (Admin UI or SQL) and generate the SQL insert for a new trainer slug.
argument-hint: "[slug] [Full Name] [title]"
allowed-tools: Read, Glob, Grep
---

Add a new trainer to the Roof MRI training platform
(`roof-mri-training-presentation-pro`). Arguments: `$ARGUMENTS`
- `$1` = slug (lowercase, URL-safe, e.g. `jane`) → their page goes live at `/jane`
- `$2 ...` = full name, and optionally a title.

If arguments are missing, ask for the slug and full name.

First read `roof-mri-training-presentation-pro/README.md` and
`netlify/functions/trainers.js` / `scripts/schema.sql` to confirm the current
`trainers` table shape and slug rules.

Then present **both** documented paths:

1. **Admin UI (recommended):** `/admin` → Trainers → **+ New Trainer**, enter the
   slug and name; the page at `/<slug>` is live immediately. No code change or deploy.
2. **SQL:** generate the exact idempotent insert, matching the schema, e.g.:
   ```sql
   INSERT INTO trainers (slug, full_name, title)
   VALUES ('<slug>', '<Full Name>', 'Certified Roof MRI Trainer')
   ON CONFLICT (slug) DO NOTHING;
   ```
   Note it applies via the Neon SQL editor or `npm run schema` path, needs
   `NEON_DATABASE_URL`, and requires no frontend change — the deck loads the
   trainer name from the URL slug via `/api/trainers`.

Validate the slug (lowercase, no spaces, unique) and flag collisions with the
seeded `adam` / `eric` slugs. Do not run anything against the database yourself.
