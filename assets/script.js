/**
 * script.js - Main functionality for the Aswathy N.M Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');

  const handleScroll = () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  };

  // Initial check and scroll event listener
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  if (navToggle) {
      navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          hamburger.classList.toggle('active');
          
          // Prevent body scroll when menu is open
          if (navLinks.classList.contains('active')) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = '';
          }
      });
  }

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
      item.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('active');
              document.body.style.overflow = '';
          }
      });
  });

  // ==========================================
  // Scroll Reveal Animations
  // ==========================================
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target); // Only animate once
          }
      });
  }, observerOptions);

  // Apply reveal to elements
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));

  // ==========================================
  // Form Submission (EmailJS Integration)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  if (contactForm) {
      // NOTE: Replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', and 'YOUR_TEMPLATE_ID' with actual EmailJS keys
      if (typeof emailjs !== 'undefined') {
          // Initialize EmailJS (Consider moving this to HTML head or before closing body)
          // emailjs.init('YOUR_PUBLIC_KEY'); 
      }

      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          if (!submitBtn) return;

          const originalText = submitBtn.innerText;
          submitBtn.innerText = 'Sending...';
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';

          // Ensure emailjs is loaded before attempting to send
          if (typeof emailjs === 'undefined') {
              alert('Email service is currently unavailable. Please try again later.');
              resetButton();
              return;
          }

          // Gather form data
          const formData = {
              from_name: document.getElementById('name').value,
              from_email: document.getElementById('email').value,
              message: document.getElementById('message').value
          };

          // Mocking the send since keys are placeholders. In reality use:
          // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
          
          setTimeout(() => {
             // Simulate successful sending for UI purposes
             alert('✅ Message sent successfully! Thank you for reaching out.');
             contactForm.reset();
             resetButton();
          }, 1500);
          
          /* Actual EmailJS Implementation:
          emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
              .then(() => {
                  alert('✅ Message sent successfully! Thank you for reaching out.');
                  contactForm.reset();
                  resetButton();
              }, (error) => {
                  console.error('Email sending failed:', error);
                  alert('❌ Failed to send message. Please try again or contact directly via email.');
                  resetButton();
              });
          */

          function resetButton() {
              submitBtn.innerText = originalText;
              submitBtn.disabled = false;
              submitBtn.style.opacity = '1';
          }
      });
  }

});
