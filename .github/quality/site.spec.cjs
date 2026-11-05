const {test,expect}=require('@playwright/test');
const {AxeBuilder}=require('@axe-core/playwright');
const {PNG}=require('pngjs');
const routes=['/','/o-zavode/','/kontakty/','/potolki/reechnye/','/potolki/kassetnye/clip-in/','/spasibo/'];
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
  const broken=await page.locator('img').evaluateAll(xs=>xs.filter(x=>!x.complete||!x.naturalWidth).map(x=>x.getAttribute('src')));
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
  expect(await form.evaluate(f=>f.checkValidity())).toBe(false);
  await expect(form.locator('input[type="checkbox"][required]')).not.toBeChecked();
});
