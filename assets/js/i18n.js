/* NEUILLE PRIME — i18n.js
   Classic script (no modules: they fail on file://). Load at end of <body>,
   without defer, before main.js. HTML holds the English text inline; this
   file swaps it. Add every key to BOTH en and fr, then run scripts/check.mjs. */
var NP67_I18N = {
  en: {
    /* ---- meta (selected by <body data-page>) ---- */
    "meta.home.title": "NEUILLE PRIME (NP67) — Rocket League and League of Legends esports",
    "meta.home.description": "NEUILLE PRIME (NP67) is an esports org from Alsace, France, with Rocket League and League of Legends rosters.",
    "meta.roster.title": "Roster — NEUILLE PRIME (NP67)",
    "meta.roster.description": "Players, coaches and staff of NEUILLE PRIME: Rocket League, League of Legends and the people behind them.",
    "meta.about.title": "About and contact — NEUILLE PRIME (NP67)",
    "meta.about.description": "Who NEUILLE PRIME is, how the org is structured, and how to reach NP67 about tryouts, partnerships and content.",
    "meta.404.title": "Page not found — NEUILLE PRIME (NP67)",
    "meta.404.description": "This page does not exist. Head back to the NEUILLE PRIME home page.",

    /* ---- shared chrome ---- */
    "a11y.skip": "Skip to content",
    "nav.label": "Main",
    "nav.home": "Home",
    "nav.roster": "Roster",
    "nav.about": "About",
    "lang.label": "Language",
    "social.label": "NP67 social links",
    "social.discord": "NP67 on Discord",
    "social.x": "NP67 on X",
    "social.twitch": "NP67 on Twitch",
    "social.youtube": "NP67 on YouTube",
    "social.instagram": "NP67 on Instagram",

    /* ---- home ---- */
    "hero.line": "Rocket League and League of Legends. Built in Alsace."
  },

  fr: {
    "meta.home.title": "NEUILLE PRIME (NP67) — esport Rocket League et League of Legends",
    "meta.home.description": "NEUILLE PRIME (NP67) est une structure esport alsacienne avec des équipes Rocket League et League of Legends.",
    "meta.roster.title": "Effectif — NEUILLE PRIME (NP67)",
    "meta.roster.description": "Joueurs, coachs et staff de NEUILLE PRIME : Rocket League, League of Legends et l’équipe derrière.",
    "meta.about.title": "À propos et contact — NEUILLE PRIME (NP67)",
    "meta.about.description": "Qui est NEUILLE PRIME, comment la structure est organisée et comment contacter NP67 pour les tryouts, partenariats et contenus.",
    "meta.404.title": "Page introuvable — NEUILLE PRIME (NP67)",
    "meta.404.description": "Cette page n’existe pas. Retourne à l’accueil de NEUILLE PRIME.",

    "a11y.skip": "Aller au contenu",
    "nav.label": "Principale",
    "nav.home": "Accueil",
    "nav.roster": "Effectif",
    "nav.about": "À propos",
    "lang.label": "Langue",
    "social.label": "Réseaux de NP67",
    "social.discord": "NP67 sur Discord",
    "social.x": "NP67 sur X",
    "social.twitch": "NP67 sur Twitch",
    "social.youtube": "NP67 sur YouTube",
    "social.instagram": "NP67 sur Instagram",

    "hero.line": "Rocket League et League of Legends. Depuis l’Alsace."
  }
};

(function () {
  if (typeof document === "undefined") return; /* lets scripts/check.mjs load this file */

  var STORAGE_KEY = "np67-lang";
  var memoryLang = null;

  function readSaved() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return memoryLang; }
  }

  function save(lang) {
    memoryLang = lang;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* file:// or blocked: keep in memory */ }
  }

  function each(selector, fn) {
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) fn(nodes[i]);
  }

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute("content", value);
  }

  function apply(lang) {
    var dict = NP67_I18N[lang] || NP67_I18N.en;

    each("[data-i18n]", function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });

    each("[data-i18n-html]", function (el) {
      var v = dict[el.getAttribute("data-i18n-html")];
      if (v != null) el.innerHTML = v;
    });

    each("[data-i18n-attr]", function (el) {
      var pairs = el.getAttribute("data-i18n-attr").split(";");
      for (var i = 0; i < pairs.length; i++) {
        var parts = pairs[i].split(":");
        if (parts.length !== 2) continue;
        var v = dict[parts[1].trim()];
        if (v != null) el.setAttribute(parts[0].trim(), v);
      }
    });

    var page = document.body.getAttribute("data-page");
    var title = dict["meta." + page + ".title"];
    var desc = dict["meta." + page + ".description"];
    if (title) document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);

    document.documentElement.lang = lang;

    each("[data-lang]", function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  var saved = readSaved();
  var initial = saved && NP67_I18N[saved] ? saved : "en";
  if (initial !== "en") apply(initial);

  each("[data-lang]", function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      if (!NP67_I18N[lang]) return;
      apply(lang);
      save(lang);
    });
  });
})();
