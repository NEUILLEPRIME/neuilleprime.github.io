/* NEUILLE PRIME — main.js
   Footer year + scroll reveal. Nothing else. Content is visible by default;
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
