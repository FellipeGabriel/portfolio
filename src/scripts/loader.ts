import gsap from 'gsap';

const waitFor = (img: HTMLImageElement | null) =>
  new Promise<void>((resolve) => {
    if (!img || (img.complete && img.naturalWidth > 0)) return resolve();
    img.addEventListener('load', () => resolve(), { once: true });
    img.addEventListener('error', () => resolve(), { once: true });
  });

export function runLoader(): Promise<void> {
  const root = document.documentElement;
  const el = document.querySelector<HTMLElement>('[data-loader]');
  if (!el || !root.classList.contains('is-loading')) {
    el?.remove();
    return Promise.resolve();
  }

  const count = el.querySelector<HTMLElement>('[data-loader-count]')!;
  const bar = el.querySelector<HTMLElement>('[data-loader-bar]')!;
  const cols = Array.from(el.querySelectorAll<HTMLElement>('[data-loader-col]'));
  const meta = Array.from(el.querySelectorAll<HTMLElement>('[data-loader-meta]'));
  const heroImg = document.querySelector<HTMLImageElement>('.hero-img img');

  const ready = Promise.race([
    Promise.all([waitFor(heroImg), new Promise((r) => setTimeout(r, 700))]),
    new Promise((r) => setTimeout(r, 3600)),
  ]);

  const state = { v: 0 };
  const render = () => {
    count.textContent = String(Math.round(state.v)).padStart(3, '0');
    count.style.backgroundPosition = `${state.v}% ${40 + state.v * 0.2}%`;
    bar.style.transform = `scaleX(${state.v / 100})`;
  };

  gsap.from(meta, { yPercent: 120, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 });
  gsap.from(count, { yPercent: 100, duration: 1.1, ease: 'expo.out' });
  const climb = gsap.to(state, { v: 84, duration: 1.5, ease: 'power3.out', onUpdate: render });

  return new Promise((resolve) => {
    Promise.all([ready, climb.then()]).then(() => {
      const exit = gsap.timeline({
        onComplete: () => {
          root.classList.remove('is-loading');
          try {
            sessionStorage.setItem('fg-loaded', '1');
          } catch {
          }
          el.remove();
        },
      });
      exit.call(() => el.classList.add('is-cream'), undefined, 0);
      exit.to(state, { v: 100, duration: 0.55, ease: 'power2.inOut', onUpdate: render }, 0);
      exit.to(count, { yPercent: -105, duration: 0.7, ease: 'expo.in' }, '+=0.1');
      exit.to(meta, { yPercent: -120, opacity: 0, duration: 0.5, ease: 'expo.in', stagger: 0.05 }, '<');
      exit.to(bar.parentElement, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.6, ease: 'expo.in' }, '<');
      exit.to(cols, { scaleY: 0, duration: 1.1, ease: 'expo.inOut', stagger: { each: 0.045, from: 'start' } }, '-=0.15');
      exit.call(() => resolve(), undefined, '-=0.85');
    });
  });
}
