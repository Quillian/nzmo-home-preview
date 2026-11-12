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
      dialog.querySelector('img').alt = trigger.querySelector('img')?.alt || trigger.dataset.caption || '';
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

  const portfolio = root.querySelector('[data-about-cards]');
  const more = root.querySelector('[data-about-more]');
  if (portfolio && more) {
    const cards = [...portfolio.children];
    const button = more.querySelector('button');
    const status = more.querySelector('[role=status]');
    const batch = 6;
    let shown = Math.min(batch, cards.length);
    function refresh() {
      cards.forEach((card, i) => { card.hidden = i >= shown; });
      status.textContent = 'Показано ' + shown + ' из ' + cards.length;
      button.hidden = shown >= cards.length;
    }
    if (shown < cards.length) {
      more.hidden = false;
      refresh();
      button.addEventListener('click', () => {
        const next = shown;
        shown = Math.min(shown + batch, cards.length);
        refresh();
        cards[next]?.querySelector('a')?.focus();
      });
    }
  }
  root.querySelectorAll('[data-history]').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('[data-history]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      root.querySelectorAll('.av2-chart').forEach(chart => { chart.hidden = chart.id !== 'history-' + button.dataset.history; });
    });
  });
})();
