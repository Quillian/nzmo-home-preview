(() => {
  const gallery = document.querySelector('.shipment-gallery');
  if (!gallery) return;

  const strip = gallery.querySelector('.shipment-gallery__strip');
  const photos = Array.from(strip.querySelectorAll('img'));
  const controls = gallery.querySelector('.shipment-gallery__controls');
  const toggle = controls.querySelector('[data-play]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const speed = 48; // CSS pixels per second
  let playing = !reducedMotion.matches;
  let inView = false;
  let dragging = false;
  let frame = 0;
  let lastTime;
  let position = 0;
  let cycle = 0;
  let resumeTimer;

  // The second copy makes the last-to-first transition one ordinary photo gap.
  const copies = photos.map(photo => {
    const copy = photo.cloneNode(false);
    copy.alt = '';
    copy.setAttribute('aria-hidden', 'true');
    return copy;
  });
  strip.append(...copies);
  strip.classList.add('is-looping');

  function measure() {
    cycle = copies[0].getBoundingClientRect().left - photos[0].getBoundingClientRect().left;
    position = strip.scrollLeft;
  }

  function tick(time) {
    // Adopt the native scroll position after a swipe or a keyboard scroll.
    if (Math.abs(strip.scrollLeft - position) > 1) position = strip.scrollLeft;
    if (lastTime !== undefined && cycle > 0) {
      position = (position + speed * Math.min(time - lastTime, 100) / 1000) % cycle;
      strip.scrollLeft = position;
    }
    lastTime = time;
    frame = requestAnimationFrame(tick);
  }

  function update() {
    cancelAnimationFrame(frame);
    lastTime = undefined;
    toggle.dataset.play = playing ? 'on' : 'off';
    toggle.title = playing ? 'Приостановить показ' : 'Включить автопоказ';
    toggle.setAttribute('aria-label', toggle.title);
    if (playing && inView && !dragging && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function step(direction) {
    if (!cycle) return;
    const left = strip.scrollLeft % cycle;
    const stops = photos.map(photo => photo.offsetLeft);
    position = direction > 0
      ? stops.find(x => x > left + 2) ?? 0
      : stops.reverse().find(x => x < left - 2) ?? photos[photos.length - 1].offsetLeft;
    strip.scrollLeft = position;
    lastTime = undefined;
  }

  function beginDrag() {
    clearTimeout(resumeTimer);
    dragging = true;
    update();
  }
  function endDrag() {
    if (!dragging) return;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      dragging = false;
      position = strip.scrollLeft;
      update();
    }, 450);
  }

  measure();
  new ResizeObserver(measure).observe(strip);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    update();
  }).observe(strip);
  controls.hidden = false;
  controls.querySelector('[data-prev]').addEventListener('click', () => step(-1));
  controls.querySelector('[data-next]').addEventListener('click', () => step(1));
  toggle.addEventListener('click', () => { playing = !playing; update(); });
  strip.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  });
  strip.addEventListener('pointerdown', beginDrag);
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  strip.addEventListener('wheel', event => {
    if (event.deltaX || event.shiftKey) { beginDrag(); endDrag(); }
  }, { passive: true });
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', () => { playing = !reducedMotion.matches; update(); });
  update();
})();
