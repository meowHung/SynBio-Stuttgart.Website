/* brobiotics 2026 – menu and fade-in on scroll */

document.addEventListener('DOMContentLoaded', function () {
  // ----- Phone menu overlay -----
  var menu = document.getElementById('menu');
  var openBtn = document.querySelector('.menu-open');
  var closeBtn = document.querySelector('.menu-close');

  function setMenuOpen(open) {
    menu.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    (open ? closeBtn : openBtn).focus();
  }

  openBtn.addEventListener('click', function () { setMenuOpen(true); });
  closeBtn.addEventListener('click', function () { setMenuOpen(false); });

  // ----- Projects dropdown (click; hover and keyboard focus are handled in CSS) -----
  var toggles = document.querySelectorAll('.submenu-toggle');

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  function closeDropdowns() {
    toggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
  }

  document.addEventListener('click', closeDropdowns);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeDropdowns();
    if (menu.classList.contains('is-open')) setMenuOpen(false);
  });

  // ----- Fade sections in when they scroll into view -----
  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function (el) { observer.observe(el); });
});
