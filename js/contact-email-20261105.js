/* Explicit email hand-off: no simulated delivery or thank-you redirect. */
(() => {
  'use strict';
  document.querySelectorAll('form[data-email-draft]').forEach(form => {
    const phone = form.elements.namedItem('phone');
    phone.addEventListener('input', () => phone.setCustomValidity(''));
    form.addEventListener('submit', event => {
      event.preventDefault();
      const digits = phone.value.replace(/\D/g, '');
      if (!/^[78]\d{10}$/.test(digits)) {
        phone.setCustomValidity('Введите номер полностью: +7 и 10 цифр');
        phone.reportValidity();
        return;
      }
      if (!form.reportValidity()) return;
      const name = form.elements.namedItem('name').value.trim();
      if (!name) { form.elements.namedItem('name').focus(); return; }
      const body = 'Здравствуйте! Прошу рассчитать проект.\r\n\r\nИмя: ' + name + '\r\nТелефон: ' + phone.value + '\r\n\r\nОписание объекта: \r\nГород: \r\nНужный срок: \r\n\r\nСогласие на обработку персональных данных дано на сайте НЗМО.';
      const url = 'mailto:' + form.dataset.emailDraft + '?subject=' + encodeURIComponent('Расчёт проекта — НЗМО') + '&body=' + encodeURIComponent(body);
      const status = form.querySelector('[data-email-status]');
      status.querySelector('a').href = url;
      status.hidden = false;
      window.location.href = url;
    });
  });
})();
