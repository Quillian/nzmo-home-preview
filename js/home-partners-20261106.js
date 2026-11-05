document.querySelectorAll('[data-partner-ribbon]').forEach((ribbon) => {
  const toggle = ribbon.querySelector('.partner-ribbon__toggle');
  const label = ribbon.querySelector('[data-motion-label]');
  if (!toggle || !label) return;
  toggle.hidden = false;
  const prepare = () => {
    const images = [...ribbon.querySelectorAll('img')];
    images.forEach((image) => { image.loading = 'eager'; });
    Promise.allSettled(images.map((image) => image.decode())).then(() => {
      ribbon.classList.add('is-ready');
    });
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        prepare();
      }
    });
    observer.observe(ribbon);
  } else {
    prepare();
  }
  toggle.addEventListener('click', () => {
    const paused = ribbon.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Продолжить движение логотипов' : 'Приостановить движение логотипов');
    label.textContent = paused ? 'Продолжить' : 'Пауза';
  });
});
