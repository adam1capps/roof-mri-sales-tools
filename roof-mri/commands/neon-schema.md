---
description: Write or modify an idempotent Postgres schema/migration in the Neon + Render style used by the backend and training platform.
argument-hint: "[table or change, e.g. 'add certified_at to attendees']"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

Help with a Postgres schema change. Request: `$ARGUMENTS`

First read the existing schema so the change matches conventions:
- `roof-mri-training-presentation-pro/scripts/schema.sql` (idempotent schema +
  seeds) and `scripts/run-schema.mjs` (runs it against Neon).
- `roof-mri-backend/server.js` for the proposal-side tables and how migrations
  are applied there.

Then produce SQL that is:
- **Idempotent** — `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`,
  `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, guarded seeds
  (`INSERT ... ON CONFLICT DO NOTHING`). Safe to re-run.
- Consistent with existing naming (snake_case tables/columns, `id` PKs,
  `created_at timestamptz default now()`), and existing uniqueness rules such as
  the attendee index on `(session_id, LOWER(email))`.
- Backwards-compatible where possible (nullable or defaulted new columns; avoid
  destructive drops unless explicitly requested, and call those out).

Explain how to apply it (the repo's `npm run schema` / `run-schema.mjs` path, or
the Neon SQL editor), and note the required env var (`NEON_DATABASE_URL` for the
training platform, `DATABASE_URL` for the backend). Never print real connection
strings or secrets.
