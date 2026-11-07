#!/usr/bin/env node
// NEUILLE PRIME — scripts/check.mjs
// Zero-dependency site checker. Run from anywhere: `node scripts/check.mjs`.
// Prints one line per finding; exits 1 if any FAIL. WARN lines do not fail.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = ["index.html", "roster.html", "news.html", "about.html", "404.html"];
const PAGE_ID = { "index.html": "home", "roster.html": "roster", "news.html": "news", "about.html": "about", "404.html": "404" };
const TOKENS = { ink: "#0b0b0c", panel: "#141416", line: "#2a2a2e", paper: "#f1efea", muted: "#8c8c93", accent: "#ff3d00" };
const FONTS_HREF = "https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500&display=swap";

const fails = [];
const warns = [];
const fail = (n, file, msg) => fails.push(`FAIL [${n}] ${file}: ${msg}`);
const warn = (n, file, msg) => warns.push(`WARN [${n}] ${file}: ${msg}`);
const exists = (f) => fs.existsSync(path.join(ROOT, f));
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const walk = (dir) => fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })
  .flatMap((d) => d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name).split(path.sep).join("/")]);

const decode = (s) => s
  .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&amp;/g, "&");
const norm = (s) => decode(String(s)).replace(/\s+/g, " ").trim();
const noComments = (s) => s.replace(/<!--[\s\S]*?-->/g, "");
// Formatters (Prettier) wrap attributes over lines; collapse whitespace inside tags so checks see one line per tag.
const flatTags = (s) => s.replace(/<[a-zA-Z\/][^>]*>/g, (t) => t.replace(/\s+/g, " ").replace(/ (\/?)>$/, "$1>"));
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? m[1] : null; };

// ---------------------------------------------------------------- load
const pages = {};
for (const p of PAGES) {
  if (!exists(p)) { fail(9, p, "page missing"); continue; }
  pages[p] = flatTags(noComments(read(p)));
}
const cssFiles = walk("assets").filter((f) => f.endsWith(".css"));
const jsFiles = walk("assets").filter((f) => f.endsWith(".js"));
const codeFiles = [...Object.keys(pages), ...cssFiles, ...jsFiles];

let en = {}, fr = {};
try {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(read("assets/js/i18n.js") + "\n;this.__D = NP67_I18N;", ctx);
  ({ en, fr } = ctx.__D);
} catch (e) { fail(1, "assets/js/i18n.js", `cannot evaluate dictionary: ${e.message}`); }

// ---------------------------------------------------------------- 1 + 2  i18n keys and inline English
const used = new Set();
const enKeys = Object.keys(en), frKeys = Object.keys(fr);
for (const k of enKeys) if (!(k in fr)) fail(1, "i18n.js", `key "${k}" in en but not fr`);
for (const k of frKeys) if (!(k in en)) fail(1, "i18n.js", `key "${k}" in fr but not en`);
for (const [lang, d] of [["en", en], ["fr", fr]])
  for (const [k, v] of Object.entries(d)) if (typeof v !== "string" || !v.trim()) fail(1, "i18n.js", `${lang}["${k}"] is empty`);

for (const [p, html] of Object.entries(pages)) {
  const need = (k) => { used.add(k); if (!(k in en) || !(k in fr)) fail(1, p, `key "${k}" missing in ${!(k in en) ? "en" : ""}${!(k in en) && !(k in fr) ? "+" : ""}${!(k in fr) ? "fr" : ""}`); };

  for (const m of html.matchAll(/<([a-zA-Z][\w-]*)\b[^>]*?\sdata-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1\s*>/g)) {
    const [, , k, inner] = m;
    need(k);
    if (/</.test(inner)) fail(2, p, `data-i18n="${k}" contains markup; use data-i18n-html or move the attribute`);
    else if (k in en && norm(inner) !== norm(en[k])) fail(2, p, `inline text for "${k}" ≠ en: "${norm(inner)}" vs "${norm(en[k])}"`);
  }
  for (const m of html.matchAll(/<([a-zA-Z][\w-]*)\b[^>]*?\sdata-i18n-html="([^"]+)"[^>]*>([\s\S]*?)<\/\1\s*>/g)) {
    const [, , k, inner] = m;
    need(k);
    for (const [lang, d] of [["en", en], ["fr", fr]])
      if (k in d && !/<br>|<span class="accent">/.test(d[k])) fail(1, p, `data-i18n-html "${k}" (${lang}) has no <br>/<span class="accent">; use data-i18n`);
    if (k in en && norm(inner).replace(/<br\s*\/?>/g, "<br>") !== norm(en[k])) fail(2, p, `inline HTML for "${k}" ≠ en`);
  }
  for (const m of html.matchAll(/<[a-zA-Z][^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g)) {
    for (const pair of m[1].split(";")) {
      const [a, k] = pair.split(":").map((s) => s && s.trim());
      if (!a || !k) { fail(1, p, `bad data-i18n-attr "${m[1]}"`); continue; }
      need(k);
      const v = attr(m[0], a);
      if (v === null) fail(2, p, `data-i18n-attr targets missing attribute ${a}`);
      else if (k in en && norm(v) !== norm(en[k])) fail(2, p, `${a} for "${k}" ≠ en: "${norm(v)}"`);
    }
  }
  const pid = PAGE_ID[p];
  const body = html.match(/<body\b[^>]*>/);
  if (!body || attr(body[0], "data-page") !== pid) fail(9, p, `<body data-page="${pid}"> missing`);
  for (const f of ["title", "description"]) need(`meta.${pid}.${f}`);
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const ogT = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1];
  const ogD = (html.match(/<meta property="og:description" content="([^"]*)"/) || [])[1];
  if (title && norm(title) !== norm(en[`meta.${pid}.title`] || "")) fail(2, p, "<title> ≠ en meta title");
  if (desc && norm(desc) !== norm(en[`meta.${pid}.description`] || "")) fail(2, p, "meta description ≠ en meta description");
  if (ogT !== undefined && norm(ogT) !== norm(en[`meta.${pid}.title`] || "")) fail(2, p, "og:title ≠ en meta title");
  if (ogD !== undefined && norm(ogD) !== norm(en[`meta.${pid}.description`] || "")) fail(2, p, "og:description ≠ en meta description");
}
for (const k of enKeys) if (!used.has(k)) warn(1, "i18n.js", `key "${k}" unused by any page`);

// ---------------------------------------------------------------- 3  no gradients
const GRAD = "gradi" + "ent";
for (const f of codeFiles) if (read(f).toLowerCase().includes(GRAD)) fail(3, f, `contains "${GRAD}"`);

// ---------------------------------------------------------------- 4  colors
const NAMED = /\b(white|black|red|green|blue|gr[ae]y|orange|yellow|purple|pink|silver|navy|teal|maroon|olive|lime|aqua|fuchsia|gold|tomato|coral|crimson)\b/i;
const FUNCS = /\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\s*\(/i;
const HEX = /#[0-9a-f]{3,8}\b/gi;
for (const f of cssFiles) {
  const css = read(f).replace(/\/\*[\s\S]*?\*\//g, "");
  const roots = [...css.matchAll(/:root\s*\{([^}]*)\}/g)].map((m) => m[1]).join("\n");
  for (const [name, hex] of Object.entries(TOKENS)) {
    const m = roots.match(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{6})\\s*;`));
    if (!m || m[1].toLowerCase() !== hex) fail(4, f, `token --${name} missing or ≠ ${hex}`);
  }
  for (const h of roots.match(HEX) || []) if (!Object.values(TOKENS).includes(h.toLowerCase())) fail(4, f, `non-token hex ${h} in :root`);
  if (FUNCS.test(roots)) fail(4, f, "color function in :root");
  const rest = css.replace(/:root\s*\{[^}]*\}/g, "");
  for (const h of rest.match(HEX) || []) fail(4, f, `hex color ${h} outside :root`);
  for (const m of rest.matchAll(/([\w-]+)\s*:\s*([^;{}]+)/g)) {
    if (FUNCS.test(m[2])) fail(4, f, `color function in "${m[1]}: ${m[2].trim()}"`);
    if (NAMED.test(m[2]) && !/^(font-family|content|grid-template-areas)$/.test(m[1])) fail(4, f, `named color in "${m[1]}: ${m[2].trim()}"`);
  }
}
for (const f of jsFiles) {
  const js = read(f);
  if (js.match(HEX) || FUNCS.test(js)) fail(4, f, "color value in JS");
}
for (const [p, html] of Object.entries(pages)) {
  if (/\sstyle="|<style\b/i.test(html)) fail(4, p, "inline style attribute or <style> block (colors must come from style.css)");
  const tc = html.match(/<meta name="theme-color" content="([^"]*)"/);
  if (!tc || tc[1].toLowerCase() !== TOKENS.ink) fail(4, p, "theme-color must be --ink #0B0B0C");
}
const iconRefs = new Set(Object.values(pages).flatMap((h) => [...h.matchAll(/<link rel="icon" href="\.\/([^"]+\.svg)"/g)].map((m) => m[1])));
for (const ic of iconRefs) if (exists(ic)) {
  const hexes = new Set((read(ic).match(HEX) || []).map((h) => h.toLowerCase()).filter((h) => !Object.values(TOKENS).includes(h)));
  if (hexes.size) fail(4, ic, `${hexes.size} non-token colors (e.g. ${[...hexes].slice(0, 3).join(", ")})`);
  if (fs.statSync(path.join(ROOT, ic)).size > 20000) fail(4, ic, "favicon SVG over 20 KB");
}

// ---------------------------------------------------------------- 5 + 6  box-shadow, font-family
for (const f of cssFiles) {
  const css = read(f).replace(/\/\*[\s\S]*?\*\//g, "");
  const shadowed = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim(), body = m[2];
    for (const d of body.matchAll(/box-shadow\s*:\s*([^;]+)/g)) if (d[1].trim() !== "none") shadowed.push(sel);
    if (sel === ":root") {
      for (const d of body.matchAll(/--font-[\w-]+\s*:\s*([^;]+)/g)) {
        const first = d[1].split(",")[0].replace(/["']/g, "").trim().toLowerCase();
        if (/^(inter|roboto|open sans|arial|helvetica)$/.test(first)) fail(6, f, `primary font "${first}" banned`);
      }
      continue;
    }
    for (const d of body.matchAll(/font-family\s*:\s*([^;]+)/g))
      if (!/^(var\(--font-(display|body|mono)\)|inherit)$/.test(d[1].trim())) fail(6, f, `${sel}: font-family "${d[1].trim()}" must be a font token`);
    for (const d of body.matchAll(/(?:^|[;\s])font\s*:\s*([^;]+)/g))
      if (d[1].trim() !== "inherit") fail(6, f, `${sel}: font shorthand "${d[1].trim()}" not allowed`);
  }
  if (shadowed.length > 1) fail(5, f, `box-shadow on ${shadowed.length} selectors: ${shadowed.join(" | ")}`);
}
for (const [p, html] of Object.entries(pages)) {
  const links = [...html.matchAll(/<link rel="stylesheet" href="(https:[^"]+)"/g)].map((m) => m[1]);
  if (links.length !== 1 || links[0] !== FONTS_HREF) fail(6, p, "Google Fonts link must be exactly the Anton / Plex Mono 500 / Plex Sans 400,500 URL");
  if (!/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">/.test(html)) fail(6, p, "preconnect fonts.googleapis.com missing");
  if (!/<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>/.test(html)) fail(6, p, "preconnect fonts.gstatic.com crossorigin missing");
}

// ---------------------------------------------------------------- 7  banned words
const BANNED = ["unlock", "empower", "seamless", "leverag", "streamline", "robust", "cutting-edge", "elevat", "harness", "delve", "learn more", "en savoir plus", "découvrir plus"];
const scanWords = (file, text) => {
  const t = text.toLowerCase();
  for (const w of BANNED) if (new RegExp(`(^|[^\\p{L}])${w}`, "u").test(t)) fail(7, file, `banned word "${w}"`);
};
for (const [p, html] of Object.entries(pages)) scanWords(p, html);
for (const [lang, d] of [["en", en], ["fr", fr]]) for (const [k, v] of Object.entries(d)) scanWords(`i18n.js ${lang}["${k}"]`, v);

// ---------------------------------------------------------------- 8  no emoji
// Flag emoji (regional-indicator pairs, e.g. the French flag) are allowed by the owner's choice; other emoji are not.
const EMOJI = /(?![\u00a9\u00ae\u2122])[\p{Extended_Pictographic}\u{FE0F}]/u;
for (const f of [...Object.keys(pages), ...jsFiles]) {
  const m = noComments(read(f)).match(EMOJI);
  if (m) fail(8, f, `emoji/pictograph U+${m[0].codePointAt(0).toString(16).toUpperCase()}`);
}

// ---------------------------------------------------------------- 9  page skeleton
for (const [p, html] of Object.entries(pages)) {
  const h1 = (html.match(/<h1\b/g) || []).length;
  if (h1 !== 1) fail(9, p, `${h1} <h1> elements (need exactly 1)`);
  if (!/<html lang="[a-z-]+"/.test(html)) fail(9, p, "<html lang> missing");
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/.test(html)) fail(9, p, "viewport meta missing");
  if (!/<title>[^<]+<\/title>/.test(html)) fail(9, p, "<title> missing/empty");
  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(9, p, "meta description missing/empty");
  const skip = html.match(/<a\b[^>]*class="[^"]*\bskip-link\b[^"]*"[^>]*>/);
  if (!skip || attr(skip[0], "href") !== "#main") fail(9, p, 'skip link to "#main" missing');
  if (!/<main\b[^>]*\sid="main"/.test(html)) fail(9, p, "<main id=\"main\"> missing");
  if (!/<header\b/.test(html) || !/<footer\b/.test(html)) fail(9, p, "<header>/<footer> landmark missing");
  if (!/<nav\b[^>]*\saria-label="[^"]+"/.test(html)) fail(9, p, "<nav aria-label> missing");
  for (const og of ["og:type", "og:title", "og:description", "og:url"])
    if (!new RegExp(`<meta property="${og}" content="[^"]+">`).test(html)) fail(9, p, `${og} missing`);
  if (!/<link rel="icon" href="\.\/assets\/img\/[\w.-]+\.(svg|png|ico)"/.test(html)) fail(9, p, "favicon link missing");
  const s = [...html.matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]);
  const iI = s.findIndex((a) => /i18n\.js/.test(a)), iM = s.findIndex((a) => /main\.js/.test(a));
  if (iI < 0 || iM < 0 || iI > iM) fail(9, p, "i18n.js must load before main.js");
  if (s.some((a) => /\b(defer|async|type="module")/.test(a))) fail(9, p, "no defer/async/module scripts");
}

// ---------------------------------------------------------------- 10  images, svgs
for (const [p, html] of Object.entries(pages)) {
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = attr(m[0], "alt");
    if (alt === null || (alt === "" && attr(m[0], "aria-hidden") !== "true")) fail(10, p, `img without alt: ${m[0].slice(0, 80)}`);
    if (!attr(m[0], "width") || !attr(m[0], "height")) fail(10, p, `img without width/height (layout shift): ${attr(m[0], "src")}`);
    const src = attr(m[0], "src") || "";
    if (src.startsWith("./") && exists(src)) {
      const b = fs.readFileSync(path.join(ROOT, src)).subarray(0, 12);
      const kind = b.toString("latin1", 8, 12) === "WEBP" ? "webp" : b[0] === 0x89 && b[1] === 0x50 ? "png" : b[0] === 0xff && b[1] === 0xd8 ? "jpg" : /<svg|<\?xml/.test(b.toString("latin1")) ? "svg" : "?";
      const ext = src.split(".").pop().toLowerCase().replace("jpeg", "jpg");
      if (kind !== ext) fail(10, p, `${src} is really ${kind}, not .${ext} (re-export it)`);
      if (fs.statSync(path.join(ROOT, src)).size > 150000) fail(10, p, `${src} is over 150 KB; resize it`);
    }
  }
  for (const m of html.matchAll(/<svg\b[^>]*>/g)) {
    if (attr(m[0], "aria-hidden") !== "true") fail(10, p, "inline <svg> without aria-hidden=\"true\"");
    if (attr(m[0], "focusable") !== "false") fail(10, p, "inline <svg> without focusable=\"false\"");
  }
}

// ---------------------------------------------------------------- 11  paths and links
const ids = {};
for (const [p, html] of Object.entries(pages)) ids[p] = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const [p, html] of Object.entries(pages)) {
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const v = m[2];
    if (/[<>\s]/.test(v)) { fail(11, p, `malformed ${m[1]}="${v.slice(0, 40)}"`); continue; }
    if (v.startsWith("/")) { fail(11, p, `root-absolute path ${m[1]}="${v}"`); continue; }
    if (/^(https?:|mailto:|tel:)/.test(v)) continue;
    if (!v) { fail(11, p, `empty ${m[1]}`); continue; }
    const [file, hash] = v.split("#");
    if (file && !file.startsWith("./")) fail(11, p, `relative path must start with "./": ${v}`);
    const target = file ? path.posix.normalize(file) : p;
    if (file && !exists(target)) { fail(11, p, `broken link ${v}`); continue; }
    if (hash) {
      const set = ids[target] || new Set([...read(target).matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
      if (!set.has(hash)) fail(11, p, `missing anchor ${v}`);
    }
  }
}

// ---------------------------------------------------------------- 12  CTAs per section
for (const [p, html] of Object.entries(pages)) {
  for (const m of html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)) {
    const classes = [...m[0].matchAll(/\sclass="([^"]*)"/g)].map((c) => c[1].split(/\s+/));
    const btn = classes.filter((c) => c.includes("btn")).length;
    const primary = classes.filter((c) => c.includes("btn--primary")).length;
    const where = (m[0].match(/<section\b[^>]*>/)[0]).slice(0, 60);
    if (btn > 2) fail(12, p, `${btn} .btn in ${where}`);
    if (primary > 1) fail(12, p, `${primary} .btn--primary in ${where}`);
  }
}

// ---------------------------------------------------------------- 13  no French in HTML
const FR_CHARS = /[éèàçùêâîôûëïœÉÈÀÇÙÊÂÎÔÛ]/;
for (const [p, html] of Object.entries(pages)) {
  const text = html.replace(/<script\b[\s\S]*?<\/script>/g, " ").replace(/<([a-z][\w-]*)\b[^>]*\stranslate="no"[^>]*>[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ");
  const t = text.match(new RegExp(`.{0,20}${FR_CHARS.source}.{0,20}`));
  if (t) fail(13, p, `French characters in text: "${t[0].trim()}"`);
  for (const m of html.matchAll(/\s(aria-label|title|alt|content|placeholder)="([^"]*)"/g))
    if (FR_CHARS.test(m[2])) fail(13, p, `French characters in ${m[1]}="${m[2]}"`);
}

// ---------------------------------------------------------------- 14  placeholders
const readme = exists("README.md") ? read("README.md") : "";
const placeholders = new Set();
for (const f of [...Object.keys(pages), "assets/js/i18n.js"])
  for (const m of read(f).matchAll(/YOUR-[A-Z0-9]+(?:-[A-Z0-9]+)*/g)) placeholders.add(m[0]);
for (const ph of placeholders) if (!readme.includes(ph)) fail(14, "README.md", `placeholder ${ph} not listed`);
for (const [p, html] of Object.entries(pages)) {
  if (/\bTODO\b|lorem ipsum|neuille-prime\.example/i.test(html)) fail(14, p, "non-YOUR- placeholder (TODO / lorem / .example) found");
}

// ---------------------------------------------------------------- 15  unique ids, news feed order
for (const [p, html] of Object.entries(pages)) {
  const seen = new Map();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  for (const [id, n] of seen) if (n > 1) fail(15, p, `id "${id}" used ${n} times`);
}
if (pages["news.html"]) {
  const posts = [...pages["news.html"].matchAll(/<article class="post[^"]*" id="(post-[^"]+)"[\s\S]*?<time class="post__time" datetime="([^"]+)">/g)];
  let prev = "9999-99-99";
  for (const [, id, date] of posts) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(15, "news.html", `${id}: datetime "${date}" must be YYYY-MM-DD`);
    if (date > prev) fail(15, "news.html", `${id} (${date}) is newer than the post above it; newest posts go first`);
    prev = date;
  }
  for (const m of pages["news.html"].matchAll(/<article class="post[^"]*" id="(post-[^"]+)"[\s\S]*?<\/article>/g)) {
    if (!m[0].includes(`href="#${m[1]}"`)) fail(15, "news.html", `${m[1]}: date link must point to #${m[1]}`);
    if (!m[0].includes(`id="${m[1]}-title"`)) fail(15, "news.html", `${m[1]}: title id must be ${m[1]}-title`);
    for (const v of m[0].matchAll(/data-video="([^"]+)"/g))
      if (!m[0].includes(`watch?v=${v[1]}"`) || !m[0].includes(`/vi/${v[1]}/`)) fail(15, "news.html", `${m[1]}: video id ${v[1]} must also be in the watch link and thumbnail`);
  }
}

// ---------------------------------------------------------------- report
for (const w of warns) console.log(w);
for (const f of fails) console.log(f);
console.log(`check: ${fails.length} fail, ${warns.length} warn, ${PAGES.length} pages, ${enKeys.length} i18n keys, ${placeholders.size} placeholders`);
process.exit(fails.length ? 1 : 0);
