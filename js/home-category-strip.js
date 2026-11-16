(() => {
  const navigation = document.querySelector('.hero-products');
  if (!navigation) return;

  let hovered = null;

  function clearHover() {
    hovered?.classList.remove('is-pointer-hovered');
    hovered = null;
  }

  // Scrolling changes the hit target even when the pointer stays still.
  navigation.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const link = event.target.closest('.hero-products__link');
    if (link === hovered) return;
    clearHover();
    hovered = link;
    hovered?.classList.add('is-pointer-hovered');
  }, { passive: true });

  navigation.addEventListener('pointerleave', clearHover);
  window.addEventListener('scroll', clearHover, { passive: true });
})();
