/* Start the map from HTML, without a click gate or a load-event overlay. */
(() => {
  'use strict';
  document.querySelectorAll('.location-section').forEach(section => {
    const frame = section.querySelector('#nzmo-map');
    if (!frame) return;
    const buttons = [...section.querySelectorAll('[data-map]')];
    buttons.forEach(button => {
      button.disabled = false;
      button.hidden = false;
      button.addEventListener('click', () => {
        const key = button.dataset.map;
        const url = frame.dataset[key];
        if (!url) return;
        buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        frame.title = key === 'overview' ? '2ГИС: офис и производство НЗМО' : '2ГИС: ' + (key === 'office' ? 'офис НЗМО' : 'производство НЗМО');
        if (frame.getAttribute('src') !== url) frame.src = url;
      });
    });
    section.querySelectorAll('.location-card__show').forEach(label => { label.hidden = false; });
  });
})();
