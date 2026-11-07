# NEUILLE PRIME website

Static, bilingual (English / French) website for **NEUILLE PRIME**, the multigaming esports org behind the tag **NP67** (Rocket League + League of Legends, France). Plain HTML, one CSS file and two small vanilla JS files: no framework, no build step, no dependencies beyond Google Fonts. It runs on GitHub Pages as a user page and also opens straight from disk.

| Page | File | What it shows |
|---|---|---|
| Home | `index.html` | Hero + org card, games strip, roster preview rail, about teaser, contact band |
| Roster | `roster.html` | Rocket League (`#rl`), League of Legends (`#lol`) and staff (`#staff`) |
| About | `about.html` | Story, structure, values, FAQ (tryouts / partners / content), contact |
| 404 | `404.html` | GitHub Pages "not found" page |

## Preview locally

- Quickest: double-click `index.html`. Everything works from `file://`, including the EN/FR toggle.
- Like the live site: from this folder run `python -m http.server 8080` (Windows: `py -m http.server 8080`), then open <http://localhost:8080>.

## Deploy to GitHub Pages (user page)

1. On GitHub, create a **public** repository named exactly `YOUR-USERNAME.github.io` (your username, lowercase). Do not add a README, license or .gitignore there.
2. In this folder:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, branch `main`, folder `/ (root)`, **Save**.
4. Wait for the "pages build and deployment" run in the **Actions** tab (usually 1–2 minutes).
5. Visit `https://YOUR-USERNAME.github.io/` and test the EN/FR toggle.

Keep the empty `.nojekyll` file: it tells Pages to serve the files as they are, without Jekyll processing. Paths are all relative (`./assets/...`), so the same files also work as a project page later.

## Placeholders

Every value you must replace starts with `YOUR-`. Search the whole folder for `YOUR-` to find them all, then run `node scripts/check.mjs` (it fails if a new `YOUR-` value appears that this table does not list).

| Placeholder | Lives in | Replace with |
|---|---|---|
| `YOUR-USERNAME` | all 4 pages: `og:url` meta tag; this README | Your GitHub username (lowercase) |
| `YOUR-EMAIL` | `index.html` (contact band), `about.html` (contact button + visible address) as `YOUR-EMAIL@example.com` | Contact email, e.g. `contact@your-domain` |
| `YOUR-INVITE` | all 4 pages: footer Discord icon; `index.html` hero link + contact button; `about.html` contact button (`https://discord.gg/YOUR-INVITE`) | Discord invite code |
| `YOUR-HANDLE` | all 4 pages: footer X and Instagram icons (`https://x.com/YOUR-HANDLE`, `https://instagram.com/YOUR-HANDLE`) | Org handles on X and Instagram (edit each URL separately if they differ) |
| `YOUR-CHANNEL` | all 4 pages: footer Twitch and YouTube icons (`https://twitch.tv/YOUR-CHANNEL`, `https://youtube.com/@YOUR-CHANNEL`) | Twitch channel and YouTube handle |
| `YOUR-YEAR` | `index.html` org card, `about.html` structure block | Founding year |
| `YOUR-TAG-1` … `YOUR-TAG-8` | `index.html` roster rail (1–6), `roster.html` (all) | Player gamertags: YOUR-TAG-1, YOUR-TAG-2, YOUR-TAG-3 (Rocket League); YOUR-TAG-4 (Top), YOUR-TAG-5 (Jungle), YOUR-TAG-6 (Mid), YOUR-TAG-7 (ADC), YOUR-TAG-8 (Support). On `roster.html` each tag is also used in that player's X / Twitch URL: replace those with the real profile links. |
| `YOUR-COACH-RL`, `YOUR-COACH-LOL` | `roster.html` | Coach handles (Rocket League, League of Legends) and their X / Twitch URLs |
| `YOUR-STAFF-1`, `YOUR-STAFF-2`, `YOUR-STAFF-3` | `roster.html` (staff) | Manager, media and operations staff names or handles and their X URLs |
| `YOUR-X`, `YOUR-TWITCH`, `YOUR-YOUTUBE`, `YOUR-INSTAGRAM` | `roster.html`, inside each person's hidden link slots | That person's X / Twitch / YouTube / Instagram link (see "Player links") |
| `YOUR-EPIC-NAME` | `roster.html`, Rocket League players' hidden "RL Tracker" slot | Their Rocket League Tracker profile link (see "Player links") |
| `YOUR-RIOT-ID` | `roster.html`, League of Legends players' hidden "DPM.LOL" slot | Their dpm.lol profile link (see "Player links") |

Also replace (not `YOUR-` prefixed because they are readable stand-ins):

| Stand-in | Lives in | Replace with |
|---|---|---|
| `Player One` … `Player Eight`, `Coach One/Two`, `Staff One/Two/Three` | `roster.html` (muted line under each tag) | Real names, or delete the `<p class="row__name">` line if someone prefers not to show it |
| `P1`…`P8`, `C1`, `C2`, `S1`–`S3` | initials blocks in `index.html` and `roster.html` | First letters of each gamertag (1–3 characters fit) |
| Region "Alsace, France" | `index.html`, `about.html`, `assets/js/i18n.js` (`org.regionValue`) | **To confirm.** Edit if the region changes. |
| Counts "8 players · 2 coaches · 3 staff" and the Home stats | `index.html`, `roster.html`, `assets/js/i18n.js` | Update if the roster size changes |

Names and tags are not translated. Roles (Player / Joueur, Media / Média …) are.

## Player links (X, Twitch, YouTube, Instagram, RL Tracker, dpm.lol)

Every person on `roster.html` has the same set of link slots, in this order: X, Twitch, YouTube, Instagram, plus **RL Tracker** for Rocket League players and **DPM.LOL** for League of Legends players (coaches and staff have no tracker slot). A slot you have not filled is marked `hidden`, so it never shows on the site.

To turn a link on:

1. Find the person's row in `roster.html` (search for their tag).
2. In their `<ul class="social" …>`, find the slot, e.g. `<li hidden><a href="https://youtube.com/@YOUR-YOUTUBE" aria-label="YouTube" …>`.
3. Replace the placeholder URL with the real one and **delete the word `hidden`** from that `<li>`.
4. If the `<ul class="social" role="list" hidden>` line itself says `hidden` (no link was on yet), delete that `hidden` too.
5. Run `node scripts/check.mjs`.

For the trackers, open the player's profile on the site and **copy the exact URL from the browser's address bar**: the placeholders only show the usual shape (`https://rocketleague.tracker.network/rocket-league/profile/epic/<name>/overview`, `https://dpm.lol/<Name>-<TAG>`), and the platform part (`epic`, `steam`, `psn`, `xbl`, `switch`) or the Riot tag must match the player's real account.

To turn a link off again, put `hidden` back.

## Player photos

Photos replace the initials block wherever one exists.

1. Save a square-ish photo as `assets/img/portraits/<Tag>.webp` (WebP preferred; `.jpg`/`.png` also work). 192×192 px or larger, under 150 KB. Keep the face in the upper part: the crop keeps the top 20%.
2. In `roster.html` (and in the Home rail in `index.html` if the player is there), replace that person's
   `<div class="initials" aria-hidden="true">P2</div>`
   with
   `<img class="portrait" src="./assets/img/portraits/FoxBad_.webp" alt="" aria-hidden="true" width="96" height="96" loading="lazy" decoding="async">`
   Use `width="64" height="64"` in staff rows. The file name is **case-sensitive** on GitHub Pages: `Enrtarr.webp` and `enrtarr.webp` are different files.
3. Run `node scripts/check.mjs`: it fails if the file is missing, has no width/height, is over 150 KB, or is a PNG/JPEG saved with a `.webp` name.

`alt=""` is deliberate: the player's tag is printed right next to the photo, so screen readers would otherwise read the name twice.

Current photos: `Enrtarr.webp` (Enrtarr on RL, LoL and staff), `maaple.webp` (maaple. on RL, maaplefx on staff).

## Logo, wordmark and accent color

- Drop the logo into `assets/img/` as `logo.svg` (preferred) or `logo.png`. See `assets/img/README.md`.
- The header shows the rose mark (`assets/img/logo-mark.webp`, made from `logo.png`) next to the "NEUILLE PRIME" wordmark. To show the mark alone, delete `<span>NEUILLE PRIME</span>` from the `wordmark` link on all four pages and change the image's `alt=""` to `alt="NEUILLE PRIME"`. Remove `aria-hidden="true"` at the same time.
- Tab icons: `assets/img/favicon-32.png` and `assets/img/apple-touch-icon.png` (rose on `--ink`), both made from `logo.png`. If you change the logo, regenerate them at the same sizes.
- The accent color is defined **once**: `--accent` in `:root` at the top of `assets/css/style.css`. Change that one hex value to match the logo. Keep it bright enough that dark `--ink` text on it stays readable (current pair ≈ 5.9:1 contrast). Do not add new colors elsewhere: `scripts/check.mjs` will fail.

## Translations (EN / FR)

- English text is written directly in the HTML. All French lives in `assets/js/i18n.js` (`NP67_I18N.fr`). Never put French in the HTML.
- To add or change a string:
  1. Add the key to **both** `en` and `fr` in `assets/js/i18n.js` (flat dotted keys such as `"faq.4.q"`).
  2. Put the English text in the HTML element and add `data-i18n="faq.4.q"` (or `data-i18n-attr="aria-label:key"` for an attribute).
  3. The English in the HTML must match `en` exactly.
  4. Run `node scripts/check.mjs`.
- The French uses **tu** ("Rejoins le Discord", "Écris-nous"). Keep it that way.
- The chosen language is saved in the browser (`localStorage`, key `np67-lang`). The default is English; the browser language is not auto-detected.

## Add or edit a player

1. In `roster.html`, copy one whole `<li class="row">…</li>` inside the right section (`#rl` or `#lol`).
2. Change the initials, the tag (and its `id="tag-…"`, which must stay unique), the name, the role key and the two social URLs. The `aria-describedby` on the icons must point to the new tag `id`.
3. Role labels use existing keys: `role.player`, `role.coach`, `role.top`, `role.jungle`, `role.mid`, `role.adc`, `role.support`. For a new role, add a key to both languages in `i18n.js`.
4. If the player should also appear on Home, copy a `<li class="tile">` in the rail in `index.html`.
5. Update the counts (see Placeholders) and run `node scripts/check.mjs`.

Staff rows are `<li class="staff-row">` in `#staff` and work the same way.

## Checks

```bash
node scripts/check.mjs
```

Zero dependencies (Node 18+). It verifies i18n keys and inline English, colors and fonts, banned words, emoji, page skeleton (one h1, skip link, landmarks, meta), links and anchors, CTAs per section, French outside `i18n.js`, and this README's placeholder table. It prints one line per problem and exits non-zero on failure. Build notes, decisions and the design audit are in `docs/`.

## Custom domain (later, not done now)

Add a file named `CNAME` containing just the domain (e.g. `np67.gg`), push it, set the same domain under **Settings → Pages → Custom domain**, and create the DNS records GitHub lists there (`A`/`AAAA` records for an apex domain, or a `CNAME` record to `YOUR-USERNAME.github.io` for a subdomain). Then update the `og:url` tags.

## Known limitations

- **No real images yet.** Player photos, the logo and a social share image are missing; initials blocks and the text wordmark stand in. The design audit's image checks must be redone when photos are added.
- **No `og:image`.** Links shared on Discord / X show no preview picture until you add `assets/img/og.png` (1200×630) and an `og:image` meta tag on each page (see `assets/img/README.md`).
- **Fonts need internet.** Anton and IBM Plex load from Google Fonts. Offline (e.g. `file://` without a connection) the site falls back to system fonts.
- **404 on nested URLs.** GitHub Pages shows `404.html` for any missing URL. For a top-level typo (`/rostr`) it is fully styled; for a nested one (`/a/b`) the relative CSS path does not resolve and the page appears unstyled (content and links still work).
- Tested in Chromium-based browsers only. See `docs/MANUAL_TEST.md` for the Firefox / Safari / phone / live-site checklist.
