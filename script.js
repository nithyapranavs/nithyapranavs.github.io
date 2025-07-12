document.addEventListener('DOMContentLoaded', function () {
  // Navigation logic with smooth transitions
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  let currentSection = 'home';

  function showSection(sectionId) {
    if (currentSection === sectionId) return;
    
    // Hide current section with fade out
    const currentActiveSection = document.querySelector('.section.active');
    if (currentActiveSection) {
      currentActiveSection.style.opacity = '0';
      currentActiveSection.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        currentActiveSection.classList.remove('active');
        
        // Show new section with fade in
        const newSection = document.getElementById(sectionId);
        newSection.classList.add('active');
        
        setTimeout(() => {
          newSection.style.opacity = '1';
          newSection.style.transform = 'translateY(0)';
          
          // Initialize typing animation if showing home section
          if (sectionId === 'home') {
            setTimeout(initTypingAnimation, 500);
          }
        }, 50);
      }, 200);
    } else {
      // Initial load
      const newSection = document.getElementById(sectionId);
      newSection.classList.add('active');
      newSection.style.opacity = '1';
      newSection.style.transform = 'translateY(0)';
      
      // Initialize typing animation if home section
      if (sectionId === 'home') {
        setTimeout(initTypingAnimation, 500);
      }
    }
    
    // Update nav links
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
    
    currentSection = sectionId;
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showSection(this.dataset.section);
    });
  });

  // Show Home by default
  showSection('home');

  // Form handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Add notification styles
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 24px var(--shadow);
      z-index: 1000;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      max-width: 300px;
    }
    
    .notification.success {
      border-left: 4px solid #10b981;
    }
    
    .notification.error {
      border-left: 4px solid #ef4444;
    }
    
    .notification i {
      font-size: 1.2rem;
    }
    
    .notification.success i {
      color: #10b981;
    }
    
    .notification.error i {
      color: #ef4444;
    }
    
    @media (max-width: 767px) {
      .notification {
        top: 80px;
        right: 16px;
        left: 16px;
        max-width: none;
      }
    }
  `;
  document.head.appendChild(notificationStyles);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // Intersection Observer for animations
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

  // Observe project cards and other elements
  document.querySelectorAll('.project-card, .contact-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case '1':
          e.preventDefault();
          showSection('home');
          break;
        case '2':
          e.preventDefault();
          showSection('about');
          break;
        case '3':
          e.preventDefault();
          showSection('projects');
          break;
        case '4':
          e.preventDefault();
          showSection('resume');
          break;
        case '5':
          e.preventDefault();
          showSection('contact');
          break;
      }
    }
  });

  // Add keyboard shortcuts hint
  const shortcutsHint = document.createElement('div');
  shortcutsHint.className = 'shortcuts-hint';
  shortcutsHint.innerHTML = `
    <div class="hint-content">
      <h4>Keyboard Shortcuts</h4>
      <p>Ctrl/Cmd + 1-5: Navigate sections</p>
    </div>
  `;
  
  const hintStyles = document.createElement('style');
  hintStyles.textContent = `
    .shortcuts-hint {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 8px 24px var(--shadow);
      z-index: 999;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      max-width: 250px;
    }
    
    .shortcuts-hint.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hint-content h4 {
      margin-bottom: 8px;
      color: var(--accent);
      font-size: 0.9rem;
    }
    
    .hint-content p {
      font-size: 0.8rem;
      margin-bottom: 4px;
      opacity: 0.8;
    }
    
    @media (max-width: 767px) {
      .shortcuts-hint {
        display: none;
      }
    }
  `;
  document.head.appendChild(hintStyles);
  document.body.appendChild(shortcutsHint);
  
  // Show shortcuts hint on first visit
  if (!localStorage.getItem('shortcuts-shown')) {
    setTimeout(() => {
      shortcutsHint.classList.add('show');
      localStorage.setItem('shortcuts-shown', 'true');
      
      setTimeout(() => {
        shortcutsHint.classList.remove('show');
      }, 5000);
    }, 2000);
  }

  // Animated stats counter
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Typing animation for home page
  function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const words = ['Full-Stack Developer', 'Problem Solver', 'Creative Thinker'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before next word
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing animation after a delay
    setTimeout(type, 1000);
  }
}); 