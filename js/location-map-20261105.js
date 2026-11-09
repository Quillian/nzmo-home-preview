/* Keep addresses useful without downloading a third-party map. Load only on request. */
(() => {
  'use strict';
  document.querySelectorAll('.location-section').forEach(section => {
    const frame = section.querySelector('#nzmo-map');
    const stage = section.querySelector('.location-stage');
    const launch = section.querySelector('[data-map-load]');
    const heading = section.querySelector('[data-map-heading]');
    const description = section.querySelector('[data-map-description]');
    const status = section.querySelector('[data-map-status]');
    const overview = section.querySelector('.location-overview');
    const buttons = [...section.querySelectorAll('[data-map]')];
    if (!frame || !stage || !launch || !heading || !description || !status || !overview) return;
    let current = 'overview', timer = null;
    const title = key => key === 'overview' ? '2ГИС: офис и производство НЗМО' : '2ГИС: ' + (key === 'office' ? 'офис НЗМО' : 'производство НЗМО');
    function pendingMessage(message) {
      stage.dataset.mapState = 'waiting';
      launch.setAttribute('aria-disabled', 'false');
      launch.textContent = 'Попробовать ещё раз';
      status.textContent = message;
    }
    function load(key, retry = false) {
      const url = frame.dataset[key];
      if (!url) return;
      if (!retry && frame.getAttribute('src') === url && ['loading', 'ready'].includes(stage.dataset.mapState)) return;
      current = key;
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.map === key)));
      clearTimeout(timer);
      heading.textContent = 'Открываем карту';
      description.textContent = key === 'overview' ? 'Офис и производство на одной карте 2ГИС.' : (key === 'office' ? 'Офис · ул. Челюскинцев, 30/2' : 'Производство · ул. Станционная, 38');
      frame.setAttribute('aria-hidden', 'true');
      frame.tabIndex = -1;
      if (!navigator.onLine) {
        pendingMessage('Нет соединения. Адреса и ссылки на маршруты остаются доступны.');
        return;
      }
      stage.dataset.mapState = 'loading';
      launch.setAttribute('aria-disabled', 'true');
      launch.textContent = 'Загружаем…';
      status.textContent = '';
      frame.title = title(key);
      frame.src = url;
      timer = setTimeout(() => pendingMessage('Карта загружается дольше обычного. Можно открыть нужный адрес в 2ГИС по ссылкам ниже.'), 12000);
    }
    frame.addEventListener('load', () => {
      if (!frame.getAttribute('src')) return;
      clearTimeout(timer);
      const focusMap = document.activeElement === launch;
      // Cross-origin load only signals navigation. It cannot prove that every
      // map tile loaded; the independent address/route links stay visible.
      stage.dataset.mapState = 'ready';
      frame.removeAttribute('aria-hidden');
      frame.tabIndex = 0;
      overview.hidden = false;
      launch.setAttribute('aria-disabled', 'false');
      launch.textContent = 'Открыть карту';
      status.textContent = '';
      if (focusMap) frame.focus({ preventScroll: true });
    });
    frame.addEventListener('error', () => {
      clearTimeout(timer);
      pendingMessage('Не удалось открыть карту. Попробуйте ещё раз или воспользуйтесь ссылками ниже.');
    });
    buttons.forEach(button => {
      button.disabled = false;
      button.addEventListener('click', () => load(button.dataset.map));
    });
    launch.addEventListener('click', () => {
      if (launch.getAttribute('aria-disabled') !== 'true') load(current, true);
    });
    launch.hidden = false;
    section.querySelectorAll('.location-card__show').forEach(label => { label.hidden = false; });
  });
})();
