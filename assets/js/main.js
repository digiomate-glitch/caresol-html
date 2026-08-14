document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile dropdown toggle
  var mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
  var mobileDropdown = document.querySelector('.mobile-dropdown');
  if (mobileDropdownToggle && mobileDropdown) {
    mobileDropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      mobileDropdown.classList.toggle('open');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        if (el !== item) el.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  // Current year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mark active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .mobile-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // Premium scroll header effect
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Premium fade-up animations using IntersectionObserver
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(function(element) {
    observer.observe(element);
  });

  // Testimonial Carousel
  var track = document.getElementById('testimonialTrack');
  var prevBtn = document.getElementById('prevTestimonial');
  var nextBtn = document.getElementById('nextTestimonial');
  
  if (track && prevBtn && nextBtn) {
    var currentIndex = 0;
    var cards = track.querySelectorAll('.quote-card');
    var totalCards = cards.length;
    
    function updateCarousel() {
      var cardsToShow = window.innerWidth < 700 ? 1 : (window.innerWidth < 1000 ? 2 : 3);
      var maxIndex = Math.max(0, totalCards - cardsToShow);
      
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      
      var slideWidth = cards[0].offsetWidth;
      var gap = 24; // matches gap in flex container
      var moveAmount = (slideWidth + gap) * currentIndex;
      
      track.style.transform = 'translateX(-' + moveAmount + 'px)';
      
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      
      // Update flex-basis based on window size
      var percentage = cardsToShow === 1 ? '100%' : (cardsToShow === 2 ? '50%' : '33.333%');
      var gapDeduction = gap * (cardsToShow - 1) / cardsToShow;
      cards.forEach(function(card) {
        card.style.minWidth = 'calc(' + percentage + ' - ' + gapDeduction + 'px)';
        card.style.flex = '0 0 calc(' + percentage + ' - ' + gapDeduction + 'px)';
      });
    }
    
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener('click', function() {
      var cardsToShow = window.innerWidth < 700 ? 1 : (window.innerWidth < 1000 ? 2 : 3);
      var maxIndex = Math.max(0, totalCards - cardsToShow);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    window.addEventListener('resize', updateCarousel);
    setTimeout(updateCarousel, 50); // initial calculation

    // Auto-play functionality
    var autoPlayInterval = setInterval(function() {
      var cardsToShow = window.innerWidth < 700 ? 1 : (window.innerWidth < 1000 ? 2 : 3);
      var maxIndex = Math.max(0, totalCards - cardsToShow);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 4000);
    
    track.parentElement.addEventListener('mouseenter', function() { clearInterval(autoPlayInterval); });
    track.parentElement.addEventListener('mouseleave', function() {
      autoPlayInterval = setInterval(function() {
        var cardsToShow = window.innerWidth < 700 ? 1 : (window.innerWidth < 1000 ? 2 : 3);
        var maxIndex = Math.max(0, totalCards - cardsToShow);
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 4000);
    });
  }

  // Form submission handling
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.target;
      var btn = form.querySelector('button[type="submit"]');
      var originalBtnText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
      }).then(function(response) {
        if (response.ok) {
          form.reset();
          btn.textContent = originalBtnText;
          btn.disabled = false;
          var successMsg = document.getElementById('form-success-message');
          var careerSuccessMsg = document.getElementById('career-success-message');
          if (successMsg) successMsg.style.display = 'block';
          if (careerSuccessMsg) {
            careerSuccessMsg.style.display = 'block';
            setTimeout(function() {
              careerSuccessMsg.style.display = 'none';
            }, 8000);
          }
        } else {
          alert('Oops! There was a problem submitting your form');
          btn.textContent = originalBtnText;
          btn.disabled = false;
        }
      }).catch(function(error) {
        alert('Oops! There was a problem submitting your form');
        btn.textContent = originalBtnText;
        btn.disabled = false;
      });
    });
  }
});
