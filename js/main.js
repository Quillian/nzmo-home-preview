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
    var btn = li.querySelector("button"), timer = null, pinned = false;
    var desk = function () { return window.innerWidth > 1279; };
    // знак на кнопке: три рейки логотипа складываются в три линии меню и обратно
    var REST = [[0,525,0,295,399,0,399,230],[332,525,332,295,731,0,731,230],[664,525,664,295,1063,0,1063,230]];
    var LINE = [[60,130,60,20,1003,20,1003,130],[60,317,60,207,1003,207,1003,317],[60,504,60,394,1003,394,1003,504]];
    var polys = li.querySelectorAll(".nav__mark polygon"), p = 0, goal = 0, raf = 0;
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paint() {
      polys.forEach(function (pg, i) {
        var t = Math.min(1, Math.max(0, (p - i * 0.12) / 0.76));
        t = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        pg.setAttribute("points", REST[i].map(function (v, j) { return Math.round(v + (LINE[i][j] - v) * t); }).join(" "));
      });
    }
    function tick() {
      p += (goal > p ? 1 : -1) * 16 / 420;
      if ((goal - p) * (goal ? 1 : -1) <= 0) p = goal;
      paint();
      raf = p !== goal ? requestAnimationFrame(tick) : 0;
    }
    function morph(on) {
      goal = on ? 1 : 0;
      if (still) { p = goal; paint(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function set(open) {
      clearTimeout(timer);
      if (!open) pinned = false;
      li.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
      morph(open);
    }
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (pinned) { set(false); return; }
      pinned = true; set(true);
    });
    li.addEventListener("mouseenter", function () { if (desk()) set(true); });
    li.addEventListener("mouseleave", function () {
      if (desk() && !pinned) timer = setTimeout(function () { set(false); }, 600);
    });
    document.addEventListener("click", function (e) { if (!li.contains(e.target)) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && li.classList.contains("is-open")) { set(false); btn.focus(); } });
  });

  // Формы: MVP без бэкенда — валидация и переход на /spasibo/.
  // Под Битрикс: заменить на bitrix:form.result.new / CRM-форму Битрикс24, поля name, phone + скрытые page, kind.
  // Телефон: маска +7 (XXX) XXX-XX-XX прямо при вводе. Ведущие 8 / 7 / +7 → +7, с 9 и других цифр +7 подставляется сам,
  // вставка номера в любом виде приводится к тому же формату. В значении — 10 цифр после +7.
  function phoneDigits(v) {
    var d = String(v || "").replace(/\D/g, "");
    if (d.length > 10 || (d.length && /^[78]/.test(d) && !/^\+?7\s?\(/.test(v))) d = d.replace(/^[78]/, "");
    return d.slice(0, 10);
  }
  function phoneFormat(d) {
    if (!d) return "";
    var s = "+7 (" + d.slice(0, 3);
    if (d.length > 3) s += ") " + d.slice(3, 6);
    if (d.length > 6) s += "-" + d.slice(6, 8);
    if (d.length > 8) s += "-" + d.slice(8, 10);
    return s;
  }
  document.querySelectorAll("input[name=phone]").forEach(function (el) {
    var prev = "", lead = true;   // lead — ещё не введена первая цифра: 7 или 8 в начале номера означают +7 и отбрасываются один раз
    el.addEventListener("input", function (e) {
      var raw = el.value, del = e.inputType && e.inputType.indexOf("delete") === 0, d;
      if (/^\+7 \(/.test(raw)) {
        d = raw.slice(2).replace(/\D/g, "");
        if (d.length > 10 && /^[78]/.test(d)) d = d.slice(1);                    // вставили «8 913…» после «+7 (»
        else if (lead && !del && /^[78]/.test(d) && d.length === 1) d = "";       // первой цифрой набрали 7 или 8
        d = d.slice(0, 10);
      } else d = phoneDigits(raw);
      if (del && d === phoneDigits(prev) && d.length) d = d.slice(0, -1);         // стёрли скобку или дефис — стираем цифру
      if (!del) lead = false;
      if (del && !d) lead = true;
      el.value = d ? phoneFormat(d) : (document.activeElement === el ? "+7 (" : "");
      prev = el.value;
    });
    el.addEventListener("focus", function () { if (!el.value) { el.value = "+7 ("; prev = el.value; lead = true; } });
    el.addEventListener("blur", function () { if (el.value === "+7 (") el.value = ""; });
  });
  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var phone = form.querySelector("[name=phone]");
      var digits = phoneDigits(phone.value);
      if (digits.length < 10) { phone.setCustomValidity("Введите номер полностью: +7 и 10 цифр"); phone.reportValidity(); return; }
      phone.value = phoneFormat(digits);
      phone.setCustomValidity("");
      var agree = form.querySelector("[name=agree]");   // согласие на обработку ПДн — отдельной галочкой (152-ФЗ ст. 9)
      if (agree && !agree.checked) { agree.setCustomValidity("Отметьте согласие на обработку персональных данных, пожалуйста"); agree.reportValidity(); return; }
      var q = new URLSearchParams({ k: form.dataset.lead, p: location.pathname });
      try { sessionStorage.setItem("nzmo_lead", JSON.stringify({ kind: form.dataset.lead, page: location.pathname, name: form.name.value, config: (form.querySelector("[name=config]") || {}).value || "" })); } catch (err) {}
      location.href = (form.dataset.thanksUrl || "/spasibo/") + "?" + q.toString();   // data-thanks-url — своя страница «Спасибо» у лендингов
    });
    var ph = form.querySelector("[name=phone]");
    if (ph) ph.addEventListener("input", function () { ph.setCustomValidity(""); });
    var ag = form.querySelector("[name=agree]");
    if (ag) ag.addEventListener("change", function () { ag.setCustomValidity(""); });
  });

  // Конфигуратор запроса: параметры собираются в скрытое поле config той же формы
  document.querySelectorAll("[data-config]").forEach(function (box) {
    var form = box.parentNode.querySelector("form[data-lead]"), out = box.querySelector("[data-config-out]"), base = out.textContent;
    function upd() {
      var parts = [];
      box.querySelectorAll("select,input").forEach(function (f) { if (f.value) parts.push(f.dataset.label.replace(/,.*$/, "").toLowerCase() + ": " + f.value); });
      var s = parts.join(" · ");
      if (form) form.querySelector("[name=config]").value = s;
      out.textContent = s ? "Ваш запрос: " + s + ". " + base : base;
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

  // Кнопка с data-cta-cfg (например, «Запросить сертификаты»): текст запроса уходит в форму заявки внизу страницы
  document.querySelectorAll("[data-cta-cfg]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var form = document.querySelector("#cta form[data-lead]"); if (!form) return;
      e.preventDefault();
      var i = form.querySelector("[name=config]"), ec = form.querySelector("[data-config-echo]");
      if (i) i.value = a.dataset.ctaCfg; if (ec) { ec.textContent = "Запрос: " + a.dataset.ctaCfg.toLowerCase() + "."; ec.hidden = false; }
      var c = document.getElementById("cta"); c.scrollIntoView({ behavior: "smooth" });
      var n = c.querySelector("[name=name]"); if (n) setTimeout(function () { n.focus({ preventScroll: true }); }, 500);
    });
  });

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

  // Калькуляторы комплектующих: строки [позиция, шт, кг за шт, м³ за шт] → таблица с итогом
  function calcTable(rows, list) {
    var f = function (x, d) { return x ? x.toFixed(d).replace(".", ",") : "—"; }, W = 0, V = 0, N = 0;
    rows.innerHTML = list.filter(function (x) { return x[1] > 0; }).map(function (x) {
      var w = x[1] * (x[2] || 0), v = x[1] * (x[3] || 0); W += w; V += v; N += x[1];
      return "<tr><td>" + x[0] + "</td><td>" + x[1] + "</td><td>" + f(w, 1) + "</td><td>" + f(v, 3) + "</td></tr>";
    }).join("") + "<tr class=\"gc-total\"><td>Итого</td><td>" + N + "</td><td>" + f(W, 1) + "</td><td>" + f(V, 3) + "</td></tr>";
  }
  function calcNum(box, n) { return parseFloat((box.querySelector("[name=" + n + "]").value || "0").replace(",", ".")) || 0; }
  var up = function (x) { return Math.ceil(x - 1e-9); };

  // Грильято: расход по коэффициентам заводского калькулятора «Т24_грильято от 07.04.26», оформление как у калькулятора рейки
  document.querySelectorAll("[data-gcalc]").forEach(function (box) {
    var R = JSON.parse(box.dataset.gcalc), cta = box.querySelector("[data-gc-cta]");
    function q(sel) { return box.querySelector(sel); }
    function f(x) { return Math.round(x).toLocaleString("ru-RU"); }
    function viz(c, h) {   // план модуля 600 × 600 с ячейкой и профиль в разрезе, размеры охрой — как у рейки
      var S = 132, x0 = 70, y0 = 14, k = S / 600, n = Math.round(600 / c), o = '<path class="rc-rl" d="M' + x0 + ' ' + y0 + 'h' + S + 'v' + S + 'h-' + S + 'z';
      for (var i = 1; i < n; i++) o += 'M' + (x0 + i * c * k) + ' ' + y0 + 'v' + S + 'M' + x0 + ' ' + (y0 + i * c * k) + 'h' + S;
      o += '"/>';
      var yd = y0 + S + 16, xc = x0 + c * k;
      o += '<g class="rc-dim"><path d="M' + x0 + ' ' + yd + 'H' + (x0 + S) + 'M' + x0 + ' ' + (yd - 5) + 'v10M' + (x0 + S) + ' ' + (yd - 5) + 'v10M' + (x0 - 14) + ' ' + y0 + 'v' + (c * k) + 'M' + (x0 - 19) + ' ' + y0 + 'h10M' + (x0 - 19) + ' ' + (y0 + c * k) + 'h10"/>' +
        '<text x="' + (x0 + S / 2) + '" y="' + (yd + 16) + '">600</text><text x="' + (x0 - 22) + '" y="' + (y0 + c * k / 2 + 4) + '" text-anchor="end">' + c + '</text></g>';
      var H = h * 2.6, px = 340, py = 90 - H / 2;   // профиль «мама»: полка 10 мм, высота h
      o += '<rect class="rc-st" x="' + px + '" y="' + py + '" width="' + (10 * 2.6) + '" height="' + H + '"/>' +
        '<g class="rc-dim"><path d="M' + (px + 44) + ' ' + py + 'v' + H + 'M' + (px + 39) + ' ' + py + 'h10M' + (px + 39) + ' ' + (py + H) + 'h10M' + px + ' ' + (py + H + 14) + 'h' + (10 * 2.6) + '"/>' +
        '<text x="' + (px + 54) + '" y="' + (py + H / 2 + 5) + '" text-anchor="start">h ' + h + '</text><text x="' + (px + 13) + '" y="' + (py + H + 30) + '">10</text></g>';
      q("[data-gc-viz]").innerHTML = o;
    }
    function upd() {
      var s = calcNum(box, "s"), p = calcNum(box, "p"), c = q("[name=c]").value, h = q("[name=h]").value, z = calcNum(box, "z");
      var r = R[c], sf = s * (1 + z / 100);
      q("[data-gc-area]").textContent = f(s); viz(+c, +h);
      if (!(s > 0)) { q("[data-gc-mod]").textContent = "—"; return; }
      var P = [["Профиль «мама» 0,6 м", up(sf * r.mama), 0.04665], ["Профиль «папа» 0,6 м", up(sf * r.papa), 0.04665], ["Несущая 2,4 м", up(sf * r.n24), 0.23328],
               ["Поперечная 1,2 м", up(sf * r.n12), 0.11664], ["Поперечная 0,6 м", up(sf * r.n06), 0.04665], ["Соединитель несущих", up(sf * r.soed), 0],
               ["Уголок пристенный 3 м", up(p / 3), 0.168]];
      var kg = P.reduce(function (a, x) { return a + x[1] * x[2]; }, 0);
      q("[data-gc-mod]").textContent = f(up(sf / 0.36));
      q("[data-gc-mod-note]").innerHTML = "модулей 600 × 600<br>ячейка " + c + " × " + c + ", профиль h" + h;
      q("[data-gc-prof]").innerHTML = f(P[0][1] + P[1][1]) + " <small>шт</small>";
      q("[data-gc-hang]").innerHTML = f(up(sf * r.podves)) + " <small>шт</small>";
      q("[data-gc-kg]").innerHTML = f(kg) + " <small>кг</small>";
      q("[data-gc-parts]").innerHTML = P.slice(2).map(function (x) { return "<li><span>" + x[0] + "</span><b>" + (x[1] ? f(x[1]) + " шт" : "—") + "</b></li>"; }).join("");
      cta.dataset.cfg = "грильято " + c + "×" + c + ", h" + h + ", площадь " + f(s) + " м², периметр " + f(p) + " м";
      cta.href = "/servis/raschet-proekta/?config=" + encodeURIComponent(cta.dataset.cfg);
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rc-set] button");
      if (b) { var set = b.parentNode; set.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); q("[name=" + set.dataset.rcSet + "]").value = b.dataset.v; upd(); return; }
      var st = e.target.closest("[data-rc-step]");
      if (st) { var zz = q("[name=z]"); zz.value = Math.max(0, Math.min(20, (+zz.value || 0) + (+st.dataset.rcStep))); upd(); }
    });
    box.addEventListener("input", upd); upd();
    cta.addEventListener("click", function (e) {   // как у рейки: конфигурация уходит в форму заявки внизу страницы
      var form = document.querySelector("#cta form[data-lead]"); if (!form) return;
      e.preventDefault();
      var inp = form.querySelector("[name=config]"), ec = form.querySelector("[data-config-echo]");
      if (inp) inp.value = cta.dataset.cfg; if (ec) { ec.textContent = "Считаем: " + cta.dataset.cfg + "."; ec.hidden = false; }
      document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Т24 (типа армстронг): расход на 1 м² и вес деталей — как у Грильято-Сибирь, система Т-24/30
  document.querySelectorAll("[data-t24calc]").forEach(function (box) {
    var rows = box.querySelector("[data-gc-rows]"), cta = box.querySelector("[data-gc-cta]");
    function upd() {
      var s = calcNum(box, "s"), p = calcNum(box, "p"), t = box.querySelector("[name=t]").value, sf = s * (1 + calcNum(box, "z") / 100);
      calcTable(rows, [["Плита 600×600, " + t, up(sf * 2.78), 0, 0.0054], ["Т-профиль несущий 3,6 м", up(sf * 0.23), 0.923, 0.0026],
        ["Т-профиль поперечный 1,2 м", up(sf * 1.4), 0.3, 0.0008], ["Т-профиль поперечный 0,6 м", up(sf * 1.4), 0.147, 0.0004],
        ["Подвес", up(sf * 1.3)], ["Уголок пристенный 3 м", up(p / 3), 0.156, 0.00054]]);
      cta.href = "/servis/raschet-proekta/?config=" + encodeURIComponent("потолок Т24, плита " + t + ", площадь " + s + " м², периметр " + p + " м");
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
      note.textContent = r < 1 ? "перекрытие видно, только если смотреть почти прямо вверх, — дальше потолок выглядит сплошным" : r < 3 ? "дальше этого расстояния потолок выглядит сплошным" : "перекрытие просматривается с большей части помещения — уменьшите зазор или возьмите рейку выше";
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
    var declined = false; try { declined = !!sessionStorage.getItem("nzmo-cookie-no"); } catch (e) {}
    if (!window.nzmoConsent && !declined) ck.hidden = false;
    ck.querySelector("[data-cookie-ok]").addEventListener("click", function () {
      try { localStorage.setItem("nzmo-cookie", String(Date.now())); } catch (e) {}
      ck.hidden = true; window.nzmoConsent = true;
      document.dispatchEvent(new CustomEvent("nzmo:consent"));
    });
    // отказ: счётчики не включаем, уведомление снова — при следующем визите после закрытия вкладки
    ck.querySelector("[data-cookie-no]").addEventListener("click", function () {
      try { sessionStorage.setItem("nzmo-cookie-no", "1"); } catch (e) {}
      ck.hidden = true;
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

  // Подписи типов в результатах поиска; служебные страницы не показываем
  var KIND = { product: "Продукция", solution: "Решение", solutions: "Решения", "case": "Объект", cases: "Объекты", article: "Статья", articles: "Журнал", docs: "Документы", faq: "Вопросы", partners: "Партнёрам", role: "Партнёрам", materials: "Материалы", about: "О заводе", news: "Новости", contacts: "Контакты", legal: "Документы" };
  var SKIP = { search: 1, thanks: 1, notfound: 1 };
  var kindOf = function (r) { return KIND[r.k] || "Страница"; };

  // Поиск по search.json
  var sbox = document.querySelector("[data-search]");
  if (sbox) {
    var input = sbox.querySelector("input"), out = document.querySelector("[data-results]"), idx = null;
    function run() {
      var q = input.value.trim().toLowerCase();
      if (!idx || q.length < 2) { out.innerHTML = ""; return; }
      var hits = idx.filter(function (r) { return !SKIP[r.k] && ((r.t || "") + " " + (r.e || "")).toLowerCase().indexOf(q) >= 0; }).slice(0, 40);
      out.innerHTML = hits.length ? hits.map(function (r) {
        return '<li><div class="k">' + kindOf(r) + '</div><a href="' + r.u + '"><b>' + r.t + "</b></a><div class=\"small muted\">" + (r.e || "") + "</div></li>";
      }).join("") : "<li>Ничего не найдено</li>";
    }
    fetch("/search.json").then(function (r) { return r.json(); }).then(function (d) { idx = d; run(); });
    input.addEventListener("input", run);
    sbox.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    var qs = new URLSearchParams(location.search).get("q"); if (qs) { input.value = qs; }
  }

  // Попапы видов (грильято, рейка): вариант × цвет × вид, ленивые картинки, расчёт с выбранной конфигурацией
  document.querySelectorAll("[data-kdlg]").forEach(function (dlg) {
    var ws = (dlg.dataset.ws || "m").split(","), wl = (dlg.dataset.wl || "").split("|");
    var st = { v: "0", c: dlg.dataset.c, w: ws[0], t: "ch", vo: false, co: false };   // vo — «Другое» сечение, co — свой цвет из палитры RAL: кадр остаётся от последнего стандартного
    function go(d) { st.w = ws[(ws.indexOf(st.w) + d + ws.length) % ws.length]; sync(); }
    function on(el, key) { var x = el.dataset[key]; return x === undefined || x === "*" || x === st[key]; }
    function sync() {
      dlg.querySelectorAll(".kd__fig").forEach(function (f) {
        var show = on(f, "v") && on(f, "c") && f.dataset.w === st.w;
        f.hidden = !show;
        if (show) { var im = f.querySelector("img[data-src]"); if (im) { if (im.dataset.srcset) { im.sizes = im.getAttribute("sizes") || "60vw"; im.srcset = im.dataset.srcset; } im.src = im.dataset.src; im.removeAttribute("data-src"); } }
      });
      dlg.querySelectorAll(".kd__price").forEach(function (e) { e.hidden = e.dataset.v !== (st.vo ? "o" : st.v); });
      dlg.querySelectorAll(".kd__pane").forEach(function (e) { e.hidden = !(e.dataset.t === st.t && on(e, "v")); });
      dlg.querySelectorAll(".kd__chips button").forEach(function (b) { b.setAttribute("aria-pressed", b.hasAttribute("data-vo") ? st.vo : !st.vo && b.dataset.v === st.v); });
      dlg.querySelectorAll(".kd__sw button:not([data-co])").forEach(function (b) { var p = b.hasAttribute("data-cx") ? st.co : !st.co && b.dataset.c === st.c; b.setAttribute("aria-pressed", p); if (p) { var l = dlg.querySelector("[data-cl]"); if (l) l.textContent = b.dataset.clLabel; } });
      dlg.querySelectorAll("[data-other]").forEach(function (i) { i.hidden = !st[i.dataset.other + "o"]; });
      var wi = ws.indexOf(st.w), cap = dlg.querySelector("[data-kd-cap]"); if (cap) cap.textContent = wl[wi] || "";
      dlg.querySelectorAll(".kd__dots i").forEach(function (d, k) { d.classList.toggle("is-on", k === wi); });
      calc();
      dlg.querySelectorAll(".kd__tabs button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.t === st.t); });
      more();
    }
    // «Ниже ещё»: колонка с текстом не влезла в окно — подсказываем, что её листают (на телефоне листается всё окно)
    var info = dlg.querySelector(".kd__info"), mb = dlg.querySelector("[data-kd-more]");
    function more() { if (mb) mb.hidden = info.scrollHeight - info.scrollTop - info.clientHeight < 8; }
    info.addEventListener("scroll", more, { passive: true });
    window.addEventListener("resize", function () { if (dlg.open) more(); });
    dlg.addEventListener("click", function (e) {
      var b = e.target.closest("button,[data-kd-cta]");
      if (e.target === dlg) { dlg.close(); return; }   // клик по подложке
      if (!b) return;
      if (b.hasAttribute("data-kd-close")) { dlg.close(); return; }
      if (b.hasAttribute("data-kd-more")) { info.scrollBy({ top: info.clientHeight * 0.7, behavior: "smooth" }); return; }
      if (b.closest(".kd__chips")) { st.vo = b.hasAttribute("data-vo"); if (!st.vo) st.v = b.dataset.v; }
      else if (b.hasAttribute("data-co")) {   // палитра RAL (ral.js): файл грузим при первом нажатии
        var pick = function (c) { st.co = !c; if (c) st.c = c; sync(); }, ral = function () { window.nzRal(dlg, pick); };
        if (window.nzRal) ral(); else { var sc = document.createElement("script"); sc.src = b.dataset.ralSrc; sc.onload = ral; document.head.appendChild(sc); }
        return;
      }
      else if (b.closest(".kd__sw")) { st.co = b.hasAttribute("data-cx"); if (!st.co) st.c = b.dataset.c; }
      else if (b.hasAttribute("data-kd-prev")) { go(-1); return; }
      else if (b.hasAttribute("data-kd-next")) { go(1); return; }
      else if (b.closest(".kd__tabs")) st.t = b.dataset.t;
      else if (b.hasAttribute("data-kd-cta")) {
        e.preventDefault();
        var vi = dlg.querySelector("[data-other=v]");
        var cfg = dlg.querySelector('[data-cfg][data-v="' + (st.vo ? "o" : st.v) + '"]').value;
        if (st.vo) cfg += ": " + (vi.value.trim() || "другое");
        var cl = dlg.querySelector("[data-cl]"); if (cl) cfg += ", " + cl.textContent + (st.co ? " под заказ" : "");
        var form = document.querySelector("#cta form[data-lead]");
        if (form) {
          var i = form.querySelector("[name=config]"), ec = form.querySelector("[data-config-echo]");
          if (i) i.value = cfg; if (ec) { ec.textContent = "Считаем: " + cfg + "."; ec.hidden = false; }
        }
        dlg.close();
        var c = document.getElementById("cta"); if (c) { c.scrollIntoView({ behavior: "smooth" }); var n = c.querySelector("[name=name]"); if (n) setTimeout(function () { n.focus({ preventScroll: true }); }, 500); }
        return;
      }
      sync();
    });
    // расход на площадь: «на 1 м²» × площадь, штуки округляем вверх
    function calc() {
      var inp = dlg.querySelector('.kd__pane:not([hidden]) [data-area]') || dlg.querySelector("[data-area]");
      var a = Math.max(0, parseFloat(inp && inp.value) || 0);
      dlg.querySelectorAll("[data-area]").forEach(function (i) { if (i !== inp) i.value = inp.value; });
      dlg.querySelectorAll("[data-area-out]").forEach(function (o) { o.textContent = a.toLocaleString("ru-RU"); });
      dlg.querySelectorAll("[data-rate]").forEach(function (td) {
        var x = parseFloat(td.dataset.rate) * a, u = td.dataset.unit;
        td.textContent = (u === "шт" ? Math.ceil(x) : Math.round(x * 10) / 10).toLocaleString("ru-RU") + " " + u;
      });
    }
    dlg.addEventListener("input", function (e) { if (e.target.matches("[data-area]")) calc(); });
    // листание галереи: клавиши ← → и свайп по картинке
    dlg.addEventListener("keydown", function (e) { if (e.target.matches("input")) return; if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); });
    var stg = dlg.querySelector(".kd__stage"), sx = null;
    if (stg) {
      stg.addEventListener("pointerdown", function (e) { if (!e.target.closest("button")) sx = e.clientX; });
      stg.addEventListener("pointerup", function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); });
      stg.addEventListener("dragstart", function (e) { e.preventDefault(); });
    }
    dlg.addEventListener("close", function () { if (location.hash === "#" + dlg.id) history.replaceState(null, "", location.pathname + location.search); });
    // картинки с размерами, план и сечение лежат отдельным файлом — грузим при первом открытии
    var kst = dlg.querySelector("[data-kd-src]");
    dlg._open = function () {
      info.scrollTop = 0; dlg.showModal(); sync();
      if (!kst || !kst.dataset.kdSrc) return;
      var url = kst.dataset.kdSrc; kst.removeAttribute("data-kd-src");
      fetch(url).then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
        .then(function (html) { kst.insertAdjacentHTML("afterbegin", html); sync(); })
        .catch(function () { kst.dataset.kdSrc = url; });   // повторим при следующем открытии
    };
  });
  function openKd(id) { var d = document.getElementById(id); if (d && d._open) { d._open(); if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id); } }
  document.querySelectorAll("[data-kd]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); openKd(a.dataset.kd); }); });
  if (/^#kd-/.test(location.hash)) openKd(location.hash.slice(1));

  // Мега-меню: слева направление — справа его панель с превью
  document.querySelectorAll("[data-mega]").forEach(function (m) {
    var links = m.querySelectorAll(".mega2__nav a[data-pane]"), panes = m.querySelectorAll(".mega2__pane"), t = null;
    function show(slug) {
      links.forEach(function (a) { a.classList.toggle("is-active", a.dataset.pane === slug); });
      panes.forEach(function (p) { p.classList.toggle("is-active", p.dataset.pane === slug); });
    }
    links.forEach(function (a) {
      a.addEventListener("mouseenter", function () { clearTimeout(t); t = setTimeout(function () { show(a.dataset.pane); }, 80); });
      a.addEventListener("mouseleave", function () { clearTimeout(t); });
      a.addEventListener("focus", function () { show(a.dataset.pane); });
    });
  });

  // Поиск в шапке: панель под шапкой, индекс search.json грузится при первом открытии
  var hs = document.querySelector("[data-hsearch]"), hsBtn = document.querySelector("[data-search-open]");
  if (hs && hsBtn) {
    var hin = hs.querySelector("input"), hres = hs.querySelector("[data-hsearch-res]"), hidx = null;
    var hrun = function () {
      var q = hin.value.trim().toLowerCase();
      if (!hidx || q.length < 2) { hres.innerHTML = ""; return; }
      var hits = hidx.filter(function (r) { return !SKIP[r.k] && ((r.t || "") + " " + (r.e || "")).toLowerCase().indexOf(q) >= 0; });
      hits.sort(function (a, b) { return ((b.t || "").toLowerCase().indexOf(q) >= 0) - ((a.t || "").toLowerCase().indexOf(q) >= 0); });
      hres.innerHTML = hits.length ? hits.slice(0, 8).map(function (r) {
        return '<li><a href="' + r.u + '"><span class="k">' + kindOf(r) + "</span><b>" + r.t + "</b></a></li>";
      }).join("") + '<li class="hsearch__all"><a href="/poisk/?q=' + encodeURIComponent(q) + '">Все результаты: ' + hits.length + " →</a></li>"
        : '<li class="hsearch__none">Ничего не нашли. Позвоните — подскажем</li>';
    };
    var hopen = function (on) {
      hs.hidden = !on; hsBtn.setAttribute("aria-expanded", on);
      if (!on) return;
      hin.focus();
      if (!hidx) fetch("/search.json").then(function (r) { return r.json(); }).then(function (d) { hidx = d; hrun(); });
    };
    hsBtn.addEventListener("click", function () { hopen(hs.hidden); });
    hs.querySelector("[data-search-close]").addEventListener("click", function () { hopen(false); });
    hin.addEventListener("input", hrun);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !hs.hidden) { hopen(false); hsBtn.focus(); } });
    document.addEventListener("click", function (e) { if (!hs.hidden && !hs.contains(e.target) && !hsBtn.contains(e.target)) hopen(false); });
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
      if (t) {
        var h = t.getAttribute("href");
        tEl.textContent = t.dataset.title; if (h && h !== "#") tEl.href = h; else tEl.removeAttribute("href");   // у фото без кейса заголовок не ссылка
        fEl.textContent = t.dataset.family; sEl.textContent = t.dataset.spec;
        var st = t.closest("[data-stage-strip]");   // длинная лента: активная миниатюра в поле зрения, страницу не двигаем
        if (st && st.scrollWidth > st.clientWidth) st.scrollTo({ left: t.offsetLeft - (st.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
      }
      cEl.textContent = (cur + 1) + " / " + slides.length;
    }
    stage.querySelector("[data-stage-prev]").addEventListener("click", function () { go(cur - 1); });
    stage.querySelector("[data-stage-next]").addEventListener("click", function () { go(cur + 1); });
    thumbs.forEach(function (t, k) { t.addEventListener("click", function (e) { e.preventDefault(); go(k); }); });
  }

  // MAX без ссылки на профиль: по клику — номер для поиска в MAX и «Скопировать»
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-max-pop]");
    document.querySelectorAll(".msgr__pop").forEach(function (p) { if (!b || p !== b.nextElementSibling) { p.hidden = true; if (p.previousElementSibling) p.previousElementSibling.setAttribute("aria-expanded", "false"); } });
    if (b) { var p = b.nextElementSibling; p.hidden = !p.hidden; b.setAttribute("aria-expanded", String(!p.hidden)); e.preventDefault(); return; }
    var c = e.target.closest("[data-copy]");
    if (c) {
      e.preventDefault();
      var done = function () { c.textContent = "Скопировано"; setTimeout(function () { c.textContent = "Скопировать номер"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(c.dataset.copy).then(done, done); else done();
    }
  });

  // Спасибо: показать, откуда пришла заявка
  var thanks = document.querySelector("[data-thanks]");
  if (thanks) {
    try {
      var d = JSON.parse(sessionStorage.getItem("nzmo_lead") || "null");
      if (d && d.name) thanks.textContent = d.name + ", спасибо! Менеджер перезвонит в течение рабочего дня.";
    } catch (err) {}
  }
})();


// Блок «Продукция»: фильтр по группам, все карточки остаются в разметке
(function () {
  document.querySelectorAll("[data-filter]").forEach(function (box) {
    var btns = box.querySelectorAll("[data-f]"), cards = box.querySelectorAll("[data-g]");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-f");
        btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        cards.forEach(function (c) { c.hidden = f !== "all" && c.getAttribute("data-g") !== f; });
      });
    });
  });
})();
