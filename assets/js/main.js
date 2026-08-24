function initSidebar() {
  var btn = document.getElementById('menuBtn');
  var sb = document.getElementById('sidebar');
  if (btn && sb) {
    btn.addEventListener('click', function () {
      sb.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== btn) {
        sb.classList.remove('open');
      }
    });
  }
}

function initProgress() {
  var bar = document.getElementById('readProgress');
  if (!bar) return;
  function update() {
    var doc = document.documentElement;
    var total = doc.scrollHeight - doc.clientHeight;
    var ratio = total > 0 ? window.scrollY / total : 0;
    bar.style.width = (ratio * 100) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function initBackTop() {
  var btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initReveal() {
  var els = document.querySelectorAll('.content > *');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.06 });
  els.forEach(function (e, i) {
    e.classList.add('reveal');
    e.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    io.observe(e);
  });
}

function initTopbar() {
  var bar = document.querySelector('.topbar');
  if (!bar) return;
  function update() {
    bar.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  initProgress();
  initBackTop();
  initTopbar();

  var active = document.querySelector('.sidebar a.active');
  if (active) active.scrollIntoView({ block: 'center' });

  document.querySelectorAll('.content a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        var top = t.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  requestAnimationFrame(initReveal);
});
