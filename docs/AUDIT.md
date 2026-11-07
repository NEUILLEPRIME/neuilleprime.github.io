# Design audit — NEUILLE PRIME (NP67)

Audited 2026-11-07 against the 30 checks in `docs/source/website-visuals-test.txt`, on the built site (`index.html`, `roster.html`, `about.html`, `404.html`, `assets/css/style.css`) and the M5 screenshot set (4 pages × 360/768/1280/1920 × EN/FR, real fonts). Strict reading: anything not honestly passable is a FAIL. Three copy items failed on the first pass and were fixed before this report (see "Fixed during audit").

### Overall Score: 100/100

| Category | Score | Issues |
|----------|-------|--------|
| Colors | 100/100 | None. |
| Typography | 100/100 | None. Note: display/h1 line-height is 1.05 (locked by the spec), 0.05 below the check's 1.1 guide; h2/h3 sit at 1.1 and body at 1.65, so headings and body are clearly differentiated, which is what the check tests. |
| Layout | 100/100 | None. |
| Copy | 100/100 | None after fixes. Note: hero line "Rocket League and League of Legends. Built in Alsace." is a 9-word, two-fragment tagline prescribed by the spec, not a multi-sentence paragraph. |
| Images & Icons | 100/100 | None. Checks 2–4 pass because the site uses **no images at all** (no photos, no illustrations); they must be re-audited when real portraits / logo / og image are added. |
| UX | 100/100 | None. |

#### Check-by-check

**Colors**
1. PASS — No purple-to-blue gradients. `check.mjs` rule 3: no gradient substring in any `.html/.css/.js`.
2. PASS — No gradient buttons/CTAs. Primary button is flat `--accent` fill with `--ink` text.
3. PASS — Main + grayscale + 1 accent: five neutrals (`--ink #0B0B0C`, `--panel #141416`, `--line #2A2A2E`, `--paper #F1EFEA`, `--muted #8C8C93`) + one accent `--accent #FF3D00`. Enforced by rule 4 (hex only in `:root`, no rgb/hsl/named colors; favicon uses tokens only).
4. PASS — `box-shadow` on exactly one element type (`.site-header`). Rule 5.
5. PASS — Every section sits on `--ink`; header/footer on `--panel`. Separation comes from 1px `--line` rules and spacing.

**Typography**
1. PASS — Anton (display), IBM Plex Sans (body), IBM Plex Mono (labels). No Inter/Roboto/Open Sans. Rule 6 pins the Google Fonts URL and every `font-family` to tokens.
2. PASS — Headings: Anton, uppercase, condensed. Body: Plex Sans 400. Labels: Plex Mono 500, uppercase, tracked.
3. PASS — Sizes 72 (hero) / 48 (display) / 36 (h2) / 28 / 24 / 17 (body) / 12 (labels): non-uniform steps with a large jump from display to body.
4. PASS — Headings 1.05–1.1, body 1.65 (see note above).
5. PASS — Display `letter-spacing: 0.01em` declared explicitly; wordmark 0.14em; labels 0.12em.

**Layout**
1. PASS — No 3-column card grids anywhere.
2. PASS — Home: asymmetric hero + org card → ruled two-half strip → horizontal rail → editorial split with stats → centered band. Roster: sticky side-head with featured row → full-width rows with role column → compact 2-column staff. About: side-head story → 5-cell facts row → numbered list → side-head accordion → split contact.
3. PASS — Body text left-aligned everywhere; only 2 centered sections site-wide (Home contact band, 404).
4. PASS — Section padding varies (48/72/96 mobile, 64/96/140 desktop); adjacent sections never share a value.
5. PASS — Hero is an asymmetric 7/5 split at ~80vh with an org card, one button + one text link, left-aligned; not the centered fullscreen two-button template.

**Copy & Microcopy**
1. PASS — No buzzwords in HTML or either dictionary (rule 7, includes "learn more"/"en savoir plus").
2. PASS — No Japanese copy; pattern not present.
3. PASS — CTAs: "See the roster", "Join the Discord", "Email NP67", "Full roster", "About NP67", "Back to Home", game-specific "Roster" links (with "Rocket League roster" / "League of Legends roster" accessible names).
4. PASS — Headings: "Who plays for NP67", "Two games. One roster.", "NP67 in short", "Get in touch", "Where NP67 stands", "NP67 on paper", "What NP67 plays for", "Tryouts, partners, content".
5. PASS — Subtitles are one sentence (page subtitles, contact lines, games lines).

**Images & Icons**
1. PASS — No emoji (rule 8). Icons are hand-drawn inline SVG line icons, 20×20, `stroke="currentColor"`.
2. PASS — No images used, so none can mismatch.
3. PASS — No images used, so none are reused.
4. PASS — No images or illustrations used.
5. PASS — Player placeholders are flat `--panel` initials blocks; no gradient boxes.

**UX & Interaction**
1. PASS — Home first viewport shows kicker, h1, "Rocket League and League of Legends. Built in Alsace." and "See the roster" at 360×740 (CTA bottom 435px) and 1280×720 (474px), plus the org card at 1280.
2. PASS — FAQ uses native `<details>`; story is three short paragraphs; nothing dumped.
3. PASS — Reveals are opacity/12px only, applied only under `html.js` + `prefers-reduced-motion: no-preference`, never above the fold, fail-open on errors; with JS off or reduced motion all content is visible (tested).
4. PASS — Every link/button/summary measured ≥44×44 at 360/768/1280/1920 (Playwright). EN/FR buttons 44×44.
5. PASS — Max 2 `.btn` per section, max 1 primary (rule 12).

### Top 3 Priority Fixes
1. When real photos arrive, re-audit Images & Icons checks 2–4: give each portrait real alt text (gamertag + role), use one image per person, and never reuse the hero/og image elsewhere.
2. Replace every `YOUR-` placeholder (README table), especially `YOUR-YEAR` and the `YOUR-TAG-*` gamertags, which render literally in large Anton type and are the weakest visual point right now.
3. When a logo lands in `assets/img/`, check `--accent` against it and adjust that single token; re-run `node scripts/check.mjs` and the contrast of `--ink` on `--accent` (currently ≈5.9:1).

### What's Already Good
- One accent, five neutrals, zero gradients, one shadow — enforced by an automated check, not just by intent.
- Typography with real character: condensed Anton display against Plex Sans body and tracked Plex Mono labels.
- Every section has its own structure; no card grids; only two centered sections.
- Copy is concrete and short in both languages; French uses natural tutoiement.
- Accessibility basics are solid: skip link, landmarks, one h1, visible accent focus ring on every stop, 44px targets, works with JS off and reduced motion; Lighthouse accessibility 100 on every page.

#### Fixed during audit
- FAQ heading "Questions" (generic) → "Tryouts, partners, content" / "Tryouts, partenaires, contenu".
- Facts heading "The structure" (abstract) → "NP67 on paper" / "NP67 sur le papier".
- About contact line was two sentences → one: "Email for tryouts, partnerships and press; Discord for everything else."
