/* Load the third-party widget near the section, not on the first screen. */
(() => {
  'use strict';
  const section = document.querySelector('.location-section');
  if (!section) return;
  const frame = section.querySelector('#nzmo-map');
  const stage = section.querySelector('.location-stage');
  const buttons = section.querySelectorAll('[data-map]');
  let current = 'overview';
  function load(key) {
    const url = frame.dataset[key];
    if (!url || frame.getAttribute('src') === url) return;
    stage.classList.remove('is-loaded');
    frame.title = key === 'overview' ? '2ГИС: офис и производство НЗМО' : '2ГИС: ' + (key === 'office' ? 'офис НЗМО' : 'производство НЗМО');
    frame.src = url;
  }
  frame.addEventListener('load', () => {
    if (frame.getAttribute('src')) stage.classList.add('is-loaded');
  });
  buttons.forEach(button => button.addEventListener('click', () => {
    current = button.dataset.map;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    load(current);
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { load(current); observer.disconnect(); }
    }, { rootMargin: '600px 0px' });
    observer.observe(stage);
  } else { load(current); }
})();
