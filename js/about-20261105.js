/* About NZMO: photo viewer, historical metrics, two verified 2GIS locations. */
(() => {
  'use strict';
  const root = document.querySelector('.av2');
  if (!root) return;
  const dialog = root.querySelector('.av2-lightbox');
  let previousFocus, previousOverflow;
  root.querySelectorAll('[data-photo]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (!dialog || typeof dialog.showModal !== 'function') return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previousFocus = trigger;
      previousOverflow = document.body.style.overflow;
      dialog.querySelector('img').src = trigger.dataset.photo;
      dialog.querySelector('img').alt = trigger.dataset.photoAlt || trigger.querySelector('img')?.alt || trigger.dataset.caption || '';
      dialog.querySelector('figcaption').textContent = trigger.dataset.caption;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  if (dialog) {
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow || '';
      if (previousFocus) previousFocus.focus({preventScroll: true});
    });
  }

  const gallery = root.querySelector('[data-factory-gallery]');
  if (gallery) {
    const stage = gallery.querySelector('[data-photo]');
    const rail = gallery.querySelector('.factory-gallery__rail');
    const views = [...rail.querySelectorAll('[data-factory-view]')];
    const original = {url: stage.dataset.photo, label: stage.dataset.photoAlt};
    const images = new Map();
    let selected = null;
    let requested = null;
    let visible = null;

    async function show(view) {
      requested = view;
      let next = null;
      if (view) {
        if (!images.has(view)) {
          const image = new Image();
          image.className = 'factory-gallery__layer';
          image.alt = '';
          image.setAttribute('aria-hidden', 'true');
          image.src = view.dataset.image;
          images.set(view, image.decode().then(() => {
            stage.append(image);
            return image;
          }).catch(() => {
            images.delete(view);
            return null;
          }));
        }
        next = await images.get(view);
        if (requested !== view || !next) return;
      }
      if (visible === next) return;
      visible?.classList.remove('is-active');
      visible = next;
      visible?.classList.add('is-active');
      stage.href = stage.dataset.photo = view?.dataset.image || original.url;
      stage.dataset.photoAlt = view?.dataset.label || original.label;
      stage.setAttribute('aria-label', 'Увеличить фото — ' + stage.dataset.photoAlt);
    }

    views.forEach(view => {
      view.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') show(view);
      });
      view.addEventListener('focus', () => {
        if (view.matches(':focus-visible')) show(view);
      });
      view.addEventListener('click', () => {
        selected = selected === view ? null : view;
        views.forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
        show(selected);
      });
    });
    rail.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse' && !stage.contains(event.relatedTarget)) show(selected);
    });
    gallery.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') show(selected);
    });
    rail.addEventListener('focusout', event => {
      if (!gallery.contains(event.relatedTarget)) show(selected);
    });
    rail.hidden = false;
  }

  const index = root.querySelector('[data-project-index]');
  if (index) {
    const toolbar = index.querySelector('[data-project-toolbar]');
    const filters = [...toolbar.querySelectorAll('[data-project-filter]')];
    const list = index.querySelector('#about-project-list');
    const rows = [...list.querySelectorAll('[data-project-row]')];
    const count = toolbar.querySelector('[data-project-count]');
    const preview = index.querySelector('[data-project-preview]');
    const photo = preview.querySelector('[data-photo]');
    const image = photo.querySelector('img');
    const title = preview.querySelector('[data-project-title]');
    const info = preview.querySelector('[data-project-info]');
    const plurals = new Intl.PluralRules('ru');
    const forms = {one: 'проект', few: 'проекта', many: 'проектов', other: 'проекта'};
    let selected = list.querySelector('[aria-current="true"]');

    function showProject(link) {
      if (link === selected) return;
      selected?.removeAttribute('aria-current');
      selected = link;
      selected.setAttribute('aria-current', 'true');
      const name = link.querySelector('[data-project-name]').textContent.trim();
      photo.href = link.dataset.projectZoom;
      photo.dataset.photo = link.dataset.projectZoom;
      photo.dataset.caption = link.dataset.projectCaption;
      photo.setAttribute('aria-label', 'Увеличить фото — ' + name);
      image.src = link.dataset.projectZoom;
      image.alt = link.dataset.projectCaption;
      image.style.objectPosition = link.querySelector('img').style.objectPosition;
      title.textContent = name;
      info.textContent = link.dataset.projectMeta;
    }

    list.addEventListener('click', event => {
      const link = event.target.closest('[data-project-select]');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showProject(link);
      if (window.matchMedia('(max-width: 900px)').matches) {
        preview.scrollIntoView({block: 'nearest'});
      }
    });

    for (const filter of filters) {
      filter.addEventListener('click', () => {
        const prefix = filter.dataset.projectFilter;
        filters.forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
        let visible = 0;
        for (const row of rows) {
          row.hidden = Boolean(prefix) && !row.dataset.products.split(' ').some(url => url.startsWith(prefix));
          if (!row.hidden) visible++;
        }
        const first = rows.find(row => !row.hidden);
        if (first) showProject(first.querySelector('[data-project-select]'));
        list.scrollTop = 0;
        count.textContent = visible + ' ' + forms[plurals.select(visible)];
      });
    }

    toolbar.hidden = false;
  }
  root.querySelectorAll('[data-history]').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('[data-history]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      root.querySelectorAll('.av2-chart').forEach(chart => { chart.hidden = chart.id !== 'history-' + button.dataset.history; });
    });
  });
})();
