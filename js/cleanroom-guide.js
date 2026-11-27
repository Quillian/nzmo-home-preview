(() => {
  const guide = document.querySelector('[data-room-guide]');
  if (!guide) return;
  const controls = [...guide.querySelectorAll('button[data-part]')];
  const regions = [...guide.querySelectorAll('[data-region]')];
  const panels = [...guide.querySelectorAll('.room-details article')];
  let current = '';

  function select(key) {
    if (current === key) return;
    current = key;
    for (const control of controls) {
      control.setAttribute('aria-pressed', String(control.dataset.part === key));
    }
    for (const region of regions) {
      region.classList.toggle('is-selected', region.dataset.region === key);
    }
    for (const panel of panels) panel.hidden = panel.id !== key;
  }

  for (const target of [...controls, ...regions]) {
    const key = target.dataset.part || target.dataset.region;
    target.addEventListener('click', () => select(key));
    target.addEventListener('focus', () => select(key));
    target.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') select(key);
    });
  }

  select(controls[0].dataset.part);
  guide.classList.add('room-guide--ready');
})();
