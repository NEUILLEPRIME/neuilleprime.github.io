/* NEUILLE PRIME — main.js
   Footer year + scroll reveal; News page helpers at the bottom. Content is visible by default;
   the hidden state only exists under <html class="js"> (see style.css §8). */
(function () {
  var years = document.querySelectorAll("[data-year]");
  for (var i = 0; i < years.length; i++) years[i].textContent = String(new Date().getFullYear());

  var items = document.querySelectorAll(".reveal");

  function showAll() {
    for (var j = 0; j < items.length; j++) items[j].classList.add("is-visible");
  }

  try {
    if (!("IntersectionObserver" in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          entries[k].target.classList.add("is-visible");
          io.unobserve(entries[k].target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    for (var m = 0; m < items.length; m++) io.observe(items[m]);
  } catch (e) {
    showAll();
  }
})();

/* News page: localised dates, "Older posts", click-to-load YouTube. Everything
   works without JS: dates stay in English, all posts show, videos link out. */
(function () {
  var times = document.querySelectorAll("time.post__time[datetime]");
  function formatDates() {
    var fr = document.documentElement.lang === "fr";
    var fmt;
    try { fmt = new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); } catch (e) { return; }
    for (var i = 0; i < times.length; i++) {
      var d = new Date(times[i].getAttribute("datetime") + "T00:00:00Z");
      if (!isNaN(d)) times[i].textContent = fmt.format(d);
    }
  }
  if (times.length) { formatDates(); document.addEventListener("np67:lang", formatDates); }

  var list = document.querySelector("[data-feed]");
  var more = document.querySelector("[data-feed-more]");
  var LIMIT = 10;
  if (list && more) {
    var posts = list.children;
    var showAll = function () {
      for (var j = LIMIT; j < posts.length; j++) posts[j].hidden = false;
      more.hidden = true;
    };
    if (posts.length > LIMIT) {
      for (var k = LIMIT; k < posts.length; k++) posts[k].hidden = true;
      more.hidden = false;
      more.addEventListener("click", function () {
        showAll();
        var first = posts[LIMIT] && posts[LIMIT].querySelector(".post__title");
        if (first) { first.setAttribute("tabindex", "-1"); first.focus(); }
      });
      var target = location.hash && document.getElementById(location.hash.slice(1));
      if (target && target.closest("[hidden]")) { showAll(); target.scrollIntoView(); }
    }
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest(".video__link") : null;
    if (!link) return;
    var box = link.parentNode;
    var id = box.getAttribute("data-video");
    if (!id || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    var title = document.getElementById(link.getAttribute("aria-describedby"));
    var frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    frame.title = title ? title.textContent : "YouTube";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.setAttribute("allowfullscreen", "");
    box.innerHTML = "";
    box.appendChild(frame);
    frame.focus();
  });
})();
