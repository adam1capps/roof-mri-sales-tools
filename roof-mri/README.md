# Roof MRI Toolkit — Claude Code plugin

A Claude Code plugin that carries the **Roof MRI + ReDry** brand design system
and the team's recurring workflows into any Claude Code session, so work stays
on-brand and consistent across all three repos
(`roof-mri-sales-tools`, `roof-mri-backend`, `roof-mri-training-presentation-pro`).

This repo doubles as the plugin **marketplace** (see
`../.claude-plugin/marketplace.json`).

## Install

In Claude Code:

```
/plugin marketplace add adam1capps/roof-mri-sales-tools
/plugin install roof-mri-toolkit@roof-mri
```

To develop against a local checkout instead:

```
/plugin marketplace add ./roof-mri-sales-tools
/plugin install roof-mri-toolkit@roof-mri
```

Restart or `/plugin` to confirm it's enabled.

## What's inside

### Skill

- **`brand-system`** — the design-system source of truth (palette tokens, type,
  UX principles, product vocabulary, shared links, technical constraints).
  Auto-loads whenever you build or edit a Roof MRI / ReDry surface. It is the
  **product layer** and composes with the general `/capps-apps-design` skill:
  apply `/capps-apps-design` for design *judgement* (how to design), and
  `brand-system` for the product-specific *values* (what to use). It works
  standalone too — the capps-apps principles are restated inside it for when
  that skill isn't installed alongside the plugin.

### Commands

| Command | What it does |
|---|---|
| `/roof-mri-toolkit:brand-check [file]` | Audit a page/component against the brand system; reports off-brand color, type, UX, copy, and links. |
| `/roof-mri-toolkit:new-page [file] [purpose]` | Scaffold a new on-brand static page (nav, navy hero, one green CTA, footer) reusing `styles.css`. |
| `/roof-mri-toolkit:branded-email [purpose]` | Scaffold a SendGrid-ready, email-client-safe branded HTML email + sender snippet. |
| `/roof-mri-toolkit:neon-schema [change]` | Write idempotent Postgres schema/migrations in the Neon + Render style. |
| `/roof-mri-toolkit:netlify-check [repo]` | Pre-deploy checklist for the static sites, Netlify Functions, and Vite frontend. |
| `/roof-mri-toolkit:add-trainer [slug] [name]` | Walk the training-platform add-a-trainer flow and generate the SQL insert. |

### Agent

- **`brand-design-reviewer`** — a read-only subagent that reviews frontend
  changes against the design system and returns file-anchored findings with a
  PASS / NEEDS WORK verdict. Invoke it after building or editing UI.

## Editing the plugin

- Component files are auto-discovered from `commands/`, `skills/`, and `agents/`.
- Manifests: this plugin's `.claude-plugin/plugin.json` and the marketplace's
  `.claude-plugin/marketplace.json` at the repo root.
- Bump `version` in `plugin.json` when you want installed copies to update.
- The brand tokens live in one place — the `brand-system` skill. Update them
  there (and in `DESIGN.md` / `styles.css`) rather than in individual commands.
