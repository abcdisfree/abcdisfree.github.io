const reveals = document.querySelectorAll('.reveal');
const statItems = document.querySelectorAll('.stat-card h3');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('stat-card')) {
        const target = entry.target.querySelector('h3');
        animateCount(target);
      }
    }
  });
}, { threshold: 0.18 });

reveals.forEach((el) => observer.observe(el));

function animateCount(element) {
  if (!element) return;
  const target = Number(element.dataset.count || 0);
  const duration = 1400;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    element.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    if (button) {
      button.textContent = 'Message Sent';
      button.disabled = true;
    }
  });
}
