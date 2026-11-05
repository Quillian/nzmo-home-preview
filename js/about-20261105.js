/* About NZMO: photo viewer, historical metrics, two verified 2GIS locations. */
(() => {
  'use strict';
  const root = document.querySelector('.av2');
  if (!root) return;
  const dialog = root.querySelector('.av2-lightbox');
  let previousFocus, previousOverflow;
  root.querySelectorAll('[data-photo]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (!dialog || typeof dialog.showModal !== 'function') return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previousFocus = trigger;
      previousOverflow = document.body.style.overflow;
      dialog.querySelector('img').src = trigger.dataset.photo;
      dialog.querySelector('img').alt = trigger.dataset.caption;
      dialog.querySelector('figcaption').textContent = trigger.dataset.caption;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  if (dialog) {
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow || '';
      if (previousFocus) previousFocus.focus({preventScroll: true});
    });
  }
  root.querySelectorAll('[data-history]').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('[data-history]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      root.querySelectorAll('.av2-chart').forEach(chart => { chart.hidden = chart.id !== 'history-' + button.dataset.history; });
    });
  });
  const frame = root.querySelector('#nzmo-map');
  const route = root.querySelector('#map-route');
  const routes = {
    production: 'https://2gis.ru/novosibirsk/directions/points/%7C82.838785%2C55.005844%3B70000001090500146',
    office: 'https://2gis.ru/novosibirsk/directions/points/%7C82.907333%2C55.03897%3B70000001053671670'
  };
  root.querySelectorAll('[data-map]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      root.querySelectorAll('[data-map]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const key = button.dataset.map;
      frame.src = frame.dataset[key];
      frame.title = '2ГИС: ' + (key === 'office' ? 'офис НЗМО' : 'производство НЗМО');
      route.href = routes[key];
    });
  });
})();
