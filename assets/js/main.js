/* HpClean — interactions du site (aucune dépendance) */
(function () {
  "use strict";

  var CONTACT_EMAIL = "hpclean.nettoyages@gmail.com";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- En-tête : bordure au défilement ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 881px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Comparateur avant / après ---------- */
  document.querySelectorAll("[data-compare]").forEach(function (el) {
    var range = el.querySelector("input[type=range]");
    if (!range) return;
    function set(v) {
      el.style.setProperty("--pos", v + "%");
      range.setAttribute("aria-valuetext", Math.round(v) + " % avant, " + Math.round(100 - v) + " % après");
    }
    range.addEventListener("input", function () { set(range.value); });
    set(range.value);

    // Un seul balayage au chargement pour montrer que l'image se manipule.
    if (!reduceMotion && "IntersectionObserver" in window) {
      var played = false;
      var io = new IntersectionObserver(function (entries) {
        if (played || !entries[0].isIntersecting) return;
        played = true; io.disconnect();
        var start = null, from = 50;
        function frame(t) {
          if (!start) start = t;
          var p = Math.min((t - start) / 1800, 1);
          // aller vers 78 %, retour à 50 %
          var v = from + Math.sin(p * Math.PI) * 28;
          range.value = v; set(v);
          if (p < 1 && !el.dataset.touched) requestAnimationFrame(frame);
        }
        setTimeout(function () { requestAnimationFrame(frame); }, 600);
      }, { threshold: 0.5 });
      io.observe(el);
      range.addEventListener("pointerdown", function () { el.dataset.touched = "1"; });
    }
  });

  /* ---------- Formulaire de devis ----------
     Sans serveur, la demande s'ouvre dans la messagerie du visiteur, pré-remplie.
     Pour recevoir les demandes directement, voir le README (Formspree / Web3Forms). */
  document.querySelectorAll("form[data-quote-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");

    // Pré-sélection de la prestation via ?prestation=textile
    var params = new URLSearchParams(window.location.search);
    var preset = params.get("prestation");
    var select = form.querySelector("select[name=prestation]");
    if (preset && select) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.value === preset) select.value = preset;
      });
    }

    function show(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status is-visible " + (ok ? "ok" : "err");
    }

    form.addEventListener("submit", function (e) {
      // Si une adresse d'envoi (Formspree…) est configurée, laisser le navigateur envoyer.
      if (form.getAttribute("action")) return;
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        show("Il manque une information : vérifiez les champs signalés.", false);
        return;
      }
      var d = new FormData(form);
      var label = select ? select.options[select.selectedIndex].text : "";
      var body = [
        "Bonjour,",
        "",
        "Je souhaite un devis pour : " + label,
        "Ville : " + (d.get("ville") || "—"),
        "",
        (d.get("message") || "").trim(),
        "",
        "Nom : " + d.get("nom"),
        "Téléphone : " + d.get("telephone"),
        d.get("email") ? "E-mail : " + d.get("email") : ""
      ].join("\n");

      var href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Demande de devis — " + label) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      show("Votre messagerie s'ouvre avec la demande pré-remplie. Si rien ne se passe, appelez le 06 81 54 67 30 ou écrivez à " + CONTACT_EMAIL + ".", true);
    });
  });

  /* ---------- Année du pied de page ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
