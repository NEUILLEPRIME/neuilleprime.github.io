# Handoff

_Last updated 2026-11-07, end of M6._

## Status
- **Last completed milestone: M6** (docs). All milestones M0–M6 done, one commit each on `main`. No remote, nothing pushed.
- `node scripts/check.mjs` → 0 fail, 0 warn (4 pages, 92 i18n keys, 19 placeholders).
- Design audit `docs/AUDIT.md`: 100/100 (Colors 100, Typography 100).
- Lighthouse (local, 13.6.0): 99–100 in all four categories on every page, mobile and desktop (`docs/CHECKPOINTS/M5.md`).

## Verified vs untested
| Area | How | Status |
|---|---|---|
| Static checks (14) | `scripts/check.mjs` | automated ✔ |
| Layout at 360/768/1280/1920, EN + FR, overflow, clipping, 44px targets | Playwright + Chrome, real fonts | automated ✔ |
| First viewport (Home) at 360×740 and 1280×720 | Playwright | automated ✔ |
| Keyboard order + focus ring, skip link | Playwright | automated ✔ |
| `file://` + http persistence of FR across pages | Playwright (Chromium) | automated ✔ |
| JS disabled, `<details>` without JS, reduced motion | Playwright | automated ✔ |
| Lighthouse | chrome-headless-shell via npx | automated ✔ |
| Firefox, Safari/iOS, real phones, screen readers, live GitHub Pages | — | **manual — not verified** (`docs/MANUAL_TEST.md`) |

## Known issues
- `404.html` is unstyled for nested missing URLs (`/a/b`) because paths are relative by design (`./assets/css/style.css`). Top-level misses render correctly.
- `.rail` scrollbar styling (`assets/css/style.css`, "Home: roster teaser rail") only applies in Chromium/Firefox.
- `.staff-list` at ≥768px leaves an empty cell with 3 staff.
- About contact buttons (`.contact__actions`) wrap to two lines in FR at ~1280px (label length; intended).
- If `assets/js/main.js` fails to load while JS is on, `.reveal` blocks below the fold stay at opacity 0 (`style.css` §8). Never applied above the fold.

## Deviations from the spec (all logged in `docs/DECISIONS.md`)
- Email placeholder `YOUR-EMAIL@example.com` instead of `contact@neuille-prime.example`; founded year `YOUR-YEAR` instead of `TODO` (prompt requires the `YOUR-` prefix).
- Roster count `8 PLAYERS · 2 COACHES · 3 STAFF` (spec said "8 PLAYERS · 3 STAFF" but lists two coaches).
- One box-shadow (sticky header) instead of the spec's "up to 2".
- Build prompt `neuille-prime-website-prompt.txt` moved to `docs/source/` too (was at the site root).
- Under 600px the spacing tokens scale to 48/72/96.
- Copy changed during audit: "Questions" → "Tryouts, partners, content"; "The structure" → "NP67 on paper".

## Conventions
- **Colors:** only the six tokens in `:root` (`--ink --panel --line --paper --muted --accent`). No hex/rgb/named colors elsewhere; no gradients; `box-shadow` only on `.site-header`.
- **Fonts:** `var(--font-display|body|mono)` only. Labels = `.label` (Plex Mono 12px, uppercase, 0.12em).
- **Spacing:** each section sets its own `padding-block` from `--space-s/m/l`; neighbours never share a value. Max 2 centered sections (Home contact band, 404), both used.
- **i18n:** English inline in HTML + `data-i18n="key"`; same key in `en` and `fr` in `assets/js/i18n.js`; `data-i18n-html` only for `<br>`/`<span class="accent">` (currently unused); attributes via `data-i18n-attr="attr:key;attr2:key2"`; meta via `meta.<page>.title|description` selected by `<body data-page>`.
- **CTAs:** max 2 `.btn` per `<section>`, max 1 `.btn--primary`.
- **Placeholders:** `YOUR-` prefix; every one listed in `README.md` (enforced).
- **Git on this mounted folder:** request delete permission at session start, or commits leave `.git/HEAD.lock`.
- **QA tooling (outside the repo):** Lighthouse via `~/lh/run.sh` in the build shell; Playwright scripts in the cloud workspace `qa/`; test fonts in `docs/screenshots/_fonts/` (gitignored).

## Exact next step (for the human)
1. `README.md` → Placeholders: replace every `YOUR-` value and the stand-in names. Files: `index.html`, `roster.html`, `about.html`, `404.html`, `assets/js/i18n.js` (region/counts only if they change).
2. Drop the logo into `assets/img/`, swap the wordmark if wanted, check `--accent` in `assets/css/style.css`.
3. `node scripts/check.mjs`.
4. Create `YOUR-USERNAME.github.io`, `git remote add origin …`, `git push -u origin main`, enable Pages (main / root).
5. Run `docs/MANUAL_TEST.md` on the live site.

For a future build session: no milestone is open. Possible follow-ups (outside current scope, need a decision first): real portraits + `og:image`, results/news pages.
