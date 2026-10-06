/* =====================================================================
   ELYIA · COUCHE DE CORRECTIFS COMMUNE (patch) · v1 · 2026-10-06
   1. bouton « retour en haut » (mobile)
   2. sections repliables (titre + accroche visibles, « Lire la suite »)
   3. menu déroulant « Solutions » (clic, clavier, Échap)
   Aucun cookie, aucun appel réseau.
   ===================================================================== */
(function () {
  'use strict';

  var CHEV = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- 1. Retour en haut ---------- */
  function setupTop() {
    if (document.querySelector('.ely-top')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ely-top';
    b.setAttribute('aria-label', 'Revenir en haut de la page');
    b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
    b.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    document.body.appendChild(b);
    var on = null;
    function check() {
      var s = (window.scrollY || 0) > window.innerHeight * 1.2;
      if (s !== on) { on = s; b.classList.toggle('is-on', s); }
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ---------- 2. Sections repliables ---------- */
  var folds = [];

  function label(f) {
    var l = f.btn.querySelector('[data-ely-label]');
    if (!l) return;
    if (f.open) l.textContent = 'Réduire';
    else if (f.mode === 'faq') l.textContent = f.rest === 1 ? 'Voir l’autre question' : 'Voir les ' + f.rest + ' autres questions';
    else l.textContent = 'Lire la suite';
  }

  function apply(f) {
    if (!f.active) {
      f.sec.removeAttribute('data-ely-state');
      return;
    }
    f.sec.setAttribute('data-ely-state', f.open ? 'open' : 'closed');
    f.btn.setAttribute('aria-expanded', f.open ? 'true' : 'false');
    label(f);
  }

  function firstTeaser(sec) {
    var marker = sec.querySelector('[data-ely-cut]');
    if (marker) return marker;
    var h = sec.querySelector('h2');
    var ps = sec.querySelectorAll('p');
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      if (h && !(h.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      if (p.closest('[data-ely-more]')) continue;
      if (!p.textContent.trim() || p.offsetHeight === 0) continue;
      return p;
    }
    return h;
  }

  function measure(f) {
    var sec = f.sec;
    var was = sec.getAttribute('data-ely-state');
    sec.removeAttribute('data-ely-state');
    var top = sec.getBoundingClientRect().top;
    var full = sec.getBoundingClientRect().height;
    var cut;
    if (f.mode === 'faq') {
      var d = sec.querySelectorAll('details[data-faq]');
      var keep = 3;
      f.rest = d.length - keep;
      if (d.length <= keep) { f.active = false; if (was) sec.setAttribute('data-ely-state', was); apply(f); return; }
      cut = d[keep - 1].getBoundingClientRect().bottom - top;
    } else {
      var m = firstTeaser(sec);
      if (!m) { f.active = false; apply(f); return; }
      var r = m.getBoundingClientRect();
      var lh = parseFloat(getComputedStyle(m).lineHeight) || 26;
      var bottom = r.bottom - top;
      if (m.tagName === 'P' && r.height > lh * 4.6 && !m.hasAttribute('data-ely-cut')) bottom = r.top - top + lh * 4;
      var h2 = sec.querySelector('h2');
      if (h2) bottom = Math.max(bottom, h2.getBoundingClientRect().bottom - top);
      cut = bottom;
    }
    var pb = parseFloat(getComputedStyle(sec).paddingBottom) || 0;
    cut = Math.round(cut + 58);
    f.active = f.mode === 'faq' ? f.rest > 0 : (full - pb - cut) > 170;
    sec.style.setProperty('--ely-cut', (cut + pb) + 'px');
    sec.style.setProperty('--ely-pb', pb + 'px');
    sec.style.setProperty('--ely-padl', getComputedStyle(sec).paddingLeft);
    apply(f);
  }

  function toggle(f, open, fromBtn) {
    if (!f.active) return;
    f.open = open;
    apply(f);
    if (!open && fromBtn) {
      var t = f.sec.getBoundingClientRect().top;
      if (t < 0) window.scrollTo({ top: (window.scrollY || 0) + t - 90 });
    }
    if (open) {
      // laisse le temps aux animations d'apparition de se déclencher
      window.dispatchEvent(new Event('scroll'));
    }
  }

  function setupFold(sec) {
    var btn = sec.querySelector(':scope > [data-ely-more]');
    if (!btn) return;
    for (var i = 0; i < folds.length; i++) if (folds[i].sec === sec) return;
    var f = { sec: sec, btn: btn, mode: sec.getAttribute('data-ely-fold') || 'text', open: false, active: false, rest: 0 };
    folds.push(f);
    if (!btn.querySelector('[data-ely-label]')) {
      btn.innerHTML = '<span data-ely-label>Lire la suite</span><span data-ely-chev aria-hidden="true">' + CHEV + '</span>';
    }
    btn.addEventListener('click', function () { toggle(f, !f.open, true); });
    sec.addEventListener('focusin', function (e) {
      if (f.open || !f.active || e.target === btn) return;
      var y = e.target.getBoundingClientRect().bottom - sec.getBoundingClientRect().top;
      var cut = parseFloat(sec.style.getPropertyValue('--ely-cut')) || 0;
      if (y > cut - 80) toggle(f, true);
    });
    measure(f);
  }

  function scan() {
    var list = document.querySelectorAll('[data-ely-fold]');
    for (var i = 0; i < list.length; i++) setupFold(list[i]);
    // une section remplacée par un nouveau rendu est retirée de la liste
    folds = folds.filter(function (f) { return document.contains(f.sec); });
  }

  function remeasure() { folds.forEach(measure); }

  function openFromHash() {
    var id = decodeURIComponent((location.hash || '').slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    var sec = el.closest('[data-ely-fold]');
    if (!sec) return;
    folds.forEach(function (f) { if (f.sec === sec) toggle(f, true); });
    setTimeout(function () {
      var y = el.getBoundingClientRect().top + (window.scrollY || 0) - 90;
      window.scrollTo({ top: y });
    }, 60);
  }

  /* ---------- 3. Menu déroulant « Solutions » ---------- */
  function closeDd(except) {
    var all = document.querySelectorAll('[data-ely-dd][data-open]');
    for (var i = 0; i < all.length; i++) {
      if (all[i] === except) continue;
      all[i].removeAttribute('data-open');
      var b = all[i].querySelector('[data-ely-dd-btn]');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-ely-dd-btn]');
    if (btn) {
      var dd = btn.closest('[data-ely-dd]');
      var open = !dd.hasAttribute('data-open');
      closeDd(dd);
      if (open) dd.setAttribute('data-open', ''); else dd.removeAttribute('data-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      e.preventDefault();
      return;
    }
    if (!(e.target.closest && e.target.closest('[data-ely-dd]'))) closeDd();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDd(); });

  /* ---------- démarrage ---------- */
  function boot() {
    setupTop();
    var n = 0;
    var t = setInterval(function () {
      scan();
      if (++n === 3) openFromHash();
      if (n > 20) clearInterval(t);
    }, 250);
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(remeasure, 180); });
    window.addEventListener('load', function () { setTimeout(remeasure, 300); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(remeasure, 100); });
    setTimeout(remeasure, 1600);
    window.addEventListener('hashchange', openFromHash);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
