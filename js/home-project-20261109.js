(() => {
  const root = document.querySelector('[data-project-path]');
  if (!root) return;
  const range = root.querySelector('input[type="range"]');
  const buttons = [...root.querySelectorAll('[data-stage]')];
  const panels = [...root.querySelectorAll('[data-stage-panel]')];
  const labels = ['Задача', 'Решение', 'Результат'];
  function select(index) {
    range.value = String(index);
    range.setAttribute('aria-valuetext', `${index + 1} из 3: ${labels[index]}`);
    range.style.setProperty('--stage-progress', `${index * 50}%`);
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
  range.addEventListener('input', () => select(Number(range.value)));
  select(0);
  root.querySelector('.project-path__controls').hidden = false;
})();
