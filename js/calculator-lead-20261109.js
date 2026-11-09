/* A fresh calculation snapshot is captured on each open; CRM uses the shared lead adapter. */
(() => {
  'use strict';
  const boxes = [...document.querySelectorAll('[data-railcalc],[data-gcalc],[data-t24calc]')];
  if (!boxes.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'calc-lead'; dialog.setAttribute('aria-labelledby','calc-lead-title');
  dialog.innerHTML = `<button type="button" class="calc-lead__close" aria-label="Закрыть форму">×</button>
    <h2 id="calc-lead-title">Получить точный расчёт</h2>
    <p class="calc-lead__summary" data-calc-summary></p>
    <details class="calc-lead__details"><summary>Параметры расчёта</summary><pre data-calc-parameters tabindex="0" role="region" aria-label="Параметры и комплектующие"></pre></details>
    <form class="form lead-form lead-form--compact calc-lead__form" data-lead="quote" data-lead-v2 action="/spasibo/" method="post" novalidate>
      <input type="hidden" name="config"><input type="hidden" name="product"><input type="hidden" name="quantity"><input type="hidden" name="contact_method" data-contact-method value="phone">
      <label><span data-contact-label>Телефон</span><input name="contact" data-lead-contact type="tel" inputmode="tel" autocomplete="tel" maxlength="40" required placeholder="+7 999 123-45-67"></label>
      <label class="consent"><input type="checkbox" name="agree" required><span>Согласен на <a href="/soglasie-na-obrabotku-dannyh/" target="_blank" rel="noopener">обработку персональных данных</a>. <a href="/politika-konfidentsialnosti/" target="_blank" rel="noopener">Политика конфиденциальности</a></span></label>
      <p class="lead-status" data-lead-status role="status" hidden></p>
      <button type="submit" class="btn btn--navy lead-submit" data-lead-submit data-lead-action="Получить расчёт" disabled>Получить расчёт</button>
    </form>`;
  document.body.append(dialog);
  const form=dialog.querySelector('form'), phone=form.elements.namedItem('contact');
  form.dispatchEvent(new CustomEvent('nzmo:lead-init',{bubbles:true}));
  let opener=null;
  function text(box,selector){return box.querySelector(selector)?.innerText.trim()||'';}
  function snapshot(box){
    const rail=box.hasAttribute('data-railcalc'), grill=box.hasAttribute('data-gcalc');
    const title=rail?'Реечный потолок':grill?'Потолок Грильято':'Потолок Т24';
    const fields=rail?[['s','Площадь','м²'],['p','Стены у торцов реек','м'],['sec','Сечение: высота × ширина','мм'],['g','Шаг между рейками','мм'],['l','Длина рейки','мм'],['z','Запас на подрезку','%']]:grill?[['s','Площадь','м²'],['p','Периметр','м'],['c','Ячейка','мм'],['h','Высота профиля','мм'],['z','Запас на подрезку','%']]:[['s','Площадь','м²'],['p','Периметр','м'],['t','Плита',''],['z','Запас на подрезку','%']];
    const lines=fields.map(([key,label,unit])=>label+': '+box.querySelector('[name="'+key+'"]').value.replace('x',' × ')+(unit?' '+unit:''));
    const result=rail||grill?[text(box,'.rc__hero'),...Array.from(box.querySelectorAll('.rc__kpi>div,.rc__parts>li'),el=>el.innerText.replace(/\s*\n\s*/g,' — '))].join('\n'):text(box,'.gc-out table');
    const area=box.querySelector('[name=s]').value;
    return {title,area,summary:title+' · '+area+' м²',config:[title,...lines,'','Предварительный расчёт комплектующих:',result].join('\n')};
  }
  boxes.forEach(box=>{
    const trigger=box.querySelector('[data-rc-cta],[data-gc-cta]');if(!trigger)return;
    trigger.setAttribute('aria-haspopup','dialog');
    // Capture before legacy calculator anchor handlers, preserving their calculation logic.
    trigger.addEventListener('click',event=>{
      event.preventDefault();event.stopImmediatePropagation();
      for(const input of box.querySelectorAll('input[type=number]')){
        if(!input.value.trim()){input.setCustomValidity('Укажите значение.');}else input.setCustomValidity('');
        if(!input.reportValidity())return;
      }
      const data=snapshot(box);
      form.elements.namedItem('config').value=data.config;
      form.elements.namedItem('product').value=data.title;
      form.elements.namedItem('quantity').value=data.area+' м²';
      dialog.querySelector('[data-calc-summary]').textContent=data.summary;
      dialog.querySelector('[data-calc-parameters]').textContent=data.config;
      dialog.querySelector('details').open=false;
      opener=trigger;dialog.showModal();document.documentElement.classList.add('calc-lead-open');phone.focus({preventScroll:true});
    },true);
    box.addEventListener('input',e=>{if(e.target.matches('input'))e.target.setCustomValidity('');});
  });
  dialog.querySelector('.calc-lead__close').addEventListener('click',()=>dialog.close());
  let backdrop=false;
  dialog.addEventListener('pointerdown',e=>{const r=dialog.getBoundingClientRect();backdrop=e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom);});
  dialog.addEventListener('click',e=>{if(backdrop&&e.target===dialog)dialog.close();backdrop=false;});
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('calc-lead-open');opener?.focus({preventScroll:true});});
})();
