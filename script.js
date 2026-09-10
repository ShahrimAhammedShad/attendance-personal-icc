/* ==========================================================================
SHAHARIM AHAMMED SHAD — "WORKING." INTERACTIVE LOGIC & ANIMATIONS
========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const customCursor = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercentage = document.getElementById('progressPercentage');
  const statusLabel = document.getElementById('statusLabel');
  const liveClock = document.getElementById('liveClock');
  const notifyTriggerBtn = document.getElementById('notifyTriggerBtn');
  const peekBtn = document.getElementById('peekBtn');
  const notifyModal = document.getElementById('notifyModal');
  const closeNotifyModal = document.getElementById('closeNotifyModal');
  const notifyForm = document.getElementById('notifyForm');
  const emailInput = document.getElementById('emailInput');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');
  const specsModal = document.getElementById('specsModal');
  const closeSpecsModal = document.getElementById('closeSpecsModal');
  const orb1 = document.getElementById('orb1');
  const orb2 = document.getElementById('orb2');
  const floatElements = document.querySelectorAll('.glass-card');
  const currentYearSpan = document.getElementById('currentYear');

  // Set current year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Custom Cursor (Desktop Only)
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer && customCursor && cursorFollower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      customCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Smooth follower tracking
    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover state for interactive elements
    const hoverables = document.querySelectorAll('a, button, input, .notify-btn, .peek-btn');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  } else {
    if (customCursor) customCursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
  }

  // 3. Mouse Parallax Effect (Desktop fine pointer)
  if (isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

      if (orb1) orb1.style.transform = `translate3d(${xRatio * 35}px, ${yRatio * 35}px, 0)`;
      if (orb2) orb2.style.transform = `translate3d(${xRatio * -40}px, ${yRatio * -40}px, 0)`;

      floatElements.forEach((card, index) => {
        const factor = (index + 1) * 12;
        card.style.transform = `translate3d(${xRatio * factor}px, ${yRatio * factor}px, 0) rotate(${index % 2 === 0 ? -6 : 8}deg)`;
      });
    });
  }

  // 4. Subtle Dynamic Progress Animation
  let targetProgress = 88;
  let currentProgress = 0;
  const statusPhrases = [
    "OPTIMIZING CORE SHADERS",
    "COMPILING ASSETS",
    "FINALIZE TELEMETRY",
    "PREPARING PUBLICATION"
  ];
  let phraseIndex = 0;

  function updateProgress() {
    if (currentProgress < targetProgress) {
      currentProgress += 1;
      if (progressBarFill) progressBarFill.style.width = `${currentProgress}%`;
      if (progressPercentage) progressPercentage.textContent = `${String(currentProgress).padStart(2, '0')}%`;
      setTimeout(updateProgress, 25 + Math.random() * 30);
    } else {
      setInterval(() => {
        phraseIndex = (phraseIndex + 1) % statusPhrases.length;
        if (statusLabel) {
          statusLabel.style.opacity = '0';
          setTimeout(() => {
            statusLabel.textContent = statusPhrases[phraseIndex];
            statusLabel.style.opacity = '1';
          }, 300);
        }
      }, 4500);
    }
  }

  setTimeout(updateProgress, 800);

  // 5. Live UTC Clock
  function updateClock() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    if (liveClock) {
      liveClock.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // 6. Modal Interactions
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (notifyTriggerBtn) {
    notifyTriggerBtn.addEventListener('click', () => openModal(notifyModal));
  }
  if (closeNotifyModal) {
    closeNotifyModal.addEventListener('click', () => closeModal(notifyModal));
  }
  if (peekBtn) {
    peekBtn.addEventListener('click', () => openModal(specsModal));
  }
  if (closeSpecsModal) {
    closeSpecsModal.addEventListener('click', () => closeModal(specsModal));
  }

  [notifyModal, specsModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(notifyModal);
      closeModal(specsModal);
    }
  });

  // 7. Form Submission Simulation
  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email || !email.includes('@')) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      showFeedback('Encrypting and submitting entry...', 'success');

      setTimeout(() => {
        showFeedback('✓ Invitation key reserved. You will be notified at release.', 'success');
        emailInput.value = '';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        setTimeout(() => {
          closeModal(notifyModal);
          formFeedback.textContent = '';
        }, 2200);
      }, 1200);
    });
  }

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
  }

  // 8. Subtle Particle Canvas Background
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const numParticles = Math.min(Math.floor((width * height) / 18000), 45);
    const particles = [];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.fadeIn = Math.random() > 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (this.fadeIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= 0.5) this.fadeIn = false;
        } else {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0.05) this.fadeIn = true;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(226, 232, 240, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(renderParticles);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderParticles();
    }
  }
});