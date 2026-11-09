(() => {
  const root = document.querySelector('[data-project-path]');
  if (!root) return;
  const frames = [...root.querySelectorAll('[data-stage]')];
  const tabs = [...root.querySelectorAll('[data-mobile-stage]')];
  const panels = [...root.querySelectorAll('[data-stage-panel]')];
  const viewport = root.querySelector('.journey-viewport');
  const narrow = matchMedia('(max-width: 700px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, pointer = null, suppressClick = false;
  function syncAccess() {
    frames.forEach((frame, i) => {
      frame.tabIndex = narrow.matches && i !== current ? -1 : 0;
      if (narrow.matches && i !== current) frame.setAttribute('aria-hidden', 'true');
      else frame.removeAttribute('aria-hidden');
    });
  }
  function select(index, animate = true) {
    index = Math.max(0, Math.min(frames.length - 1, index));
    const changed = current !== index;
    current = index;
    root.style.setProperty('--journey-index', index);
    frames.forEach((frame, i) => frame.setAttribute('aria-pressed', String(i === index)));
    tabs.forEach((tab, i) => tab.setAttribute('aria-pressed', String(i === index)));
    panels.forEach((panel, i) => { panel.hidden = i !== index; panel.getAnimations().forEach(a => a.cancel()); });
    if (animate && changed && !reduced.matches) panels[index].animate(
      [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' }
    );
    syncAccess();
  }
  [...frames, ...tabs].forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => {
      if (suppressClick) return;
      select(Number(button.dataset.stage ?? button.dataset.mobileStage));
    });
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      select(event.key === 'Home' ? 0 : event.key === 'End' ? 3 : current + (event.key === 'ArrowRight' ? 1 : -1));
      (button.hasAttribute('data-mobile-stage') ? tabs : frames)[current].focus({ preventScroll: true });
    });
  });
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
    suppressClick = false;
  });
  viewport.addEventListener('pointerup', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    pointer = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClick = true;
      select(current + (dx < 0 ? 1 : -1));
      setTimeout(() => { suppressClick = false; }, 250);
    }
  });
  viewport.addEventListener('pointercancel', () => { pointer = null; });
  viewport.addEventListener('dragstart', event => event.preventDefault());
  narrow.addEventListener('change', syncAccess);
  root.dataset.enhanced = 'true';
  root.querySelector('.journey-mobile-tabs').hidden = false;
  select(0, false);
})();
