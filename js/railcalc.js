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
    var base = roundUp(S / (A69 / 1000)), D69 = base + roundUp(z * base / 100);
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
    var rows = box.querySelector("[data-rc-rows]"), kgOut = box.querySelector("[data-rc-kg]"), cta = box.querySelector("[data-rc-cta]");
    function n(k) { var e = box.querySelector("[name=" + k + "]"); return parseFloat(String(e.value || "0").replace(",", ".")) || 0; }
    function f(x) { return Math.round(x).toLocaleString("ru-RU"); }
    function upd() {
      var sec = box.querySelector("[name=sec]").value.split("x"), h = +sec[0], b = +sec[1];
      var i = { area: n("s"), perimeter: n("p"), h: h, b: b, gap: n("g"), length: n("l"), scrapPct: n("z"), thickness: 0.45 };
      if (!(i.area > 0) || !(i.gap > 0)) { rows.innerHTML = '<tr><td colspan="2">Введите площадь и шаг</td></tr>'; return; }
      var r = calc(i), L = i.length;
      var list = [
        ["Рейка " + h + " × " + b + " мм, длина " + f(L) + " мм", f(r.rails) + " шт", r.railsScrap ? "≈ " + f(r.railM) + " п. м, в том числе запас " + f(r.railsScrap) + " шт" : "≈ " + f(r.railM) + " п. м"],
        ["Стрингер, длина " + f(r.stringerLen) + " мм", f(r.stringers) + " шт", ""],
        ["Соединитель стрингера", f(r.stringerConn) + " шт", "блоками по 10"],
        ["Соединитель рейки", f(r.conn) + " шт", "блоками по 10"],
        ["Замок рейки", f(r.lock) + " шт", "блоками по 10"],
        ["Торцевая заглушка", r.caps ? f(r.caps) + " шт" : "—", r.caps ? "по периметру" : "укажите периметр"],
        ["Подвес (европодвес или шпилька)", f(r.hangers) + " шт", "шаг 1 200 × 1 200 мм"]
      ];
      rows.innerHTML = list.map(function (x) { return "<tr><td>" + x[0] + (x[2] ? "<small>" + x[2] + "</small>" : "") + "</td><td>" + x[1] + "</td></tr>"; }).join("");
      kgOut.textContent = f(r.kg) + " кг";
      if (cta) cta.dataset.cfg = "рейка " + h + " × " + b + ", шаг " + n("g") + " мм, " + f(i.area) + " м²";
    }
    var sel = box.querySelector("[name=sec]");   // сечение меняет шаг на ходовой для него — дальше его можно поправить
    if (sel) sel.addEventListener("change", function () { var o = sel.options[sel.selectedIndex]; if (o && o.dataset.gap) box.querySelector("[name=g]").value = o.dataset.gap; });
    box.addEventListener("input", upd); box.addEventListener("change", upd); upd();
    if (cta) cta.addEventListener("click", function (e) {
      var form = document.querySelector("#cta form[data-lead]"); if (!form) return;
      e.preventDefault();
      var inp = form.querySelector("[name=config]"), ec = form.querySelector("[data-config-echo]");
      if (inp) inp.value = cta.dataset.cfg; if (ec) { ec.textContent = "Считаем: " + cta.dataset.cfg + "."; ec.hidden = false; }
      document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
    });
  });
})(typeof window !== "undefined" ? window : globalThis);
