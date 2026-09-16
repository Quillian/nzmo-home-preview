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
    li.addEventListener("mouseenter", function () { if (window.innerWidth > 960) li.classList.add("is-open"); });
    li.addEventListener("mouseleave", function () { if (window.innerWidth > 960) li.classList.remove("is-open"); });
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
      try { sessionStorage.setItem("nzmo_lead", JSON.stringify({ kind: form.dataset.lead, page: location.pathname, name: form.name.value })); } catch (err) {}
      location.href = "/spasibo/?" + q.toString();
    });
    var ph = form.querySelector("[name=phone]");
    if (ph) ph.addEventListener("input", function () { ph.setCustomValidity(""); });
  });

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

  // Спасибо: показать, откуда пришла заявка
  var thanks = document.querySelector("[data-thanks]");
  if (thanks) {
    try {
      var d = JSON.parse(sessionStorage.getItem("nzmo_lead") || "null");
      if (d && d.name) thanks.textContent = d.name + ", спасибо! Менеджер перезвонит в течение рабочего дня.";
    } catch (err) {}
  }
})();
