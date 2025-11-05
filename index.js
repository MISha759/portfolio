window.onload = function() {
  // Меню для мобільних
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Скрол для хедера
  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Плавний скрол
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        if(window.innerWidth <= 768) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

// EmailJS форма с popup-сообщением
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
      from_name: this.querySelector('input[placeholder="Your Name"]').value,
      from_email: this.querySelector('input[placeholder="Your Email"]').value,
      subject: this.querySelector('input[placeholder="Subject"]').value,
      message: this.querySelector('textarea').value
    };

    emailjs.send('service_doq6mql', 'template_qz0mafp', formData)
      .then(() => {
        // Показ popup'а
        const popup = document.getElementById('successPopup');
        if (popup) {
          popup.classList.add('active');
          // Через 3 секунды — плавно исчезает
          setTimeout(() => {
            popup.classList.remove('active');
          }, 3000);
        }
        this.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);

        // Альтернатива — popup об ошибке
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
          <div class="popup-content">
            <i class="fas fa-exclamation-triangle" style="color:#d9534f;"></i>
            <h3>Message Not Sent</h3>
            <p>Something went wrong. Please try again later.</p>
          </div>`;
        document.body.appendChild(popup);
        popup.classList.add('active');
        setTimeout(() => {
          popup.classList.remove('active');
          popup.remove();
        }, 3000);
      });
  });
}

  // Частинки на фоні
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 20 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
      particlesContainer.appendChild(particle);
    }
  }

  // Анімація таймлайна
  function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (itemTop < windowHeight * 0.85) {
        item.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', animateTimeline);

  // Анімації спостерігача
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.about-content, .project-card, .contact-item, .education-item, .skill-category, .language-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Запуск
  createParticles();
  animateTimeline();
};
  // Scroll To Top button
  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Recommendation Letter Modal
  const viewLetterBtn = document.getElementById('viewLetterBtn');
  const pdfModal = document.getElementById('pdfModal');
  const closeBtn = document.querySelector('.close-btn');

  if (viewLetterBtn && pdfModal && closeBtn) {
    viewLetterBtn.addEventListener('click', () => {
      pdfModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      pdfModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        pdfModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

