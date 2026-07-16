---
description: Audit a page or component against the Roof MRI / ReDry brand system and flag off-brand colors, fonts, UX, and copy.
argument-hint: "[file, glob, or nothing for the current diff]"
allowed-tools: Read, Grep, Glob, Bash
---

Audit the target against the Roof MRI / ReDry **brand-system** skill (load it if
it hasn't been). Target: `$ARGUMENTS` — if empty, review the current working diff
(`git diff` / recently changed HTML/CSS/JS).

Check and report findings grouped by severity:

1. **Color** — Any hex value used for a role that already has a token (green
   `#00bd70`, green-dark `#00a35f`, navy `#1e2c55`, navy-dark `#151f3d`,
   blue `#0284C7`, amber `#F59E0B`, or the moisture legend). Flag near-miss
   shades (e.g. `#00be71`) and hard-coded hex where a CSS variable exists.
2. **Type** — Anything not Poppins (display) / Montserrat (body); missing weights.
3. **UX principles** — More than one primary (green) button per screen; custom
   patterns where a standard one fits; state shown in more than one place;
   vague button labels; filler stats; animation without `prefers-reduced-motion`.
4. **Vocabulary** — Wrong or inconsistent product terms (Roof MRI, ReDry, the
   District / Contractor / GACO framing, Scan → Map → Dry → Verify → Warranty,
   the training tiers). Addresses plotted on the footprint map (city + state only).
5. **Links** — Calendly / proposals / training URLs that don't match the canonical
   ones in the skill.

For each finding give: file:line, what's wrong, and the exact fix (name the token
or term to use). End with a one-line **PASS / NEEDS WORK** verdict. Do not edit
files unless I ask — this is a review.
