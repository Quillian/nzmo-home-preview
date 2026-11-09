(() => {
  const dialog = document.querySelector('[data-maf-dialog]');
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let opener;
  document.querySelectorAll('[data-maf-photo]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      const thumbnail = button.querySelector('img');
      image.src = button.dataset.full;
      image.alt = thumbnail.alt;
      caption.textContent = button.dataset.caption || thumbnail.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); opener?.focus({preventScroll:true}); });
  document.querySelectorAll('[data-maf-idea]').forEach(link => {
    link.addEventListener('click', () => {
      const form = document.querySelector('#cta form');
      const field = form?.querySelector('textarea[name=message]');
      if (!field) return;
      const text = 'Интересует объект по примеру: ' + link.dataset.mafIdea;
      if (!field.value.includes(text)) field.value = [field.value.trim(), text].filter(Boolean).join('\n');
      field.dispatchEvent(new Event('input', {bubbles:true}));
      form.querySelector('.lead-preferences').open = true;
      form.querySelector('[name=contact]').focus({preventScroll:true});
    });
  });
})();
