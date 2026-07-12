const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const loader = document.querySelector('.page-loader');

if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 700);
  });
}

if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (current > lastScroll && current > 180) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = current;
  });
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('main section, .contact-section');
const navLinks = document.querySelectorAll('.site-nav a');

const setActiveLink = () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const isCurrentPage = href === currentPath || (currentPath === '' && href === 'index.html') || (href === 'index.html' && currentPath === 'index.html');
    link.classList.toggle('active', isCurrentPage);
  });

  const scrollPosition = window.scrollY + 120;
  sections.forEach((section) => {
    if (section.id && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();
