(() => {
  'use strict';

  const drawer = document.querySelector('.portfolio-drawer');
  if (!drawer || typeof drawer.showModal !== 'function') return;

  const body = drawer.querySelector('[data-portfolio-body]');
  let opener;
  let pressedOutside = false;

  let selection = 0;
  const ready = new Map();

  function loadFrame(button) {
    const src = button.dataset.portfolioImage;
    if (!ready.has(src)) {
      const image = new Image();
      image.className = 'portfolio-drawer__image';
      image.alt = button.dataset.portfolioAlt;
      image.sizes = body.querySelector('.portfolio-drawer__image').sizes;
      image.srcset = button.dataset.portfolioMedium + ' 800w, ' + src + ' 1600w';
      image.src = src;
      ready.set(src, image.decode().then(() => image).catch(error => {
        ready.delete(src);
        throw error;
      }));
    }
    return ready.get(src);
  }

  function warmNext(button) {
    const buttons = [...body.querySelectorAll('[data-portfolio-image]')];
    const next = buttons[buttons.indexOf(button) + 1];
    if (next) loadFrame(next).catch(() => {});
  }

  function openProject(link) {
    const project = link && document.getElementById('portfolio-case-' + link.dataset.portfolioCase);
    if (!project) return false;
    selection++;
    ready.clear();
    opener = link;
    body.replaceChildren(project.content.cloneNode(true));
    body.querySelector('[data-portfolio-title]').id = 'portfolio-project-title';
    if (!drawer.open) drawer.showModal();
    body.scrollTop = 0;
    const current = body.querySelector('[data-portfolio-image][aria-pressed="true"]');
    if (current) warmNext(current);
    document.documentElement.classList.add('portfolio-drawer-open');
    return true;
  }

  function openHash() {
    if (!location.hash.startsWith('#project-')) return;
    const card = document.getElementById(location.hash.slice(1));
    openProject(card?.querySelector('.card__title [data-portfolio-case]'));
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-portfolio-case]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (openProject(link)) event.preventDefault();
  });

  body.addEventListener('click', async event => {
    const button = event.target.closest('[data-portfolio-image]');
    if (!button) return;
    const version = ++selection;
    if (button.getAttribute('aria-pressed') === 'true') return;
    let image;
    try {
      image = await loadFrame(button);
    } catch {
      return;
    }
    if (version !== selection || !drawer.open || !button.isConnected) return;
    body.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    body.querySelector('.portfolio-drawer__image').replaceWith(image);
    const caption = body.querySelector('figcaption');
    caption.textContent = button.dataset.portfolioCaption;
    caption.hidden = !button.dataset.portfolioCaption;
    warmNext(button);
  });

  drawer.addEventListener('pointerdown', (event) => {
    pressedOutside = event.target === drawer;
  });
  drawer.addEventListener('click', (event) => {
    if (pressedOutside && event.target === drawer) drawer.close();
    pressedOutside = false;
  });
  drawer.addEventListener('close', () => {
    document.documentElement.classList.remove('portfolio-drawer-open');
    body.replaceChildren();
    if (location.hash === '#project-' + opener?.dataset.portfolioCase) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    opener?.focus({preventScroll: true});
  });
  window.addEventListener('hashchange', openHash);
  openHash();
})();
