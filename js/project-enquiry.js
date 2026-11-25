(() => {
  if (!window.HTMLDialogElement) return;
  const source = '/servis/kak-my-rabotaem/';
  const linkSelector = 'a[data-project-enquiry]';

  function registerDialog({selector, titleId, title, beforeOpen, onOpen, afterClose}) {
    const dialog = document.createElement('dialog');
    dialog.className = 'calc-lead project-enquiry';
    dialog.setAttribute('aria-labelledby', titleId);
    dialog.innerHTML = '<button type="button" class="calc-lead__close" aria-label="Закрыть">×</button><h2></h2><div data-enquiry-body><p role="status">Загружаем форму…</p></div>';
    const heading = dialog.querySelector('h2');
    heading.id = titleId;
    heading.textContent = title;
    const body = dialog.querySelector('[data-enquiry-body]');
    let opener;

    document.addEventListener('click', event => {
      const link = event.target.closest(selector);
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      if (!dialog.isConnected) document.body.append(dialog);
      beforeOpen?.(body);
      dialog.showModal();
      document.documentElement.classList.add('calc-lead-open');
      onOpen(body);
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
      afterClose?.();
      document.documentElement.classList.remove('calc-lead-open');
      opener?.focus({preventScroll: true});
    });
  }

  if (document.querySelector(linkSelector)) {
    let formPromise;
    async function prepareForm(body) {
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
      if (body.closest('dialog[open]')) {
        form.querySelector('[data-lead-contact]').focus({preventScroll: true});
      }
    }
    registerDialog({
      selector: linkSelector,
      titleId: 'project-enquiry-title',
      title: 'Посчитать проект',
      onOpen(body) {
        if (!formPromise) {
          formPromise = prepareForm(body).catch(() => {
            body.innerHTML = '<p>Не удалось загрузить форму.</p><a class="btn btn--navy" href="/servis/kak-my-rabotaem/#cta">Перейти к расчёту</a>';
            formPromise = null;
          });
        } else {
          body.querySelector('[data-lead-contact]')?.focus({preventScroll: true});
        }
      }
    });
  }

  const trigger = document.querySelector('[data-enquiry-form]');
  const form = trigger && document.getElementById(trigger.dataset.enquiryForm);
  if (form) {
    // Keep the contact, selected files and validation state when switching views.
    const marker = document.createComment('inline enquiry form');
    form.before(marker);
    registerDialog({
      selector: '[data-enquiry-form]',
      titleId: 'mount-enquiry-title',
      title: trigger.textContent.trim(),
      beforeOpen(body) {
        form.classList.replace('cta2__form', 'calc-lead__form');
        body.replaceChildren(form);
      },
      onOpen() { form.querySelector('[data-lead-contact]').focus({preventScroll: true}); },
      afterClose() {
        form.classList.replace('calc-lead__form', 'cta2__form');
        marker.after(form);
      }
    });
  }
})();
