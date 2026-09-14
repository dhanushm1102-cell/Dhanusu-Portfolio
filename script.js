/* ==========================================================================
   DHANUSH — PORTFOLIO SCRIPT
   Everything reads from `portfolioConfig` below. Edit that object with your
   real details and every link on the site updates automatically.
   ========================================================================== */

/* ---------- 1. PERSONAL CONFIG — edit this ---------- */
const portfolioConfig = {
  name: "Dhanush",
  role: "Full Stack Developer",
  email: "dhanushm1102@example.com",
  whatsapp: "918220362115",               // digits only, with country code
  github: "https://github.com/dhanushm1102-cell",         // replace with your real GitHub username
  linkedin: "https://www.linkedin.com/in/dhanusu-m-39152132a/", // replace with your real LinkedIn username
  resume: "C:\\Users\\dhanu\\portfolio\\assets\\Dhanusu_Resume.pdf",                            // path to your resume PDF, e.g. "resume.pdf"
  projectsCompleted: 1                    // shown in the animated project counter
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initLoader();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initHeroName();
  initProfileTilt();
  initTiltCards();
  initBackgroundParticles();
  initProfileParticles();
  initScrollReveal();
  initStatCounters();
  initSkillOrbit();
  initSkillProgress();
  initProjectFilter();
  initProjectCounter();
  initContactForm();
  initBackToTop();
});

/* ---------- 2. Wire up config-driven links ---------- */
function applyConfig(){
  const mailto = `mailto:${portfolioConfig.email}`;
  const wa = `https://wa.me/${portfolioConfig.whatsapp.replace(/[^0-9]/g,'')}`;

  const linkMap = {
    email: mailto,
    whatsapp: wa,
    github: portfolioConfig.github,
    linkedin: portfolioConfig.linkedin
  };

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (linkMap[key]) el.setAttribute('href', linkMap[key]);
  });

  const resumeBtn = document.getElementById('resumeBtn');
  const resumeBtnMobile = document.getElementById('resumeBtnMobile');
  if (resumeBtn) resumeBtn.setAttribute('href', portfolioConfig.resume);
  if (resumeBtnMobile) resumeBtnMobile.setAttribute('href', portfolioConfig.resume);
}

/* ---------- 3. Loading screen ---------- */
function initLoader(){
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const percent = document.getElementById('loaderPercent');
  if (!loader) return;

  if (prefersReducedMotion){
    loader.classList.add('done');
    document.body.style.overflow = '';
    return;
  }

  document.body.style.overflow = 'hidden';
  let progress = 0;
  const duration = 1600; // ms, kept short per spec
  const start = performance.now();

  function tick(now){
    const elapsed = now - start;
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    fill.style.width = progress + '%';
    percent.textContent = progress + '%';
    if (progress < 100){
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
      }, 250);
    }
  }
  requestAnimationFrame(tick);
}

/* ---------- 4. Custom cursor (desktop only) ---------- */
function initCustomCursor(){
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  const hoverTargets = 'a, button, .skill-card, .project-card, .orbit-icon, input, textarea, .hero-name';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.add('hovered');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) ring.classList.remove('hovered');
  });
}

/* ---------- 5. Navbar: scroll style + active section ---------- */
function initNavbar(){
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('main section[id]');

  function onScroll(){
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const backToTop = document.getElementById('backToTop');
    if (backToTop){
      if (window.scrollY > 600) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => spy.observe(sec));
}

/* ---------- 6. Mobile menu ---------- */
function initMobileMenu(){
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  function close(){
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', close);
  });
}

/* ---------- 7. Smooth scroll with navbar offset ---------- */
function initSmoothScroll(){
  const navHeight = () => document.getElementById('navbar').offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight() + 1;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

/* ---------- 8. Hero name hover: glow + subtle lift per letter ---------- */
function initHeroName(){
  const heroName = document.getElementById('heroName');
  if (!heroName) return;
  const letters = heroName.querySelectorAll('.letter');

  heroName.addEventListener('mouseenter', () => heroName.classList.add('active'));
  heroName.addEventListener('mouseleave', () => {
    heroName.classList.remove('active');
    letters.forEach(l => l.classList.remove('pop'));
  });
  heroName.addEventListener('mousemove', (e) => {
    const rect = heroName.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    letters.forEach(letter => {
      const lRect = letter.getBoundingClientRect();
      const lCenter = (lRect.left + lRect.right) / 2 - rect.left;
      const dist = Math.abs(relX - lCenter);
      letter.classList.toggle('pop', dist < 46);
    });
  });
}

/* ---------- 9. Profile image 3D tilt following the mouse ---------- */
function initProfileTilt(){
  if (prefersReducedMotion) return;
  const stage = document.getElementById('profileStage');
  const frame = stage ? stage.querySelector('.profile-frame') : null;
  if (!stage || !frame) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
    stage.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    stage.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  });
  stage.addEventListener('mouseleave', () => {
    frame.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
  });
}

/* ---------- 10. Generic 3D tilt for cards (about card + project cards) ---------- */
function initTiltCards(){
  if (prefersReducedMotion) return;
  const cards = document.querySelectorAll('.tilt-card, .tilt-3d');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

/* ---------- 11. Background particle canvas ---------- */
function initBackgroundParticles(){
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }

  function createParticles(){
    const count = Math.min(70, Math.floor((w * h) / 60000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '124,92,255' : '52,224,216',
      alpha: Math.random() * 0.5 + 0.15
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.fill();
    });
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); createParticles(); }, 250);
  });
}

/* ---------- 12. Floating particles around the profile photo ---------- */
function initProfileParticles(){
  const wrap = document.getElementById('profileParticles');
  if (!wrap) return;
  const count = 10;
  for (let i = 0; i < count; i++){
    const span = document.createElement('span');
    const angle = (i / count) * 360;
    const radius = 46 + Math.random() * 8;
    span.style.left = `calc(50% + ${Math.cos(angle * Math.PI/180) * radius}%)`;
    span.style.top = `calc(50% + ${Math.sin(angle * Math.PI/180) * radius}%)`;
    span.style.animationDelay = `${-(i * 0.6)}s`;
    span.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
    wrap.appendChild(span);
  }
}

/* ---------- 13. Scroll reveal via Intersection Observer ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReducedMotion){
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
}

/* ---------- 14. Animated stat counters ---------- */
function initStatCounters(){
  const counters = document.querySelectorAll('.stat-number, .counter-number');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion){
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function step(now){
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

/* ---------- 15. Half-circle skill orbit ---------- */
function initSkillOrbit(){
  const stage = document.getElementById('orbitStage');
  const iconsWrap = document.getElementById('orbitIcons');
  const nameLabel = document.getElementById('orbitName');
  if (!stage || !iconsWrap) return;

  const skills = [
    { name: 'HTML5', icon: 'fa-brands fa-html5' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'Python', icon: 'fa-brands fa-python' },
    { name: 'Java', icon: 'fa-brands fa-java' },
    { name: 'C++', icon: 'fa-solid fa-code' },
    { name: 'UI/UX Design', icon: 'fa-solid fa-palette' }
  ];

  const els = skills.map((s, i) => {
    const el = document.createElement('div');
    el.className = 'orbit-icon';
    el.innerHTML = `<span class="orbit-icon-inner"><i class="${s.icon}"></i></span>`;
    el.dataset.name = s.name;
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', s.name);
    iconsWrap.appendChild(el);
    return { el, offset: (i / skills.length) * 200, name: s.name };
  });

  let angleShift = 0;
  let paused = false;
  let activeIndex = 0;
  let hoveredIndex = -1;

  function position(){
    const rect = stage.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height; // baseline at bottom (half circle opens upward)
    const radius = Math.min(rect.width, rect.height * 2) / 2 - 40;

    let closestDist = Infinity;

    els.forEach((item, i) => {
      // angle travels from 180 (left) to 0 (right) across the arc, continuously looping
      let angle = (item.offset + angleShift) % 200; // 200 gives a small gap for fade wrap
      const t = angle / 200; // 0..1 across the full cycle incl. fade gap
      const arcAngle = 180 - (t * 200); // maps to 180..-20 so it fades before wrapping

      const rad = arcAngle * Math.PI / 180;
      const x = cx + radius * Math.cos(rad);
      const y = cy - radius * Math.sin(rad);

      // fade near the two ends of the visible 0-180 range
      let opacity = 1;
      if (arcAngle > 170) opacity = (180 - arcAngle) / 10;
      if (arcAngle < 10) opacity = arcAngle / 10;
      opacity = Math.max(0, Math.min(1, opacity));

      item.el.style.transform = `translate(${x}px, ${y}px)`;
      item.el.style.opacity = opacity.toFixed(2);
      item.el.classList.toggle('is-hovered', i === hoveredIndex);

      const distFromTop = Math.abs(arcAngle - 90);
      if (distFromTop < closestDist){
        closestDist = distFromTop;
        activeIndex = i;
      }
    });

    els.forEach((item, i) => item.el.classList.toggle('is-active', i === activeIndex || i === hoveredIndex));
    if (nameLabel) nameLabel.textContent = hoveredIndex >= 0 ? els[hoveredIndex].name : els[activeIndex].name;
  }

  function loop(){
    if (!paused && !prefersReducedMotion) angleShift += 0.12;
    position();
    requestAnimationFrame(loop);
  }

  els.forEach((item, i) => {
    item.el.addEventListener('mouseenter', () => { paused = true; hoveredIndex = i; });
    item.el.addEventListener('mouseleave', () => { paused = false; hoveredIndex = -1; });
    item.el.addEventListener('focus', () => { paused = true; hoveredIndex = i; });
    item.el.addEventListener('blur', () => { paused = false; hoveredIndex = -1; });
  });

  window.addEventListener('resize', position);
  requestAnimationFrame(loop);
}

/* ---------- 16. Skill card progress bars animate into view ---------- */
function initSkillProgress(){
  const bars = document.querySelectorAll('.skill-progress span');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const level = entry.target.dataset.level || 0;
        entry.target.style.width = level + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => observer.observe(b));
}

/* ---------- 17. Project filter ---------- */
function initProjectFilter(){
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cats = (card.dataset.cats || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hide', !show);
      });
    });
  });
}

/* ---------- 18. Animated project counter (reads portfolioConfig) ---------- */
function initProjectCounter(){
  const counter = document.querySelector('.counter-number');
  if (counter) counter.dataset.count = portfolioConfig.projectsCompleted;
}

/* ---------- 19. Contact form validation (mailto fallback, no fake backend) ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const note = document.getElementById('formNote');

  function setError(fieldId, message){
    const errEl = document.getElementById('err-' + fieldId);
    const row = document.getElementById(fieldId)?.closest('.form-row');
    if (errEl) errEl.textContent = message || '';
    if (row) row.classList.toggle('error', Boolean(message));
  }

  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = form.subject.value.trim();

    setError('fullName', '');
    setError('email', '');
    setError('message', '');

    if (!name){ setError('fullName', 'Please enter your name.'); valid = false; }
    if (!email || !isValidEmail(email)){ setError('email', 'Please enter a valid email address.'); valid = false; }
    if (!message){ setError('message', 'Please write a short message.'); valid = false; }

    if (!valid){
      note.textContent = 'Please fix the highlighted fields.';
      note.className = 'form-note error';
      return;
    }

    // No backend is connected — open the visitor's email client with the
    // message pre-filled. Replace this block with a fetch() call to your
    // own backend or a form service (e.g. Formspree) if you add one later.
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${portfolioConfig.email}?subject=${encodeURIComponent(subject || 'Portfolio inquiry from ' + name)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    note.textContent = 'Opening your email app to send this message…';
    note.className = 'form-note success';
  });

  // Clear a field's error as the user types
  ['fullName','email','message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => setError(id, ''));
  });
}

/* ---------- 20. Back to top button ---------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}
