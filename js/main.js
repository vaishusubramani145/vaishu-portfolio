/**
 * Main Application Logic for Vaishnavi S's Portfolio
 * - Neural Network Canvas Animation
 * - Theme Switcher (Dark / Light)
 * - Navigation & Smooth Scroll
 * - Hero Typing Animation
 * - Project Filtering & Dynamic Modals
 * - Contact Form Validation & Toast Messages
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ===================================================================
  // 1. NEURAL NETWORK CANVAS ANIMATION
  // ===================================================================
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: null, y: null, radius: 140 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Handle Resize
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.7)' : 'rgba(14, 165, 233, 0.7)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    function animate() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * (isDark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(0, 240, 255, ${alpha})`
              : `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw(isDark);
      }

      requestAnimationFrame(animate);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animate();
    }
  }

  // ===================================================================
  // 2. THEME SWITCHER (Dark / Light)
  // ===================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // ===================================================================
  // 3. NAVIGATION, HEADER SCROLL & MOBILE MENU
  // ===================================================================
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Active Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navItems.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => navObserver.observe(section));

  // ===================================================================
  // 4. HERO SECTION TYPING ANIMATION
  // ===================================================================
  const typingElement = document.getElementById('hero-typing');
  if (typingElement) {
    const phrases = [
      'Python & Machine Learning',
      'Computer Vision & Image Processing',
      'UI/UX Design & Frontend Engineering',
      'IoT Systems & Smart Automation'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 90;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 350;
      }

      setTimeout(type, typingDelay);
    }

    type();
  }

  // ===================================================================
  // 5. PROJECTS FILTERING & MODALS
  // ===================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInMsg 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Details Modal
  document.addEventListener('click', (e) => {
    const detailsTrigger = e.target.closest('[data-project-id]');
    if (detailsTrigger) {
      const projectId = detailsTrigger.getAttribute('data-project-id');
      openProjectModal(projectId);
    }
  });

  function openProjectModal(id) {
    const data = window.PORTFOLIO_DATA?.projects?.find((p) => p.id === id);
    if (!data) return;

    const modalHtml = `
      <div class="modal-overlay open" id="project-detail-modal">
        <div class="modal-content">
          <button class="modal-close-btn" onclick="document.getElementById('project-detail-modal').remove()">
            <i class="fas fa-times"></i>
          </button>
          
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.75rem;">
            <span class="badge">${data.categoryLabel}</span>
            <span class="badge badge-emerald">Working Prototype</span>
          </div>

          <h2 style="font-size:1.6rem; margin-bottom:1rem;">${data.title}</h2>

          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; color:var(--accent-cyan); margin-bottom:0.4rem;">🎯 Problem Statement</h4>
            <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.6;">${data.problem}</p>
          </div>

          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; color:var(--accent-cyan); margin-bottom:0.4rem;">💡 Solution & Implementation</h4>
            <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.6;">${data.solution}</p>
          </div>

          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; color:var(--accent-cyan); margin-bottom:0.6rem;">📊 Key Attributes</h4>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.8rem; background:rgba(255,255,255,0.03); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              ${data.metrics
                .map(
                  (m) => `
                <div style="text-align:center;">
                  <div style="font-size:1.15rem; font-weight:700; color:var(--accent-cyan);">${m.value}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">${m.label}</div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <div style="margin-bottom:1.8rem;">
            <h4 style="font-size:1rem; color:var(--accent-cyan); margin-bottom:0.6rem;">🛠️ Technologies Used</h4>
            <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
              ${data.tech.map((t) => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>

          <div style="display:flex; gap:1rem; flex-wrap:wrap; padding-top:1.2rem; border-top:1px solid var(--border-color);">
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i class="fab fa-github"></i> View GitHub Repository
            </a>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('project-detail-modal').remove(); document.getElementById('chatbot-trigger').click(); setTimeout(() => { document.getElementById('chat-input').value = 'Tell me more about ${data.title}'; document.getElementById('chat-form').dispatchEvent(new Event('submit')); }, 400);">
              <i class="fas fa-robot"></i> Ask AI About This
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // ===================================================================
  // 6. CONTACT FORM & CLIPBOARD COPY
  // ===================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'fa-exclamation-triangle');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--accent-emerald)';
        showToast(`Thank you, ${name}! Your message has been sent to Vaishnavi S.`, 'fa-paper-plane');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 600);
    });
  }

  // Copy Email Helper
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'vaishnavivaithegil@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', 'fa-copy');
      });
    });
  });

  // Resume Modal Preview
  const resumeTriggers = document.querySelectorAll('.resume-trigger');
  resumeTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  function openResumeModal() {
    const p = window.PORTFOLIO_DATA?.profile;
    const edu = window.PORTFOLIO_DATA?.education[0];
    const modalHtml = `
      <div class="modal-overlay open" id="resume-modal">
        <div class="modal-content" style="max-width:750px;">
          <button class="modal-close-btn" onclick="document.getElementById('resume-modal').remove()">
            <i class="fas fa-times"></i>
          </button>
          
          <div style="border-bottom:2px solid var(--border-color); padding-bottom:1.2rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
            <div>
              <h2 style="font-size:1.8rem; margin-bottom:0.2rem;">${p?.name || 'Vaishnavi S'}</h2>
              <div style="color:var(--accent-cyan); font-weight:600;">${p?.title}</div>
              <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;">
                ${p?.location} • ${p?.email} • ${p?.phone}
              </div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.print()">
              <i class="fas fa-print"></i> Print / Save PDF
            </button>
          </div>

          <div style="margin-bottom:1.4rem;">
            <h4 style="font-size:1rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent-cyan); margin-bottom:0.5rem;">🎓 Education</h4>
            <div style="display:flex; justify-content:space-between; font-weight:600;">
              <span>${edu?.degree}</span>
              <span style="color:var(--accent-emerald);">${edu?.gpa}</span>
            </div>
            <div style="font-size:0.88rem; color:var(--text-secondary);">${edu?.institution} (${edu?.duration})</div>
          </div>

          <div style="margin-bottom:1.4rem;">
            <h4 style="font-size:1rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent-cyan); margin-bottom:0.5rem;">💼 Professional Internships</h4>
            ${window.PORTFOLIO_DATA?.internships
              ?.map(
                (i) => `
              <div style="margin-bottom:0.9rem;">
                <div style="display:flex; justify-content:space-between; font-weight:600;">
                  <span>${i.role} – <span style="color:var(--accent-cyan);">${i.company}</span></span>
                  <span style="font-size:0.85rem; color:var(--text-muted);">${i.period}</span>
                </div>
                <ul style="padding-left:1.2rem; font-size:0.88rem; color:var(--text-secondary); margin-top:0.3rem;">
                  <li>${i.highlights[0]}</li>
                  <li>${i.highlights[1]}</li>
                </ul>
              </div>
            `
              )
              .join('')}
          </div>

          <div style="margin-bottom:1.4rem;">
            <h4 style="font-size:1rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent-cyan); margin-bottom:0.5rem;">🛠️ Technical Skills</h4>
            <p style="font-size:0.88rem; color:var(--text-secondary);">
              <strong>Programming & ML:</strong> Python, OpenCV, Image Processing, Basic ML.<br>
              <strong>Frontend & Design:</strong> HTML5, CSS3, JavaScript, Figma, Canva.<br>
              <strong>IoT & Tools:</strong> IoT System Integration, Smart Automation, Git, GitHub, VS Code, Flask, SQLite.
            </p>
          </div>

          <div style="text-align:center; padding-top:1rem; border-top:1px solid var(--border-color);">
            <a href="mailto:${p?.email}?subject=Internship%20Inquiry%20-%20Vaishnavi%20S" class="btn btn-primary btn-sm">
              <i class="fas fa-envelope"></i> Send Internship Email
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // ===================================================================
  // 7. TOAST NOTIFICATION UTILITY
  // ===================================================================
  function showToast(message, icon = 'fa-info-circle') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon}" style="color:var(--accent-cyan)"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  window.showToast = showToast;
});
