(() => {
  const selector = document.querySelector('[data-factory-selector]');
  if (!selector) return;

  const tablist = selector.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  let active = 0;

  function select(index) {
    active = index;
    tabs.forEach((tab, position) => {
      const selected = position === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[position].setAttribute('aria-hidden', String(!selected));
      panels[position].tabIndex = selected ? 0 : -1;
    });
    const columns = tabs.map((_, position) => `minmax(0, ${position === index ? 6.3 : 1}fr)`);
    selector.style.setProperty('--factory-columns', columns.join(' '));
  }

  tabs.forEach((tab, index) => tab.addEventListener('click', () => select(index)));
  tablist.addEventListener('keydown', event => {
    let next;
    switch (event.key) {
      case 'ArrowRight': next = (active + 1) % tabs.length; break;
      case 'ArrowLeft': next = (active + tabs.length - 1) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    select(next);
    tabs[next].focus();
  });

  select(active);
  selector.dataset.ready = '';
  tablist.hidden = false;
})();
