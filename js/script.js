/* ═══════════════════════════════════════════════
   SHREE SAIARJUN MOTOR DRIVING SCHOOL
   script.js — Interactions & Animations
   ═══════════════════════════════════════════════ */

'use strict';

/* ── SMOOTH SCROLL (Lenis-style native) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = document.getElementById('site-header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });

    // Close mobile nav if open
    closeMobileNav();
  });
});

/* ── HEADER: SCROLL BEHAVIOUR ── */
const header = document.getElementById('site-header');
const headerCta = document.getElementById('header-cta');
const SCROLL_THRESHOLD = 80;

function updateHeader() {
  const scrollY = window.scrollY;
  if (scrollY > SCROLL_THRESHOLD) {
    header.classList.add('scrolled');
    headerCta.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    headerCta.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader(); // init

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

function closeMobileNav() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.contains('open');
  if (isOpen) {
    closeMobileNav();
  } else {
    hamburger.classList.add('active');
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) closeMobileNav();
});

/* ── INTERSECTION OBSERVER: FADE-IN-UP ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ── WHATSAPP FLOAT: DELAYED ENTRY ── */
const waFloat = document.getElementById('whatsapp-float');

setTimeout(() => {
  waFloat.classList.add('visible');
}, 2000);

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.nextElementSibling;
        otherAnswer.classList.remove('open');
      }
    });

    // Toggle current
    if (isExpanded) {
      btn.setAttribute('aria-expanded', 'false');
      answer.classList.remove('open');
    } else {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

/* ── ACTIVE NAV LINK HIGHLIGHTING ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── STAGGER DELAYS FOR BENTO CARDS ── */
document.querySelectorAll('.bento-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

document.querySelectorAll('.process-step').forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.g-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

/* ── PARALLAX REMOVED ── 
   Disabled: conflicts with float-animation on .hero-img
   Both use transform; scroll handler overwrites CSS keyframe each tick → shake.
   The float-animation alone gives sufficient motion to the hero. ── */

/* ── MARQUEE PAUSE ON FOCUS (ACCESSIBILITY) ── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('focusin', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('focusout', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ── PHONE NUMBER CLICK TRACKING (CONSOLE) ── */
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('[Analytics] Phone call initiated:', link.href);
    // Replace with your analytics: gtag('event', 'call_click', {...});
  });
});

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('[Analytics] WhatsApp button clicked');
    // Replace with your analytics: gtag('event', 'whatsapp_click', {...});
  });
});

/* ── PRICING CARD ENTRANCE STAGGER ── */
const pricingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.pricing-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = card.classList.contains('pricing-featured') ? 'scale(1.02)' : 'translateY(0)';
        }, i * 120);
      });
      pricingObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const pricingGrid = document.querySelector('.pricing-grid');
if (pricingGrid) {
  // Init hidden state
  pricingGrid.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
  });
  pricingObserver.observe(pricingGrid);
}

/* ── INIT COMPLETE ── */
console.log('✅ Saiarjun Motor Driving School — Site loaded');
