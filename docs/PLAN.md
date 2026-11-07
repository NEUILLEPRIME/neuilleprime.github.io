# Plan

Build spec: `docs/source/neuille-prime-website-prompt.txt` (process + locked decisions) on top of `docs/source/neuille-prime-website-spec.md` (product). Acceptance for visuals: `docs/source/website-visuals-test.txt`.

## Milestones

| # | Scope | Sub-steps | Acceptance |
|---|---|---|---|
| M0 | Setup | Step 0 → TOOLNOTES; git init `main`; move sources; skeleton + stubs; `.nojekyll`, `.gitignore`; docs skeleton; PLAN | Tree matches layout; first commit |
| M1 | Foundations | 1 `style.css` tokens/reset/type/layout; 2 header + nav + toggle + skip link; 3 footer + icons; 4 `i18n.js` engine + common keys; 5 `main.js`; 6 favicon; 7 `scripts/check.mjs` (14 checks); 8 stub `index.html` browser test (toggle, persist) | Stub index toggles EN↔FR + persists; check passes |
| M2 | Home | 1 hero + org card; 2 games strip; 3 roster rail; 4 about teaser; 5 contact band; 6 FR copy; 7 screenshots 4 widths, first-viewport at 360/1280 | Check passes; first viewport OK; no overflow |
| M3 | Roster | 1 page header + count; 2 RL (large first row); 3 LoL (full rows); 4 staff (compact 2-col); 5 FR; 6 anchor test from Home | Check passes; anchors work; rows differ |
| M4 | About + 404 | 1 header + story + pull-quote; 2 structure dl; 3 values; 4 FAQ details; 5 contact; 6 404; 7 FR | Check passes; details work JS-off |
| M5 | QA | screenshots 4 pages × 4 widths × EN/FR; overflow; keyboard; `file://`; no-JS; reduced motion; Lighthouse (or log blocker); AUDIT.md; fixes | AUDIT ≥90, Colors/Typography 100 |
| M6 | Docs | README (deploy + placeholder table), img README, MANUAL_TEST, HANDOFF | Final commit |

## Verification route

See `docs/TOOLNOTES.md`. `scripts/check.mjs` on the build shell; Playwright + Chrome in the cloud workspace for browser checks (copy of site, no web fonts); Lighthouse manual.

## Centered sections (max 2)

1. Home → contact band. 2. 404 → body.
