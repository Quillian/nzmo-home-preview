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
      heading.textContent = link.dataset.enquiryForm ? link.textContent.trim() : title;
      beforeOpen?.(body, link);
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

  function setTopic(form, topic) {
    if (!topic || !form.elements.config) return;
    form.elements.config.value = topic;
    let echo = form.querySelector('[data-config-echo]');
    if (!echo) {
      echo = document.createElement('div');
      echo.className = 'lead-config';
      echo.dataset.configEcho = '';
      form.prepend(echo);
    }
    echo.textContent = 'Тема заявки · ' + topic;
    echo.hidden = false;
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
      form.removeAttribute('id');
      form.classList.remove('cta2__form');
      form.classList.add('calc-lead__form');
      form.elements.page.value = location.pathname;
      if (location.pathname !== '/' && location.pathname !== source) {
        setTopic(form, document.querySelector('#cta [name=config]')?.value || document.querySelector('main h1')?.textContent.trim());
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

  const registered = new Set();
  for (const trigger of document.querySelectorAll('[data-enquiry-form]')) {
    const form = document.getElementById(trigger.dataset.enquiryForm);
    if (!form || registered.has(form)) continue;
    registered.add(form);
    // Keep the contact, selected files and validation state when switching views.
    const marker = document.createComment('inline enquiry form');
    form.before(marker);
    const submit = form.querySelector('[data-lead-submit]');
    const echo = form.querySelector('[data-config-echo]');
    let previous;
    registerDialog({
      selector: '[data-enquiry-form="' + CSS.escape(form.id) + '"]',
      titleId: form.id + '-title',
      title: trigger.textContent.trim(),
      beforeOpen(body, link) {
        previous = {topic: form.elements.config?.value, content: echo ? [...echo.childNodes] : [], hidden: echo?.hidden,
          kind: form.dataset.lead, action: submit?.dataset.leadAction, label: submit?.textContent};
        setTopic(form, link.dataset.enquiryTopic || previous.topic);
        if (link.dataset.enquiryKind && submit) {
          form.dataset.lead = link.dataset.enquiryKind;
          submit.textContent = submit.dataset.leadAction = form.dataset.lead === 'engineer'
            ? 'Запросить консультацию' : 'Получить расчёт';
        }
        form.classList.replace('cta2__form', 'calc-lead__form');
        body.replaceChildren(form);
      },
      onOpen() { form.querySelector('[data-lead-contact]').focus({preventScroll: true}); },
      afterClose() {
        form.classList.replace('calc-lead__form', 'cta2__form');
        marker.after(form);
        if (form.elements.config) form.elements.config.value = previous.topic || '';
        if (echo) { echo.replaceChildren(...previous.content); echo.hidden = previous.hidden; }
        else form.querySelector('[data-config-echo]')?.remove();
        form.dataset.lead = previous.kind;
        if (submit && previous.action) {
          submit.dataset.leadAction = previous.action;
          submit.textContent = previous.label;
        }
      }
    });
    if (trigger.id) {
      const openLinkedForm = () => {
        if (location.hash === '#' + trigger.id && !document.querySelector('dialog[open]')) trigger.click();
      };
      window.addEventListener('hashchange', openLinkedForm);
      openLinkedForm();
    }
  }
})();
