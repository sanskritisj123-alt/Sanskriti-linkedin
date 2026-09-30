// ==========================================================================
// Sanskriti Jain — Professional Portfolio Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('sanskriti-theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('sanskriti-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const navLinksMenu = document.getElementById('nav-links-menu');

  if (mobileMenuBtn && navLinksMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinksMenu.classList.toggle('mobile-active');
    });

    // Close menu when clicking any nav link
    navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        navLinksMenu.classList.remove('mobile-active');
      });
    });
  }

  // 3. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: immediately show elements
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. Resume Modal Interaction
  const resumeModal = document.getElementById('resume-modal');
  const resumeIframe = document.getElementById('resume-iframe');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const resumeTriggers = document.querySelectorAll('.trigger-resume-modal');

  function openResumeModal() {
    if (resumeModal && resumeIframe) {
      if (!resumeIframe.src || resumeIframe.src === window.location.href) {
        resumeIframe.src = 'RESUME.pdf';
      }
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
      }
    });
  }

  // 5. Copy-to-Clipboard Buttons
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Text';

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = 'var(--soft-sage-light)';
        btn.style.color = 'var(--soft-sage)';
        btn.style.borderColor = 'var(--soft-sage-border)';

        showToast(`${label} copied to clipboard!`);

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        showToast(`Failed to copy: ${textToCopy}`);
      }
    });
  });

  // 6. Contact Form Submission Handling
  const contactForm = document.getElementById('portfolio-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const message = document.getElementById('sender-message')?.value || '';

      const subject = encodeURIComponent(`Articleship / Opportunity Inquiry from ${name}`);
      const body = encodeURIComponent(`Hello Sanskriti,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);

      window.location.href = `mailto:sanskritisj123@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }

  // 7. Toast Notification Helper
  function showToast(message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
