import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const all = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll(sel)) as T[];
const one = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  scope.querySelector(sel) as T | null;

const once = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true });

function posterPaste(section: HTMLElement) {
  gsap.fromTo(
    section,
    { clipPath: 'inset(7% 5% 0% 5%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
    },
  );
}

function chars(el: Element, masked = true) {
  return SplitText.create(el, masked ? { type: 'lines,chars', mask: 'lines', linesClass: 'split-line' } : { type: 'chars' }).chars;
}

function lines(el: Element) {
  return SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' }).lines;
}

function wipeIn(el: Element, from: 'left' | 'right' = 'left') {
  return { clipPath: from === 'left' ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' };
}

function publications() {
  const section = one('.pubs');
  if (!section) return;
  posterPaste(section);
  const title = one('.pubs-title', section);
  if (title) {
    gsap.from(chars(title, false), {
      scaleY: 0,
      transformOrigin: '50% 100%',
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.04,
      scrollTrigger: once(title),
    });
  }
  all('.pub', section).forEach((pub) => {
    gsap.set(pub, { position: 'relative' });
    const bar = document.createElement('span');
    bar.setAttribute('aria-hidden', 'true');
    Object.assign(bar.style, { position: 'absolute', inset: '0', background: 'var(--amber)', transformOrigin: '0 50%', transform: 'scaleX(0)', pointerEvents: 'none', zIndex: '2' });
    pub.append(bar);
    const content = Array.from(pub.children).filter((c) => c !== bar);
    const year = one('.pub-year', pub);
    const target = year ? parseInt(year.textContent ?? '0', 10) : 0;
    const tl = gsap.timeline({ scrollTrigger: once(pub) });
    tl.set(content, { opacity: 0 });
    tl.to(bar, { scaleX: 1, duration: 0.55, ease: 'expo.in' });
    tl.set(content, { opacity: 1 });
    tl.to(bar, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.7, ease: 'expo.out' });
    if (year && target) {
      const odo = { v: target - 40 };
      tl.fromTo(odo, { v: target - 40 }, {
        v: target,
        duration: 1.3,
        ease: 'expo.out',
        onUpdate: () => {
          year.textContent = String(Math.round(odo.v));
        },
      }, '<');
    }
    tl.from(all('.pub-main > *', pub), { y: 26, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '<0.1');
  });
}

function decode(el: HTMLElement, duration = 1.1) {
  const text = el.textContent ?? '';
  el.style.minHeight = `${el.offsetHeight}px`;
  return gsap.to(el, {
    duration,
    ease: 'none',
    scrambleText: { text, chars: 'upperAndLowerCase', revealDelay: 0.25, speed: 0.6 },
  });
}


function work() {
  const section = one('.work');
  if (!section) return;
  const title = one('.work-title', section);
  if (title) {
    gsap.from(chars(title), {
      yPercent: (i) => (i % 2 ? -115 : 115),
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.035,
      scrollTrigger: once(title),
    });
  }
  all('.group-title', section).forEach((g) => {
    ScrollTrigger.create({ ...once(g, 'top 90%'), onEnter: () => decode(g, 0.9) });
  });
  all('.job', section).forEach((job) => {
    const rule = document.createElement('span');
    rule.setAttribute('aria-hidden', 'true');
    Object.assign(rule.style, { position: 'absolute', left: '0', right: '0', top: '-2px', height: '2px', background: 'currentColor', transformOrigin: '0 50%' });
    gsap.set(job, { position: 'relative', borderTopColor: 'transparent' });
    job.prepend(rule);
    const tl = gsap.timeline({ scrollTrigger: once(job, 'top 88%') });
    tl.from(rule, { scaleX: 0, duration: 1.2, ease: 'expo.inOut' });
    const period = one('.job-period', job);
    if (period) tl.call(() => { decode(period); }, undefined, 0.3);
    const role = one('.job-role', job);
    if (role) tl.from(chars(role), { yPercent: 105, duration: 0.9, ease: 'expo.out', stagger: 0.012 }, 0.35);
    tl.from(all('.job-org, .job-lead', job), { opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, 0.6);
    const items = all('.job-items li', job);
    if (items.length) {
      gsap.from(items, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: once(items[0], 'top 94%'),
      });
    }
  });
}

function about() {
  const section = one('.about');
  if (!section) return;
  const title = one('.about-title', section);
  if (title) {
    gsap.from(chars(title), {
      xPercent: 140,
      skewX: -24,
      opacity: 0,
      duration: 1.3,
      ease: 'expo.out',
      stagger: { each: 0.05, from: 'end' },
      scrollTrigger: once(title),
    });
  }
  const photo = one('.about-photo', section);
  if (photo) {
    const img = one('img', photo);
    gsap.fromTo(photo, { clipPath: 'inset(0% 0% 100% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top 92%', end: 'top 45%', scrub: 0.5 },
    });
    if (img) {
      gsap.fromTo(img, { scale: 1.35, yPercent: -6 }, {
        scale: 1,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  }
  const text = one('.about-text', section);
  if (text) {
    gsap.from(all('p', text).flatMap((p) => lines(p)), {
      yPercent: 100,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.04,
      scrollTrigger: once(text, 'top 92%'),
    });
  }
  const title2 = one('.stack-title', section);
  if (title2) ScrollTrigger.create({ ...once(title2, 'top 90%'), onEnter: () => decode(title2, 0.8) });
  all('.stack-row', section).forEach((row, i) => {
    const dd = one('dd', row);
    const dt = one('dt', row);
    gsap.set(row, { borderTopColor: 'transparent' });
    const tl = gsap.timeline({ scrollTrigger: once(row, 'top 94%'), delay: i * 0.05 });
    tl.to(row, { borderTopColor: 'color-mix(in srgb, var(--ink) 30%, transparent)', duration: 0.4 });
    if (dt) tl.from(dt, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);
    if (dd) tl.call(() => { decode(dd, 1); }, undefined, 0.1);
  });
}

function contact() {
  const section = one('.contact');
  if (!section) return;
  const title = one('.contact-title', section);
  if (title) {
    gsap.from(chars(title, false), {
      x: () => gsap.utils.random(-320, 320),
      y: () => gsap.utils.random(-240, 160),
      rotation: () => gsap.utils.random(-70, 70),
      scale: () => gsap.utils.random(0.4, 1.6),
      opacity: 0,
      duration: 1.7,
      ease: 'expo.out',
      stagger: { each: 0.05, from: 'random' },
      scrollTrigger: once(title, 'top 90%'),
    });
  }
  const lead = one('.contact-main .lead', section);
  if (lead) {
    gsap.from(SplitText.create(lead, { type: 'words' }).words, {
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.015,
      scrollTrigger: once(lead, 'top 92%'),
    });
  }
  const email = one('.contact-email', section);
  if (email) {
    const tl = gsap.timeline({ scrollTrigger: once(email, 'top 95%') });
    tl.from(chars(email, false), { opacity: 0, duration: 0.01, stagger: 0.035, ease: 'none' });
    tl.from(email, { borderBottomColor: 'transparent', duration: 0.5 }, '-=0.3');
  }
  gsap.from(all('.contact-actions > *', section), {
    y: 24,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    stagger: 0.07,
    scrollTrigger: once(one('.contact-actions', section)!, 'top 95%'),
  });
  const fig = one('[data-contact-img]', section);
  if (fig) gsap.from(fig, { ...wipeIn(fig, 'right'), duration: 1.5, ease: 'expo.inOut', scrollTrigger: once(fig, 'top 80%') });
}

function footer() {
  const f = one('.footer');
  if (!f) return;
  gsap.from(Array.from(f.children), { y: 18, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.07, scrollTrigger: once(f, 'top 98%') });
}

function caseSections() {
  all('.case-section').forEach((s) => {
    const h = one('.case-h2', s);
    const tl = gsap.timeline({ scrollTrigger: once(s) });
    tl.from(s, { ...wipeIn(s), duration: 0.9, ease: 'expo.inOut' });
    if (h) tl.from(chars(h), { yPercent: (i) => (i % 2 ? -115 : 115), duration: 1.1, ease: 'expo.out', stagger: 0.025 }, 0.3);
    all('.case-prose p, .case-pubs li', s).forEach((p) => {
      gsap.from(lines(p), { yPercent: 105, duration: 0.8, ease: 'expo.out', stagger: 0.04, scrollTrigger: once(p, 'top 94%') });
    });
  });
  const meta = all('.case-meta > div');
  if (meta.length) gsap.from(meta, { ...wipeIn(meta[0]), duration: 1, ease: 'expo.inOut', stagger: 0.07, delay: 0.3 });
  const next = one('.case-next');
  if (next) {
    const title = one('.case-next-title', next);
    const img = one('.case-next-img', next);
    const tl = gsap.timeline({ scrollTrigger: once(next, 'top 75%') });
    if (img) tl.from(img, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.4, ease: 'expo.inOut' });
    if (title) tl.from(title, { xPercent: -30, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.6);
  }
}

function magnetic() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  all<HTMLElement>('.contact .btn, .hero .btn, .case-head .btn, .project-links .btn').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    });
    btn.addEventListener('pointerleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

export function sectionReveals() {
  work();
  publications();
  about();
  contact();
  footer();
  caseSections();
  magnetic();
}
