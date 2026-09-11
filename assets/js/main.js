/* ============================================================
   main.js — Portfolio interactions & animations
   ============================================================ */

'use strict';

/* ── Navbar scroll behaviour ───────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNavLink();
  toggleScrollTopBtn();
});

/* ── Active nav link on scroll ─────────────────────────────── */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

/* ── Mobile nav toggle ─────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinksMenu');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
  document.body.style.overflow = navLinksMenu.classList.contains('open') ? 'hidden' : '';
});

navLinksMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Typed effect ──────────────────────────────────────────── */
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const words = [
    'Software Engineer',
    'Full-Stack Developer',
    'Android Developer',
    'SEO Strategist',
    'UI/UX Enthusiast'
  ];
  let wi = 0, ci = 0, deleting = false;

  function typeLoop() {
    const word = words[wi];
    typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ++ci);

    if (!deleting && ci === word.length) {
      setTimeout(() => { deleting = true; typeLoop(); }, 2000);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(typeLoop, deleting ? 60 : 95);
  }
  typeLoop();
}

/* ── Scroll reveal ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger')
  .forEach(el => revealObserver.observe(el));

/* ── Project tabs ──────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${tab}`)?.classList.add('active');
  });
});

/* ── Scroll-to-top button ──────────────────────────────────── */
const scrollTopBtn = document.getElementById('scroll-top');
function toggleScrollTopBtn() {
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
}
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Smooth anchor scroll ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── Contact form (UI-only) ────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    contactForm.innerHTML = `
      <div class="form-success" style="display:flex;flex-direction:column;align-items:center;gap:1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round" style="color:var(--success)">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p style="color:var(--text);font-weight:600;font-size:1.1rem;">Message sent!</p>
        <p style="color:var(--text-muted)">Thanks for reaching out. I'll reply within 24 hours.</p>
      </div>`;
  }, 1400);
});

/* ── Custom cursor (desktop only) ──────────────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(cursor, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animateCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * .15;
    ry += (my - ry) * .15;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

/* ── Stat counter animation ─────────────────────────────────── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const step = Math.ceil(target / 50);
      const t = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = start + suffix;
        if (start >= target) clearInterval(t);
      }, 30);
    });
    statObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statObserver.observe(el));
