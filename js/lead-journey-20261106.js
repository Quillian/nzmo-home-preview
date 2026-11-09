/* UI only until P0-FORMS is completed. CRM adapter must return a verified receipt.
   NzmoLeadTransport: ready === true, create(payload, {requestId, files}) -> {id, token, attachmentsAccepted:true when files exist},
   append({id, token}, payload, files, {requestId}) -> {id, accepted:true}.
   No credentials, simulated server responses or real conversion events in preview. */
(function () {
  'use strict';
  const KEY = 'nzmo_lead_v2';
  const TTL = 2 * 60 * 60 * 1000;
  const methods = {phone:'По телефону',telegram:'В Telegram',max:'В MAX',email:'По электронной почте'};
  const transport = () => window.NzmoLeadTransport && window.NzmoLeadTransport.ready === true ? window.NzmoLeadTransport : null;
  const value = (form, name) => String(form.elements.namedItem(name)?.value || '').trim();
  const uuid = () => crypto.randomUUID();
  const save = data => { try { sessionStorage.setItem(KEY, JSON.stringify({...data, savedAt: Date.now()})); return true; } catch (_) { return false; } };
  const read = () => { try { const d=JSON.parse(sessionStorage.getItem(KEY)); if(d && typeof d==='object' && d.payload && typeof d.payload==='object' && Date.now()-d.savedAt<TTL && d.savedAt<=Date.now()) return d; sessionStorage.removeItem(KEY); } catch (_) {} return null; };
  const event = (action,kind) => document.dispatchEvent(new CustomEvent('nzmo:lead-ui',{detail:{action,kind}}));
  function status(node, message, error=false) { node.hidden=false;node.textContent=message;node.classList.toggle('is-error',error); }
  function setupContact(form) {
    const input=form.querySelector('[data-lead-contact]'), select=form.querySelector('[data-contact-method]');
    if(!input || !select)return;
    function update(){
      const labels={phone:['Телефон','+7 999 123-45-67','tel','tel'],telegram:['Имя пользователя в Telegram','@username','text','off'],max:['Телефон для связи в MAX','+7 999 123-45-67','tel','tel'],email:['Email','mail@company.ru','email','email']};
      const spec=labels[select.value] || ['Телефон или email','+7 999 123-45-67','text','off'];
      const label=form.querySelector('[data-contact-label]');label.replaceChildren(document.createTextNode(spec[0]+' '));
      if(!form.classList.contains('lead-form--compact')){const small=document.createElement('small');small.textContent=input.required?'обязательно':'необязательно';label.append(small);}
      const summary=form.querySelector('[data-reply-summary]');if(summary)summary.textContent=select.value?'Ответ: '+methods[select.value].toLowerCase():'Выбрать способ ответа';
      input.spellcheck=false;input.autocapitalize='none';input.type=spec[2];input.autocomplete=spec[3];input.placeholder=spec[1];input.inputMode=spec[2]==='tel'?'tel':spec[2]==='email'?'email':'text';input.setCustomValidity('');
    }
    select.addEventListener('change',update);input.addEventListener('input',()=>input.setCustomValidity(''));update();
    return update;
  }
  function validate(form, required=true) {
    const input=form.querySelector('[data-lead-contact]'), mode=value(form,'contact_method'), contact=input.value.trim();
    input.setCustomValidity('');
    const phone=/^\+?[\d\s().-]+$/.test(contact) && contact.replace(/\D/g,'').length>=10 && contact.replace(/\D/g,'').length<=15;
    const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const telegram=/^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(contact) || /^https:\/\/t\.me\/[A-Za-z][A-Za-z0-9_]{4,31}\/?$/.test(contact);
    let message='';
    if(required && !contact)message='Укажите телефон или email для связи.';
    else if(contact && mode==='email' && !email)message='Проверьте email: например, mail@company.ru.';
    else if(contact && (mode==='phone'||mode==='max') && !phone)message='Введите номер полностью, с кодом страны.';
    else if(contact && mode==='telegram' && !telegram)message='Укажите имя пользователя Telegram: @username. Его можно найти в настройках Telegram.';
    else if(contact && !mode && !phone && !email)message='Укажите полный телефон или email. Для Telegram выберите способ ответа.';
    if(message)input.setCustomValidity(message);
    const invalid=[...form.elements].find(el=>typeof el.checkValidity==='function'&&!el.checkValidity());
    if(invalid){const details=invalid.closest('details');if(details)details.open=true;invalid.reportValidity();return false;}
    return true;
  }
  function payload(form, previous={}){
    const next={...previous};
    for(const name of ['name','contact','contact_method','message','city','deadline','product','quantity','contact_time','config'])if(form.elements.namedItem(name))next[name]=value(form,name);
    next.agree=!!form.elements.namedItem('agree')?.checked;
    return next;
  }
  // Local, expiring attachment draft. Binary content never enters sessionStorage.
  function fileStore(action, key, files) {
    return new Promise((resolve,reject)=>{
      let request;try{request=indexedDB.open('nzmo-lead-attachments',1);}catch(_){reject(new Error('file-storage'));return;}
      request.onupgradeneeded=()=>request.result.createObjectStore('drafts',{keyPath:'key'});
      request.onerror=()=>reject(new Error('file-storage'));
      request.onsuccess=()=>{
        const db=request.result, tx=db.transaction('drafts','readwrite'), store=tx.objectStore('drafts');let result=[];
        const sweep=store.openCursor();sweep.onsuccess=()=>{const c=sweep.result;if(c){if(Date.now()-c.value.savedAt>TTL)c.delete();c.continue();}};
        if(action==='put')store.put({key,files,savedAt:Date.now()});
        if(action==='delete')store.delete(key);
        if(action==='get'){const get=store.get(key);get.onsuccess=()=>{const d=get.result;if(d&&Date.now()-d.savedAt<=TTL)result=d.files||[];};}
        tx.oncomplete=()=>{db.close();resolve(result);};
        tx.onerror=tx.onabort=()=>{db.close();reject(new Error('file-storage'));};
      };
    });
  }
  function setupFiles(form, changed=()=>{}) {
    const input=form.querySelector('[data-lead-files]');if(!input)return null;
    const drop=form.querySelector('[data-file-drop]'),list=form.querySelector('[data-file-list]'),error=form.querySelector('[data-file-error]'),hint=form.querySelector('[data-file-hint]'),count=form.querySelector('[data-file-count]');
    hint.id='file-hint-'+uuid();input.setAttribute('aria-describedby',hint.id);
    let files=[],depth=0;
    const allowed=/\.(pdf|jpe?g|png|webp|heic|heif|dwg|dxf|docx?|xlsx?|zip)$/i;
    function render(){
      list.replaceChildren();count.textContent=files.length?`${files.length} из 5 · ${(files.reduce((n,f)=>n+f.size,0)/1048576).toLocaleString('ru-RU',{maximumFractionDigits:1})} МБ`:'';
      for(const [index,file] of files.entries()){
        const li=document.createElement('li'),name=document.createElement('span'),button=document.createElement('button');
        name.textContent=file.name+' · '+(file.size<1048576?Math.max(1,Math.ceil(file.size/1024))+' КБ':(file.size/1048576).toLocaleString('ru-RU',{maximumFractionDigits:1})+' МБ');
        button.type='button';button.textContent='Убрать';button.setAttribute('aria-label','Убрать файл '+file.name);
        button.onclick=()=>{files.splice(index,1);error.hidden=true;render();changed();};li.append(name,button);list.append(li);
      }
    }
    function add(incoming){
      error.hidden=true;const candidate=[...files];
      for(const file of incoming)if(!candidate.some(f=>f.name===file.name&&f.size===file.size&&f.lastModified===file.lastModified))candidate.push(file);
      let message='';
      if(candidate.some(f=>!allowed.test(f.name)||/^(text\/html|image\/svg\+xml|application\/(x-msdownload|x-executable|javascript))$/i.test(f.type)))message='Этот формат не подходит. Выберите PDF, JPG, PNG, WebP, HEIC, DWG, DXF, Word, Excel или ZIP.';
      else if(candidate.some(f=>!f.size))message='Пустой файл не добавлен. Проверьте его и выберите заново.';
      else if(candidate.length>5)message='Можно прикрепить до 5 файлов. Уберите лишние и попробуйте снова.';
      else if(candidate.some(f=>f.size>10*1048576))message='Один файл должен быть не больше 10 МБ. Уменьшите его размер и попробуйте снова.';
      else if(candidate.reduce((n,f)=>n+f.size,0)>20*1048576)message='Общий размер — не больше 20 МБ. Уберите лишнее или уменьшите файлы.';
      if(message){error.textContent=message;error.hidden=false;}else{files=candidate;render();changed();}
      input.value='';
    }
    input.addEventListener('change',()=>add([...input.files]));
    drop.addEventListener('dragenter',e=>{if([...e.dataTransfer.types].includes('Files')){e.preventDefault();depth++;drop.classList.add('is-over');}});
    drop.addEventListener('dragover',e=>{if([...e.dataTransfer.types].includes('Files')){e.preventDefault();e.dataTransfer.dropEffect='copy';}});
    drop.addEventListener('dragleave',e=>{e.preventDefault();if(--depth<=0){depth=0;drop.classList.remove('is-over');}});
    drop.addEventListener('drop',e=>{e.preventDefault();depth=0;drop.classList.remove('is-over');add([...e.dataTransfer.files]);});
    render();
    return {get:()=>[...files],set:next=>{files=next;render();},lock:locked=>{input.disabled=locked;list.querySelectorAll('button').forEach(b=>b.disabled=locked);drop.inert=locked;}};
  }

  document.querySelectorAll('form[data-lead-v2]').forEach(form=>{
    setupContact(form);
    const button=form.querySelector('[data-lead-submit]'), output=form.querySelector('[data-lead-status]');
    button.disabled=false;
    let busy=false, requestId=uuid(), previousPayload='', fileKey=uuid();
    const attachments=setupFiles(form,()=>{requestId=uuid();});
    form.addEventListener('submit',async e=>{
      e.preventDefault();if(busy||!validate(form))return;
      busy=true;button.disabled=true;output.hidden=true;
      const data=payload(form);data.kind=form.dataset.lead || 'quote';data.page=location.pathname;data.pageTitle=document.querySelector('h1')?.textContent.trim().slice(0,240)||'';
      data.utm={};const query=new URLSearchParams(location.search);for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'])if(query.has(k))data.utm[k]=query.get(k).slice(0,300);
      const serialized=JSON.stringify(data);if(previousPayload && serialized!==previousPayload)requestId=uuid();previousPayload=serialized;
      let draft={payload:data,mode:'preview'};
      const files=attachments.get();attachments.lock(true);
      try {
        if(files.length){await fileStore('put',fileKey,files);draft.fileKey=fileKey;}
        else await fileStore('delete',fileKey,[]).catch(()=>{});
        if(transport()){
          button.textContent='Отправляем…';
          const receipt=await transport().create(data,{requestId,files});
          if(!receipt || typeof receipt.id!=='string' || !receipt.id || typeof receipt.token!=='string' || !receipt.token)throw new Error('receipt');
          if(files.length && receipt.attachmentsAccepted!==true)throw new Error('attachments');
          draft={...draft,mode:'accepted',receipt:{id:receipt.id,token:receipt.token}};
          if(files.length){await fileStore('delete',fileKey).catch(()=>{});delete draft.fileKey;}
        }
        if(!save(draft)){
          status(output,draft.mode==='accepted'?'Заявка принята. Не удалось открыть следующий шаг: браузер ограничил хранение данных. Позвоните нам, если хотите добавить детали.':'Браузер запретил сохранение черновика. Разрешите хранение данных для сайта или свяжитесь с нами напрямую.',draft.mode!=='accepted');
          if(draft.mode==='accepted'){button.textContent='Заявка принята';return;}
          throw new Error('storage');
        }
        event(draft.mode==='accepted'?'accepted':'preview',data.kind);
        location.assign('/spasibo/');
      } catch(error){
        if(error.message==='file-storage')status(output,'Не удалось сохранить вложения в браузере. Файлы остались здесь: попробуйте ещё раз или уберите их, чтобы продолжить без вложений.',true);
        else if(error.message!=='storage')status(output,'Не удалось отправить заявку. Данные остались в форме. Попробуйте ещё раз или свяжитесь с нами напрямую.',true);
        attachments.lock(false);busy=false;button.disabled=false;button.textContent=transport()?'Повторить отправку':button.dataset.leadAction;
      }
    });
  });
  const root=document.querySelector('[data-lead-next]');if(!root)return;
  let draft=read() || {mode:'preview',payload:{}};
  const form=root.querySelector('[data-lead-details]'), output=form.querySelector('[data-details-status]');
  const contactSection=form.querySelector('#lead-contact-edit'), consent=form.elements.namedItem('agree');
  const accepted=draft.mode==='accepted' && draft.receipt && typeof draft.receipt.id==='string' && typeof draft.receipt.token==='string';
  form.elements.namedItem('contact').required=!!accepted;
  for(const name of ['name','contact','contact_method','message','city','deadline','product','quantity','contact_time'])if(typeof draft.payload[name]==='string' && form.elements.namedItem(name))form.elements.namedItem(name).value=draft.payload[name];
  if(!value(form,'product') && /^\/(potolki|steny-i-kolonny|fasady|ograzhdeniya|chistye-pomeshcheniya|mebel|dveri|maf|osveshchenie|nestandart)\//.test(draft.payload.page||''))form.elements.namedItem('product').value=(draft.payload.pageTitle||'').slice(0,240);
  if(!value(form,'message') && draft.payload.config)form.elements.namedItem('message').value=draft.payload.config.slice(0,5000);
  consent.checked=!!draft.payload.agree;consent.required=!!accepted;
  if(consent.checked)form.querySelector('[data-details-consent]').hidden=true;
  setupContact(form);
  if(!draft.payload.contact){contactSection.open=true;root.querySelector('.lead-next__card-head p').textContent='Заполните только то, что известно. В этой версии сайта можно подготовить и скачать текст запроса.';}
  function summary(){
    const contact=value(form,'contact');root.querySelector('[data-receipt-summary]').hidden=!contact;
    root.querySelector('[data-receipt-contact]').textContent=contact;
    root.querySelector('[data-receipt-method]').textContent=methods[value(form,'contact_method')] || 'Способ ответа — на усмотрение менеджера';
  }
  summary();
  root.querySelector('[href="#lead-contact-edit"]').addEventListener('click',e=>{e.preventDefault();const panel=form.closest('[data-details-panel]');if(panel)panel.open=true;contactSection.open=true;form.elements.namedItem('contact').focus();});
  if(accepted){
    root.classList.add('is-confirmed');root.querySelector('[data-receipt-title]').textContent='Спасибо, заявку получили';
    root.querySelector('[data-receipt-status]').textContent='Заявка принята';
    root.querySelector('[data-receipt-description]').textContent='Свяжемся с вами в течение рабочего дня'+(draft.payload.contact_method?'. Выбранный способ: '+methods[draft.payload.contact_method].toLowerCase()+'.':'.');
    root.querySelector('[data-receipt-notice]').hidden=true;
    if(transport() && typeof transport().append==='function'){
      form.querySelector('[data-details-submit]').textContent='Дополнить заявку';
      form.querySelector('[data-details-hint]').textContent='Дополнение прикрепим к вашей заявке. Повторно отправлять контакт не нужно.';
    }else form.querySelector('[data-details-hint]').textContent='Заявка принята, но отправка дополнений сейчас недоступна. Сохраните текст запроса или свяжитесь с нами напрямую.';
  }else if(draft.payload.contact){root.querySelector('[data-receipt-status]').textContent='Предпросмотр · заявка не отправлена';}
  let requestId=uuid(), busy=false;
  const attachments=setupFiles(form,()=>{requestId=uuid();});
  const restoreFiles=(draft.fileKey?fileStore('get',draft.fileKey).then(files=>attachments.set(files)).catch(()=>status(output,'Не удалось восстановить вложения. Прикрепите файлы заново.',true)):Promise.resolve());
  attachments.lock(true);restoreFiles.finally(()=>attachments.lock(false));
  form.addEventListener('input',()=>{requestId=uuid();});
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(busy || !validate(form,!!accepted))return;
    const data=payload(form,draft.payload), button=form.querySelector('[data-details-submit]');
    busy=true;button.disabled=true;
    await restoreFiles;attachments.lock(true);const files=attachments.get();
    try {
      if(accepted && transport() && typeof transport().append==='function'){
        const receipt=await transport().append(draft.receipt,data,files,{requestId});
        if(!receipt || receipt.id!==draft.receipt.id || receipt.accepted!==true)throw new Error('receipt');
        attachments.set([]);if(draft.fileKey)await fileStore('delete',draft.fileKey).catch(()=>{});delete draft.fileKey;status(output,'Детали добавлены к вашей заявке. Спасибо — это поможет подготовить расчёт.');event('details_accepted',data.kind);
      }else {
        if(files.length){draft.fileKey=draft.fileKey||uuid();await fileStore('put',draft.fileKey,files);}
        else if(draft.fileKey){await fileStore('delete',draft.fileKey);delete draft.fileKey;}
        status(output,'Детали и вложения сохранены в этом браузере на 2 часа, но не отправлены. Вы можете скачать текст запроса.');
      }
      draft={...draft,payload:data};const saved=save(draft);
      if(!saved)status(output,accepted?'Дополнение обработано, но браузер не сохранил его в этой вкладке.':'Браузер не сохранил черновик. Скачайте текст запроса до закрытия страницы.',true);
      summary();
    }catch(_){status(output,'Не удалось передать дополнение. Текст и файлы остались здесь. Попробуйте ещё раз.',true);}
    finally{attachments.lock(false);busy=false;button.disabled=false;}
  });
  form.querySelector('[data-download-brief]').addEventListener('click',()=>{
    const data=payload(form,draft.payload), labels={name:'Имя',contact:'Контакт',contact_method:'Способ связи',contact_time:'Удобное время',product:'Продукция',city:'Город',quantity:'Объём',deadline:'Срок',message:'Задача',config:'Параметры расчёта'};
    const lines=['Запрос в НЗМО',accepted?'Дополнительные сведения к заявке':'Черновик — не отправлен в НЗМО',''];
    for(const [key,label]of Object.entries(labels))if(data[key])lines.push(label+': '+(key==='contact_method'?methods[data[key]]||data[key]:data[key]));
    const files=attachments.get();if(files.length)lines.push('','Файлы (не вложены в этот текст):',...files.map(f=>f.name));
    const url=URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/plain;charset=utf-8'})), a=document.createElement('a');a.href=url;a.download='zapros-nzmo.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  const page=draft.payload.page||'';
  const resources=root.querySelector('[data-lead-resources]');
  let chosen=null;
  if(page.startsWith('/chistye-pomeshcheniya/'))chosen=[['/stati/chem-otdelyvayut-operatsionnuyu/','Подготовка проекта','Отделка операционной','Вопросы, которые стоит решить до закупки.'],['/chistye-pomeshcheniya/','Комплектация','Изделия для чистых помещений','Панели, потолки и другие элементы системы.']];
  else if(page && !page.startsWith('/potolki/') && page!=='/' && !page.startsWith('/servis/') && !page.startsWith('/kontakty/') && !page.startsWith('/stati/'))chosen=[['/stati/','Журнал НЗМО','Разобраться перед заказом','Материалы о продукции, проектировании и выборе комплектующих.'],['/servis/dostavka-i-oplata/','Поставка','Доставка и упаковка','Как подготовить получение изделий на объекте.']];
  if(chosen)chosen.forEach(([href,tag,title,text],i)=>{const a=resources.children[i];a.href=href;a.querySelector('span').textContent=tag;a.querySelector('h3').textContent=title;a.querySelector('p').textContent=text;});
})();
