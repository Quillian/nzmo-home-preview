(() => {
  const guide = document.querySelector('[data-room-guide]');
  if (!guide) return;
  const controls = [...guide.querySelectorAll('button[data-part]')];
  const regions = [...guide.querySelectorAll('[data-region]')];
  const panels = [...guide.querySelectorAll('.room-details article')];
  const choices = controls.filter(button => button.classList.contains('room-choice'));
  let hoverTimer;
  let current = '';

  function select(key) {
    clearTimeout(hoverTimer);
    if (current === key) return;
    current = key;
    for (const control of controls) {
      control.setAttribute('aria-pressed', String(control.dataset.part === key));
    }
    for (const choice of choices) choice.tabIndex = choice.dataset.part === key ? 0 : -1;
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
      if (event.pointerType === 'mouse') hoverTimer = setTimeout(() => select(key), 95);
    });
    target.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
  }

  for (const [index, choice] of choices.entries()) {
    choice.addEventListener('keydown', event => {
      const offset = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 4, ArrowUp: -4 }[event.key];
      if (!offset) return;
      event.preventDefault();
      choices[(index + offset + choices.length) % choices.length].focus();
    });
  }

  select(controls[0].dataset.part);
  guide.classList.add('room-guide--ready');
})();
