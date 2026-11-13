"""Build the image catalogue from the files and references in this checkout."""

import argparse
from collections import defaultdict
import csv
from hashlib import sha256
from html.parser import HTMLParser
from io import StringIO
from pathlib import Path
import posixpath
import re
import subprocess
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[2]
CATALOGUE = Path(__file__).with_name('image-catalog.csv')
IMAGE_SUFFIXES = {'.avif', '.bmp', '.gif', '.heic', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.tif', '.tiff', '.webp'}
GALLERY_ALTS = {
    'data-photo': 'data-photo-alt',
    'data-portfolio-image': 'data-portfolio-alt',
    'data-portfolio-medium': 'data-portfolio-alt',
    'data-project-zoom': 'data-project-caption',
    'data-full': 'data-caption',
}
CSS_URL = re.compile(r'url\(\s*[\'\"]?([^\s\'\"\)]+)[\'\"]?\s*\)', re.I)


def image_path(value, source):
    url = urlsplit(value)
    if not url.path or (url.scheme or url.netloc) and not (
        url.scheme in ('', 'https', 'http') and url.hostname in {'nzmo-home.vercel.app', 'nzmo.ru', 'www.nzmo.ru'}
    ):
        return None
    path = unquote(url.path)
    if Path(path).suffix.lower() not in IMAGE_SUFFIXES:
        return None
    return posixpath.normpath(path.lstrip('/') if path.startswith('/') else posixpath.join(source.parent.as_posix(), path))


def srcset_urls(value):
    # URLs in this static site use escaped filenames and width descriptors.
    return (candidate.split()[0] for candidate in value.split(',') if candidate.strip())


class ImageReferences(HTMLParser):
    def __init__(self, source, references):
        super().__init__()
        self.source = source
        self.references = references

    def record(self, value, alt=None, from_img=False):
        path = image_path(value, self.source)
        if path:
            self.references[path].add((self.source.as_posix(), alt, from_img))

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'img':
            alt = attrs.get('alt')
            for key in ('src', 'data-src'):
                self.record(attrs.get(key) or '', alt, True)
            for key in ('srcset', 'data-srcset'):
                for value in srcset_urls(attrs.get(key) or ''):
                    self.record(value, alt, True)
        elif tag == 'source':
            for value in srcset_urls(attrs.get('srcset') or ''):
                self.record(value)
        elif tag == 'meta' and (attrs.get('property') or attrs.get('name')) in {'og:image', 'twitter:image'}:
            self.record(attrs.get('content') or '')

        for key in ('href', 'xlink:href', 'poster'):
            self.record(attrs.get(key) or '')
        for key, label in GALLERY_ALTS.items():
            if attrs.get(key):
                self.record(attrs[key], attrs.get(label))
        for value in CSS_URL.findall(attrs.get('style') or ''):
            self.record(value)


def build_catalogue():
    names = subprocess.check_output(
        ['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], cwd=ROOT,
    ).decode('utf-8')
    files = sorted({Path(name) for name in names.split('\0') if name and (ROOT / name).is_file()})
    references = defaultdict(set)
    for path in files:
        if path.suffix == '.html':
            ImageReferences(Path(path.as_posix()), references).feed((ROOT / path).read_text(encoding='utf-8'))
        elif path.suffix == '.css':
            for value in CSS_URL.findall((ROOT / path).read_text(encoding='utf-8')):
                target = image_path(value, Path(path.as_posix()))
                if target:
                    references[target].add((path.as_posix(), None, False))

    output = StringIO(newline='')
    writer = csv.writer(output, lineterminator='\n')
    writer.writerow(['file', 'sha256', 'bytes', 'reference_files', 'example_references', 'descriptions', 'img_without_alt_files', 'img_empty_alt_files'])
    assets = sorted((path for path in files if path.suffix.lower() in IMAGE_SUFFIXES), key=Path.as_posix)
    for asset in assets:
        uses = references[asset.as_posix()]
        locations = sorted({source for source, _, _ in uses})
        descriptions = sorted({' '.join(alt.split()) for _, alt, _ in uses if alt and alt.strip()})
        missing = {source for source, alt, from_img in uses if from_img and alt is None}
        empty = {source for source, alt, from_img in uses if from_img and alt is not None and not alt.strip()}
        data = (ROOT / asset).read_bytes()
        writer.writerow([asset.as_posix(), sha256(data).hexdigest(), len(data), len(locations), ' | '.join(locations[:5]), ' | '.join(descriptions), len(missing), len(empty)])
    return output.getvalue(), len(assets)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Exit with an error if the saved catalogue is stale')
    args = parser.parse_args()
    data, count = build_catalogue()
    if args.check:
        if not CATALOGUE.is_file() or CATALOGUE.read_text(encoding='utf-8-sig') != data:
            parser.exit(1, 'Image catalogue is stale. Run python .github/quality/image_catalog.py and commit the CSV.\n')
    else:
        CATALOGUE.write_bytes(data.encode('utf-8-sig'))
    print(f'Image catalogue: {count} files')


if __name__ == '__main__':
    main()
