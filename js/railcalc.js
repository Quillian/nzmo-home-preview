/* Калькулятор реечного потолка для сайта (21.10.2026). Количества — по формулам заводского калькулятора
   «13-Калькулятор рейки от 14.05.2026», те же, что в генераторе КП (app/kp-generator/calc.mjs, раскрой по размерам
   заказчика, гибка). Только геометрия и количества: цены, наценки и себестоимость на сайт не выносим.
   Подвесы в заводском калькуляторе вводятся вручную — здесь по инструкции AIRWOOD: подвес через 1 200 мм
   на стрингерах через 1 200 мм. Сверка с calc.mjs — MoodBoard/scripts/test-railcalc.mjs. */
(function (root) {
  var EPS = 1e-9;
  function roundUp(x, d) { var m = Math.pow(10, d || 0); return Math.ceil(x * m - EPS) / m; }
  function roundDown(x) { return Math.floor(x + EPS); }
  function mround(x, m) { return m ? Math.round(x / m + EPS) * m : 0; }
  function ceilTo(x, m) { return Math.ceil(x / m - EPS) * m; }
  var C = { sheetW: 1250, railMultiple: 3, steelKgPerM2mm: 8, stSheetW: 1250, stSheetL: 3020, stThickness: 0.5, stDensity: 7.9, stPerSheet: 14, hangerStepM: 1.2 };

  function calc(i) {   // i: {area, perimeter, h, b, gap, length, scrapPct, thickness}
    var S = i.area, L = i.length, h = i.h, b = i.b, g = i.gap, z = i.scrapPct || 0;
    var T12 = h * 2 + b + 4 + 8, L12 = roundDown(C.sheetW / T12);
    var F8 = roundUp(1000 / (b + g), 1), G8 = S * F8;
    var O8 = mround(G8 / (L / 1000), C.railMultiple), P8 = mround(z / 100 * O8, C.railMultiple), K8 = O8 + P8;
    var N8 = ceilTo(K8 / L12, 1) * L12;
    var conn = ceilTo(N8, 10);                                         // соединители и замки — блоками по 10
    var caps = i.perimeter > 0 ? mround(i.perimeter / ((b + g) * 0.001), 2) : 0;
    var A69 = roundDown(3000 / (b + g)) * (b + g);                     // рабочая длина стрингера, кратна шагу
    var base = roundUp(S / (A69 / 1000)), D69 = base + roundUp((i.stringerScrapPct || 0) * base / 100);   // запас стрингера — отдельный, по умолчанию 0, как в заводском Excel
    var hangers = Math.ceil(S / (C.hangerStepM * C.hangerStepM) - EPS);
    // вес: рейка по развёртке, стрингер по заготовке, мелочь по площади кассет — как в calc.mjs
    var kgM2 = i.thickness * C.steelKgPerM2mm;
    var railKg = K8 * roundUp(roundUp(T12 * L / 1e6, 2) * kgM2, 1);
    var stKg = D69 * (C.stSheetW * C.stSheetL / 1e6 / C.stPerSheet) * C.stThickness * C.stDensity;
    var blocks = conn / 10;
    var connM2 = roundUp(((h * 2 + b + 12) / 1000) * 0.998, 2) * blocks, lockM2 = roundUp(((b + 26) / 1000) * 0.858, 2) * blocks;
    var capsM2 = caps ? roundUp(((h + 72) * 2 + 8) * (b + 56 + 8) * 1e-6, 2) * (caps / 2) : 0;
    var kg = railKg + stKg + (connM2 + lockM2 + capsM2) * kgM2;
    return { rails: K8, railsScrap: P8, railM: K8 * L / 1000, conn: conn, lock: conn, caps: caps,
             stringers: D69, stringerLen: A69, stringerConn: Math.ceil(D69 / 10 - EPS) * 10, hangers: hangers, kg: kg };
  }
  root.nzmoRailCalc = calc;
  if (typeof module !== "undefined") module.exports = calc;

  if (typeof document === "undefined") return;
  document.querySelectorAll("[data-railcalc]").forEach(function (box) {
    var q = function (sel) { return box.querySelector(sel); }, cta = q("[data-rc-cta]");
    function n(k) { return parseFloat(String(q("[name=" + k + "]").value || "0").replace(",", ".")) || 0; }
    function f(x) { return Math.round(x).toLocaleString("ru-RU"); }
    function viz(h, b, g) {   // три рейки в реальных пропорциях, стрингер сверху, размеры охрой
      var sc = Math.min(96 / h, 420 / (3 * b + 2 * g)), W = b * sc, H = h * sc, G = g * sc, x0 = (520 - (3 * W + 2 * G)) / 2, y0 = 34;
      var o = '<rect x="' + (x0 - 14) + '" y="' + (y0 - 8) + '" width="' + (3 * W + 2 * G + 28) + '" height="8" class="rc-st"/>';   // стрингер лежит на рейках
      var LP = Math.max(3, Math.min(10, b * 0.25)) * sc;   // П-профиль с кромками внутрь, как в схеме «Рейка кубообразная СБ (2)»
      for (var k = 0; k < 3; k++) { var xr = x0 + k * (W + G); o += '<path class="rc-rl" d="M' + (xr + LP) + ' ' + y0 + ' H' + xr + ' v' + H + ' h' + W + ' V' + y0 + ' H' + (xr + W - LP) + '"/>'; }
      var yd = y0 + H + 22, x1 = x0 + W, x2 = x1 + G;
      o += '<g class="rc-dim"><path d="M' + x0 + ' ' + yd + ' H' + x1 + ' M' + x1 + ' ' + yd + ' H' + x2 + ' M' + x0 + ' ' + (yd - 5) + ' v10 M' + x1 + ' ' + (yd - 5) + ' v10 M' + x2 + ' ' + (yd - 5) + ' v10"/>' +
        '<text x="' + (x0 + W / 2) + '" y="' + (yd + 18) + '">' + b + '</text><text x="' + (x1 + G / 2) + '" y="' + (yd + 18) + '">' + g + '</text>' +
        '<path d="M' + (x0 + 3 * W + 2 * G + 16) + ' ' + y0 + ' v' + H + ' M' + (x0 + 3 * W + 2 * G + 11) + ' ' + y0 + ' h10 M' + (x0 + 3 * W + 2 * G + 11) + ' ' + (y0 + H) + ' h10"/>' +
        '<text x="' + (x0 + 3 * W + 2 * G + 26) + '" y="' + (y0 + H / 2 + 5) + '" text-anchor="start">' + h + '</text></g>';
      q("[data-rc-viz]").innerHTML = o;
    }
    function upd() {
      var sec = q("[name=sec]").value.split("x"), h = +sec[0], b = +sec[1], g = n("g"), L = n("l");
      q("[data-rc-gap-out]").textContent = g + " мм";
      viz(h, b, g);
      var i = { area: n("s"), perimeter: n("p"), h: h, b: b, gap: g, length: L, scrapPct: n("z"), thickness: 0.45 };
      q("[data-rc-area]").textContent = f(i.area);
      if (!(i.area > 0)) { q("[data-rc-rails]").textContent = "—"; return; }
      var r = calc(i);
      q("[data-rc-rails]").textContent = f(r.rails);
      q("[data-rc-rails-note]").innerHTML = "реек " + h + " × " + b + " по " + f(L) + " мм<br>≈ " + f(r.railM) + " п. м" + (r.railsScrap ? ", запас " + f(r.railsScrap) + " шт" : "");
      q("[data-rc-st]").innerHTML = f(r.stringers) + " <small>шт</small>"; q("[data-rc-st-l]").textContent = "по " + f(r.stringerLen) + " мм";
      q("[data-rc-hang]").innerHTML = f(r.hangers) + " <small>шт</small>";
      q("[data-rc-kg]").innerHTML = f(r.kg) + " <small>кг</small>";
      q("[data-rc-parts]").innerHTML = [["Соединитель рейки", r.conn], ["Замок рейки", r.lock], ["Торцевая заглушка", r.caps], ["Соединитель стрингера", r.stringerConn]]
        .map(function (x) { return "<li><span>" + x[0] + "</span><b>" + (x[1] ? f(x[1]) + " шт" : "—") + "</b></li>"; }).join("");
      if (cta) cta.dataset.cfg = "рейка " + h + " × " + b + ", шаг " + g + " мм, длина " + f(L) + " мм, " + f(i.area) + " м²";
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rc-set] button");
      if (b) {
        var set = b.parentNode, k = set.dataset.rcSet;
        set.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        q("[name=" + k + "]").value = b.dataset.v;
        if (k === "sec" && b.dataset.gap) q("[name=g]").value = b.dataset.gap;   // у сечения свой ходовой шаг — дальше его можно поправить
        upd(); return;
      }
      var st = e.target.closest("[data-rc-step]");
      if (st) { var z = q("[name=z]"); z.value = Math.max(0, Math.min(20, (+z.value || 0) + (+st.dataset.rcStep))); upd(); }
    });
    box.addEventListener("input", upd); upd();
    if (cta) cta.addEventListener("click", function (e) {
      var form = document.querySelector("#cta form[data-lead]"); if (!form) return;
      e.preventDefault();
      var inp = form.querySelector("[name=config]"), ec = form.querySelector("[data-config-echo]");
      if (inp) inp.value = cta.dataset.cfg; if (ec) { ec.textContent = "Считаем: " + cta.dataset.cfg + "."; ec.hidden = false; }
      document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
    });
  });
})(typeof window !== "undefined" ? window : globalThis);
