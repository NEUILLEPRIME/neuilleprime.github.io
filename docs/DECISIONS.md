# Decisions

Format: date — area — decision — reason.

- 2026-11-07 — Repo layout — `neuille-prime-website-prompt.txt` (the build prompt) was at the site root; moved to `docs/source/` with `git mv` alongside the two named source docs. — It is a source document and would otherwise be publicly served at the site root. Content unchanged.
- 2026-11-07 — Git — repo-local identity `NP67 Site Builder <noreply@example.com>`; `core.autocrlf=false`, `core.fileMode=false`. — No global identity on the build shell; Windows-mounted FS marks all files executable.
- 2026-11-07 — Check script — `scripts/check.mjs` (Node). — Node 22 available; evaluates `i18n.js` natively.
- 2026-11-07 — i18n — No browser-language auto-detection; initial language = saved `np67-lang` value else EN. — Spec says "Default EN"; prompt forbids auto-detect.
- 2026-11-07 — Roster count — Header reads `8 PLAYERS · 2 COACHES · 3 STAFF`. — Spec §4 says "8 PLAYERS · 3 STAFF" but also specifies a coach row in both RL and LoL; prompt resolves this.
- 2026-11-07 — RL roles — `PLAYER` ×3 + `COACH`. — Rocket League has no fixed positions.
- 2026-11-07 — Email placeholder — spec §5 gives `contact@neuille-prime.example`; prompt requires every placeholder to use the `YOUR-` prefix. Using `YOUR-EMAIL@example.com`. — Prompt wins over spec; keeps placeholders greppable.
- 2026-11-07 — Founded year — spec §5 says `TODO`; using `YOUR-YEAR` per prompt. — Prompt wins.
- 2026-11-07 — Box-shadow — spec allows 2 element types; prompt allows exactly 1 (sticky header). Using 1. — Prompt wins; stricter is still compliant.
- 2026-11-07 — Spacing — Under 600px the space tokens scale down (64/96/140 → 48/72/96) inside the mobile `:root`. — Keeps three distinct values per section on phones without 140px gaps on a 740px screen. Sections still never share adjacent values.
- 2026-11-07 — Reveal — `<html class="js">` is set inline only when `IntersectionObserver` exists; `main.js` wraps the observer in try/catch and reveals everything on error. Residual risk: if `main.js` itself fails to load while JS is on, below-the-fold `.reveal` blocks stay hidden. Accepted (static file shipped beside the pages); never applied to above-the-fold content.
- 2026-11-07 — Language buttons — `EN`/`FR` buttons carry `lang="en"`/`lang="fr"` instead of an aria-label with "Français". — Keeps French text out of HTML while giving screen readers the right pronunciation.
- 2026-11-07 — Stub pages — In M1, roster/about/404 became full shells (head, header, footer, stub `<main>` with h1) generated from `index.html`. — M1 acceptance requires `scripts/check` to pass on all 4 pages; each page's `<main>` is replaced in M3/M4.
- 2026-11-07 — Social aria-labels — "NP67 on Discord" / "NP67 sur Discord" etc. — Labels read as a sentence and contain the visible-less brand name.
- 2026-11-07 — Gradient rule scope — The check scans served code (`.html/.css/.js` at root and in `assets/`). `docs/` (audit text, decisions) necessarily names the banned patterns and is not served as code. `check.mjs` builds the word by concatenation so the repo's code never contains it.
- 2026-11-07 — Test fonts — For screenshots, Anton/Plex woff2 files are downloaded to `docs/screenshots/_fonts/` (gitignored) and served to Chrome via request interception. — The cloud browser has no network; real fonts make overflow checks honest. Not part of the site.
- 2026-11-07 — 404 on nested URLs — With relative paths only, GitHub Pages' 404 page loses its CSS when the missing URL is nested (e.g. `/a/b`). Top-level misses (`/typo`) render correctly. Accepted: root-absolute paths are forbidden and would break `file://`. Documented in README limitations (M6).
