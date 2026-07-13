/* =========================================================================
   McCallum HS case study, tabs + building chips + install carousel.
   Standalone port of the deck slide-28 interactions (no deck runtime).
   ========================================================================= */
(function () {
  'use strict';

  /* ---- Tabs: 6 panels, click or press 1..6 ---------------------------- */
  const tabs = Array.from(document.querySelectorAll('#caseTabs .comp-tab'));
  const panels = Array.from(document.querySelectorAll('#caseView .comp-panel'));
  const CASE_KEYS = ['campus', 'blank', 'report', 'vents', 'installed', 'bid'];

  function showTab(key) {
    tabs.forEach((t) => {
      const on = t.dataset.case === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach((p) => p.classList.toggle('active', p.dataset.casePanel === key));
  }

  if (tabs.length) {
    tabs.forEach((t) => t.addEventListener('click', () => showTab(t.dataset.case)));
  }

  /* ---- Building chips: one image at a time within each group ----------- */
  document.querySelectorAll('.bldg-chips').forEach((group) => {
    const name = group.dataset.group;
    const canvas = document.querySelector('.bldg-canvas[data-group="' + name + '"]');
    if (!canvas) return;
    group.querySelectorAll('.bldg-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.bldg-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const b = chip.dataset.b;
        canvas.querySelectorAll('[data-b]').forEach((el) => el.classList.toggle('active', el.dataset.b === b));
      });
    });
  });

  /* ---- Install carousel: arrows, dots, and ← → keys ------------------- */
  const carousel = document.getElementById('installCarousel');
  let stepPhoto = null; // stepPhoto(delta): move relative to current photo
  if (carousel) {
    const slidesCI = Array.from(carousel.querySelectorAll('.install-slide'));
    const dots = Array.from(carousel.querySelectorAll('.install-dot'));
    let idx = 0;
    function gotoPhoto(i) {
      idx = (i + slidesCI.length) % slidesCI.length;
      slidesCI.forEach((s, n) => s.classList.toggle('active', n === idx));
      dots.forEach((d, n) => d.classList.toggle('active', n === idx));
    }
    stepPhoto = (delta) => gotoPhoto(idx + delta);
    const prev = carousel.querySelector('.install-prev');
    const next = carousel.querySelector('.install-next');
    if (prev) prev.addEventListener('click', () => stepPhoto(-1));
    if (next) next.addEventListener('click', () => stepPhoto(1));
    dots.forEach((d, n) => d.addEventListener('click', () => gotoPhoto(n)));
  }

  /* ---- Keyboard: 1..6 jump tabs; ← → cycle photos on the Installed tab -- */
  document.addEventListener('keydown', (e) => {
    if (e.target && /^(input|textarea|select)$/i.test(e.target.tagName)) return;

    const installedOpen = (function () {
      const p = document.querySelector('#caseView .comp-panel[data-case-panel="installed"]');
      return p && p.classList.contains('active');
    })();

    if (installedOpen && stepPhoto && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      stepPhoto(e.key === 'ArrowLeft' ? -1 : 1);
      return;
    }

    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= CASE_KEYS.length) {
      e.preventDefault();
      showTab(CASE_KEYS[n - 1]);
    }
  });
})();
