(() => {
  const section = document.querySelector('#komu');
  const form = document.querySelector('#cta form[data-lead-v2]');
  if (!section || !form) return;

  function openDialog(dialog) {
    if (dialog && !dialog.open) dialog.showModal();
  }

  section.querySelectorAll('[data-partner-open]').forEach(link => {
    const dialog = document.getElementById(link.dataset.partnerOpen);
    link.addEventListener('click', event => {
      event.preventDefault();
      openDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      if (location.hash === '#' + dialog.id) {
        history.replaceState(null, '', location.pathname + location.search + '#komu');
      }
    });
    dialog.querySelector('[data-partner-apply]').addEventListener('click', () => {
      const role = dialog.dataset.partnerRole;
      form.elements.config.value = 'Сотрудничество — ' + role;
      const summary = form.querySelector('[data-config-echo]');
      summary.textContent = 'Направление — ' + role;
      summary.hidden = false;
      dialog.close();
      requestAnimationFrame(() => form.querySelector('[data-lead-contact]').focus());
    });
  });

  const openFromHash = () => {
    const dialog = document.getElementById(location.hash.slice(1));
    if (dialog?.matches('dialog[data-partner-role]')) openDialog(dialog);
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
