document.querySelectorAll('[data-partner-ribbon]').forEach((ribbon) => {
  const prepare = () => {
    const images = [...ribbon.querySelectorAll('img')];
    images.forEach((image) => { image.loading = 'eager'; });
    Promise.allSettled(images.map((image) => image.decode())).then(() => {
      ribbon.classList.add('is-ready');
    });
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        prepare();
      }
    });
    observer.observe(ribbon);
  } else {
    prepare();
  }
});
