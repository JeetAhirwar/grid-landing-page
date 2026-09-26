(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.querySelector('.menu-overlay');
  const iconMenu = menuToggle.querySelector('.icon-menu');
  const iconClose = menuToggle.querySelector('.icon-close');

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    navMenu.hidden = false;
    overlay.hidden = false;
    // Force reflow so transition plays
    void navMenu.offsetWidth;
    navMenu.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    iconMenu.hidden = true;
    iconClose.hidden = false;
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    navMenu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    iconMenu.hidden = false;
    iconClose.hidden = true;

    // Wait for transition then hide
    const onEnd = () => {
      navMenu.hidden = true;
      overlay.hidden = true;
      navMenu.removeEventListener('transitionend', onEnd);
    };
    navMenu.addEventListener('transitionend', onEnd);
    // Fallback if no transition
    setTimeout(() => {
      if (!navMenu.classList.contains('is-open')) {
        navMenu.hidden = true;
        overlay.hidden = true;
      }
    }, 350);
  }

  function toggleMenu() {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();
