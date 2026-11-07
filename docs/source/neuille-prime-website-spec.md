# NEUILLE PRIME — Website Spec

Working brief for the NEUILLE PRIME esports site. Everything here comes from the Q&A session; items still missing are marked **TODO**.

---

## 1. Project

| Item | Value |
|---|---|
| Team name | NEUILLE PRIME |
| Tag | NP67 |
| Legal/structure name | NEUILLE PRIME ESPORT GAMING COMPANY |
| Games | Rocket League (RL), League of Legends (LoL) |
| Type | Multigaming esports org site |
| Hosting | GitHub Pages, **user/org page** (`https://<username>.github.io`) |
| Stack | Static HTML + CSS + vanilla JS, no build step |
| Pages | 3 separate pages: Home, Roster, About/Contact |
| Languages | English + French, JS toggle, one set of files |
| Tone | Bold, punchy, confident. Short sentences. Esports org voice, not startup voice. |
| Status | Spec only. Site not built yet. |

**TODO before launch:** GitHub username, contact email, Discord invite, real social URLs, logo file, real roster.

---

## 2. Design rules

The visual direction is governed by `website-visuals-test.txt`. That checklist is the acceptance test for the build — target 90+/100, no FAILs in Colors or Typography.

### Palette — exactly 3 color roles, no gradients

| Role | Token | Value | Use |
|---|---|---|---|
| Base | `--ink` | `#0B0B0C` | Page background |
| Surface | `--panel` | `#141416` | Cards, header, footer |
| Line | `--line` | `#2A2A2E` | 1px borders, dividers |
| Text | `--paper` | `#F1EFEA` | Headings and body |
| Muted | `--muted` | `#8C8C93` | Secondary text, metadata |
| Accent | `--accent` | `#FF3D00` | Links, active states, one CTA per section, focus ring |

Rules:
- Accent is the only saturated color. No second accent, no purple/blue gradients, no gradient buttons, no glow blobs.
- Backgrounds are flat fills only. No section-alternating `#f5f5f5`/`#fafafa` rhythm; section separation comes from 1px rules and spacing.
- Box-shadows: allowed on at most 2 element types (e.g. sticky header and mobile menu). Everything else uses borders.
- Accent is swappable from one variable so the logo can override it later.

### Typography — 3 roles, no Inter/Roboto/Open Sans

| Role | Font | Treatment |
|---|---|---|
| Display | **Anton** (Google Fonts) | All caps, `letter-spacing: 0.01em`, `line-height: 1.05` |
| Body | **IBM Plex Sans** | 400/500, `line-height: 1.65`, max 68ch |
| Data/labels | **IBM Plex Mono** | Uppercase 11–12px, `letter-spacing: 0.12em`, used for section numbers, roles, tags, stats |

Rules:
- Strong size contrast, not uniform steps: display 72/48px, section heading 36px, body 17px, label 12px.
- Headings `line-height: 1.05–1.15`; body `1.6–1.8`.
- Deliberate tracking on display and mono labels; body stays at default.
- Left-align body text everywhere. Center only short display lines when a section genuinely needs it (max 1–2 sections).

### Layout rules

- No repeated 3-column card grids. Each section has its own structure.
- Vary vertical spacing per section (`64 / 96 / 140px`), not one uniform padding.
- Hero is **not** the centered fullscreen + big title + 2 CTAs template.
- Max 2 CTAs per section, 1 primary accent CTA.
- Desktop container: `max-width: 1180px`, 24px side padding; mobile 20px.

### Images & icons

- No emoji as icons. Inline SVG line icons only (Discord, X, Twitch, YouTube, mail, arrow) at 20px, `stroke: currentColor`.
- No gradient placeholder boxes. Player placeholders are flat `--panel` blocks with initials in Anton + a mono role label.
- Logo: user-supplied file in `assets/img/`. Until then, a styled text wordmark (Anton, tracked out) — not a fake graphic.
- Every content image needs real alt text; decorative elements get `aria-hidden="true"`.

### Copy rules

- No AI buzzwords: unlock, empower, seamless, leverage, streamline, robust, cutting-edge, elevate, harness, delve.
- Concrete headings ("Two games. One roster." not "Our Features").
- Specific CTAs: "See the roster", "Join the Discord", "Email NP67" — never "Learn more".
- Subtitles one sentence max.
- Numbers and facts over adjectives: game names, roles, region, founded year.

### UX rules

- First viewport states who NP67 is and what they play, without scrolling.
- Long text folded into accordions only where it earns it (e.g. staff bios); no dumping.
- Scroll reveals: opacity/translate only, `prefers-reduced-motion` respected, content visible if JS fails.
- Touch targets ≥ 44px; visible `:focus-visible` ring in accent.
- Skip link, semantic landmarks, one `h1` per page.

---

## 3. Site structure

```
/
├─ index.html          Home
├─ roster.html         Roster & staff
├─ about.html          About / Contact
├─ 404.html            (optional, GitHub Pages)
├─ assets/
│  ├─ css/style.css
│  ├─ js/i18n.js       EN/FR dictionary + toggle
│  ├─ js/main.js       nav, accordions, scroll reveal, year
│  └─ img/             logo, portraits, og image
└─ README.md           deploy notes
```

No framework, no bundler, no dependencies beyond Google Fonts. Works when opened from disk and on Pages.

### Language toggle

- Default EN. Toggle in header: `EN / FR`, 44px target, persists in `localStorage`.
- Markup: `data-i18n="hero.title"` on text nodes, `data-i18n-attr="aria-label:nav.roster"` where attributes need translating.
- On switch: update text, `document.documentElement.lang`, `<title>`, and meta description. No page reload, no layout jump.
- All copy lives in `i18n.js` — no French strings inside HTML.

### GitHub Pages (user page)

- Repo name must be `<username>.github.io`.
- Deploy from `main` branch, root folder.
- Relative paths only (`./assets/...`) so it also works from a project page later.
- No `CNAME` unless a custom domain is added.
- README documents: repo creation, Pages settings, how to swap placeholders.

---

## 4. Page specs

### Home (`index.html`)

Purpose: identify the org and route to roster/contact in one screen.

1. **Header** — wordmark left, nav (Home / Roster / About), EN·FR toggle, no CTA clutter.
2. **Hero (asymmetric, ~80vh, not centered)** — left: `NP67` kicker in mono, `NEUILLE PRIME` display, one-line positioning ("Rocket League and League of Legends. Built in Alsace."), two actions: primary "See the roster", secondary text link "Join the Discord". Right: a bordered "org card" with structure name, games, region, founded year — mono labels, no image.
3. **Games strip** — full-width 1px-ruled band, two large entries side by side (RL / LoL), each with a short line and a mono "ROSTER →" link. Not cards, no icons.
4. **Roster teaser** — horizontal scroll rail of 4–6 player tiles (initial block, tag, role). Ends with a "Full roster" link.
5. **About teaser** — two-column editorial split: left a 3-sentence org paragraph, right a stats list (games, players, staff, region) with hairline dividers.
6. **Contact band** — one sentence, email link + Discord button. Max 2 CTAs.
7. **Footer** — structure name, social icons, copyright with auto year, language note.

### Roster (`roster.html`)

Purpose: show who plays what, fast.

1. Page header: `ROSTER` display, one-line subtitle, mono count ("8 PLAYERS · 3 STAFF").
2. **Rocket League** section: 3 player rows + coach row.
3. **League of Legends** section: 5 player rows + coach row.
4. **Staff** section: 3 compact rows (management, media, ops).
5. Row anatomy: initials block 96×96 → gamertag (Anton) → real name (muted) → role (mono) → social icons. Rows separated by hairlines, hover lifts border to accent. No identical card grid.
6. Placeholder rows are real HTML with `PLAYER ONE`, `TAG`, `ROLE` so names can be swapped without layout work.

### About / Contact (`about.html`)

Purpose: who NP67 is, and how to reach them.

1. Page header: `ABOUT NP67`.
2. Org story: left-aligned, max 68ch, 3 short paragraphs, one pull-quote rule.
3. Structure block: legal name, tag, region, games, founded — definition list, mono labels.
4. Values: 3 short numbered items (01/02/03), text only, no icons.
5. FAQ accordion (3 items max) for tryouts/partnership questions.
6. Contact: email `mailto:` link and Discord button. Both marked **TODO**.
7. Footer identical to Home.

---

## 5. Content placeholders

| Item | Placeholder |
|---|---|
| GitHub username | `YOUR-USERNAME` |
| Email | `contact@neuille-prime.example` |
| Discord | `https://discord.gg/YOUR-INVITE` |
| X / Twitter | `https://x.com/YOUR-HANDLE` |
| Twitch | `https://twitch.tv/YOUR-CHANNEL` |
| YouTube | `https://youtube.com/@YOUR-CHANNEL` |
| Instagram | `https://instagram.com/YOUR-HANDLE` |
| Founded year | `TODO` |
| Region | Alsace, France (confirm) |
| Roster | 5 LoL + 3 RL + 3 staff placeholders |

Placeholders must be visibly marked in `README.md` and easy to find (`YOUR-` prefix everywhere).

---

## 6. Build acceptance

- [ ] All 30 checks in `website-visuals-test.txt` pass except any that need real photos (documented in README).
- [ ] No gradient anywhere; exactly one accent color.
- [ ] Anton + IBM Plex Sans/Mono only.
- [ ] Every section has a different layout; no repeated 3-column grid.
- [ ] EN/FR switch works on all 3 pages and persists.
- [ ] 360px, 768px, 1280px, 1920px checked.
- [ ] Keyboard navigation + visible focus; `prefers-reduced-motion` honored.
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] Works from `file://` and from `https://<username>.github.io`.

---

## 7. Open items

1. Logo file — drop into `assets/img/logo.svg` (or `.png`) and confirm accent color against it.
2. Real social URLs, email, Discord invite.
3. Real roster names, roles, and staff.
4. Founded year and region confirmation.
5. Decide whether match results/news get added later (currently out of scope).
6. Optional custom domain — requires `CNAME` and DNS records.
