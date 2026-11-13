(() => {
  'use strict';

  const drawer = document.querySelector('.portfolio-drawer');
  if (!drawer || typeof drawer.showModal !== 'function') return;

  const body = drawer.querySelector('[data-portfolio-body]');
  let opener;
  let pressedOutside = false;

  function openProject(link) {
    const project = link && document.getElementById('portfolio-case-' + link.dataset.portfolioCase);
    if (!project) return false;
    opener = link;
    body.replaceChildren(project.content.cloneNode(true));
    body.querySelector('[data-portfolio-title]').id = 'portfolio-project-title';
    if (!drawer.open) drawer.showModal();
    body.scrollTop = 0;
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

  body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-portfolio-image]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;

    const selected = body.querySelector('[aria-pressed="true"]');
    const image = body.querySelector('.portfolio-drawer__image');
    const caption = body.querySelector('figcaption');

    selected.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    image.srcset = `${button.dataset.portfolioMedium} 800w, ${button.dataset.portfolioImage} 1600w`;
    image.src = button.dataset.portfolioImage;
    image.alt = button.dataset.portfolioAlt;
    caption.textContent = button.dataset.portfolioCaption;
    caption.hidden = !button.dataset.portfolioCaption;
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
