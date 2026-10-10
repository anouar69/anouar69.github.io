/* ============================================================
   A.D.G.B — comportamiento del sitio
   - Pestañas (Inicio / Proyectos / Más) con cortina roja
   - Idiomas ES / EN / 中文 (el español vive en el HTML; el inglés y el chino aquí)
   - Botón de sonido de clics (activable / desactivable)
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

    "nav.home": "Home", "nav.projects": "Projects", "nav.more": "More",

    "hero.eyebrow": "A.D.G.B stands for",
    "hero.l1": "<span class=\"red\">A</span>dvanced", "hero.l2": "<span class=\"red\">D</span>edicated",
    "hero.l3": "<span class=\"red\">G</span>enuine", "hero.l4": "<span class=\"red\">B</span>right",
    "hero.sub": "Hi, I'm A.D.G.B. I'm taking my first steps in programming and I build my own apps so anyone can download and use them.",
    "hero.btn1": "See projects", "hero.btn2": "More",
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

    "mas.eyebrow": "More",
    "mas.title": "My socials",
    "mas.lead": "Find me here. Follow me to see how my projects are coming along and to send me suggestions.",
    "mas.soonlabel": "Coming soon",
    "mas.soon": "More networks",

    "ft.made": "Handmade, one app at a time.",

    "snd.on": "Sound: on",
    "snd.off": "Sound: off"
  };

  /* ---------- Traducciones al chino mandarín (simplificado) ---------- */
  var ZH = {
    "meta.title": "A.D.G.B — 独立开发者 · 可下载使用的应用",
    "meta.desc": "A.D.G.B 是一位刚刚起步的小小程序员。这里是我的项目：Adownloader、Aplayer 和 Asteam。",

    "nav.home": "首页", "nav.projects": "项目", "nav.more": "更多",

    "hero.eyebrow": "A.D.G.B 的含义",
    "hero.l1": "<span class=\"red\">A</span> 先进", "hero.l2": "<span class=\"red\">D</span> 专注",
    "hero.l3": "<span class=\"red\">G</span> 真诚", "hero.l4": "<span class=\"red\">B</span> 闪耀",
    "hero.sub": "你好，我是 A.D.G.B。我正在迈出编程的第一步，并开发自己的应用，让任何人都可以下载和使用。",
    "hero.btn1": "查看项目", "hero.btn2": "更多",
    "hero.meta1": "迈出第一步", "hero.meta2": "3 个项目开发中", "hero.scroll": "向下滑动",

    "about.eyebrow": "01 / 关于我",
    "about.title": "我才刚刚起步，但已经在动手创造。",
    "about.text1": "我是一名小小程序员，刚刚入行。我在实践中学习：每个项目都是让自己进步一点点的机会。",
    "about.text2": "我做的一切都会分享在这里，你可以下载、使用，也可以告诉我你的想法。",
    "rule.title": "一切都从字母 A 开始",
    "rule.text": "我的每个项目都以一个红色的 A 开头，这是我的标志。",

    "build.eyebrow": "02 / 制作中",
    "build.title": "我正在打造的项目",
    "build.lead": "三款应用正在开发中，很快就能下载。",
    "status.dev": "开发中",
    "m1.desc": "下载视频和音乐。",
    "m2.desc": "一款音乐播放器。",
    "m3.desc": "Steam 的辅助工具。",

    "prj.eyebrow": "项目",
    "prj.title": "我的应用",
    "prj.lead": "我创造的一切都在这里。选一款应用，了解它是什么，等它准备好后就可以下载。",

    "p1.kind": "视频与音乐下载器",
    "p1.bio": "Adownloader 是一款可以快速、简单地下载视频和音乐的应用。我开发它，是为了让保存你喜欢的内容变得轻松，没有麻烦，也没有多余的步骤。",
    "p1.f1": "下载视频", "p1.f2": "下载音乐（仅音频）", "p1.f3": "界面简洁直观",

    "p2.kind": "音乐播放器",
    "p2.bio": "Aplayer 是一款音乐播放器，界面简洁、不打扰，让你专心听歌。这是我打造自己想用的应用的方式。",
    "p2.f1": "播放你的音乐", "p2.f2": "简洁的设计", "p2.f3": "专为无干扰聆听而生",

    "p3.kind": "Steam 辅助工具",
    "p3.bio": "Asteam 是 Steam 的辅助工具，旨在为游戏体验增加实用功能。在这个项目中，我会一点一点地学习和改进。",
    "p3.f1": "Steam 辅助工具", "p3.f2": "为玩家而做", "p3.f3": "持续改进",

    "dl.soon": "即将提供下载",
    "dl.go": "下载",
    "dl.note": "仍在开发中，很快就能在这里下载。",

    "mas.eyebrow": "更多",
    "mas.title": "我的社交账号",
    "mas.lead": "你可以在这里找到我。关注我，了解项目进展，也欢迎给我提建议。",
    "mas.soonlabel": "即将推出",
    "mas.soon": "更多平台",

    "ft.made": "手工打造，一次一个应用。",

    "snd.on": "声音：开",
    "snd.off": "声音：关"
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

  // Textos que no están en el HTML (etiquetas del botón de sonido)
  ES["snd.on"] = "Sonido: activado";
  ES["snd.off"] = "Sonido: desactivado";

  var DICTS = { es: ES, en: EN, zh: ZH };
  var currentLang = "es";

  function readStoredLang() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function storeLang(l) { try { localStorage.setItem(STORE_KEY, l); } catch (e) { /* sin almacenamiento */ } }

  function applyLang(lang) {
    currentLang = lang;
    var dict = DICTS[lang] || ES;

    translatable.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });

    d.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    d.title = lang === "es" ? esTitle : dict["meta.title"];
    var desc = lang === "es" ? esDesc : dict["meta.desc"];
    if (metaDesc) metaDesc.setAttribute("content", desc);
    if (ogTitle) ogTitle.setAttribute("content", d.title);
    if (ogDesc) ogDesc.setAttribute("content", desc);

    [].forEach.call(d.querySelectorAll(".lang__btn"), function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    updateSoundUI();
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
  var navLang = (navigator.language || "es").toLowerCase();
  var initial = (saved && Object.prototype.hasOwnProperty.call(DICTS, saved)) ? saved
    : (navLang.indexOf("zh") === 0 ? "zh" : (navLang.indexOf("en") === 0 ? "en" : "es"));
  if (initial !== "es") applyLang(initial);

  /* ---------- Pestañas con cortina roja ---------- */
  var VIEWS = ["inicio", "proyectos", "mas"];
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
    // En el celular: tocar fuera del menú lo cierra
    d.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });
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

  /* ---------- Sonido de clics (se puede activar y desactivar) ---------- */
  var SOUND_KEY = "adgb-sound";
  var soundBtn = d.getElementById("sound");
  var soundOn = false;
  var audioCtx = null;

  try { soundOn = localStorage.getItem(SOUND_KEY) === "1"; } catch (e) { soundOn = false; }

  // Actualiza el aspecto y las etiquetas del botón según el estado y el idioma
  function updateSoundUI() {
    var btn = d.getElementById("sound");
    if (!btn) return;
    var dict = DICTS[currentLang] || ES;
    var label = dict[soundOn ? "snd.on" : "snd.off"] || "";
    btn.classList.toggle("is-on", !!soundOn);
    btn.setAttribute("aria-pressed", soundOn ? "true" : "false");
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function getAudio() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { audioCtx = new AC(); } catch (e) { return null; }
    }
    if (audioCtx.state === "suspended" && audioCtx.resume) audioCtx.resume();
    return audioCtx;
  }

  // Un pitido corto de onda cuadrada (combina con el estilo cuadrado del sitio)
  function blip(type, f0, f1, dur, vol, delay) {
    var ctx = getAudio();
    if (!ctx) return;
    var t = ctx.currentTime + (delay || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  var SFX = {
    tick: function () { blip("square", 880, 620, 0.06, 0.035); },
    nav:  function () { blip("square", 300, 520, 0.07, 0.04); blip("square", 520, 780, 0.08, 0.035, 0.06); },
    on:   function () { blip("square", 520, 520, 0.07, 0.04); blip("square", 780, 780, 0.1, 0.04, 0.08); },
    off:  function () { blip("square", 780, 780, 0.07, 0.04); blip("square", 440, 440, 0.1, 0.04, 0.08); },
    nope: function () { blip("sawtooth", 140, 90, 0.14, 0.035); }
  };

  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      if (soundOn) {
        SFX.off();               // suena antes de apagarse
        soundOn = false;
      } else {
        soundOn = true;
        SFX.on();                // confirma que ya está activado
      }
      try { localStorage.setItem(SOUND_KEY, soundOn ? "1" : "0"); } catch (e) { /* sin almacenamiento */ }
      updateSoundUI();
    });
  }

  // Sonido al apretar cualquier botón o enlace (si el sonido está activado)
  d.addEventListener("click", function (e) {
    if (!soundOn || !e.target || !e.target.closest) return;
    var el = e.target.closest("a, button");
    if (!el || el.id === "sound") return;
    if (el.getAttribute("aria-disabled") === "true") { SFX.nope(); return; }
    if (el.matches(".nav a, .logo, .footer__nav a, .jump a, .mini, .hero__cta a")) SFX.nav();
    else SFX.tick();
  }, true);

  updateSoundUI();

  /* ---------- Año del pie ---------- */
  var year = d.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
