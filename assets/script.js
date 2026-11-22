// Mobile navigation and current-section highlighting
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  var header = document.querySelector('.site-header');
  if (!toggle || !nav || !header) return;

  var isChinese = document.documentElement.lang.toLowerCase().indexOf('zh') === 0;

  function setMenu(open, returnFocus) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open
      ? (isChinese ? '关闭导航菜单' : 'Close navigation menu')
      : (isChinese ? '打开导航菜单' : 'Open navigation menu'));
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true', false);
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false, false);
  });

  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) setMenu(false, false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false, true);
    }
  });

  var desktop = window.matchMedia('(min-width: 761px)');
  function handleViewport(event) {
    if (event.matches) setMenu(false, false);
  }
  if (desktop.addEventListener) desktop.addEventListener('change', handleViewport);
  else desktop.addListener(handleViewport);

  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = document.querySelectorAll('main section[id], footer[id]');
  if (!('IntersectionObserver' in window) || !sections.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

  sections.forEach(function (section) { observer.observe(section); });
})();
