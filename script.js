/* ================================================
   CUSSY TOURISM — Interactive Scripts
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ——— NAVBAR SCROLL EFFECT ———
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav on scroll
    updateActiveNav();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ——— ACTIVE NAV LINK BASED ON SCROLL ———
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ——— MOBILE HAMBURGER MENU ———
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ——— HERO SLIDER ———
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(parseInt(dot.dataset.slide));
      startSlider();
    });
  });

  startSlider();

  // ——— PACKAGE FILTER TABS ———
  const tabButtons = document.querySelectorAll('.package-tab');
  const packageCards = document.querySelectorAll('.package-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      packageCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ——— SCROLL REVEAL ANIMATIONS ———
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ——— COUNTER ANIMATION ———
  const statItems = document.querySelectorAll('.stat-item h3[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statItems.forEach(item => counterObserver.observe(item));

  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * target);

      element.textContent = formatNumber(current) + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function formatNumber(num) {
    if (num >= 1000) {
      return num.toLocaleString('en-IN');
    }
    return num.toString();
  }

  // ——— WISHLIST TOGGLE ———
  document.querySelectorAll('.package-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = btn.textContent === '♥';
      btn.textContent = isActive ? '♡' : '♥';
      btn.style.color = isActive ? 'white' : '#ff4757';
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => { btn.style.transform = ''; }, 300);
    });
  });

  // ——— SMOOTH SCROLL FOR ANCHOR LINKS ———
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = navbar.offsetHeight;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ——— PARALLAX-LIKE SUBTLE EFFECT ON HERO ———
  const hero = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (window.scrollY < hero.offsetHeight) {
      const yOffset = window.scrollY * 0.3;
      hero.querySelector('.hero-slider').style.transform = `translateY(${yOffset}px)`;
    }
  }, { passive: true });

});

// ——— NEWSLETTER FORM HANDLER ———
function handleNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  const submitBtn = document.getElementById('newsletter-submit');
  const email = emailInput.value;

  if (email) {
    submitBtn.textContent = '✓ Subscribed!';
    submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    submitBtn.style.boxShadow = '0 4px 24px rgba(39,174,96,.35)';
    emailInput.value = '';

    setTimeout(() => {
      submitBtn.textContent = 'Subscribe';
      submitBtn.style.background = '';
      submitBtn.style.boxShadow = '';
    }, 3000);
  }
}
