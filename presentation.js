const nodes = document.querySelectorAll('.reveal');

const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

nodes.forEach((n) => obs.observe(n));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxNodes = document.querySelectorAll('[data-parallax]');

if (!reduceMotion && parallaxNodes.length > 0) {
  const renderParallax = () => {
    const y = window.scrollY;
    parallaxNodes.forEach((node) => {
      const speed = parseFloat(node.getAttribute('data-parallax')) || 0;
      node.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
  };

  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      renderParallax();
      raf = 0;
    });
  };

  renderParallax();
  window.addEventListener('scroll', onScroll, { passive: true });
}
