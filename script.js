(function () {
  var navbar = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var revealEls = document.querySelectorAll(
    '.feat-card, .testi-card, .stat-item, .feat-title, .feat-sub, .testi-heading, .cta-box'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  document.querySelectorAll('.feat-card').forEach(function (el, i) {
    el.dataset.delay = i * 90;
  });
  document.querySelectorAll('.testi-card').forEach(function (el, i) {
    el.dataset.delay = i * 110;
  });
  document.querySelectorAll('.stat-item').forEach(function (el, i) {
    el.dataset.delay = i * 80;
  });

  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, Number(entry.target.dataset.delay) || 0);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function (el) { revealObs.observe(el); });

  function animateCounter(el, target, isDecimal) {
    var duration = 1800;
    var start = performance.now();
    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = target * ease;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : target;
      }
    }
    requestAnimationFrame(step);
  }

  var countersStarted = false;
  var statsObs = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.counter').forEach(function (el) {
        var target = parseFloat(el.dataset.target);
        var isDecimal = el.dataset.decimal === 'true';
        animateCounter(el, target, isDecimal);
      });
    }
  }, { threshold: 0.3 });

  var statsSection = document.getElementById('stats');
  if (statsSection) { statsObs.observe(statsSection); }

  document.querySelectorAll('.nav-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      el.style.animationName = 'none';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.animationName = '';
          el.style.animation = 'navBounce 0.45s cubic-bezier(0.36,0.07,0.19,0.97)';
        });
      });
    });
    el.addEventListener('animationend', function () {
      el.style.animation = '';
    });
  });

})();
