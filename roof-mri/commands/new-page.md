---
description: Scaffold a new on-brand Roof MRI / ReDry static page (nav, hero, one primary CTA, footer) matching the sales-tools conventions.
argument-hint: "[filename.html] [one-line purpose]"
allowed-tools: Read, Write, Edit, Glob, Grep
---

Scaffold a new static page. Arguments: `$ARGUMENTS`
- `$1` = filename (e.g. `warranty.html`). If missing, ask once.
- The rest = the page's purpose / the single action it should drive.

Before writing:
1. Load the **brand-system** skill.
2. Read the existing `styles.css`, `index.html`, and `case-study.html` in this
   repo and **reuse** their design system, shared classes, nav, and footer — do
   not invent new components or a build step. Link `styles.css`, don't duplicate it.

Then generate the page with this structure (from `DESIGN.md`):
1. Sticky nav — logo · secondary link(s) · **one green primary CTA**.
2. Navy hero (`--navy-dark` background): headline, one-line supporting sentence,
   the single primary CTA, optional stat strip (real numbers only).
3. Body sections appropriate to the purpose, using existing card / tab / flow
   patterns; progressive disclosure over dumping content.
4. Navy CTA band repeating the primary action (secondary path as outline button).
5. Footer matching the other pages.

Rules: exactly one primary green button; Poppins headings + Montserrat body via
the existing font links; canonical links from the skill; plain HTML/CSS/JS, no
framework. After writing, run the equivalent of `/roof-mri-toolkit:brand-check`
on the new file and fix anything it flags.
