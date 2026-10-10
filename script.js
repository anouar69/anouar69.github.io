/* ============================================================
   A.D.G.B — comportamiento del sitio
   - Pestañas (Inicio / Proyectos / Contacto) con cortina roja
   - Idiomas ES / EN (el español vive en el HTML, el inglés aquí)
   - Pantalla de carga, revelado al hacer scroll, cursor luminoso
   ============================================================ */

(function () {
  "use strict";

  var d = document;
  var body = d.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Traducciones al inglés ---------- */
  var EN = {
    "meta.title": "A.D.G.B — Independent developer · Apps to download and use",
    "meta.desc": "A.D.G.B is a small-time developer just getting started. Here you'll find my projects: Adownloader, Aplayer and Asteam.",

    "nav.home": "Home", "nav.projects": "Projects", "nav.contact": "Contact",

    "hero.eyebrow": "Independent developer",
    "hero.l1": "I'm a small", "hero.l2": "developer", "hero.l3": "just starting out.",
    "hero.sub": "Hi, I'm A.D.G.B. I'm taking my first steps in programming and I build my own apps so anyone can download and use them.",
    "hero.btn1": "See projects", "hero.btn2": "Contact",
    "hero.meta1": "First steps", "hero.meta2": "3 projects in development", "hero.scroll": "Scroll",

    "about.eyebrow": "01 / About me",
    "about.title": "I'm just starting, but I'm already building.",
    "about.text1": "I'm a small developer and I'm just getting started. I learn by building: every project is a chance to get a little better.",
    "about.text2": "Everything I make I share here so you can download it, use it and, if you want, tell me what you think.",
    "rule.title": "Everything starts with an A",
    "rule.text": "Every one of my projects begins with a red A. It's my signature.",

    "build.eyebrow": "02 / Under construction",
    "build.title": "What I'm building",
    "build.lead": "Three apps in development. Soon you'll be able to download them.",
    "status.dev": "In development",
    "m1.desc": "Download videos and music.",
    "m2.desc": "A player for your music.",
    "m3.desc": "An add-on for Steam.",

    "prj.eyebrow": "Projects",
    "prj.title": "My apps",
    "prj.lead": "Everything I build lives here. Pick an app, read what it's about and download it when it's ready.",

    "p1.kind": "Video and music downloader",
    "p1.bio": "Adownloader is an app for downloading videos and music quickly and easily. I'm building it so saving what you like is simple, with no hassle and no extra steps.",
    "p1.f1": "Download videos", "p1.f2": "Download music (audio only)", "p1.f3": "Simple, straightforward interface",

    "p2.kind": "Music player",
    "p2.bio": "Aplayer is a music player made for listening to your songs with a clean, distraction-free interface. It's my way of building the app I'd want to use.",
    "p2.f1": "Plays your music", "p2.f2": "Clean design", "p2.f3": "Made for listening without distractions",

    "p3.kind": "Add-on for Steam",
    "p3.bio": "Asteam is an add-on for Steam, made to add useful features to the gaming experience. It's a project where I keep learning and improving little by little.",
    "p3.f1": "Add-on for Steam", "p3.f2": "Made for gamers", "p3.f3": "Constantly improving",

    "dl.soon": "Download coming soon",
    "dl.go": "Download",
    "dl.note": "Still in development. You'll be able to download it here soon.",

    "con.eyebrow": "Contact",
    "con.title": "Let's talk",
    "con.lead": "Got an idea, found a bug, or want to give me feedback? Write to me, it helps me improve.",
    "con.mail": "Email",

    "ft.made": "Handmade, one app at a time."
  };

  var STORE_KEY = "adgb-lang";
  var translatable = [].slice.call(d.querySelectorAll("[data-i18n]"));
  var metaDesc = d.querySelector('meta[name="description"]');
  var ogTitle = d.querySelector('meta[property="og:title"]');
  var ogDesc = d.querySelector('meta[property="og:description"]');

  // El español original se guarda desde el HTML
  var ES = {};
  var esTitle = d.title;
  var esDesc = metaDesc ? metaDesc.getAttribute("content") : "";
  translatable.forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in ES)) ES[k] = el.innerHTML;
  });

  var currentLang = "es";

  function readStoredLang() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function storeLang(l) { try { localStorage.setItem(STORE_KEY, l); } catch (e) { /* sin almacenamiento */ } }

  function applyLang(lang) {
    currentLang = lang;
    var dict = lang === "en" ? EN : ES;

    translatable.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });

    d.documentElement.lang = lang;
    d.title = lang === "en" ? EN["meta.title"] : esTitle;
    var desc = lang === "en" ? EN["meta.desc"] : esDesc;
    if (metaDesc) metaDesc.setAttribute("content", desc);
    if (ogTitle) ogTitle.setAttribute("content", d.title);
    if (ogDesc) ogDesc.setAttribute("content", desc);

    [].forEach.call(d.querySelectorAll(".lang__btn"), function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (lang === currentLang) return;
    storeLang(lang);
    if (reduceMotion) { applyLang(lang); return; }
    body.classList.add("lang-switching");
    setTimeout(function () {
      applyLang(lang);
      body.classList.remove("lang-switching");
    }, 260);
  }

  [].forEach.call(d.querySelectorAll(".lang__btn"), function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  var saved = readStoredLang();
  var initial = saved || ((navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es");
  if (initial === "en") applyLang("en");

  /* ---------- Pestañas con cortina roja ---------- */
  var VIEWS = ["inicio", "proyectos", "contacto"];
  var PROJECTS = ["adownloader", "aplayer", "asteam"];
  var viewEls = {};
  VIEWS.forEach(function (v) { viewEls[v] = d.getElementById("view-" + v); });
  var wipe = d.getElementById("wipe");
  var navLinks = [].slice.call(d.querySelectorAll(".nav a"));

  var current = null;
  var busy = false;
  var pending = null;

  function parseHash() {
    var h = "";
    try { h = decodeURIComponent((location.hash || "").replace(/^#/, "")).toLowerCase(); } catch (e) { h = ""; }
    if (PROJECTS.indexOf(h) > -1) return { view: "proyectos", anchor: h };
    if (VIEWS.indexOf(h) > -1) return { view: h, anchor: null };
    return { view: "inicio", anchor: null };
  }

  function setActiveNav(view) {
    navLinks.forEach(function (a) {
      var on = a.getAttribute("data-view") === view;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  function jumpTop() {
    var root = d.documentElement;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = "";
  }

  function scrollToAnchor(anchor) {
    if (anchor) {
      var el = d.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  function showView(view) {
    VIEWS.forEach(function (v) { viewEls[v].hidden = (v !== view); });
    current = view;
  }

  function swap(t) {
    showView(t.view);
    jumpTop();
    if (t.anchor) setTimeout(function () { scrollToAnchor(t.anchor); }, 140);
  }

  function go(t, first) {
    setActiveNav(t.view);

    if (first) {
      showView(t.view);
      if (t.anchor) setTimeout(function () { scrollToAnchor(t.anchor); }, 60);
      return;
    }
    if (t.view === current) { scrollToAnchor(t.anchor); return; }
    if (busy) { pending = t; return; }

    busy = true;
    if (reduceMotion || !wipe.animate) { swap(t); busy = false; return; }

    wipe.style.display = "flex";
    var inAnim = wipe.animate(
      [{ transform: "translateX(-101%)" }, { transform: "translateX(0)" }],
      { duration: 420, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" }
    );
    inAnim.onfinish = function () {
      swap(t);
      var outAnim = wipe.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(101%)" }],
        { duration: 480, delay: 90, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" }
      );
      outAnim.onfinish = function () {
        inAnim.cancel();
        outAnim.cancel();
        wipe.style.display = "none";
        busy = false;
        if (pending) { var p = pending; pending = null; go(p); }
      };
    };
  }

  window.addEventListener("hashchange", function () { go(parseHash()); });

  // Clic en la pestaña en la que ya estás: sube al inicio de la página
  [].forEach.call(d.querySelectorAll(".nav a, .logo"), function (a) {
    a.addEventListener("click", function () {
      var t = parseHash();
      var href = (a.getAttribute("href") || "").replace("#", "");
      if (href === t.view && t.view === current && !t.anchor) scrollToAnchor(null);
    });
  });

  go(parseHash(), true);

  // Botones de descarga todavía desactivados
  [].forEach.call(d.querySelectorAll('a[aria-disabled="true"]'), function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  /* ---------- Pantalla de carga ---------- */
  var loader = d.getElementById("loader");
  var revealed = false;

  function finishLoading() {
    if (revealed) return;
    revealed = true;
    if (loader) loader.classList.add("is-done");
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
  }

  body.classList.add("is-loading");
  var minWait = new Promise(function (res) { setTimeout(res, reduceMotion ? 0 : 1300); });
  var pageLoaded = new Promise(function (res) {
    if (d.readyState === "complete") res(); else window.addEventListener("load", res);
  });
  Promise.all([minWait, pageLoaded]).then(finishLoading);
  setTimeout(finishLoading, 3500); // por si algo tarda de más

  /* ---------- Cabecera y barra de progreso ---------- */
  var header = d.getElementById("header");
  var progress = d.getElementById("progress");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      var max = d.documentElement.scrollHeight - window.innerHeight;
      if (header) header.classList.toggle("is-scrolled", y > 30);
      if (progress) progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Revelado al hacer scroll ---------- */
  var revealEls = [].slice.call(d.querySelectorAll("[data-reveal]"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Menú móvil ---------- */
  var burger = d.getElementById("burger");
  var nav = d.getElementById("nav");

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.forEach(function (a) { a.addEventListener("click", closeMenu); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Cursor luminoso y parallax del ascua ---------- */
  var glow = d.getElementById("cursorGlow");
  var ember = d.getElementById("ember");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (finePointer && !reduceMotion) {
    var tx = 0, ty = 0, cx = 0, cy = 0, moving = false;

    var follow = function () {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (glow) glow.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) requestAnimationFrame(follow);
      else moving = false;
    };

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (glow) glow.classList.add("is-on");
      if (ember) {
        ember.style.setProperty("--mx", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        ember.style.setProperty("--my", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      }
      if (!moving) { moving = true; requestAnimationFrame(follow); }
    });
    d.addEventListener("mouseleave", function () { if (glow) glow.classList.remove("is-on"); });
  }

  /* ---------- Año del pie ---------- */
  var year = d.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
