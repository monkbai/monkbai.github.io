const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const tabs = document.querySelectorAll('.terminal-tab');
const sections = document.querySelectorAll('.terminal-section');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  syncHeroPhoto(theme);
}

function syncHeroPhoto(theme = html.getAttribute('data-theme') || 'light') {
  const photo = document.querySelector('.hero-photo img[data-photo-light]');
  if (!photo) return;

  const nextSrc = theme === 'dark'
    ? photo.dataset.photoDark || photo.dataset.photoLight
    : photo.dataset.photoLight || photo.dataset.photoDark;

  if (nextSrc && photo.getAttribute('src') !== nextSrc) {
    photo.setAttribute('src', nextSrc);
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    html.setAttribute('data-theme', savedTheme);
  }
  syncHeroPhoto();

  if (!themeToggle) return;
  themeToggle.addEventListener('click', () => {
    const nextTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function initTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      tabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      const target = document.querySelector(tab.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.section === id);
      });
    });
  }, { threshold: 0.3 });

  sections.forEach((section) => observer.observe(section));
}

function loadClustrmaps(panel, toggle) {
  if (panel.dataset.loaded === 'true') return;

  const script = document.createElement('script');
  script.id = 'clustrmaps';
  script.src = toggle.dataset.mapSrc || '';
  script.async = true;
  panel.appendChild(script);
  panel.dataset.loaded = 'true';
}

function initClustrmapsToggle() {
  const toggle = document.getElementById('clustrmapsToggle');
  const panel = document.getElementById('clustrmapsPanel');
  if (!toggle || !panel) return;

  const sync = () => {
    const isOpen = !panel.hidden;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Hide visitor map' : 'Show visitor map';
  };

  toggle.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      loadClustrmaps(panel, toggle);
    }
    sync();
  });

  sync();
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTabs();
  initClustrmapsToggle();
});
