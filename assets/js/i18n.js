/* NEUILLE PRIME — i18n.js
   Classic script (no modules: they fail on file://). Load at end of <body>,
   without defer, before main.js. HTML holds the English text inline; this
   file swaps it. Add every key to BOTH en and fr, then run scripts/check.mjs. */
var NP67_I18N = {
  en: {
    /* ---- meta (selected by <body data-page>) ---- */
    "meta.home.title": "NEUILLE PRIME — Rocket League and League of Legends esports",
    "meta.home.description": "NEUILLE PRIME is an esports org from France, with Rocket League and League of Legends rosters.",
    "meta.roster.title": "Roster — NEUILLE PRIME",
    "meta.roster.description": "Players, coaches and staff of NEUILLE PRIME: Rocket League, League of Legends and the people behind them.",
    "meta.about.title": "About and contact — NEUILLE PRIME",
    "meta.about.description": "Who NEUILLE PRIME is, how the org is structured, and how to reach NP67 about tryouts, partnerships and content.",
    "meta.404.title": "Page not found — NEUILLE PRIME",
    "meta.404.description": "This page does not exist. Head back to the NEUILLE PRIME home page.",

    /* ---- shared chrome ---- */
    "a11y.skip": "Skip to content",
    "nav.label": "Main",
    "nav.home": "Home",
    "nav.roster": "Roster",
    "nav.about": "About",
    "lang.label": "Language",
    "social.label": "NPEGC social links",
    "social.discord": "NPEGC on Discord",
    "social.x": "NPEGC on X",
    "social.twitch": "NPEGC on Twitch",
    "social.youtube": "NPEGC on YouTube",
    "social.instagram": "NPEGC on Instagram",

    /* ---- home ---- */
    "hero.line": "Rocket League and League of Legends. Built in France.",
    "hero.cta": "See the roster",
    "cta.discord": "Join the Discord",
    "cta.email": "Email NPEGC",
    "org.head": "Org file",
    "org.structure": "Structure",
    "org.games": "Games",
    "org.region": "Region",
    "org.regionValue": "France",
    "org.founded": "Founded",
    "games.intro": "Two games. One roster.",
    "games.rl.line": "Three players, one coach, 3v3.",
    "games.lol.line": "Five players, every lane covered.",
    "games.link": "Roster",
    "games.rl.aria": "Rocket League roster",
    "games.lol.aria": "League of Legends roster",
    "teaser.title": "Who plays for NPEGC",
    "teaser.count": "8 players · 2 games",
    "teaser.rail": "Player preview, scrolls sideways",
    "teaser.more": "Full roster",
    "role.player": "Player",
    "role.top": "Top",
    "role.jungle": "Jungle",
    "role.mid": "Mid",
    "aboutTeaser.title": "NPEGC in short",
    "aboutTeaser.body": "NEUILLE PRIME is a multigaming esports org from France, playing under the tag NP67. It fields a Rocket League roster and a League of Legends roster; the Rocket League side has its own coach. Players, coaches and staff sit in one structure: NEUILLE PRIME ESPORT GAMING COMPANY.",
    "aboutTeaser.link": "About NPEGC",
    "stats.players": "Players",
    "stats.coaches": "Coaches",
    "stats.staff": "Staff",
    "contact.title": "Get in touch",
    "contact.line": "Tryouts, partnerships or content: email us or find us on Discord.",
    "roster.title": "Roster",
    "roster.sub": "Who plays what, game by game.",
    "roster.count": "8 players · 1 coach · 2 staff",
    "squad.rl.count": "3 players · 1 coach",
    "squad.lol.count": "5 players · every lane",
    "squad.staff.title": "Staff",
    "squad.staff.count": "Management, media",
    "role.coach": "Coach",
    "role.adc": "ADC",
    "role.support": "Support",
    "role.manager": "Manager",
    "role.media": "Media",
    "role.operations": "Operations",
    "about.title": "About NPEGC",
    "about.sub": "An esports org from France, built around two games.",
    "story.title": "Where NPEGC stands",
    "story.p1": "NEUILLE PRIME is a multigaming esports org based in France. It plays under the tag NP67 and runs as one structure: NEUILLE PRIME ESPORT GAMING COMPANY.",
    "story.p2": "Two games, two rosters. Rocket League is played 3v3 with a coach; League of Legends fields a full five.",
    "story.pull": "One tag. Two games. Built in France.",
    "story.p3": "Behind the players, two staff roles keep things running: management and media. Tryouts, partnerships and content requests all go through the same inbox and Discord.",
    "structure.title": "NPEGC on paper",
    "structure.legal": "Legal name",
    "structure.tag": "Tag",
    "values.title": "What NPEGC plays for",
    "values.1.title": "Show up",
    "values.1.text": "Scrims, reviews and matches start on time, every time.",
    "values.2.title": "Play as one",
    "values.2.text": "Two games, one structure: wins and losses belong to everyone.",
    "values.3.title": "Stay local",
    "values.3.text": "The org was built in France and wants to stay part of its scene.",
    "faq.title": "Tryouts, partners, content",
    "faq.1.q": "How do tryouts work?",
    "faq.1.a": "Tryouts are announced on the NPEGC Discord. Join the server and watch the announcements, or email NPEGC with your game, your role and your rank.",
    "faq.2.q": "Can my brand partner with NPEGC?",
    "faq.2.a": "Every request gets read. Email NPEGC with who you are and what you have in mind, and management will get back to you.",
    "faq.3.q": "Does NPEGC stream or make content?",
    "faq.3.a": "Content goes out on the Twitch, YouTube and social accounts linked at the bottom of this page. For a collab, email NPEGC.",
    "contact.aboutLine": "Email for tryouts, partnerships and press; Discord for everything else.",
    "lost.line": "This page left the lobby.",
    "lost.back": "Back to Home"
  },

  fr: {
    "meta.home.title": "NEUILLE PRIME — esport Rocket League et League of Legends",
    "meta.home.description": "NEUILLE PRIME est une structure esport française avec des équipes Rocket League et League of Legends.",
    "meta.roster.title": "Effectif — NEUILLE PRIME",
    "meta.roster.description": "Joueurs, coachs et staff de NEUILLE PRIME : Rocket League, League of Legends et l’équipe derrière.",
    "meta.about.title": "À propos et contact — NEUILLE PRIME",
    "meta.about.description": "Qui est NEUILLE PRIME, comment la structure est organisée et comment contacter NPEGC pour les tryouts, partenariats et contenus.",
    "meta.404.title": "Page introuvable — NEUILLE PRIME",
    "meta.404.description": "Cette page n’existe pas. Retourne à l’accueil de NEUILLE PRIME.",

    "a11y.skip": "Aller au contenu",
    "nav.label": "Principale",
    "nav.home": "Accueil",
    "nav.roster": "Effectif",
    "nav.about": "À propos",
    "lang.label": "Langue",
    "social.label": "Réseaux de NPEGC",
    "social.discord": "NPEGC sur Discord",
    "social.x": "NPEGC sur X",
    "social.twitch": "NPEGC sur Twitch",
    "social.youtube": "NPEGC sur YouTube",
    "social.instagram": "NPEGC sur Instagram",

    "hero.line": "Rocket League et League of Legends. Depuis la France.",
    "hero.cta": "Voir l’effectif",
    "cta.discord": "Rejoins le Discord",
    "cta.email": "Écrire à NPEGC",
    "org.head": "Fiche structure",
    "org.structure": "Structure",
    "org.games": "Jeux",
    "org.region": "Région",
    "org.regionValue": "France",
    "org.founded": "Création",
    "games.intro": "Deux jeux. Un effectif.",
    "games.rl.line": "Trois joueurs, un coach, du 3v3.",
    "games.lol.line": "Cinq joueurs, toutes les lanes couvertes.",
    "games.link": "Effectif",
    "games.rl.aria": "Effectif Rocket League",
    "games.lol.aria": "Effectif League of Legends",
    "teaser.title": "Qui joue pour NPEGC",
    "teaser.count": "8 joueurs · 2 jeux",
    "teaser.rail": "Aperçu des joueurs, défile horizontalement",
    "teaser.more": "Tout l’effectif",
    "role.player": "Joueur",
    "role.top": "Top",
    "role.jungle": "Jungle",
    "role.mid": "Mid",
    "aboutTeaser.title": "NPEGC en bref",
    "aboutTeaser.body": "NEUILLE PRIME est une structure esport multigaming basée en France, qui joue sous le tag NP67. Elle aligne une équipe Rocket League et une équipe League of Legends ; l’équipe Rocket League a son propre coach. Joueurs, coachs et staff forment une seule structure : NEUILLE PRIME ESPORT GAMING COMPANY.",
    "aboutTeaser.link": "À propos de NPEGC",
    "stats.players": "Joueurs",
    "stats.coaches": "Coachs",
    "stats.staff": "Staff",
    "contact.title": "Parlons-en",
    "contact.line": "Tryouts, partenariats ou contenu : écris-nous ou retrouve-nous sur Discord.",
    "roster.title": "Effectif",
    "roster.sub": "Qui joue quoi, jeu par jeu.",
    "roster.count": "8 joueurs · 1 coach · 2 staff",
    "squad.rl.count": "3 joueurs · 1 coach",
    "squad.lol.count": "5 joueurs · toutes les lanes",
    "squad.staff.title": "Staff",
    "squad.staff.count": "Direction, médias",
    "role.coach": "Coach",
    "role.adc": "ADC",
    "role.support": "Support",
    "role.manager": "Manager",
    "role.media": "Média",
    "role.operations": "Opérations",
    "about.title": "À propos de NPEGC",
    "about.sub": "Une structure esport française, construite autour de deux jeux.",
    "story.title": "Qui est NPEGC",
    "story.p1": "NEUILLE PRIME est une structure esport multigaming basée en France. Elle joue sous le tag NP67 et fonctionne comme une seule structure : NEUILLE PRIME ESPORT GAMING COMPANY.",
    "story.p2": "Deux jeux, deux équipes. Rocket League se joue en 3v3 avec un coach ; League of Legends aligne un cinq complet.",
    "story.pull": "Un tag. Deux jeux. Depuis la France.",
    "story.p3": "Derrière les joueurs, deux rôles de staff font tourner la boutique : direction et médias. Tryouts, partenariats et demandes de contenu passent tous par la même adresse mail et le même Discord.",
    "structure.title": "NPEGC sur le papier",
    "structure.legal": "Raison sociale",
    "structure.tag": "Tag",
    "values.title": "Ce qui compte chez NPEGC",
    "values.1.title": "Être là",
    "values.1.text": "Scrims, reviews et matchs commencent à l’heure, à chaque fois.",
    "values.2.title": "Jouer ensemble",
    "values.2.text": "Deux jeux, une structure : les victoires et les défaites sont à tout le monde.",
    "values.3.title": "Rester local",
    "values.3.text": "La structure est née en France et veut rester ancrée dans sa scène.",
    "faq.title": "Tryouts, partenaires, contenu",
    "faq.1.q": "Comment se passent les tryouts ?",
    "faq.1.a": "Les tryouts sont annoncés sur le Discord de NPEGC. Rejoins le serveur et garde un œil sur les annonces, ou écris à NPEGC avec ton jeu, ton rôle et ton rang.",
    "faq.2.q": "Ta marque peut-elle devenir partenaire de NPEGC ?",
    "faq.2.a": "Chaque demande est lue. Écris à NPEGC en expliquant qui tu es et ce que tu as en tête, la direction te répondra.",
    "faq.3.q": "NPEGC fait du stream ou du contenu ?",
    "faq.3.a": "Le contenu sort sur les comptes Twitch, YouTube et réseaux liés en bas de cette page. Pour une collab, écris à NPEGC.",
    "contact.aboutLine": "Le mail pour les tryouts, les partenariats et la presse ; le Discord pour tout le reste.",
    "lost.line": "Cette page a quitté le lobby.",
    "lost.back": "Retour à l’accueil"
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
