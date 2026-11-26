(() => {
  const guide = document.querySelector('[data-room-guide]');
  if (!guide) return;
  const pins = [...guide.querySelectorAll('.room-pin')];
  const choices = [...guide.querySelectorAll('.room-choice')];
  const panels = [...guide.querySelectorAll('.room-details article')];
  function select(key) {
    for (const control of [...pins, ...choices]) {
      control.setAttribute('aria-pressed', String(control.dataset.part === key));
    }
    for (const panel of panels) panel.hidden = panel.id !== key;
  }
  for (const control of [...pins, ...choices]) {
    control.addEventListener('click', () => select(control.dataset.part));
    control.addEventListener('focus', () => select(control.dataset.part));
  }
  for (const pin of pins) {
    pin.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') select(pin.dataset.part);
    });
  }
  select(pins[0].dataset.part);
  guide.classList.add('room-guide--ready');
})();
