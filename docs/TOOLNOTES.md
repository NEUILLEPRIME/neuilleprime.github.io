# Tool notes

Environment discovery (Step 0). Redo every session; append a dated block.

## 2026-11-07 — session 1

| Item | Finding |
|---|---|
| User OS | Windows (folder `D:\Documents\Vibe coded\neuille-prime-website`) |
| Build shell | Ubuntu 22.04 Linux VM on the user's machine, bash 5.1, folder mounted at `~/mnt/neuille-prime-website` |
| git | 2.34.1. Global `user.name`/`user.email` **not set** → set repo-locally to `NP67 Site Builder` / `noreply@example.com`. Also repo-local `core.autocrlf=false`, `core.fileMode=false` (Windows FS reports every file as executable). |
| node / npx | v22.23.4 / npx 10.9.9 |
| python | 3.10.12 (`python` and `python3`) |
| Chrome/Chromium/Edge in build shell | None |
| Network from build shell | Blocked: `fonts.googleapis.com`, `registry.npmjs.org`, `pypi.org` all return proxy 403. `npx --yes <pkg>` cannot download anything. |
| Secondary sandbox | Claude's cloud workspace has `google-chrome` + Playwright 1.63 (Node and Python) installed, no Lighthouse, network off for package installs. |

## Verification route

- **`scripts/check.mjs`** (Node, zero deps) — Node is present on the build shell; chosen over Python because the i18n dictionary is a JS file and can be evaluated natively with `vm`.
- **Browser checks** (screenshots at 4 widths, overflow, keyboard, no-JS, `file://`): automated with Playwright + Chrome in Claude's cloud workspace, against a copy of the site files. Google Fonts will not load there (no network), so screenshots render with the fallback stack (`Arial Narrow` / system sans); layout and overflow checks remain meaningful but are slightly pessimistic for Anton width. Logged as a limitation.
- **Lighthouse**: not installed anywhere and cannot be downloaded (npm blocked). Expected to be **manual — not verified**; steps go to `docs/MANUAL_TEST.md`. Re-check at M5.

## 2026-11-07 — session 2 (resume)

- Same toolchain (node 22.23.4, git 2.34.1, python 3.10.12, no local browser).
- **Network changed:** `registry.npmjs.org` and `fonts.googleapis.com` now return 200 from the build shell. `npx --yes` downloads should work → Lighthouse may become possible at M5 (needs a Chrome binary; try `npx --yes @puppeteer/browsers install chrome-headless-shell` into a temp dir outside the repo). Playwright route in the cloud workspace remains the fallback.

## 2026-11-07 — session 3 (M5)

- **Lighthouse now automated.** Route (all outside the repo, under `~/lh/` in the build shell): `npx --yes @puppeteer/browsers install chrome-headless-shell@stable --path ~/lh/browsers`; missing `libXdamage.so.1` fetched as `libxdamage1_1.1.5-2build2_amd64.deb` from archive.ubuntu.com and extracted with `dpkg-deb -x` into `~/lh/root` (no system install), used via `LD_LIBRARY_PATH`; `npx --yes lighthouse@13.6.0` with `CHROME_PATH` and `--headless=new --no-sandbox`, site served by `python3 -m http.server`. Scripts: `~/lh/run.sh` (all 8 runs), `~/lh/one.sh <page-mode>…`.
- Browser QA remains Playwright + Chrome in the cloud workspace (`qa/shots.py`, `full.py`, `nojs.py`, `anchors.py`, `fold.py`, `recheck.py`), real fonts via interception.
- Only Chromium engines were available. Firefox / Safari / real phones → `docs/MANUAL_TEST.md`.
