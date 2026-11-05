import json, sys, collections
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.github/quality/results'
OUT.mkdir(exist_ok=True)
issues = []
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(); self.path=path; self.ids=[]; self.h1=0; self.refs=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='img' and 'alt' not in a: self.add('missing-alt',a.get('src',''))
        for attr in ('src','href'):
            u=a.get(attr,''); p=urlsplit(u)
            if u and not p.scheme and not p.netloc and p.path:
                target=(ROOT / unquote(p.path).lstrip('/')) if p.path.startswith('/') else self.path.parent / unquote(p.path)
                if not target.exists(): self.add('missing-file',u)
    def add(self,rule,value): issues.append({'page':self.path.relative_to(ROOT).as_posix(),'rule':rule,'value':value})
files=[p for p in ROOT.rglob('*.html') if not any(x.startswith('.') or x=='node_modules' for x in p.relative_to(ROOT).parts)]
for p in files:
    page=Page(p);page.feed(p.read_text(encoding='utf-8'))
    if p.name=='index.html' and page.h1!=1:page.add('h1-count',str(page.h1))
    for ident,n in collections.Counter(page.ids).items():
        if n>1:page.add('duplicate-id',ident)
issues=sorted(issues,key=lambda x:json.dumps(x,sort_keys=True))
baseline=Path(__file__).with_name('static-baseline.json')
if '--baseline' in sys.argv:baseline.write_text(json.dumps(issues,ensure_ascii=False,indent=2),encoding='utf-8')
known=json.loads(baseline.read_text(encoding='utf-8')) if baseline.exists() else []
new=[x for x in issues if x not in known]
report={'pages':len(files),'issues':issues,'new':new,'counts':dict(collections.Counter(x['rule'] for x in issues))}
(OUT/'static.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ('issues','new')},ensure_ascii=False));print('New issues:',len(new))
sys.exit(bool(new))
