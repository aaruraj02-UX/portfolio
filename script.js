const sections = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach((el) => io.observe(el));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxNodes = document.querySelectorAll('[data-parallax]');
const pointerNodes = document.querySelectorAll('[data-pointer]');

if (!reduceMotion && parallaxNodes.length > 0) {
  const tickParallax = () => {
    const y = window.scrollY;
    parallaxNodes.forEach((node) => {
      const speed = parseFloat(node.getAttribute('data-parallax')) || 0;
      const moveY = y * speed;
      node.style.transform = `translate3d(0, ${moveY}px, 0)`;
    });
  };

  let rafId = 0;
  const onScroll = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      tickParallax();
      rafId = 0;
    });
  };

  tickParallax();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (!reduceMotion && pointerNodes.length > 0) {
  let pointerRaf = 0;
  window.addEventListener('pointermove', (event) => {
    if (pointerRaf) return;
    pointerRaf = window.requestAnimationFrame(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (event.clientX - cx) / cx;
      const dy = (event.clientY - cy) / cy;

      pointerNodes.forEach((node) => {
        const amount = parseFloat(node.getAttribute('data-pointer')) || 0;
        const x = dx * 30 * amount;
        const y = dy * 30 * amount;
        const baseY = (window.scrollY * (parseFloat(node.getAttribute('data-parallax')) || 0));
        node.style.transform = `translate3d(${x}px, ${baseY + y}px, 0)`;
      });

      pointerRaf = 0;
    });
  }, { passive: true });
}
