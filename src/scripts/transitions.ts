import gsap from 'gsap';

type Stop = { field: 'petrol' | 'ink' | 'paper'; name: string };

const KEY = 'fg-pt';

const nameSize = (name: string) => `${Math.round(Math.min(window.innerWidth * 0.22, (window.innerWidth * 0.9) / (name.length * 0.5)))}px`;

function destination(url: URL): Stop {
  if (/\/(projetos|projects)\/lyfia\/?$/.test(url.pathname)) return { field: 'petrol', name: 'Lyfia' };
  if (/\/(projetos|projects)\/recuperavc\/?$/.test(url.pathname)) return { field: 'ink', name: 'RecuperAVC' };
  if (/\/(projetos|projects)\/bintriage\/?$/.test(url.pathname)) return { field: 'paper', name: 'bintriage' };
  return { field: 'petrol', name: 'Fellipe Gabriel' };
}

function parts() {
  const el = document.querySelector<HTMLElement>('[data-pt]');
  if (!el) return null;
  return {
    el,
    cols: Array.from(el.querySelectorAll<HTMLElement>('[data-pt-col]')),
    name: el.querySelector<HTMLElement>('[data-pt-name]')!,
  };
}

export function initPageTransitions(onLeave: () => void) {
  const p = parts();
  if (!p) return;

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;
    e.preventDefault();

    const stop = destination(url);
    onLeave();
    p.el.dataset.field = stop.field;
    p.name.textContent = stop.name;
    p.el.style.setProperty('--pt-size', nameSize(stop.name));
    p.el.classList.add('is-active');
    gsap.killTweensOf([...p.cols, p.name]);

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(KEY, JSON.stringify(stop));
        } catch {
        }
        location.href = url.href;
      },
    });
    tl.fromTo(p.cols, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.9, ease: 'expo.inOut', stagger: { each: 0.045, from: 'end' } });
    tl.fromTo(p.name, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out' }, 0.45);
    tl.to({}, { duration: 0.15 });
  });

  document.addEventListener('pointerover', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!a || a.dataset.prefetched) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    a.dataset.prefetched = '1';
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url.pathname;
    document.head.append(link);
  });

  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    p.el.classList.remove('is-active');
    gsap.set(p.cols, { scaleY: 0 });
    gsap.set(p.name, { yPercent: 110 });
    p.name.textContent = '';
    document.documentElement.classList.remove('is-transitioning');
  });
}

export function revealIncoming(): Promise<void> {
  const root = document.documentElement;
  try {
    sessionStorage.removeItem(KEY);
  } catch {
  }
  const p = parts();
  if (!p || !root.classList.contains('is-transitioning')) return Promise.resolve();

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        root.classList.remove('is-transitioning');
        gsap.set(p.cols, { clearProps: 'transform' });
        gsap.set(p.name, { clearProps: 'transform' });
      },
    });
    tl.fromTo(p.name, { yPercent: 0 }, { yPercent: -110, duration: 0.75, ease: 'expo.in' });
    tl.fromTo(p.cols, { scaleY: 1, transformOrigin: '50% 0%' }, { scaleY: 0, duration: 1.2, ease: 'expo.inOut', stagger: { each: 0.05, from: 'start' } }, '-=0.25');
    tl.call(() => resolve(), undefined, '-=0.9');
  });
}
