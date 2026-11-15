(() => {
  const card = document.querySelector('[data-scratch-card]');
  if (!card) return;

  const foil = card.querySelector('canvas');
  const panel = foil.parentElement;
  const code = card.querySelector('code');
  const revealButton = card.querySelector('[data-scratch-reveal]');
  const requestLink = card.querySelector('[data-scratch-request]');
  const status = card.querySelector('[role="status"]');
  const context = foil.getContext('2d', { willReadFrequently: true });
  const { width, height } = foil;

  const offerCode = String(Math.floor(Math.random() * 100_000)).padStart(5, '0');
  const requestUrl = new URL(requestLink.href);
  requestUrl.searchParams.set('config', 'проект с кодом ' + offerCode);
  code.textContent = offerCode;
  requestLink.href = requestUrl.href;

  if (!context) {
    requestLink.hidden = false;
    return;
  }

  let revealed = false;
  let activePointer = null;
  let previousPoint = null;
  let hasScratched = false;
  let lastCoverageCheck = 0;

  function paintFoil() {
    context.globalCompositeOperation = 'source-over';
    const sheen = context.createLinearGradient(0, 0, width, height);
    sheen.addColorStop(0, '#a5b1bc');
    sheen.addColorStop(.31, '#e1e5e7');
    sheen.addColorStop(.56, '#b6c1c9');
    sheen.addColorStop(.78, '#dfe4e7');
    sheen.addColorStop(1, '#aebac2');
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);

    for (let y = 1; y < height; y += 3) {
      context.fillStyle = y % 2 ? '#ffffff22' : '#2a3f5815';
      context.fillRect(0, y, width, 1);
    }

    const bounds = panel.getBoundingClientRect();
    context.save();
    context.translate(width / 2, height / 2);
    context.scale(width / bounds.width, height / bounds.height);
    context.fillStyle = '#25394d';
    context.font = '600 15px Golos Text, system-ui, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Сотрите защитный слой', 0, 0);
    context.restore();
    context.globalCompositeOperation = 'destination-out';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 55;
  }

  function revealCode() {
    revealed = true;
    activePointer = null;
    previousPoint = null;
    panel.removeAttribute('data-scratching');
    foil.hidden = true;
    code.removeAttribute('aria-hidden');
    const moveFocus = document.activeElement === revealButton;
    revealButton.hidden = true;
    requestLink.hidden = false;
    if (moveFocus) requestLink.focus({ preventScroll: true });
    status.textContent = 'Ваш код: ' + offerCode;
  }

  function checkCoverage() {
    lastCoverageCheck = performance.now();
    const { data } = context.getImageData(0, 0, width, height);
    let total = 0;
    let erased = 0;

    for (let y = 4; y < height; y += 8) {
      for (let x = 4; x < width; x += 8) {
        if (data[(y * width + x) * 4 + 3] < 128) erased++;
        total++;
      }
    }

    if (erased / total >= .32) revealCode();
  }

  function scratch(event) {
    const bounds = foil.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
    const y = Math.max(0, Math.min(event.clientY - bounds.top, bounds.height));
    panel.style.setProperty('--coin-x', x + 'px');
    panel.style.setProperty('--coin-y', y + 'px');
    const current = { x: x * width / bounds.width, y: y * height / bounds.height };

    context.beginPath();
    if (previousPoint) {
      context.moveTo(previousPoint.x, previousPoint.y);
      context.lineTo(current.x, current.y);
      context.stroke();
    } else {
      context.arc(current.x, current.y, context.lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    }
    previousPoint = current;
  }

  function finishStroke(event) {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    previousPoint = null;
    panel.removeAttribute('data-scratching');
    checkCoverage();
  }

  revealButton.addEventListener('click', revealCode);
  revealButton.hidden = false;

  paintFoil();
  code.setAttribute('aria-hidden', 'true');
  foil.hidden = false;

  const refreshFoil = () => {
    if (!revealed && !hasScratched) paintFoil();
  };
  const resize = new ResizeObserver(refreshFoil);
  resize.observe(panel);
  document.fonts.ready.then(refreshFoil);

  foil.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || activePointer !== null) return;
    activePointer = event.pointerId;
    hasScratched = true;
    foil.setPointerCapture(event.pointerId);
    panel.setAttribute('data-scratching', '');
    scratch(event);
  });

  foil.addEventListener('pointermove', event => {
    if (event.pointerId !== activePointer) return;
    scratch(event);
    if (performance.now() - lastCoverageCheck >= 120) checkCoverage();
  });

  foil.addEventListener('pointerup', finishStroke);
  foil.addEventListener('pointercancel', finishStroke);
  foil.addEventListener('lostpointercapture', finishStroke);
})();
