document.addEventListener("DOMContentLoaded", () => {
  const category = "/potolki/grilyato/";
  const pageSize = document.querySelector("[data-size-page]")?.dataset.sizePage;
  const sizes = ["50", "75", "100"];
  const dialogs = [...document.querySelectorAll("dialog[id^='kd-grilyato-']")];
  const base = new URL(location.href);
  for (const key of ["finish", "cell", "shade", "custom"]) base.searchParams.delete(key);
  base.hash = "";
  let active = null;
  let restoring = false;
  const chips = d => [...d.querySelectorAll(".kd__chips [data-v]")];
  const cellKey = b => b.textContent.trim().split(/\s*×\s*/).join("x");
  const compact = key => /^(\d+)x\1$/.test(key) ? key.split("x")[0] : key;
  const shadeButtons = d => [...d.querySelectorAll(".kd__sw [data-c]")];
  const getDialog = finish => dialogs.find(d => d.id === "kd-grilyato-" + finish);

  function selection(d) {
    const selected = d.querySelector('.kd__chips [aria-pressed="true"]');
    const custom = selected?.hasAttribute("data-vo");
    const cell = custom ? "other" : selected ? compact(cellKey(selected)) : "";
    const sw = d.querySelector('.kd__sw [aria-pressed="true"]');
    const shade = sw?.dataset.c || sw?.dataset.clLabel?.match(/^RAL (\d{4})/)?.[1];
    const url = new URL(sizes.includes(cell) ? category + "yacheyka-" + cell + "/" : category, location.origin);
    url.searchParams.set("finish", d.id.slice("kd-grilyato-".length));
    if (cell && !sizes.includes(cell)) url.searchParams.set("cell", cell);
    if (custom) url.searchParams.set("custom", d.querySelector("[data-other=v]").value.trim());
    if (shade && shade !== d.dataset.c) url.searchParams.set("shade", shade);
    return {url, cell};
  }

  function syncLink(d) {
    if (restoring || active !== d || !d.open) return;
    const {url, cell} = selection(d);
    d.toggleAttribute("data-custom-cell", cell === "other");
    const ral = url.searchParams.get("shade");
    const customShade = /^\d{4}$/.test(ral || "");
    const note = d.querySelector(".gs-selection-note");
    note.hidden = cell !== "other" && !customShade;
    if (!note.hidden) note.textContent = cell === "other" ? "Нестандартная ячейка. Геометрию, расход и цену рассчитаем по вашему размеру." : "Оттенок RAL под заказ. На изображении показана форма изделия. Цену покрытия уточним при расчёте.";
    const here = new URL(base);
    for (const [key, value] of url.searchParams) here.searchParams.set(key, value);
    if (cell && cell !== pageSize) here.searchParams.set("cell", cell);
    if (here.href !== location.href) history.replaceState(history.state, "", here);
    d.querySelector(".gs-share").href = url.href;
  }

  function openSelection(finish, cell, shade, custom) {
    const d = getDialog(finish);
    const chip = d && chips(d).find(b => compact(cellKey(b)) === cell);
    const customChip = d?.querySelector("[data-vo]");
    const sw = d && shadeButtons(d).find(b => b.dataset.c === shade);
    const ral = d?.querySelector("[data-co]");
    const customRal = !sw && /^\d{4}$/.test(shade || "") && ral && window.nzRal;
    if (!d || (custom !== null && custom !== undefined && cell !== "other") || (cell && !(chip || (cell === "other" && customChip))) || (shade && !sw && !customRal)) return false;
    restoring = true;
    if (active && active !== d && active.open) active.close();
    active = d;
    if (!d.open) d._open();
    (chip || (cell === "other" && customChip) || chips(d)[0])?.click();
    if (cell === "other") d.querySelector("[data-other=v]").value = custom || "";
    (sw || shadeButtons(d)[0])?.click();
    let valid = true;
    if (customRal) {
      const box = d.querySelector("[data-ralp]");
      if (box.hidden) ral.click();
      const search = box.querySelector("input");
      search.value = shade;
      search.dispatchEvent(new Event("input"));
      const color = [...box.querySelectorAll("[data-r]")].find(b => b.dataset.r === shade);
      if (color) color.click(); else { valid = false; d.close(); active = null; }
    }
    restoring = false;
    syncLink(d);
    return valid;
  }

  function restore() {
    document.querySelector(".gs-alert")?.remove();
    const url = new URL(location.href);
    const legacy = url.hash.startsWith("#kd-grilyato-");
    const finish = url.searchParams.get("finish") || (legacy && url.hash.slice("#kd-grilyato-".length));
    if (!finish && !["cell","shade","custom"].some(k => url.searchParams.has(k))) {
      if (active?.open) active.close();
      active = null;
      return;
    }
    if (finish && openSelection(finish, url.searchParams.get("cell") || pageSize, url.searchParams.get("shade"), url.searchParams.get("custom"))) return;
    if (active?.open) active.close();
    active = null;
    const note = document.createElement("p");
    note.className = "gs-alert";
    note.setAttribute("role", "status");
    note.textContent = "Такого сочетания размера и отделки нет в каталоге. Выберите одно из доступных исполнений.";
    const anchor = document.querySelector(".gs-variants, #tipy .k3");
    anchor.before(note);
    note.scrollIntoView({block:"center"});
  }

  for (const d of dialogs) {
    const link = document.createElement("a");
    link.className = "gs-share";
    link.textContent = "Скопировать ссылку";
    const note = document.createElement("p");
    note.className = "gs-selection-note";
    note.hidden = true;
    d.querySelector(".kd__cta").before(note);
    d.querySelector(".kd__cta").after(link);
    link.addEventListener("click", async e => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const {url} = selection(d);
      try {
        await navigator.clipboard.writeText(url.href);
        link.textContent = "Ссылка скопирована";
        setTimeout(() => { link.textContent = "Скопировать ссылку"; }, 1800);
      } catch { window.prompt("Скопируйте ссылку на комплектацию", url.href); }
    });
    const observer = new MutationObserver(() => syncLink(d));
    for (const b of d.querySelectorAll(".kd__chips button,.kd__sw button")) observer.observe(b,{attributes:true,attributeFilter:["aria-pressed","data-cl-label"]});
    d.addEventListener("input", () => syncLink(d));
    d.addEventListener("close", () => {
      if (active !== d || d.open) return;
      active = null;
      if (history.state?.grilyatoDialog) history.back();
      else history.replaceState(history.state, "", base);
    });
  }

  document.addEventListener("click", e => {
    const a = e.target.closest("[data-gs-finish], [data-kd^='kd-grilyato-']");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    history.pushState({grilyatoDialog:true}, "", location.href);
    openSelection(a.dataset.gsFinish || a.dataset.kd.slice("kd-grilyato-".length), pageSize);
  }, true);
  window.addEventListener("popstate", restore);
  restore();

  if (!pageSize) return;
  const form = document.querySelector("#cta form[data-lead]");
  const echo = form?.querySelector("[data-config-echo]");
  if (echo && form.elements.config.value) {
    echo.textContent = "Считаем: " + form.elements.config.value + ".";
    echo.hidden = false;
  }
});
