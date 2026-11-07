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
