(() => {
  const dialog = document.querySelector('[data-maf-dialog]');
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let opener;
  const stage = document.querySelector('#raboty [data-stage]');
  document.querySelector('[data-maf-stage-photo]')?.addEventListener('click', event => {
    const current = stage?.querySelector('[data-slide]:not([hidden]) .stage__img');
    if (!current) return;
    opener = event.currentTarget;
    image.src = current.currentSrc || current.src;
    image.alt = current.alt;
    caption.textContent = stage.querySelector('[data-stage-title]').textContent;
    dialog.showModal();
  });
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
      const selected = link.dataset.mafIdea === 'stage'
        ? [stage.querySelector('[data-stage-title]').textContent, stage.querySelector('[data-stage-spec]').textContent].join(' — ')
        : link.dataset.mafIdea;
      const text = 'Интересует объект по примеру: ' + selected;
      if (!field.value.includes(text)) field.value = [field.value.trim(), text].filter(Boolean).join('\n');
      field.dispatchEvent(new Event('input', {bubbles:true}));
      form.querySelector('.lead-preferences').open = true;
      form.querySelector('[name=contact]').focus({preventScroll:true});
    });
  });
})();
