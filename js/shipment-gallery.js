(() => {
  const gallery = document.querySelector('.shipment-gallery');
  if (!gallery) return;

  const strip = gallery.querySelector('.shipment-gallery__strip');
  const photos = Array.from(strip.querySelectorAll('img'));
  const controls = gallery.querySelector('.shipment-gallery__controls');
  const toggle = controls.querySelector('[data-play]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reducedMotion.matches;
  let visible = false;
  let hovered = false;
  let timer;
  let explicitPlay = false;

  function advance(direction) {
    const left = strip.scrollLeft;
    const end = strip.scrollWidth - strip.clientWidth;
    const stops = photos.map(photo => Math.min(photo.offsetLeft, end));
    const target = direction > 0
      ? stops.find(x => x > left + 3) ?? 0
      : stops.reverse().find(x => x < left - 3) ?? end;
    const wrap = direction > 0 ? target < left : target > left;
    strip.scrollTo({ left: target, behavior: wrap || reducedMotion.matches ? 'instant' : 'smooth' });
  }

  function schedule() {
    clearInterval(timer);
    toggle.dataset.play = playing ? 'on' : 'off';
    const label = playing ? 'Приостановить показ' : 'Включить автопоказ';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    if (playing && visible && !document.hidden && (explicitPlay || (!hovered && !gallery.contains(document.activeElement)))) {
      timer = setInterval(() => advance(1), 4500);
    }
  }

  controls.hidden = false;
  controls.querySelector('[data-prev]').addEventListener('click', () => advance(-1));
  controls.querySelector('[data-next]').addEventListener('click', () => advance(1));
  toggle.addEventListener('click', () => {
    playing = !playing;
    explicitPlay = playing;
    schedule();
  });
  strip.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    advance(event.key === 'ArrowLeft' ? -1 : 1);
  });
  strip.addEventListener('pointerdown', () => { playing = false; schedule(); });
  strip.addEventListener('wheel', event => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
      playing = false;
      schedule();
    }
  }, { passive: true });
  gallery.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') { hovered = true; explicitPlay = false; schedule(); }
  });
  gallery.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  gallery.addEventListener('focusin', () => { explicitPlay = false; schedule(); });
  gallery.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => { playing = !reducedMotion.matches; schedule(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); },
    { threshold: 0.15 }).observe(strip);
  schedule();
})();
