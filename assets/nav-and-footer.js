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

    // Top Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      window.addEventListener('scroll', function() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const pct = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
