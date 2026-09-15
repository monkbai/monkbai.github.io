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

function initVisitorTrackerToggle() {
  const toggle = document.getElementById('visitorTrackerToggle');
  const panel = document.getElementById('visitorTrackerPanel');
  const template = document.getElementById('visitorTrackerTemplate');
  if (!toggle || !panel || !template) return;

  function resizeVisitorTracker() {
    const widget = panel.querySelector('#mapmyvisitors-widget');
    if (!widget) return;

    const widgetWidth = widget.offsetWidth;
    const scale = Math.min(1, panel.clientWidth / widgetWidth);
    widget.style.transform = `scale(${scale})`;
    widget.style.transformOrigin = 'top left';
    panel.style.setProperty('--visitor-tracker-height', `${widget.offsetHeight * scale}px`);
  }

  function loadVisitorTracker() {
    if (panel.dataset.loaded === 'true') return;

    const observer = new MutationObserver(resizeVisitorTracker);
    observer.observe(panel, { childList: true, subtree: true });
    panel.append(template.content.cloneNode(true));
    panel.querySelectorAll('script').forEach((sourceScript) => {
      const script = document.createElement('script');
      Array.from(sourceScript.attributes).forEach((attribute) => {
        script.setAttribute(attribute.name, attribute.value);
      });
      script.textContent = sourceScript.textContent;
      sourceScript.replaceWith(script);
    });

    window.addEventListener('resize', resizeVisitorTracker);
    panel.dataset.loaded = 'true';
  }

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('is-open');
    panel.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Hide visitor map' : 'Show visitor map';
  });

  loadVisitorTracker();
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTabs();
  initVisitorTrackerToggle();
});
