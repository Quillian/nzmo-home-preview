/* Лендинг «Чистые помещения»: подмена заголовка под объявление, квиз, цели Метрики.
   Отправку формы, маску телефона и cookie-баннер делает общий main.js (подключён после этого файла). */
(function () {
  var body = document.body;

  // 1. Подмена заголовка: ?seg=med|lab|pharma|food|gml|sandwich|clipin|proekt — ключи в content/lp_kchp.yaml → segments
  try {
    var segs = JSON.parse(document.getElementById("lp-seg").textContent);
    var key = new URLSearchParams(location.search).get("seg");
    if (key && segs[key]) {
      document.querySelector("[data-seg-h1]").textContent = segs[key][0];
      document.querySelector("[data-seg-lead]").textContent = segs[key][1];
    }
  } catch (e) {}

  // 2. Метрика и Roistat — только после согласия на cookie (как на всём сайте, 152-ФЗ)
  var MID = +body.dataset.metrika || 0, queue = [];
  function goal(name) { if (window.ym && MID) window.ym(MID, "reachGoal", name); else queue.push(name); }
  function startCounters() {
    if (MID && !window.ym) {
      (function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); }; m[i].l = 1 * new Date();
        k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a); })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      window.ym(MID, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
      queue.splice(0).forEach(goal);
    }
    var RID = body.dataset.roistat;
    if (RID && !window.roistat) {
      (function (w, d, s, h) { w.roistatProjectId = RID; w.roistatHost = h; var p = d.location.protocol == "https:" ? "https://" : "http://";
        var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/" + RID + "/init?referrer=" + encodeURIComponent(d.location.href);
        var js = d.createElement(s); js.charset = "UTF-8"; js.async = 1; js.src = p + h + u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2); })
        (window, document, "script", "cloud.roistat.com");
    }
  }
  if (window.nzmoConsent) startCounters();
  document.addEventListener("nzmo:consent", startCounters);
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-goal]");
    if (a) goal(a.dataset.goal);
  });

  // Портфолио: кадр на весь экран по клику
  document.addEventListener("click", function (e) {
    var z = e.target.closest("[data-zoom]");
    if (!z || !z.dataset.zoom) return;
    var d = document.createElement("dialog");
    d.className = "lp-zoom";
    d.innerHTML = '<img alt=""><p></p><button type="button" aria-label="Закрыть">×</button>';
    d.querySelector("img").src = z.dataset.zoom;
    d.querySelector("img").alt = z.dataset.cap || "";
    d.querySelector("p").textContent = z.dataset.cap || "";
    d.addEventListener("click", function (ev) { if (ev.target === d || ev.target.tagName === "BUTTON") d.close(); });
    d.addEventListener("close", function () { d.remove(); });
    document.body.appendChild(d);
    d.showModal();
  });

  // 3. Квиз: один клик по ответу — следующий вопрос. Ответы собираем в скрытое поле config
  var quiz = document.querySelector("[data-quiz]");
  if (!quiz) return;
  var form = quiz.querySelector("form"), steps = [].slice.call(quiz.querySelectorAll(".lp-step")),
      bar = quiz.querySelector("[data-quiz-bar]"), sum = quiz.querySelector("[data-quiz-sum]"), cur = 0, started = false;

  function answers() {
    return [].slice.call(form.querySelectorAll("input[type=radio]:checked")).map(function (r) { return [r.dataset.label, r.value]; });
  }
  function show(i) {
    cur = Math.max(0, Math.min(i, steps.length - 1));
    steps.forEach(function (s, k) { s.hidden = k !== cur; });
    bar.style.width = Math.round((cur + 1) / steps.length * 100) + "%";
    if (cur === steps.length - 1) {
      var a = answers();
      sum.textContent = a.map(function (x) { return x[1]; }).join(" · ");
      form.querySelector("[name=config]").value = a.map(function (x) { return x[0] + " " + x[1]; }).join(" | ");
      var nm = form.querySelector("[name=name]");
      if (nm && window.matchMedia("(min-width:821px)").matches) nm.focus({ preventScroll: true });
    }
  }
  form.addEventListener("change", function (e) {
    if (e.target.type !== "radio") return;
    if (!started) { started = true; goal("kchp_quiz_start"); }
    setTimeout(function () { show(cur + 1); }, 180);
  });
  quiz.addEventListener("click", function (e) {
    if (e.target.closest("[data-quiz-back]")) show(cur - 1);
  });

  // Кнопки «Посчитать этот вариант» и «Заказать раздел АР.КЧП» сразу отмечают ответ на вопрос «Что нужно от нас?»
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-scope]");
    if (!a) return;
    var r = form.querySelector('input[name=scope][value="' + a.dataset.scope + '"]');
    if (r) { r.checked = true; if (cur === 2) show(3); }
  });

  // Цель «заявка» — только если форма пройдёт проверку main.js: телефон полностью и галочка согласия
  document.querySelectorAll("form[data-lead=kchp]").forEach(function (f) {
    f.addEventListener("submit", function () {
      var d = (f.querySelector("[name=phone]").value || "").replace(/\D/g, "");
      var ok = d.length >= 11 && f.querySelector("[name=agree]").checked;
      if (ok) goal("kchp_lead");
    });
  });

  // Плавающая кнопка на телефоне прячется, когда форма и так на экране
  var fab = document.querySelector("[data-fab]");
  if (fab && "IntersectionObserver" in window) {
    var seen = new Map(), io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { seen.set(x.target, x.isIntersecting); });
      var any = false; seen.forEach(function (v) { any = any || v; });
      fab.classList.toggle("is-hidden", any);
    });
    io.observe(quiz); io.observe(document.getElementById("zayavka"));
  }
})();
