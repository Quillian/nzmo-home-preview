(() => {
  const opener = document.querySelector('[data-sample-open]');
  const dialog = document.getElementById('sample-request');
  if (!opener || !dialog) return;

  opener.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.classList.add('calc-lead-open');
  });

  dialog.querySelector('.calc-lead__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('calc-lead-open');
    opener.focus({ preventScroll: true });
  });
})();
