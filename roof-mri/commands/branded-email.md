---
description: Scaffold a SendGrid-ready branded HTML email in the Roof MRI / ReDry style (proposal, certification, or notification emails).
argument-hint: "[purpose, e.g. 'proposal sent' or 'cert complete']"
allowed-tools: Read, Write, Edit, Glob, Grep
---

Draft a transactional HTML email. Purpose: `$ARGUMENTS` (if empty, ask what the
email is for and who receives it).

Before writing, load the **brand-system** skill and look at the existing email
templates so the new one matches them:
- `roof-mri-backend/server.js` (proposal / open / signature emails via SendGrid)
- `roof-mri-training-presentation-pro/netlify/functions/lib/email.js`
  (cert email template + SendGrid wrapper)

Produce a self-contained, email-client-safe HTML template:
- **Inline CSS only** (no `<style>` blocks, no external stylesheets) — Gmail/Outlook safe.
- Table-based layout, max width ~600px, centered.
- Brand palette: navy header (`#1e2c55` / `#151f3d`), **one** green CTA button
  (`#00bd70`) linking to the relevant destination (proposal, cert, training).
- Poppins/Montserrat with web-safe fallbacks (Arial, Helvetica, sans-serif) —
  custom fonts don't render in most email clients, so fallbacks must look right.
- Plain-text preheader + a plain-text alternative body.
- Clear subject line and one primary action. Merge fields as `{{placeholders}}`
  matching how the existing sender code fills them.

Show the sender snippet too (the `msg`/`sgMail.send(...)` object) matching the
repo's existing SendGrid usage, using env vars already defined there
(`SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_FROM_NAME`). Never hard-code
API keys.
