const {test,expect}=require('@playwright/test');
const {AxeBuilder}=require('@axe-core/playwright');
const {PNG}=require('pngjs');
const routes=['/','/o-zavode/','/kontakty/','/potolki/reechnye/','/potolki/kassetnye/clip-in/','/spasibo/','/dveri/protivopozharnye/','/potolki/armstrong-t24/'];
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
      expect.soft(axe.violations.filter(v=>['label','empty-table-header','heading-order','label-content-name-mismatch'].includes(v.id)), 'semantic accessibility').toEqual([]);
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
  const oldAxe=await new AxeBuilder({page}).analyze();
  const fingerprint=v=>v.nodes.map(n=>v.id+':'+JSON.stringify(n.target));
  const known=new Set(oldAxe.violations.flatMap(fingerprint));
  const newAxe=axe.violations.filter(v=>['serious','critical'].includes(v.impact)).flatMap(fingerprint).filter(x=>!known.has(x));
  if(a.width===b.width&&a.height===b.height){
    const pixelmatch=(await import('pixelmatch')).default,diff=new PNG({width:a.width,height:a.height});
    const pixels=pixelmatch(a.data,b.data,diff.data,a.width,a.height,{threshold:0.15});
    if(pixels){await info.attach('visual-diff',{body:PNG.sync.write(diff),contentType:'image/png'});info.annotations.push({type:'visual-review',description:`${pixels} changed pixels. Review intentional changes; prior commit is not an approved design.`});}
  }else info.annotations.push({type:'visual-review',description:'Page dimensions changed; compare attached screenshots.'});
  expect.soft(overflow,'horizontal overflow').toBe(false);
  expect.soft(broken,'broken images').toEqual([]);
  expect.soft(errors,'JS runtime errors').toEqual([]);
  expect.soft(newAxe,'new serious/critical accessibility issues').toEqual([]);
});
test('preview form validation and optional contact method',async({page})=>{
  await page.goto('http://127.0.0.1:8765/potolki/reechnye/');
  const form=page.locator('form[data-lead-v2]').first();
  await expect(form).toBeVisible();
  const select=form.locator('select').first();
  await expect(select).not.toHaveAttribute('required','');
  await select.selectOption('email');
  await expect(form.locator('[data-lead-contact]')).toHaveAttribute('type','email');
  await select.selectOption('phone');
  await expect(form.locator('[data-lead-contact]')).toHaveAttribute('type','tel');
  expect(await form.evaluate(f=>f.checkValidity())).toBe(false);
  await expect(form.locator('input[type="checkbox"][required]')).not.toBeChecked();
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
