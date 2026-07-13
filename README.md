# Roof MRI · Sales Tools

Cold-call and first-meeting sales pages for Roof MRI + ReDry. Two cohesive,
standalone pages that share one design system and move a prospect from a cold
call to a booked meeting to the proposal software.

## The funnel

| Stage | Page | Primary action |
|---|---|---|
| **Cold call** — Jimmy leaves a "what's the offer" link | `index.html` | **Book a 15-minute call** (Calendly) |
| **First meeting** — Adam walks one real project | `case-study.html` | **Build my training proposal** → proposal software |

Both pages point to the same Calendly link and to each other, so the story
stays consistent whether the prospect looks first or talks first.

## Pages

### `index.html` — the teaser ("what's the offer")
The leave-behind after a cold call. Teases the **McCallum HS / Austin ISD**
project and shows how one Roof MRI scan pays off three ways — for the
**district**, the **contractor**, and the manufacturer (**GACO**). Single
primary action: book a call.

### `case-study.html` — the standalone walkthrough (deck slide 28)
A faithful, standalone recreation of slide 28 of the training deck: the
interactive **McCallum HS — The App in Action** walkthrough. Six tabs —
Campus → Blank Grids → MRI Report → Vent Map → Installed → The Bid — with
per-building chips, an install carousel, and the embedded bid PDF. Use it on
the 45-minute intro call so you never have to hunt through the full deck.

It ends on **the natural next step**: the Roof MRI **proposal software**
(`proposals.roof-mri.com`, from the `roof-mri-backend` repo), where a
contractor configures a training package (Professional / Regional /
Enterprise), signs, and pays online.

## Design system

Colors, type, and components are carried over verbatim from the existing
Roof MRI properties — they are the source of truth, not reinvented here:

- **Green** `#00bd70` / **Navy** `#1e2c55` / navy-dark `#151f3d`
- Type: **Poppins** (display) + **Montserrat** (body)
- Slide-28 component CSS (tabs, building chips, carousel, legend) is ported
  from `roof-mri-training-presentation-pro/public/update27.html`.

See `DESIGN.md` for the full rationale and the notes for any hand-off to
Claude Design.

## Files

```
index.html         # Teaser / cold-call leave-behind (Output 1)
case-study.html    # Standalone McCallum walkthrough (Output 2 = slide 28)
styles.css         # Shared design system
app.js             # Case-study interactions (tabs, chips, carousel)
netlify.toml       # Static publish config + headers
images/            # Logos + images/mccallum/* case-study assets
```

## Local preview

Any static server works:

```bash
npx serve .        # or: python3 -m http.server
```

## Deploy

Static site, no build step. Hosted on Netlify (ReDry team). Publish
directory is the repo root. Pushing this branch and connecting the repo in
Netlify (or `netlify deploy --prod`) publishes it.

## Key links

- **Book a call:** https://calendly.com/adam-re-dry/google-meet-roof-mri-consultation
- **Proposal software:** https://proposals.roof-mri.com
- **Live vent map (McCallum):** referenced from the Vent Map tab
