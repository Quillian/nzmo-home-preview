const {test,expect}=require('@playwright/test');
const {AxeBuilder}=require('@axe-core/playwright');
const {PNG}=require('pngjs');
const routes=['/','/o-zavode/','/kontakty/','/potolki/reechnye/','/potolki/kassetnye/clip-in/','/spasibo/','/dveri/protivopozharnye/','/potolki/armstrong-t24/','/maf/','/obekty/','/servis/faq/'];
test('home delivery follows projects and workflow uses the single enquiry',async({page})=>{
  await page.goto('http://127.0.0.1:8765/');
  await expect(page.locator('#obekty + #dostavka')).toBeAttached();
  await expect(page.locator('#cta form')).toHaveCount(1);
  await expect(page.locator('#cta [data-stage]')).toHaveCount(4);
  await expect(page.locator('#napravleniya a[href="/dveri/"] img')).toHaveAttribute('src',/door-nzmo-render/);
});
test('MAF photos open in a dialog and return keyboard focus',async({page})=>{
  await page.goto('http://127.0.0.1:8765/maf/');
  const trigger=page.locator('#proizvodstvo [data-maf-photo]').first();
  await trigger.click();
  const dialog=page.locator('[data-maf-dialog]');
  await expect(dialog).toBeVisible();
  await expect.poll(()=>dialog.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test('MAF chosen object supplements rather than replaces the client comment',async({page})=>{
  await page.goto('http://127.0.0.1:8765/maf/');
  await page.locator('#cta summary').click();
  const message=page.locator('#cta textarea[name=message]');
  await message.fill('Срок — май.');
  const link=page.locator('[data-maf-idea]').first();
  await link.click();
  await expect(message).toHaveValue(/Срок — май\.[\s\S]*Биатлонист/);
  await expect(page.locator('#cta .lead-preferences')).toHaveAttribute('open','');
  const value=await message.inputValue();
  await link.click();
  await expect(message).toHaveValue(value);
});
test('product pages share delivery reviews enquiry FAQ order',async()=>{
  const fs=require('node:fs'),path=require('node:path');
  for(const file of require('./product-routes.json')){
    const html=fs.readFileSync(path.resolve(__dirname,'../..',file),'utf8');
    const sections=[...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(m=>m[0]);
    const delivery=sections.findIndex(s=>/^<section[^>]*id="dostavka"/.test(s));
    const calc=sections.findIndex(s=>/^<section[^>]*id="kalkulyator"/.test(s));
    expect(delivery,file).toBeGreaterThan(-1);
    if(calc>=0){const numbered=sections.filter(s=>/<span class="n">[0-9]+<\/span>/.test(s));expect(numbered[1],file).toMatch(/^<section[^>]*id="kalkulyator"/);}
    const projects=sections.map((s,i)=>({s,i})).filter(({s})=>/class="[^"]*\bobjects\b/.test(s.split('>')[0]) || /^<section[^>]*id="raboty"/.test(s) || s.includes('data-case') || (/class="photos"/.test(s) && /(?:На объектах|Объекты|Наши проекты)/.test(s))).map(x=>x.i);
    if(projects.length) expect(delivery,file).toBe(projects.at(-1)+1);
    const rev=sections.findIndex(s=>s.includes('class="revs"'));
    expect(sections[rev+1],file).toMatch(/^<section[^>]*id="cta"/);
    const faq=sections.findIndex(s=>/^<section[^>]*id="faq"/.test(s));
    if(faq>=0){expect(faq,file).toBe(rev+2);expect(faq,file).toBe(sections.length-1);}
    expect(html,file).not.toContain('data-reco="complement"');
    expect(html,file).not.toContain('тому же, по которому менеджеры готовят КП');
  }
});
for(const route of ['/potolki/reechnye/','/potolki/grilyato/','/potolki/armstrong-t24/']) test('moved calculator still recalculates '+route,async({page})=>{
  await page.goto('http://127.0.0.1:8765'+route);
  const calc=page.locator('#kalkulyator');
  const before=await calc.innerText();
  await calc.locator('input[type=number]').first().fill('200');
  await expect.poll(()=>calc.innerText()).not.toBe(before);
  await expect(page.locator('#dostavka')).toBeAttached();
});
test('every enquiry uses the approved outer layout and preserves its fields',async()=>{
  const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../..');
  let count=0;
  function crawl(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='node_modules'?[]:e.isDirectory()?crawl(path.join(dir,e.name)):e.name==='index.html'?[path.join(dir,e.name)]:[]);}
  for(const file of crawl(root)){
    const html=fs.readFileSync(file,'utf8');
    for(const section of html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)){
      if(!section[0].includes('data-lead-v2')) continue;
      count++;
      expect(section[0],file).toMatch(/^<section[^>]*class="[^"]*\bcta2\b/);
      expect(section[0],file).toMatch(/cta2__acc|data-project-path/);
      expect(section[0],file).toContain('cta2__form');
      expect(section[0],file).toContain('data-file-drop');
      expect(section[0],file).not.toContain('Что будет после заявки');
    }
  }
  expect(count).toBe(215);
});
test('moving the configured enquiry keeps parameters linked to its form',async({page})=>{
  await page.goto('http://127.0.0.1:8765/ograzhdeniya/zabory-zhalyuzi/');
  await page.locator('#cta .lead-preferences summary').click();
  const field=page.locator('#cta [data-config] input[type=number]').first();
  await field.fill('24');
  await expect(page.locator('#cta form input[name=config]')).toHaveValue(/24/);
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('#cta [data-config]')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
});
if(process.env.FULL_AUDIT==='1'){
  const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../..');
  function crawl(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='node_modules'?[]:e.isDirectory()?crawl(path.join(dir,e.name)):e.name==='index.html'?[path.join(dir,e.name)]:[]);}
  for(const file of crawl(root)){
    const url='/'+path.relative(root,path.dirname(file)).split(path.sep).filter(Boolean).join('/');
    test('full audit '+url,async({page},info)=>{
      await page.setViewportSize({width:390,height:844});
      await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:')||r.request().url().startsWith('data:')?r.continue():r.abort());
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await prepare(page,'http://127.0.0.1:8765'+url+'/');
      const axe=await new AxeBuilder({page}).analyze();
      const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>!(i.closest('dialog:not([open])')&&!i.getAttribute('src'))&&!i.naturalWidth).map(i=>i.getAttribute('src'))}));
      await info.attach('full-audit',{body:Buffer.from(JSON.stringify({url,errors,...geometry,violations:axe.violations},null,2)),contentType:'application/json'});
      expect.soft(geometry.overflow, 'horizontal overflow').toBe(false);
      expect.soft(geometry.broken, 'broken images').toEqual([]);
      expect.soft(errors, 'JS runtime errors').toEqual([]);
      expect.soft(axe.violations, 'accessibility violations').toEqual([]);
    });
  }
}
async function prepare(page,url){
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.allSettled([...document.images].map(i=>i.decode()));});
}
for(const width of [320,390,768,1440]) for(const route of routes) test(`${width} ${route}`,async({page},info)=>{
  await page.setViewportSize({width,height:900});
  // No CRM submissions or external analytics; test only the local build.
  await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:')||r.request().url().startsWith('data:')?r.continue():r.abort());
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await prepare(page,'http://127.0.0.1:8765'+route);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  const broken=await page.locator('img').evaluateAll(xs=>xs.filter(x=>!(x.closest('dialog:not([open])')&&!x.getAttribute('src'))&&(!x.complete||!x.naturalWidth)).map(x=>x.getAttribute('src')));
  const current=await page.screenshot({fullPage:true,animations:'disabled',mask:[page.locator('iframe')]});
  await info.attach('current',{body:current,contentType:'image/png'});
  const axe=await new AxeBuilder({page}).analyze();
  await info.attach('accessibility',{body:Buffer.from(JSON.stringify(axe.violations,null,2)),contentType:'application/json'});
  await prepare(page,'http://127.0.0.1:8766'+route);
  const previous=await page.screenshot({fullPage:true,animations:'disabled',mask:[page.locator('iframe')]});
  await info.attach('previous',{body:previous,contentType:'image/png'});
  const a=PNG.sync.read(current),b=PNG.sync.read(previous);
  if(a.width===b.width&&a.height===b.height){
    const pixelmatch=(await import('pixelmatch')).default,diff=new PNG({width:a.width,height:a.height});
    const pixels=pixelmatch(a.data,b.data,diff.data,a.width,a.height,{threshold:0.15});
    if(pixels){await info.attach('visual-diff',{body:PNG.sync.write(diff),contentType:'image/png'});info.annotations.push({type:'visual-review',description:`${pixels} changed pixels. Review intentional changes; prior commit is not an approved design.`});}
  }else info.annotations.push({type:'visual-review',description:'Page dimensions changed; compare attached screenshots.'});
  expect.soft(overflow,'horizontal overflow').toBe(false);
  expect.soft(broken,'broken images').toEqual([]);
  expect.soft(errors,'JS runtime errors').toEqual([]);
  expect.soft(axe.violations,'accessibility violations').toEqual([]);
});
test('preview form validation and optional contact method',async({page})=>{
  await page.goto('http://127.0.0.1:8765/potolki/reechnye/');
  const form=page.locator('form[data-lead-v2]').first();
  await expect(form).toBeVisible();
  const select=form.locator('select').first();
  await expect(select).not.toHaveAttribute('required','');
  const preferences=form.locator('.lead-preferences');
  await expect(preferences).not.toHaveAttribute('open','');
  await expect(select).toBeHidden();
  await preferences.locator('summary').click();
  await expect(select).toBeVisible();
  await select.selectOption('email');
  await expect(form.locator('[data-lead-contact]')).toHaveAttribute('type','email');
  await select.selectOption('phone');
  await expect(form.locator('[data-lead-contact]')).toHaveAttribute('type','tel');
  expect(await form.evaluate(f=>f.checkValidity())).toBe(false);
  await expect(form.locator('input[type="checkbox"][required]')).not.toBeChecked();
  await form.locator('[data-lead-contact]').fill('+79190000000');
  await expect(form.locator('[name="message"]')).not.toHaveAttribute('required','');
  await form.locator('[name="message"]').fill('Удобно обсудить после 14:00');
  await preferences.locator('summary').click();
  await expect(form.locator('[name="message"]')).toBeHidden();
  await form.locator('input[name="agree"]').check();
  await form.getByRole('button',{name:'Получить расчёт',exact:true}).click();
  await expect(page).toHaveURL(/\/spasibo\/$/);
  await expect(page.locator('[data-receipt-contact]')).toHaveText('+79190000000');
  await expect(page.locator('[data-receipt-status]')).toContainText('заявка не отправлена');
  const details=page.locator('[data-details-panel]');
  await expect(details).not.toHaveAttribute('open','');
  await expect(page.locator('[name="message"]')).toBeHidden();
  await details.locator('summary').first().click();
  await expect(page.locator('[name="message"]')).toBeVisible();
  await expect(page.locator('[name="message"]')).toHaveValue('Удобно обсудить после 14:00');

  // A quick enquiry must work without opening the optional section at all.
  await page.goto('http://127.0.0.1:8765/potolki/reechnye/');
  const quick=page.locator('form[data-lead-v2]').first();
  await quick.locator('[data-lead-contact]').fill('quick@example.com');
  await quick.locator('input[name="agree"]').check();
  await quick.getByRole('button',{name:'Получить расчёт',exact:true}).click();
  await expect(page).toHaveURL(/\/spasibo\/$/);
  await expect(page.locator('[data-receipt-contact]')).toHaveText('quick@example.com');
  await expect(page.locator('[data-receipt-status]')).toContainText('заявка не отправлена');

});

test('factory photo opens and closes without navigation',async({page})=>{
 await page.goto('http://127.0.0.1:8765/o-zavode/');
 await page.locator('[data-photo]').first().click();
 const dialog=page.locator('dialog.av2-lightbox');
 await expect(dialog).toBeVisible();
 await expect(dialog.locator('img')).toHaveAttribute('src',/\S+/);
 await expect.poll(()=>dialog.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 await page.keyboard.press('Escape');
 await expect(dialog).not.toBeVisible();
 await expect(page).toHaveURL(/\/o-zavode\/$/);
});


test('mobile menu remains visible and opens at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:800});
 await page.goto('http://127.0.0.1:8765/');
 const burger=page.locator('.burger');
 const shape=await burger.evaluate(el=>({width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right,line:el.querySelector('span').getBoundingClientRect().width,viewport:document.documentElement.clientWidth}));
 expect(shape.width).toBeGreaterThanOrEqual(40);
 expect(shape.line).toBeGreaterThanOrEqual(16);
 expect(shape.right).toBeLessThanOrEqual(shape.viewport);
 await burger.click();
 await expect(burger).toHaveAttribute('aria-expanded','true');
 await expect(page.locator('.nav')).toBeVisible();
 await burger.click();
 await expect(page.locator('.nav')).toBeHidden();
});


test('attachments survive the first step and refresh; removal persists',async({page})=>{
 await page.goto('http://127.0.0.1:8765/potolki/reechnye/');
 const form=page.locator('#cta form');await form.locator('summary').click();
 const picker=form.locator('[data-lead-files]');
 await picker.setInputFiles([{name:'plan.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.7 test')},{name:'photo.png',mimeType:'image/png',buffer:Buffer.from([137,80,78,71,13,10,26,10])}]);
 await expect(form.locator('[data-file-list] li')).toHaveCount(2);
 await form.locator('textarea').fill('План и фото приложены');
 await form.locator('summary').click();await form.locator('[name=contact]').fill('files@example.com');await form.locator('[name=agree]').check();await form.locator('[data-lead-submit]').click();
 await expect(page).toHaveURL(/\/spasibo\/$/);
 await page.locator('[data-details-panel]>summary').click();
 await expect(page.locator('[data-file-list] li')).toHaveCount(2);
 await expect(page.locator('textarea')).toHaveValue('План и фото приложены');
 await page.reload();await page.locator('[data-details-panel]>summary').click();
 await expect(page.locator('[data-file-list] li')).toHaveCount(2);
 await page.getByRole('button',{name:'Убрать файл plan.pdf',exact:true}).click();
 await page.locator('[data-details-submit]').click();await expect(page.locator('[data-details-status]')).toContainText('но не отправлены');
 await page.reload();await page.locator('[data-details-panel]>summary').click();
 await expect(page.locator('[data-file-list] li')).toHaveCount(1);await expect(page.locator('[data-file-list]')).toContainText('photo.png');
});

test('attachment drop, duplicate and size/type limits preserve existing files',async({page})=>{
 await page.setViewportSize({width:320,height:900});await page.goto('http://127.0.0.1:8765/potolki/reechnye/');
 const form=page.locator('#cta form');await form.locator('summary').click();const input=form.locator('[data-lead-files]'),error=form.locator('[data-file-error]');
 const drop=await page.evaluateHandle(()=>{const d=new DataTransfer();d.items.add(new File(['cad'],'project.dwg',{type:'application/octet-stream',lastModified:1}));return d;});
 await form.locator('textarea').dispatchEvent('drop',{dataTransfer:drop});
 await form.locator('textarea').dispatchEvent('drop',{dataTransfer:drop});await expect(form.locator('[data-file-list] li')).toHaveCount(1);
 for(const [name,mime,body,expected] of [['script.svg','image/svg+xml',Buffer.from('<svg/>'),'формат'],['empty.pdf','application/pdf',Buffer.alloc(0),'Пустой'],['big.pdf','application/pdf',Buffer.alloc(10*1048576+1),'10 МБ']]){
  await input.setInputFiles({name,mimeType:mime,buffer:body});await expect(error).toContainText(expected);await expect(form.locator('[data-file-list] li')).toHaveCount(1);
 }
 await input.setInputFiles(Array.from({length:5},(_,i)=>({name:`doc-${i}.pdf`,mimeType:'application/pdf',buffer:Buffer.from('pdf')})));await expect(error).toContainText('до 5');
 await input.setInputFiles([{name:'one.pdf',mimeType:'application/pdf',buffer:Buffer.alloc(10*1048576)},{name:'two.pdf',mimeType:'application/pdf',buffer:Buffer.alloc(10*1048576)}]);await expect(error).toContainText('Общий размер');
 await input.setInputFiles({name:'очень-длинное-название-плана-объекта-для-проверки-мобильной-вёрстки.pdf',mimeType:'application/pdf',buffer:Buffer.from('pdf')});
 await expect(error).toBeHidden();expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
 await expect(form.locator('[data-file-list] li')).toHaveCount(2);
 const axe=await new AxeBuilder({page}).include('#cta').analyze();expect(axe.violations).toEqual([]);
});

test('blocked file storage keeps the user and attachment on the form',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'indexedDB',{value:{open(){throw new Error('blocked')}}}));
 await page.goto('http://127.0.0.1:8765/potolki/reechnye/');const form=page.locator('#cta form');await form.locator('summary').click();
 await form.locator('[data-lead-files]').setInputFiles({name:'plan.pdf',mimeType:'application/pdf',buffer:Buffer.from('pdf')});
 await form.locator('[name=contact]').fill('files@example.com');await form.locator('[name=agree]').check();await form.locator('[data-lead-submit]').click();
 await expect(page).toHaveURL(/reechnye/);await expect(form.locator('[data-file-list] li')).toHaveCount(1);await expect(form.locator('[data-lead-status]')).toBeVisible();await expect(form.locator('[data-lead-submit]')).toBeEnabled();
});

for(const width of [390,1440]) test('project photo chapters preserve enquiry and support keyboard '+width,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8765/');
 const form=page.locator('#cta form');await form.locator('[name=contact]').fill('client@example.com');
 const attr=width<701?'data-mobile-stage':'data-stage';
 await page.locator(`[${attr}="3"]`).click();await expect(page.locator('[data-stage-panel]:visible h3')).toContainText('Доведём');
 await page.locator(`[${attr}="3"]`).press('Home');await expect(page.locator(`[${attr}="0"]`)).toHaveAttribute('aria-pressed','true');
 await page.locator(`[${attr}="0"]`).press('ArrowRight');await expect(page.locator('[data-stage-panel]:visible h3')).toContainText('Согласуем');
 await expect(form.locator('[name=contact]')).toHaveValue('client@example.com');await expect(page.locator('#cta input[type=range]')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
});
test('photo chapters accept a horizontal swipe without changing form',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:8765/');
 const panel=page.locator('.journey-viewport');await panel.scrollIntoViewIfNeeded();const box=await panel.boundingBox();
 await page.mouse.move(box.x+box.width*.85,box.y+box.height*.4);await page.mouse.down();await page.mouse.move(box.x+box.width*.15,box.y+box.height*.4,{steps:12});await page.mouse.up();
 await expect(page.locator('[data-mobile-stage="1"]')).toHaveAttribute('aria-pressed','true');await expect(page.locator('[data-stage-panel]:visible h3')).toContainText('Согласуем');
});
test('photo chapters respect reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:8765/');await page.locator('[data-stage="2"]').click();
 await expect(page.locator('[data-stage-panel]:visible h3')).toContainText('Изготовим');
 expect(await page.locator('.journey-frame').first().evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0s');
 expect(await page.locator('[data-stage-panel]:visible').evaluate(el=>el.getAnimations().length)).toBe(0);
});
test('portfolio uses real project assets and excludes unpublished cases',async({page})=>{
 await page.goto('http://127.0.0.1:8765/obekty/');await expect(page.locator('h1')).toHaveText('Наши работы');
 await expect(page.locator('[data-case]')).toHaveCount(34);await expect(page.locator('[data-case] img')).toHaveCount(34);
 await expect(page.locator('main a[href*="angiofarm"],main a[href*="ave-vita"]')).toHaveCount(0);
 await page.locator('[data-filters] button[data-val="urban"]').click();await expect(page.locator('[data-case]:visible').first()).toHaveAttribute('data-sector','urban');
});
test('FAQ contacts replace the form and answers use available width',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:8765/servis/faq/');
 await expect(page.locator('main form')).toHaveCount(0);await expect(page.getByRole('link',{name:'Задать вопрос',exact:true}).last()).toHaveAttribute('href',/^mailto:info@nzmo.ru/);
 const widths=await page.locator('.faq .a').first().evaluate(el=>({answer:el.getBoundingClientRect().width,block:el.closest('details').getBoundingClientRect().width}));expect(widths.answer).toBeGreaterThan(widths.block*.95);
});
test('header order is consistent on all shared-layout pages',async()=>{
 const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'../..');
 const expected=['Наши работы','Доставка и оплата','О заводе','Журнал','Контакты'];let count=0;
 function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='node_modules'?[]:e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.html')?[path.join(d,e.name)]:[]);}
 for(const file of walk(root)){const html=fs.readFileSync(file,'utf8');const nav=html.match(/<ul class="nav">([\s\S]*?)<button class="header__search"/);if(!nav)continue;count++;expect(nav[1],file).toContain('Продукция завода');const tail=nav[1].slice(nav[1].lastIndexOf('</div>'));const labels=[...tail.matchAll(/<a href="[^"]+">([^<]+)<\/a>/g)].map(x=>x[1]);expect(labels,file).toEqual(expected);}
 expect(count).toBeGreaterThan(180);
});
