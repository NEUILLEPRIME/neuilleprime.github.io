# Manual test checklist

Everything below was **not** verifiable in this build environment (Chromium only, no real devices, no GitHub Pages). Automated results live in `docs/CHECKPOINTS/M5.md`.

| # | Test | How | Expected | Status |
|---|---|---|---|---|
| 1 | Firefox desktop | Open each page via `python -m http.server 8080` | Same layout as Chrome; rail scrollbar thin and `--line` colored; focus ring accent | manual — not verified |
| 2 | Safari macOS / iOS | Same, plus iPhone | Layout OK; rail shows overlay scrollbar (styling is Chromium/Firefox only); details open/close | manual — not verified |
| 3 | `file://` in Firefox | Double-click `index.html`, switch FR, open Roster | FR persists, or falls back to EN silently with no console error | manual — not verified |
| 4 | Real phone (≈360px) | Open the live site | Header in 2 rows, all nav links tappable, first screen shows title + line + "See the roster" | manual — not verified |
| 5 | Live GitHub Pages | After push, open `https://YOUR-USERNAME.github.io/` | All pages load, fonts load, no 404 for CSS/JS/favicon, EN/FR toggle persists | manual — not verified |
| 6 | Pages 404 | Visit `https://YOUR-USERNAME.github.io/does-not-exist` | Styled 404 page with "Back to Home" | manual — not verified |
| 7 | Screen reader spot check | VoiceOver/NVDA on Roster | Social icons read "X, YOUR-TAG-1" (aria-describedby); toggle reads EN/FR with pressed state | manual — not verified |
| 8 | Lighthouse on live URL | PageSpeed Insights on each page | ≥95 in all four categories (local: 99–100) | manual — not verified |
