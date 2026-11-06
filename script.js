if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

const portraitMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const heroIntro = document.querySelector('.hero-intro');
const portrait = document.querySelector('.hero-portrait');

if (heroIntro && portrait) {
  function resetPortrait() {
    portrait.style.removeProperty('--portrait-x');
    portrait.style.removeProperty('--portrait-y');
  }

  heroIntro.addEventListener('pointermove', (event) => {
    if (!portraitMotion.matches || event.pointerType !== 'mouse') return;

    const bounds = heroIntro.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portrait.style.setProperty('--portrait-x', `${-y * 12}deg`);
    portrait.style.setProperty('--portrait-y', `${x * 16}deg`);
  });

  heroIntro.addEventListener('pointerleave', resetPortrait);
  portraitMotion.addEventListener('change', resetPortrait);
}
