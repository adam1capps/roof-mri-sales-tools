# Design notes, Roof MRI Sales Tools

This documents the design decisions so the pages can go straight to Claude
Design (CD) for any further polish without re-deriving context.

## Principles applied (capps-apps design judgement)

- **One primary action per screen.** Every screen has exactly one green
  button that matters: *Book a call* on the teaser, *Build my training
  proposal* on the case study. Secondary paths are outline/ghost buttons.
- **Defer to the platform.** Standard web patterns, sticky nav, tabs,
  cards. Nothing custom that a first-time visitor has to learn.
- **Progressive disclosure.** The case study hides depth behind six tabs and
  per-building chips instead of dumping every image at once.
- **Show state once.** Active tab / active building is indicated in one
  place, not repeated.
- **Clear, not clever; buttons name the action; numbers do work.**
  "Book my 15-minute call", "Open the full PDF", "5 of 6 needed ReDry",
  "157 vents". No filler stats.

## Color & type, source of truth (do not reinvent)

Carried over verbatim from `roof-mri-training-presentation-pro` and
`roof-mri-backend`. Per the capps design skill, colors and product
vocabulary come from Claude Design / the existing product, not from this
build.

| Token | Value | Use |
|---|---|---|
| `--green` | `#00bd70` | primary action, accents, "dry" |
| `--green-dark` | `#00a35f` | hover, emphasis numerals |
| `--navy` | `#1e2c55` | headings, secondary action |
| `--navy-dark` | `#151f3d` | hero / CTA / footer backgrounds |
| `--blue-500` | `#0284C7` | "District" accent (deck pillar-4 blue) |
| `--amber-500` | `#F59E0B` | "GACO / manufacturer" accent |
| moisture legend | green / `#EAB308` / `#F97316` / `#EF4444` | dry → saturated |

Type: **Poppins** (display, 600-900) + **Montserrat** (body). Both via
Google Fonts, matching the deck.

## Page structure

### `index.html`, teaser
1. Sticky nav (logo · See the case study · **Book a call**)
2. Navy hero, headline, three-party one-liner, primary CTA, stat strip
   (6 buildings · 157 vents · 5/6 needed ReDry · 1 clean)
3. "What's the offer", three cards: **District / Contractor / GACO**
4. Lifecycle flow, Scan → Map → Dry → Verify → Warranty
5. Navy CTA band, book the call (primary) or view case study (secondary)
6. Footer

### `case-study.html`, slide 28, standalone
1. Sticky nav
2. Header, pillar tag, "McCallum HS, The App in Action", meta strip, hint
3. Six-tab walkthrough (ported from the deck): Campus, Blank Grids, MRI
   Report, Vent Map, Installed, The Bid, with building chips + carousel
4. **Next step** (navy), the proposal software: three training tiers
   (Professional $10K / Regional $35K / Enterprise $75K+) + *Build my
   training proposal* → `proposals.roof-mri.com`
5. Footer

## If handing to Claude Design, good candidates for polish

These are intentionally left simple and safe to elevate:

- **Hero art.** The teaser hero is a gradient; a McCallum aerial or a subtle
  moisture-heatmap texture could replace/augment it.
- **Offer-card icons.** Currently inline stroke SVGs; swap for the brand icon
  set if one exists.
- **Motion.** Only hover/tab transitions today. Scroll-reveal on the offer
  cards and flow steps (respecting `prefers-reduced-motion`) would add life.
- **Stat strip → animated counters** on the teaser.
- **Tier cards.** Could pull live pricing from the proposal backend instead
  of the static $10K/$35K/$75K+ display values.

Everything is plain HTML/CSS/JS with no build step, so CD edits drop in
directly.
