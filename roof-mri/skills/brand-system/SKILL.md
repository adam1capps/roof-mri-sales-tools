---
name: brand-system
description: The Roof MRI + ReDry brand design system and product vocabulary — the single source of truth for colors, type, UX principles, voice, and shared links. Use whenever building or editing any Roof MRI / ReDry frontend — static sales pages, the proposal software UI, the training deck/overlay, branded emails, or any page, component, or copy that a prospect, contractor, trainer, or attendee will see. Apply it before choosing colors, fonts, layout, or wording so everything stays on-brand and consistent across the three repos. Composes with the general /capps-apps-design skill — apply that for design judgement (how to design), and this for the product-specific tokens and vocabulary (what to use).
---

# Roof MRI + ReDry brand system

This is the **source of truth** for the look, feel, and voice of every Roof MRI
and ReDry surface. Colors, type, and product vocabulary are carried over verbatim
across `roof-mri-sales-tools`, `roof-mri-backend` (proposal software), and
`roof-mri-training-presentation-pro` (training platform). **Do not reinvent
them** — reuse the tokens below.

## Relationship to `/capps-apps-design`

This skill is the **product layer**, not a general design method — the two are
meant to be applied together:

- **`/capps-apps-design`** (the capps-apps design skill / judgement) governs
  *how* to design: layout, hierarchy, interaction, and the core rule that
  concrete colors and product vocabulary come from the product / Claude Design,
  **not** invented in the build. Apply it first whenever it's loaded in the
  session; treat it as the authority on design method.
- **`brand-system`** (this skill) is the concrete Roof MRI / ReDry realization
  that `/capps-apps-design` tells you to defer to: the exact palette tokens,
  type, product vocabulary, links, and technical constraints below.

The UX principles in this file are the capps-apps design judgement *as applied
to these products*, restated here so the plugin is useful even when
`/capps-apps-design` isn't installed. When it is installed, it is the authority
on those principles and this skill supplies the product-specific values.

## Color tokens

Define these as CSS custom properties and reference them; never hard-code new hex
values for the same role.

| Token | Value | Use |
|---|---|---|
| `--green` | `#00bd70` | Primary action, accents, the "dry" state |
| `--green-dark` | `#00a35f` | Hover, emphasis numerals |
| `--navy` | `#1e2c55` | Headings, secondary action |
| `--navy-dark` | `#151f3d` | Hero / CTA / footer backgrounds |
| `--blue-500` | `#0284C7` | "District" accent (deck pillar-4 blue), ReDry blue |
| `--amber-500` | `#F59E0B` | "GACO / manufacturer" accent |

**Moisture legend** (dry → saturated), used on scan grids, vent maps, and heatmaps:

| State | Value |
|---|---|
| Dry | `#00bd70` (green) |
| Damp | `#EAB308` (yellow) |
| Wet | `#F97316` (orange) |
| Saturated | `#EF4444` (red) |

ReDry footprint map convention: **green = installed / drying**, **orange = bid /
scanned**. City + state only — never plot street addresses.

## Type

- **Display / headings:** Poppins (weights 600–900)
- **Body:** Montserrat
- Both loaded via Google Fonts. Match the deck — do not substitute other fonts.

## UX principles (apply to every screen)

1. **One primary action per screen.** Exactly one green button that matters
   (e.g. *Book a call*, *Build my training proposal*). Secondary paths are
   outline / ghost buttons, never a second green button.
2. **Defer to the platform.** Standard web patterns — sticky nav, tabs, cards.
   Nothing custom a first-time visitor has to learn.
3. **Progressive disclosure.** Hide depth behind tabs / chips instead of dumping
   everything at once.
4. **Show state once.** Indicate the active tab / building / step in one place,
   not repeated across the screen.
5. **Clear, not clever.** Buttons name the action ("Book my 15-minute call",
   "Open the full PDF"). Numbers do work ("157 vents", "5 of 6 needed ReDry").
   No filler stats.
6. **Respect `prefers-reduced-motion`** on any scroll-reveal or animation.

## Product vocabulary (use these terms exactly)

- **Roof MRI** — the moisture-scan + reporting product. A scan pays off three ways.
- **ReDry** — the two-way solar vent system that dries wet insulation; also the
  parent brand (re-dry.com).
- **The three parties** a scan serves: the **District** (owner), the
  **Contractor**, and the manufacturer (**GACO**). Keep this framing consistent.
- **Lifecycle:** Scan → Map → Dry → Verify → Warranty.
- **Training tiers:** Professional ($10K) · Regional ($35K) · Enterprise ($75K+).
- Reference project: **McCallum HS / Austin ISD** (6 buildings, 157 vents,
  5 of 6 needed ReDry, 1 clean).

## Shared links

- **Book a call (Calendly):** https://calendly.com/adam-re-dry/google-meet-roof-mri-consultation
- **Proposal software:** https://proposals.roof-mri.com
- **Training platform:** https://training.roof-mri.com

## Technical constraints

- Sales pages and the training deck are **plain HTML/CSS/JS with no build step**,
  hosted on **Netlify** (publish dir = repo root for sales-tools). Edits must drop
  in directly — do not introduce a bundler or framework for these surfaces.
- The proposal frontend (`roof-mri-backend/frontend-build`) is Vite; its backend
  is Node/Express on Render with Postgres + SendGrid + Stripe.
- The training platform uses Netlify Functions (Node 20 ESM) + Neon Postgres +
  SendGrid.

When in doubt, open `roof-mri-sales-tools/DESIGN.md` and the existing
`styles.css` — they are the canonical reference this skill summarizes.
