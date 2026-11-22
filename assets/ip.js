// Dedicated intellectual-property tabs with direct hash links
(function () {
  'use strict';

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.ip-tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.ip-panel'));
  if (!tabs.length || !panels.length) return;

  function activate(targetId) {
    panels.forEach(function (panel) {
      panel.classList.toggle('is-hidden', panel.id !== targetId);
    });
    tabs.forEach(function (tab) {
      var selected = tab.getAttribute('data-target') === targetId;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
  }

  function targetFromHash() {
    return window.location.hash === '#software' ? 'software-panel' : 'patents-panel';
  }

  function scrollToHash() {
    var id = window.location.hash.slice(1);
    if (!id) return;
    window.requestAnimationFrame(function () {
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ block: 'start' });
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      var targetId = tab.getAttribute('data-target');
      activate(targetId);
      var hash = targetId === 'software-panel' ? '#software' : '#granted';
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
      document.querySelector('.ip-tabs').scrollIntoView({ block: 'start' });
    });

    tab.addEventListener('keydown', function (event) {
      var next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    });
  });

  window.addEventListener('hashchange', function () {
    activate(targetFromHash());
    scrollToHash();
  });

  activate(targetFromHash());
  scrollToHash();
})();
