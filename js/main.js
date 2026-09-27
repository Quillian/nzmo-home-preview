/* НЗМО — скрипты шаблона. Без зависимостей. Под Битрикс подключать через Asset::addJs. */
(function () {
  "use strict";

  // Бургер и мега-меню
  var header = document.querySelector(".header");
  var burger = document.querySelector(".burger");
  if (burger) burger.addEventListener("click", function () {
    header.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", header.classList.contains("is-open"));
  });
  document.querySelectorAll(".nav > li.has-mega").forEach(function (li) {
    var btn = li.querySelector("button");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var open = li.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
    li.addEventListener("mouseenter", function () { if (window.innerWidth > 1279) li.classList.add("is-open"); });
    li.addEventListener("mouseleave", function () { if (window.innerWidth > 1279) li.classList.remove("is-open"); });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav")) document.querySelectorAll(".nav > li.is-open").forEach(function (li) { li.classList.remove("is-open"); });
  });

  // Формы: MVP без бэкенда — валидация и переход на /spasibo/.
  // Под Битрикс: заменить на bitrix:form.result.new / CRM-форму Битрикс24, поля name, phone + скрытые page, kind.
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var phone = form.querySelector("[name=phone]");
      var digits = (phone.value || "").replace(/\D/g, "");
      if (digits.length < 10) { phone.setCustomValidity("Введите номер телефона"); phone.reportValidity(); return; }
      phone.setCustomValidity("");
      var q = new URLSearchParams({ k: form.dataset.lead, p: location.pathname });
      try { sessionStorage.setItem("nzmo_lead", JSON.stringify({ kind: form.dataset.lead, page: location.pathname, name: form.name.value, config: (form.querySelector("[name=config]") || {}).value || "" })); } catch (err) {}
      location.href = "/spasibo/?" + q.toString();
    });
    var ph = form.querySelector("[name=phone]");
    if (ph) ph.addEventListener("input", function () { ph.setCustomValidity(""); });
  });

  // Конфигуратор запроса: параметры собираются в скрытое поле config той же формы
  document.querySelectorAll("[data-config]").forEach(function (box) {
    var form = box.parentNode.querySelector("form[data-lead]"), out = box.querySelector("[data-config-out]"), base = out.textContent;
    function upd() {
      var parts = [];
      box.querySelectorAll("select,input").forEach(function (f) { if (f.value) parts.push(f.dataset.label.replace(/,.*$/, "").toLowerCase() + ": " + f.value); });
      var s = parts.join(" · ");
      if (form) form.querySelector("[name=config]").value = s;
      out.textContent = s ? "Ваш запрос: " + s + ". Итоговую стоимость назовём в КП." : base;
    }
    box.addEventListener("change", upd); box.addEventListener("input", upd);
  });

  // Параметры из ссылки «Посчитать похожий объект» → скрытое поле config и строка над кнопкой
  try {
    var cfg = new URLSearchParams(location.search).get("config");
    if (cfg) document.querySelectorAll("form[data-lead]").forEach(function (f) {
      var i = f.querySelector("[name=config]"), e = f.querySelector("[data-config-echo]");
      if (i) i.value = cfg; if (e) { e.textContent = "Считаем " + cfg + "."; e.hidden = false; }
    });
  } catch (err) {}

  // Спасибо: ссылки по типу заявки — первыми в списке «Пока ждёте»
  var tr = document.querySelector("[data-thanks-reco]");
  if (tr) {
    var kind = new URLSearchParams(location.search).get("k") || "quote";
    var map = { quote: [["/servis/montazh/", "Как проходит монтаж"], ["/servis/dostavka-i-oplata/", "Доставка и упаковка"]],
                engineer: [["/proektirovshchikam/uzly-i-albomy/", "Альбомы технических решений"], ["/proektirovshchikam/bim-cad/", "BIM и CAD-модели"]],
                sample: [["/proektirovshchikam/ral-i-perforatsiya/", "Цвета RAL и перфорация"]],
                album: [["/proektirovshchikam/bim-cad/", "BIM и CAD-модели"]],
                partner: [["/partneram/", "Условия для партнёров"]] };
    (map[kind] || []).reverse().forEach(function (l) {
      var a = document.createElement("a"); a.href = l[0]; a.setAttribute("data-reco-link", "thanks"); a.innerHTML = "<span class=\"t\">" + l[1] + "</span>"; tr.insertBefore(a, tr.firstChild);
    });
  }

  // Грильято: вкладки ячеек и высот
  document.querySelectorAll("[data-grill]").forEach(function (g) {
    g.querySelectorAll(".gr-tab").forEach(function (t) {
      t.addEventListener("click", function () {
        g.querySelectorAll(".gr-tab").forEach(function (x) { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t); });
        g.querySelectorAll(".gr-pane").forEach(function (p) { p.classList.toggle("is-hidden", p.dataset.pane !== t.dataset.cell); });
      });
    });
    g.querySelectorAll(".gr-hb").forEach(function (b) {
      b.addEventListener("click", function () {
        g.querySelectorAll(".gr-hb").forEach(function (x) { x.classList.toggle("is-active", x === b); });
        g.querySelectorAll(".gr-view").forEach(function (v) { v.classList.toggle("is-hidden", v.dataset.hv !== b.dataset.h); });
        g.querySelectorAll("[data-hlabel]").forEach(function (l) { l.textContent = b.dataset.h; });
      });
    });
  });

  // Грильято: калькулятор расхода по коэффициентам завода
  document.querySelectorAll("[data-gcalc]").forEach(function (box) {
    var R = JSON.parse(box.dataset.gcalc), rows = box.querySelector("[data-gc-rows]"), cta = box.querySelector("[data-gc-cta]");
    function v(n) { return parseFloat((box.querySelector("[name=" + n + "]").value || "0").replace(",", ".")) || 0; }
    function upd() {
      var s = v("s"), p = v("p"), c = box.querySelector("[name=c]").value, h = box.querySelector("[name=h]").value, z = v("z");
      var r = R[c], sf = s * (1 + z / 100), up = function (x) { return Math.ceil(x - 1e-9); };
      var list = [["Профиль «мама» 0,6 м, h" + h, up(sf * r.mama)], ["Профиль «папа» 0,6 м, h" + h, up(sf * r.papa)],
        ["Несущая 2,4 м", up(sf * r.n24)], ["Поперечная 1,2 м", up(sf * r.n12)], ["Поперечная 0,6 м", up(sf * r.n06)],
        ["Соединитель", up(sf * r.soed)], ["Подвес", up(sf * r.podves)], ["Уголок пристенный 3 м", up(p / 3)]];
      rows.innerHTML = list.filter(function (x) { return x[1] > 0; }).map(function (x) { return "<tr><td>" + x[0] + "</td><td>" + x[1] + " шт</td></tr>"; }).join("")
        + "<tr><td>Модулей 600×600, ориентир</td><td>" + up(sf / 0.36) + " шт</td></tr>";
      cta.href = "/servis/raschet-proekta/?config=" + encodeURIComponent("грильято " + c + "×" + c + ", h" + h + ", площадь " + s + " м², периметр " + p + " м");
    }
    box.addEventListener("input", upd); box.addEventListener("change", upd); upd();
  });

  // Прозрачность реечного потолка: радиус видимости перекрытия = (H − уровень глаз) × зазор / высота рейки
  document.querySelectorAll("[data-transp]").forEach(function (box) {
    var out = box.querySelector("[data-transp-out]"), note = box.querySelector("[data-transp-note]");
    function v(n) { return parseFloat((box.querySelector("[name=" + n + "]").value || "0").replace(",", ".")) || 0; }
    function upd() {
      var h = v("h"), b = v("b"), s = v("s"), e = v("e");
      if (h <= e || b <= 0 || s <= 0) { out.textContent = "—"; note.textContent = "проверьте значения"; return; }
      var r = (h - e) * s / b;
      out.textContent = r.toFixed(2).replace(".", ",") + " м";
      note.textContent = r < 1 ? "перекрытие видно только почти под собой — потолок читается сплошным" : r < 3 ? "дальше потолок читается сплошным полем" : "перекрытие просматривается с большей части помещения — уменьшите зазор или возьмите рейку выше";
    }
    box.addEventListener("input", upd); upd();
  });

  // Видео с Rutube — iframe создаётся по клику, чтобы не грузить плеер заранее
  document.querySelectorAll("[data-video]").forEach(function (v) {
    v.querySelector("[data-video-play]").addEventListener("click", function () {
      var f = document.createElement("iframe"); f.src = v.dataset.video + "?autoplay=1"; f.allow = "autoplay; fullscreen; encrypted-media"; f.setAttribute("allowfullscreen", "");
      v.innerHTML = ""; v.appendChild(f);
    });
  });

  // Файлы cookie: согласие хранится в localStorage 1 год; статистика (Метрика, Roistat) включается только после согласия.
  // Под Битрикс: счётчики вешать на событие nzmo:consent (или проверять window.nzmoConsent при загрузке).
  var ck = document.querySelector("[data-cookie]"), YEAR = 365 * 24 * 3600 * 1000;
  window.nzmoConsent = false;
  try { window.nzmoConsent = Date.now() - (+localStorage.getItem("nzmo-cookie") || 0) < YEAR; } catch (e) {}
  if (ck) {
    if (!window.nzmoConsent) ck.hidden = false;
    ck.querySelector("[data-cookie-ok]").addEventListener("click", function () {
      try { localStorage.setItem("nzmo-cookie", String(Date.now())); } catch (e) {}
      ck.hidden = true; window.nzmoConsent = true;
      document.dispatchEvent(new CustomEvent("nzmo:consent"));
    });
  }

  // Фильтр объектов (по отрасли / продукту / городу)
  var filters = document.querySelector("[data-filters]");
  if (filters) {
    var cards = document.querySelectorAll("[data-case]");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      filters.querySelectorAll("button").forEach(function (x) { x.classList.remove("is-active"); });
      b.classList.add("is-active");
      var key = b.dataset.key, val = b.dataset.val;
      cards.forEach(function (c) {
        var show = !val || (c.dataset[key] || "").split(" ").indexOf(val) >= 0;
        c.style.display = show ? "" : "none";
      });
    });
  }

  // Поиск по search.json
  var sbox = document.querySelector("[data-search]");
  if (sbox) {
    var input = sbox.querySelector("input"), out = document.querySelector("[data-results]"), idx = null;
    function run() {
      var q = input.value.trim().toLowerCase();
      if (!idx || q.length < 2) { out.innerHTML = ""; return; }
      var hits = idx.filter(function (r) { return ((r.t || "") + " " + (r.e || "")).toLowerCase().indexOf(q) >= 0; }).slice(0, 40);
      out.innerHTML = hits.length ? hits.map(function (r) {
        return '<li><div class="k">' + (r.k || "") + '</div><a href="' + r.u + '"><b>' + r.t + "</b></a><div class=\"small muted\">" + (r.e || "") + "</div></li>";
      }).join("") : "<li>Ничего не найдено</li>";
    }
    fetch("/search.json").then(function (r) { return r.json(); }).then(function (d) { idx = d; run(); });
    input.addEventListener("input", run);
    sbox.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    var qs = new URLSearchParams(location.search).get("q"); if (qs) { input.value = qs; }
  }


  // Сцена объектов на главной: переключение слайдов, лента, стрелки
  var stage = document.querySelector("[data-stage]");
  if (stage) {
    var slides = stage.querySelectorAll("[data-slide]"), thumbs = document.querySelectorAll("[data-stage-thumb]"), cur = 0;
    var tEl = stage.querySelector("[data-stage-title]"), fEl = stage.querySelector("[data-stage-family]"), sEl = stage.querySelector("[data-stage-spec]"), cEl = stage.querySelector("[data-stage-count]");
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (sl, k) { sl.hidden = k !== cur; if (k === cur) sl.querySelectorAll("img").forEach(function (im) { im.removeAttribute("loading"); }); });
      thumbs.forEach(function (t, k) { t.classList.toggle("is-active", k === cur); });
      var t = thumbs[cur];
      if (t) { tEl.textContent = t.dataset.title; tEl.href = t.getAttribute("href"); fEl.textContent = t.dataset.family; sEl.textContent = t.dataset.spec; }
      cEl.textContent = pad(cur + 1) + " / " + pad(slides.length);
    }
    stage.querySelector("[data-stage-prev]").addEventListener("click", function () { go(cur - 1); });
    stage.querySelector("[data-stage-next]").addEventListener("click", function () { go(cur + 1); });
    thumbs.forEach(function (t, k) { t.addEventListener("click", function (e) { e.preventDefault(); go(k); }); });
  }

  // Спасибо: показать, откуда пришла заявка
  var thanks = document.querySelector("[data-thanks]");
  if (thanks) {
    try {
      var d = JSON.parse(sessionStorage.getItem("nzmo_lead") || "null");
      if (d && d.name) thanks.textContent = d.name + ", спасибо! Менеджер перезвонит в течение рабочего дня.";
    } catch (err) {}
  }
})();
