// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
const SCRIPT_BASE_URL = new URL('./', document.currentScript?.src || window.location.href);
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// Terminal tab navigation + smooth scroll
const tabs = document.querySelectorAll('.terminal-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = document.querySelector(tab.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Update active tab on scroll
const sections = document.querySelectorAll('.terminal-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            tabs.forEach(t => {
                t.classList.toggle('active', t.dataset.section === id);
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Prevent placeholder href="#" links from scrolling to top
document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

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
    sync();
  });

  sync();
}

// ── Config Population ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initClustrmapsToggle();
  if (typeof USER_CONFIG === 'undefined') return;
  populateTerminal(USER_CONFIG);
});

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugifyTitle(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function formatAuthors(authors, name) {
  const safeAuthors = escapeHtml(authors || '');
  if (!name) return safeAuthors;
  const safeName = escapeHtml(name);
  return safeAuthors.split(safeName).join(`<strong>${safeName}</strong>`);
}

function normalizeBadge(badge) {
  const val = String(badge || 'info').toLowerCase();
  if (['new', 'info', 'award', 'talk', 'paper'].includes(val)) return val;
  return 'info';
}

function actionLinksHtml(links) {
  const entries = Object.entries(links || {}).filter(([, url]) => String(url || '').trim());
  return entries
    .map(([label, url]) => `<a href="${escapeHtml(url)}" class="action-link" target="_blank" rel="noopener noreferrer">[${escapeHtml(label)}]</a>`)
    .join('');
}

function displayUrl(url) {
  return String(url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function resolveAssetUrl(path) {
  const raw = String(path || '').trim();
  if (!raw) return '';
  if (/^(?:https?:|data:|blob:|\/\/)/i.test(raw)) return raw;
  if (raw.startsWith('/')) return raw;
  try {
    return new URL(raw, SCRIPT_BASE_URL).toString();
  } catch {
    return raw;
  }
}

function paperHref(links) {
  if (!links) return '#';
  return links.paper || links.pdf || links.talk || Object.values(links).find(Boolean) || '#';
}

function timelineRank(period) {
  const text = String(period || '');
  const years = text.match(/(19|20)\d{2}/g);
  if (!years?.length) return -Infinity;
  const startYear = Number(years[0]);
  const isCurrent = /present|now/i.test(text);
  return isCurrent ? startYear + 0.5 : startYear;
}

function sortNearToFar(items) {
  return [...(items || [])].sort((a, b) => timelineRank(b.period) - timelineRank(a.period));
}

function renderAboutParagraph(text, cfg) {
  let rendered = escapeHtml(text || '');
  const supervisorName = escapeHtml(cfg.supervisorName || '');
  const supervisorUrl = escapeHtml(cfg.supervisorUrl || '');
  if (supervisorName && supervisorUrl) {
    const link = `<a href="${supervisorUrl}" target="_blank" rel="noopener noreferrer">${supervisorName}</a>`;
    rendered = rendered.split(supervisorName).join(link);
  }
  return rendered;
}

function starBadgeHtml(publication) {
  if (!publication?.starRepo) return '';
  const repo = String(publication.starRepo).trim();
  if (!repo) return '';
  const repoUrl = publication.starRepoUrl || `https://github.com/${repo}`;
  const badgeUrl = `https://img.shields.io/github/stars/${repo}.svg?style=social&label=Star&maxAge=180`;
  return `<a href="${escapeHtml(repoUrl)}" class="star-badge-link" target="_blank" rel="noopener noreferrer"><img class="star-badge" src="${escapeHtml(badgeUrl)}" alt="GitHub stars for ${escapeHtml(repo)}"></a>`;
}

function populateTerminal(cfg) {
  if (cfg.name) document.title = `${cfg.name.toLowerCase().replace(/\s+/g,'_')}@academia ~ %`;

  const promptText = cfg.promptLabel || `${(cfg.name || 'visitor').toLowerCase().replace(/\s+/g, '')}@academia`;
  document.querySelectorAll('.prompt').forEach(el => {
    el.textContent = promptText;
  });

  const displayNameEl = document.getElementById('cfg-display-name');
  if (displayNameEl) {
    displayNameEl.textContent = cfg.displayName || cfg.name || 'Your Name';
  }

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && cfg.bio) descMeta.setAttribute('content', cfg.bio);

  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta && cfg.name) ogTitleMeta.setAttribute('content', `${cfg.name} | Academic Homepage`);

  const ogDescMeta = document.querySelector('meta[property="og:description"]');
  if (ogDescMeta && cfg.bio) ogDescMeta.setAttribute('content', cfg.bio);

  const roleEl = document.getElementById('cfg-role');
  if (roleEl) roleEl.textContent = `${cfg.role} @ ${cfg.university}`;

  const locationEl = document.getElementById('cfg-location');
  if (locationEl && cfg.location) locationEl.textContent = cfg.location;

  const focusEl = document.getElementById('cfg-focus');
  if (focusEl && cfg.focus?.length) {
    focusEl.innerHTML = cfg.focus.map(item => `<span class="hl">${escapeHtml(item)}</span>`).join(', ');
  } else if (focusEl && cfg.bio) {
    focusEl.textContent = cfg.bio;
  }

  const statsEl = document.getElementById('cfg-stats');
  if (statsEl && cfg.stats?.length) {
    statsEl.innerHTML = cfg.stats
      .map(s => `<span class="stat-num">${escapeHtml(s.value)}</span> ${escapeHtml((s.label || '').toLowerCase())}`)
      .join(' · ');
  }

  const updatedEl = document.getElementById('cfg-updated');
  if (updatedEl && cfg.latestUpdate) updatedEl.textContent = cfg.latestUpdate;

  const bioEl = document.getElementById('cfg-bio');
  if (bioEl && cfg.about?.length) {
    bioEl.innerHTML = cfg.about.map(p => `<p>${renderAboutParagraph(p, cfg)}</p>`).join('');
  }

  const recruitEl = document.getElementById('cfg-recruitment');
  if (recruitEl) {
    if (cfg.recruitment?.text) {
      const contactPart = cfg.recruitment?.contact
        ? ` <a href="${escapeHtml(cfg.recruitment.contactHref || `mailto:${cfg.recruitment.contact}`)}" target="_blank" rel="noopener noreferrer">${escapeHtml(cfg.recruitment.contact)}</a>`
        : '';
      recruitEl.innerHTML = `<span class="recruit-icon">📣</span><span class="recruit-text">${escapeHtml(cfg.recruitment.text)}${contactPart}</span>`;
    } else {
      recruitEl.innerHTML = '';
    }
  }

  const photoEl = document.querySelector('.hero-photo');
  if (photoEl && cfg.photo) {
    const resolvedPhotoUrl = resolveAssetUrl(cfg.photo);
    photoEl.innerHTML = `<img src="${escapeHtml(resolvedPhotoUrl)}" alt="${escapeHtml(cfg.name || 'Profile photo')}" loading="lazy" decoding="async">`;
  }

  const pubCont = document.getElementById('cfg-publications');
  if (pubCont && cfg.publications?.length) {
    const paperNote = `<div class="paper-note" id="cfg-paper-note">${escapeHtml(cfg.paperNote || '(* denotes corresponding author)')}</div>`;
    const header = pubCont.querySelector('.ls-header');
    const rows = cfg.publications.map(p => {
      const href = paperHref(p.links);
      const titleClass = href === '#' ? 'file-link no-paper-link' : 'file-link';
      return `
      <div class="ls-row">
        <span class="ls-col ls-date">${escapeHtml(p.year || p.date || '--')}</span>
        <span class="ls-col ls-name">
          <a href="${escapeHtml(href)}" class="${titleClass}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.title || p.file || slugifyTitle(p.title))}</a>
          <span class="file-meta">
            <span class="file-authors">${formatAuthors(p.authors, cfg.name)}</span>
            <span class="file-venue">${escapeHtml(p.venue || '')}</span>
            ${p.note ? `<span class="file-note">${escapeHtml(p.note)}</span>` : ''}
          </span>
          <span class="file-actions">${actionLinksHtml(p.links)}${starBadgeHtml(p)}</span>
        </span>
      </div>`;
    }).join('');
    pubCont.innerHTML = paperNote + (header ? header.outerHTML : '') + rows;
  }

  const newsCont = document.getElementById('cfg-news');
  if (newsCont && cfg.news?.length) {
    newsCont.innerHTML = cfg.news.map(n => `
      <div class="log-entry">
        ${n.date ? `<span class="log-time">${escapeHtml(n.date)}</span>` : ''}
        <span class="log-level log-${normalizeBadge(n.badge)}">${escapeHtml((n.badge || 'info').toUpperCase())}</span>
        <span class="log-msg">${escapeHtml(n.text || '')}</span>
      </div>`).join('');
  }

  const expEl = document.getElementById('cfg-experience');
  if (expEl) {
    const exp = sortNearToFar(cfg.experience || []);
    const edu = sortNearToFar(cfg.education || []);
    const lines = [
      'experience:',
      ...exp.map(e=>`  - role: ${e.role}\n    institution: ${e.institution}\n    period: ${e.period}`),
      'education:',
      ...edu.map(e=>`  - degree: ${e.degree}\n    institution: ${e.institution}\n    period: ${e.period}`),
    ];
    expEl.innerHTML = lines.map(l => {
      if (l.endsWith(':')) return `<span class="yaml-key">${l}</span>`;
      return escapeHtml(l).replace(/^(\s+- )(\w+:)(.*)$/gm, '$1<span class="yaml-key">$2</span><span class="yaml-val">$3</span>');
    }).join('\n');
  }

  const servicesEl = document.getElementById('cfg-services');
  if (servicesEl && cfg.services?.length) {
    servicesEl.innerHTML = cfg.services.map(group => `
      <div class="service-group">
        <div class="service-title">${escapeHtml(group.category || '')}</div>
        <ul class="service-list">
          ${(group.items || []).map(item => `<li class="service-item">${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  const teachingEl = document.getElementById('cfg-teaching');
  if (teachingEl && cfg.teaching?.length) {
    teachingEl.innerHTML = cfg.teaching.map(entry => {
      const yearMatch = String(entry).match(/(19|20)\d{2}/g);
      const year = yearMatch ? yearMatch[yearMatch.length - 1] : '----';
      return `
        <div class="log-entry">
          <span class="log-time">${escapeHtml(year)}</span>
          <span class="log-level log-info">TA</span>
          <span class="log-msg">${escapeHtml(entry)}</span>
        </div>`;
    }).join('');
  }

  const honorsEl = document.getElementById('cfg-honors');
  if (honorsEl && cfg.honors?.length) {
    honorsEl.innerHTML = cfg.honors.map(item => `
      <div class="log-entry">
        <span class="log-time">${escapeHtml(item.year || '----')}</span>
        <span class="log-level log-award">AWARD</span>
        <span class="log-msg">${escapeHtml(item.text || '')}</span>
      </div>
    `).join('');
  }

  const miscEl = document.getElementById('cfg-misc');
  if (miscEl && cfg.misc?.length) {
    miscEl.innerHTML = cfg.misc.map(item => {
      const title = escapeHtml(item.text || 'Resource');
      const note = item.note ? ` <span class="misc-note">${escapeHtml(item.note)}</span>` : '';
      if (item.href) {
        return `<div class="misc-item"><a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${title}</a>${note}</div>`;
      }
      return `<div class="misc-item">${title}${note}</div>`;
    }).join('');
  }

  const contactEl = document.getElementById('cfg-contact');
  if (contactEl) {
    const githubRaw = cfg.links?.github || '';
    const scholarRaw = cfg.links?.scholar || '';
    const orcidRaw = cfg.links?.orcid || '';
    const cvRaw = cfg.links?.cv || '';
    const websiteRaw = cfg.links?.website || '';

    const pairs = [
      ['message', 'Feel free to reach out!'],
      ['email', cfg.email || 'your.email@university.edu'],
      ['location', cfg.location || ''],
      ['address', cfg.address || ''],
      ['office', cfg.office || ''],
      ['github', githubRaw ? displayUrl(githubRaw) : ''],
      ['scholar', scholarRaw ? displayUrl(scholarRaw) : ''],
      ['orcid', orcidRaw ? displayUrl(orcidRaw) : ''],
      ['cv', cvRaw ? displayUrl(cvRaw) : ''],
      ['website', websiteRaw ? displayUrl(websiteRaw) : '']
    ].filter(([, value]) => String(value || '').trim());

    const contactLines = ['{'];
    pairs.forEach(([key, value], idx) => {
      const comma = idx < pairs.length - 1 ? ',' : '';
      contactLines.push(`  <span class="json-key">"${escapeHtml(key)}"</span>: <span class="json-str">"${escapeHtml(value)}"</span>${comma}`);
    });
    contactLines.push('}');
    contactEl.innerHTML = contactLines.join('\n');
  }
}
