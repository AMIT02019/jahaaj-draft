/**
 * Jahaaj Healthcare - Unified Canonical Navigation & Interactive Shell Controller
 * Manages desktop hover/click dropdowns, mobile drawer accordions, scroll progress, and outside-click dismiss.
 */
(function() {
  function initNav() {
    const navItems = document.querySelectorAll('.nav__item[data-menu]');
    
    // Desktop Click / Tap Toggle
    navItems.forEach(item => {
      const btn = item.querySelector('.nav__link');
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const isCurrentlyOpen = item.classList.contains('open');
          
          navItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('open');
              const otherBtn = other.querySelector('.nav__link');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            }
          });

          if (isCurrentlyOpen) {
            item.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });

    // Close all menus when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav__item')) {
        navItems.forEach(item => {
          item.classList.remove('open');
          const btn = item.querySelector('.nav__link');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        navItems.forEach(item => {
          item.classList.remove('open');
          const btn = item.querySelector('.nav__link');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        const drawer = document.getElementById('mnav');
        if (drawer && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          drawer.hidden = true;
          const burger = document.querySelector('.nav__burger');
          if (burger) {
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }
      }
    });

    // Mobile Hamburger & Drawer
    const burger = document.querySelector('.nav__burger');
    const drawer = document.getElementById('mnav');
    if (burger && drawer) {
      burger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpened = drawer.classList.toggle('open');
        drawer.hidden = !isOpened;
        burger.setAttribute('aria-expanded', isOpened);
        burger.classList.toggle('active', isOpened);
        document.body.style.overflow = isOpened ? 'hidden' : '';
      });
    }

    // Mobile Drawer Accordions
    document.querySelectorAll('.mnav__top').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const sub = this.nextElementSibling;
        if (sub && sub.classList.contains('mnav__sub')) {
          const isOpened = sub.classList.toggle('open');
          this.setAttribute('aria-expanded', isOpened);
        }
      });
    });

    // Top Scroll Progress Bar & Header Auto-Hide / Reveal Animation
    const progressBar = document.getElementById('scrollProgress');
    const nav = document.getElementById('nav') || document.querySelector('.nav');
    const mnav = document.getElementById('mnav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleNavScroll() {
      const currentScrollY = Math.max(0, window.scrollY);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update Scroll Progress Bar
      if (progressBar && totalHeight > 0) {
        const pct = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        progressBar.style.width = pct + '%';
      }

      if (nav) {
        // Scrolled elevated appearance
        if (currentScrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }

        // Check if drawer or any desktop dropdown is currently open
        const isDrawerOpen = mnav && (!mnav.hasAttribute('hidden') && mnav.classList.contains('open'));
        const isMenuOpen = Array.from(document.querySelectorAll('.nav__item[data-menu]')).some(it => it.classList.contains('open'));

        const delta = currentScrollY - lastScrollY;

        if (isDrawerOpen || isMenuOpen || currentScrollY < 60) {
          nav.classList.remove('nav--hidden');
        } else if (delta > 6 && currentScrollY > 100) {
          // Scrolling down: hide header
          nav.classList.add('nav--hidden');
        } else if (delta < -6) {
          // Scrolling up: reveal header
          nav.classList.remove('nav--hidden');
        }
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(handleNavScroll);
        ticking = true;
      }
    }, { passive: true });

    // Scroll Animations & Visibility Tagging
    const animEls = document.querySelectorAll('[data-animate], [data-stagger]');
    document.querySelectorAll('[data-stagger]').forEach(container => {
      Array.from(container.children).forEach((child, idx) => {
        child.style.setProperty('--i', idx);
        child.classList.add('animated');
      });
      container.classList.add('animated');
    });
    animEls.forEach(el => el.classList.add('animated'));

    // Universal Form Newsletter Interceptor
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.removeAttribute('onsubmit');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : '';
        form.reset();
        window.showSubmissionPopup({
          pill: '<i class="fa-solid fa-envelope-circle-check"></i> Newsletter Subscribed',
          title: 'Thank You for Subscribing!',
          message: email 
            ? `Confirmation sent to <strong>${email}</strong>. You'll receive our latest CDMO technical updates and formulation briefs.`
            : 'You are now subscribed to Jahaaj Healthcare CDMO market briefings and formulation updates.',
          buttonText: 'Continue Browsing'
        });
      });
    });
  }

  /* ==========================================================================
     INTERACTIVE FORM SUBMISSION SUCCESS POPUP MODAL
     ========================================================================== */
  function createSubmissionPopupElement() {
    let popup = document.getElementById('jhcSubmissionPopup');
    if (popup) return popup;

    popup = document.createElement('div');
    popup.id = 'jhcSubmissionPopup';
    popup.className = 'jhc-popup-backdrop';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('aria-labelledby', 'jhcPopupTitle');

    popup.innerHTML = `
      <div class="jhc-popup-dialog" onclick="event.stopPropagation()">
        <button class="jhc-popup-close" id="jhcPopupCloseBtn" aria-label="Close dialog">&times;</button>
        <div class="jhc-popup-icon-wrap" id="jhcPopupIcon">
          <i class="fa-solid fa-check"></i>
        </div>
        <div class="jhc-popup-pill" id="jhcPopupPill">
          <i class="fa-solid fa-circle-check"></i> Enquiry Received
        </div>
        <h3 class="jhc-popup-title" id="jhcPopupTitle">Thank You!</h3>
        <p class="jhc-popup-desc" id="jhcPopupDesc">Your formulation enquiry has been successfully transmitted.</p>
        <div class="jhc-popup-card" id="jhcPopupCard">
          <div>
            <div class="jhc-popup-ref-label">Inquiry Reference ID</div>
            <div class="jhc-popup-ref-val" id="jhcPopupRef">JH-${Math.floor(10000 + Math.random() * 90000)}</div>
          </div>
          <div class="jhc-popup-badge-sla">
            <i class="fa-solid fa-clock"></i> 24h Response SLA
          </div>
        </div>
        <div class="jhc-popup-actions">
          <button class="jhc-popup-btn" id="jhcPopupActionBtn">Done / Continue Browsing</button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    function closePopup() {
      popup.classList.remove('active');
      document.body.style.overflow = '';
      if (window._jhcPopupCloseCallback) {
        window._jhcPopupCloseCallback();
        window._jhcPopupCloseCallback = null;
      }
    }

    // Dismiss on backdrop click
    popup.addEventListener('click', closePopup);

    // Dismiss on close button
    const closeBtn = popup.querySelector('#jhcPopupCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    // Dismiss on action button
    const actionBtn = popup.querySelector('#jhcPopupActionBtn');
    if (actionBtn) actionBtn.addEventListener('click', closePopup);

    // Dismiss on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
      }
    });

    return popup;
  }

  window.showSubmissionPopup = function(options = {}) {
    const popup = createSubmissionPopupElement();

    const titleEl = popup.querySelector('#jhcPopupTitle');
    const descEl = popup.querySelector('#jhcPopupDesc');
    const pillEl = popup.querySelector('#jhcPopupPill');
    const refEl = popup.querySelector('#jhcPopupRef');
    const actionBtn = popup.querySelector('#jhcPopupActionBtn');
    const iconEl = popup.querySelector('#jhcPopupIcon');

    if (options.title && titleEl) titleEl.innerHTML = options.title;
    if (options.message && descEl) descEl.innerHTML = options.message;
    if (options.pill && pillEl) pillEl.innerHTML = options.pill;
    if (options.refId && refEl) {
      refEl.textContent = options.refId;
    } else if (refEl) {
      refEl.textContent = 'JH-' + Math.floor(10000 + Math.random() * 90000);
    }
    if (options.buttonText && actionBtn) actionBtn.textContent = options.buttonText;
    if (options.icon && iconEl) iconEl.innerHTML = options.icon;

    window._jhcPopupCloseCallback = options.onClose || null;

    popup.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto-focus action button for accessibility
    setTimeout(() => {
      if (actionBtn) actionBtn.focus();
    }, 100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
