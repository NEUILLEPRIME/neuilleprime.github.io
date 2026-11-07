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
- 2026-11-07 — Player placeholders — Gamertag slot = `YOUR-TAG-1` … `YOUR-TAG-8` (one per player so each is findable); initials block = `P1`…`P8` (coaches `C1`/`C2`, staff `S1`–`S3`); real-name slot (roster page) = `Player One` … as prescribed by the prompt. — Prompt lists both `PLAYER ONE` and `YOUR-TAG`; tags carry the `YOUR-` prefix so the check script and README track them; names stay human-readable.
- 2026-11-07 — Games strip headings — strip intro "Two games. One roster." is a mono label; each game name is an `h2` at display size. — Keeps heading sizes monotonic (no h3 bigger than its h2).
- 2026-11-07 — Games strip reveal — no `.reveal` on the games strip. — At 1280×720 it peeks into the first viewport; prompt forbids hiding above-the-fold content. Reveals remain on the rail, about teaser and contact band.
- 2026-11-07 — Section padding, Home — hero m, games s, rail m, about l, contact m. No two adjacent sections share a value.
- 2026-11-07 — Duplicate "Roster" link text — the two games-strip links carry aria-labels "Rocket League roster" / "League of Legends roster" (visible text contained, label-in-name OK).
- 2026-11-07 — Coach/staff placeholders — `YOUR-COACH-RL`, `YOUR-COACH-LOL`, `YOUR-STAFF-1..3` in the tag slot; names `Coach One/Two`, `Staff One/Two/Three`. — Same pattern as players; all listed in README.
- 2026-11-07 — Per-person social links — X (+ Twitch for players/coaches) at `https://x.com/<tag placeholder>`; `aria-label="X"`/`"Twitch"` (brand names, identical in EN/FR) + `aria-describedby` → the person's tag. — Gives each icon link a unique accessible description without 26 extra i18n keys.
- 2026-11-07 — Roster section rhythm — page head m/s, RL s, LoL m, staff s. RL: sticky side head + featured first row; LoL: head on top, full-width rows with fixed role column; staff: compact 2-column rows, 64px initials, role above name.
- 2026-11-07 — Staff section heading — `h2` "Staff" at `--fs-h2` (36px), smaller than the game sections (`--fs-display`), to mark it as secondary.
