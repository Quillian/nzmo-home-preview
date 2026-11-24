(() => {
  const linkSelector = 'a[data-project-enquiry]';
  const source = '/servis/kak-my-rabotaem/';
  if (!document.querySelector(linkSelector) || !window.HTMLDialogElement) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'calc-lead project-enquiry';
  dialog.setAttribute('aria-labelledby', 'project-enquiry-title');
  dialog.innerHTML = '<button type="button" class="calc-lead__close" aria-label="Закрыть">×</button><h2 id="project-enquiry-title">Посчитать проект</h2><div data-enquiry-body><p role="status">Загружаем форму…</p></div>';
  const body = dialog.querySelector('[data-enquiry-body]');
  let opener;
  let formPromise;

  async function prepareForm() {
    // Use the same form, consent and attachments as the full enquiry page.
    const response = await fetch(source, {credentials: 'same-origin'});
    if (!response.ok) throw new Error('Form unavailable');
    const template = document.createElement('template');
    template.innerHTML = await response.text();
    const form = template.content.querySelector('#cta form[data-lead="quote"]');
    if (!form) throw new Error('Form unavailable');
    form.classList.remove('cta2__form');
    form.classList.add('calc-lead__form');
    form.elements.page.value = location.pathname;
    if (location.pathname !== '/' && location.pathname !== source) {
      form.elements.config.value = document.querySelector('main h1')?.textContent.trim() || '';
    }
    body.replaceChildren(form);
    form.dispatchEvent(new CustomEvent('nzmo:lead-init', {bubbles: true}));
    if (!form.dataset.leadReady) throw new Error('Form unavailable');
    if (dialog.open && dialog.contains(document.activeElement)) {
      form.querySelector('[data-lead-contact]').focus({preventScroll: true});
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest(linkSelector);
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    if (!dialog.isConnected) document.body.append(dialog);
    dialog.showModal();
    document.documentElement.classList.add('calc-lead-open');
    if (!formPromise) {
      formPromise = prepareForm().catch(() => {
        body.innerHTML = '<p>Не удалось загрузить форму.</p><a class="btn btn--navy" href="/servis/kak-my-rabotaem/#cta">Перейти к расчёту</a>';
        formPromise = null;
      });
    } else {
      body.querySelector('[data-lead-contact]')?.focus({preventScroll: true});
    }
  });

  dialog.querySelector('.calc-lead__close').addEventListener('click', () => dialog.close());
  let pressedOutside = false;
  const outside = e => {
    const r = dialog.getBoundingClientRect();
    return e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom);
  };
  dialog.addEventListener('pointerdown', e => { pressedOutside = outside(e); });
  dialog.addEventListener('click', e => { if (pressedOutside && outside(e)) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('calc-lead-open');
    opener?.focus({preventScroll: true});
  });
})();
