#!/usr/bin/env python3

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote


ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / 'config.js'
INDEX_PATH = ROOT / 'index.html'


def escape(value: object) -> str:
    return html.escape(str(value if value is not None else ''), quote=True)


def load_config() -> dict:
    node_script = """
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync(process.argv[1], 'utf8');
const wrappedSource = `${source}\n;JSON.stringify(USER_CONFIG);`;
const configJson = vm.runInNewContext(wrappedSource, {}, { filename: process.argv[1] });
process.stdout.write(configJson);
""".strip()

    try:
        result = subprocess.run(
            ['node', '-e', node_script, str(CONFIG_PATH)],
            check=True,
            capture_output=True,
            text=True,
        )
    except FileNotFoundError as exc:
        raise SystemExit('Node.js is required to parse config.js.') from exc
    except subprocess.CalledProcessError as exc:
        raise SystemExit(exc.stderr.strip() or 'Failed to parse config.js.') from exc

    return json.loads(result.stdout)


def display_url(url: str) -> str:
    return str(url or '').removeprefix('https://').removeprefix('http://').rstrip('/')


def paper_href(links: dict | None) -> str:
    if not links:
        return '#'
    return links.get('paper') or links.get('pdf') or links.get('talk') or next((value for value in links.values() if value), '#')


def timeline_rank(period: str) -> float:
    import re

    years = re.findall(r'(?:19|20)\d{2}', str(period or ''))
    if not years:
        return float('-inf')
    start_year = int(years[0])
    return start_year + 0.5 if 'present' in str(period or '').lower() else start_year


def sort_near_to_far(items: list[dict] | None) -> list[dict]:
    return sorted(items or [], key=lambda item: timeline_rank(item.get('period', '')), reverse=True)


def format_authors(authors: str, name: str) -> str:
    safe_authors = escape(authors)
    if not name:
        return safe_authors
    safe_name = escape(name)
    return safe_authors.replace(safe_name, f'<strong>{safe_name}</strong>')


def normalize_badge(badge: str) -> str:
    value = str(badge or 'info').lower()
    return value if value in {'new', 'info', 'award', 'talk', 'paper'} else 'info'


def render_about_paragraph(text: str, cfg: dict) -> str:
    rendered = escape(text)
    supervisor_name = escape(cfg.get('supervisorName', ''))
    supervisor_url = escape(cfg.get('supervisorUrl', ''))
    if supervisor_name and supervisor_url:
        link = f'<a href="{supervisor_url}" target="_blank" rel="noopener noreferrer">{supervisor_name}</a>'
        rendered = rendered.replace(supervisor_name, link)
    return f'<p>{rendered}</p>'


def render_json_value(display_value: str, href: str | None) -> str:
    if not href:
        return f'<span class="json-str">"{escape(display_value)}"</span>'
    return (
        '<span class="json-str">"</span>'
        f'<a href="{escape(href)}" class="json-link" target="_blank" rel="noopener noreferrer">{escape(display_value)}</a>'
        '<span class="json-str">"</span>'
    )


def render_json_lines(pairs: list[tuple[str, str, str | None]]) -> str:
    lines = ['{']
    for index, (key, value, href) in enumerate(pairs):
        comma = ',' if index < len(pairs) - 1 else ''
        lines.append(
            f'  <span class="json-key">"{escape(key)}"</span>: {render_json_value(value, href)}{comma}'
        )
    lines.append('}')
    return '\n'.join(lines)


def render_yaml_lines(lines: list[str]) -> str:
    rendered: list[str] = []
    for line in lines:
        if line.endswith(':'):
            rendered.append(f'<span class="yaml-key">{escape(line)}</span>')
            continue
        if line.startswith('  - '):
            prefix, rest = line[:4], line[4:]
            key, _, value = rest.partition(':')
            rendered.append(
                f'{escape(prefix)}<span class="yaml-key">{escape(key + ":")}</span><span class="yaml-val">{escape(value)}</span>'
            )
            continue
        if line.startswith('    '):
            prefix, rest = line[:4], line[4:]
            key, _, value = rest.partition(':')
            rendered.append(
                f'{escape(prefix)}<span class="yaml-key">{escape(key + ":")}</span><span class="yaml-val">{escape(value)}</span>'
            )
            continue
        rendered.append(escape(line))
    return '\n'.join(rendered)


def render_action_links(publication: dict) -> str:
    links = publication.get('links') or {}
    actions = []
    for label, url in links.items():
        if str(url or '').strip():
            actions.append(
                f'<a href="{escape(url)}" class="action-link" target="_blank" rel="noopener noreferrer">[{escape(label)}]</a>'
            )

    star_repo = str(publication.get('starRepo') or '').strip()
    if star_repo:
        repo_url = publication.get('starRepoUrl') or f'https://github.com/{star_repo}'
        actions.append(
            f'<a href="{escape(repo_url)}" class="action-link" target="_blank" rel="noopener noreferrer">[repo]</a>'
        )

    return ''.join(actions)


def select_featured_publications(publications: list[dict]) -> list[dict]:
    featured = [publication for publication in publications if publication.get('featured')]
    return featured or list(publications[:6])


def render_publication_rows(publications: list[dict], cfg: dict) -> str:
    rows: list[str] = []
    previous_year = None
    for publication in publications:
        current_year = publication.get('year') or publication.get('date') or '--'
        year_label = current_year if current_year != previous_year else '&nbsp;'
        rows.append(
            f'''
                    <div class="ls-row">
                        <span class="ls-col ls-date">{year_label}</span>
                        <span class="ls-col ls-name">
                            <a href="{escape(paper_href(publication.get('links')))}" class="file-link{' no-paper-link' if paper_href(publication.get('links')) == '#' else ''}" target="_blank" rel="noopener noreferrer">{escape(publication.get('title') or 'Untitled')}</a>
                            <span class="file-meta">
                                <span class="file-authors">{format_authors(publication.get('authors', ''), cfg.get('name', ''))}</span>
                                <span class="file-venue">{escape(publication.get('venue') or '')}</span>
                                {f'<span class="file-note">{escape(publication.get("note"))}</span>' if publication.get('note') else ''}
                            </span>
                            <span class="file-actions">{render_action_links(publication)}</span>
                        </span>
                    </div>'''
        )
        previous_year = current_year
    return ''.join(rows)


def teaching_year(entry: str) -> str:
    years = re.findall(r'(?:19|20)\d{2}', str(entry))
    return years[-1] if years else '----'


def build_schema(cfg: dict) -> str:
    data = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': cfg.get('displayName') or cfg.get('name'),
        'jobTitle': cfg.get('role'),
        'affiliation': {
            '@type': 'Organization',
            'name': cfg.get('university'),
        },
        'url': cfg.get('links', {}).get('website'),
        'sameAs': [
            value
            for value in [
                cfg.get('links', {}).get('github'),
                cfg.get('links', {}).get('scholar'),
                cfg.get('links', {}).get('orcid'),
            ]
            if value
        ],
        'address': cfg.get('address'),
    }
    return json.dumps(data, ensure_ascii=False, indent=2)


def render_html(cfg: dict) -> str:
    title = f"{str(cfg.get('name', 'academia')).lower().replace(' ', '_')}@academia ~ %"
    description = cfg.get('bio') or 'Academic homepage'
    prompt_text = cfg.get('promptLabel') or f"{str(cfg.get('name', 'visitor')).lower().replace(' ', '')}@academia"
    display_name = cfg.get('displayName') or cfg.get('name') or 'Your Name'
    role_line = ' @ '.join(part for part in [cfg.get('role'), cfg.get('university')] if part)
    focus = ', '.join(f'<span class="hl">{escape(item)}</span>' for item in cfg.get('focus', []))
    stats = ' · '.join(
        f'<span class="stat-num">{escape(item.get("value"))}</span> {escape(str(item.get("label", "")).lower())}'
        for item in cfg.get('stats', [])
    )

    github_url = cfg.get('links', {}).get('github') or ''
    scholar_url = cfg.get('links', {}).get('scholar') or ''
    orcid_url = cfg.get('links', {}).get('orcid') or ''
    cv_url = cfg.get('links', {}).get('cv') or ''
    website_url = cfg.get('links', {}).get('website') or ''

    contact_pairs = [
        ('message', 'Feel free to reach out!', None),
        ('email', cfg.get('email') or 'your.email@university.edu', None),
        ('location', cfg.get('location') or '', None),
        ('address', cfg.get('address') or '', None),
        ('office', cfg.get('office') or '', None),
        ('github', display_url(github_url), github_url or None),
        ('scholar', display_url(scholar_url), scholar_url or None),
        ('orcid', display_url(orcid_url), orcid_url or None),
        ('cv', display_url(cv_url), cv_url or None),
        ('website', display_url(website_url), website_url or None),
    ]
    contact_pairs = [(key, value, href) for key, value, href in contact_pairs if str(value).strip()]

    experience_lines = [
        'experience:',
        *[
            f'  - role: {item.get("role", "")}\n    institution: {item.get("institution", "")}\n    period: {item.get("period", "")}'
            for item in sort_near_to_far(cfg.get('experience'))
        ],
        'education:',
        *[
            f'  - degree: {item.get("degree", "")}\n    institution: {item.get("institution", "")}\n    period: {item.get("period", "")}'
            for item in sort_near_to_far(cfg.get('education'))
        ],
    ]
    experience_html = render_yaml_lines('\n'.join(experience_lines).splitlines())

    publications = cfg.get('publications', [])
    selected_publications = select_featured_publications(publications)
    selected_publications_html = render_publication_rows(selected_publications, cfg)
    publications_html = render_publication_rows(publications, cfg)

    news_html = ''.join(
        f'''
                    <div class="log-entry">
                        {f'<span class="log-time">{escape(item.get("date"))}</span>' if item.get('date') else ''}
                        <span class="log-level log-{normalize_badge(item.get('badge'))}">{escape(str(item.get('badge', 'info')).upper())}</span>
                        <span class="log-msg">{escape(item.get('text') or '')}</span>
                    </div>'''
        for item in cfg.get('news', [])
    )

    services_html = ''.join(
        f'''
                    <div class="service-group">
                        <div class="service-title">{escape(group.get('category') or '')}</div>
                        <ul class="service-list">
                            {''.join(f'<li class="service-item">{escape(item)}</li>' for item in group.get('items', []))}
                        </ul>
                    </div>'''
        for group in cfg.get('services', [])
    )

    teaching_html = ''.join(
        f'''
                    <div class="log-entry">
                        <span class="log-time">{escape(teaching_year(entry))}</span>
                        <span class="log-level log-info">TA</span>
                        <span class="log-msg">{escape(entry)}</span>
                    </div>'''
        for entry in cfg.get('teaching', [])
    )

    honors_html = ''.join(
        f'''
                    <div class="log-entry">
                        <span class="log-time">{escape(item.get('year') or '----')}</span>
                        <span class="log-level log-award">AWARD</span>
                        <span class="log-msg">{escape(item.get('text') or '')}</span>
                    </div>'''
        for item in cfg.get('honors', [])
    )

    misc_html = ''.join(
        f'''
                    <div class="misc-item">{f'<a href="{escape(item.get("href"))}" target="_blank" rel="noopener noreferrer">{escape(item.get("text") or "Resource")}</a>' if item.get('href') else escape(item.get('text') or 'Resource')}{f' <span class="misc-note">{escape(item.get("note"))}</span>' if item.get('note') else ''}</div>'''
        for item in cfg.get('misc', [])
    )

    about_html = ''.join(render_about_paragraph(paragraph, cfg) for paragraph in cfg.get('about', []))
    recruitment_html = ''
    if cfg.get('recruitment', {}).get('text'):
        contact = cfg['recruitment'].get('contact')
        contact_html = ''
        if contact:
            href = cfg['recruitment'].get('contactHref') or f'mailto:{contact}'
            contact_html = f' <a href="{escape(href)}" target="_blank" rel="noopener noreferrer">{escape(contact)}</a>'
        recruitment_html = (
            '<div class="recruit-banner" id="cfg-recruitment">'
            '<span class="recruit-icon">📣</span>'
            f'<span class="recruit-text">{escape(cfg["recruitment"].get("text"))}{contact_html}</span>'
            '</div>'
        )

    photo_light = escape(cfg.get('photo') or cfg.get('photoDark') or '')
    photo_dark = escape(cfg.get('photoDark') or cfg.get('photo') or '')
    photo_src = photo_light or photo_dark
    schema_json = escape(build_schema(cfg))

    return f'''<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{escape(description)}">
    <meta property="og:title" content="{escape((cfg.get('name') or 'Academic Homepage') + ' | Academic Homepage')}">
    <meta property="og:description" content="{escape(description)}">
    <link rel="icon" href="pic/favicon.svg" type="image/svg+xml">
    <link rel="shortcut icon" href="pic/favicon.svg" type="image/svg+xml">
    <title>{escape(title)}</title>
    <link rel="stylesheet" href="style.css">
    <script>
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {{
            document.documentElement.setAttribute('data-theme', savedTheme);
        }}
    </script>
    <script type="application/ld+json">
{schema_json}
    </script>
</head>
<body>
    <!-- Generated from config.js by tools/render_static_page.py -->
    <a href="#about" class="skip-link">Skip to main content</a>
    <div class="terminal-window">
        <div class="terminal-titlebar">
            <div class="terminal-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
            </div>
            <div class="terminal-tabs">
                <a href="#about" class="terminal-tab active" data-section="about">~/about</a>
                <a href="#contact" class="terminal-tab" data-section="contact">~/contact</a>
                <a href="#experience" class="terminal-tab" data-section="experience">~/exp</a>
                <a href="#news" class="terminal-tab" data-section="news">~/news</a>
                <a href="#publications" class="terminal-tab" data-section="publications">~/papers</a>
                <a href="#services" class="terminal-tab" data-section="services">~/services</a>
                <a href="#teaching" class="terminal-tab" data-section="teaching">~/teaching</a>
                <a href="#honors" class="terminal-tab" data-section="honors">~/honors</a>
                <a href="#misc" class="terminal-tab" data-section="misc">~/misc</a>
            </div>
            <button type="button" class="terminal-theme-btn" id="themeToggle" aria-label="Toggle theme">
                <span class="theme-indicator"></span>
            </button>
        </div>

        <main role="main" class="terminal-body">
            <div class="scanline"></div>

            <section id="about" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd" data-cmd="whoami --verbose">whoami --verbose</span>
                </div>
                <div class="command-output whoami-output">
                    <div class="hero-photo">
                        <img src="{photo_src}" alt="{escape((cfg.get('name') or 'Profile photo') + ' profile photo')}" loading="eager" decoding="async" data-photo-light="{photo_light}" data-photo-dark="{photo_dark}">
                    </div>
                    <pre class="ascii-art">
 ______     _ _             _     _       
|__  / |__ (_) |__   ___   | |   (_)_   _ 
  / /| '_ \| | '_ \ / _ \  | |   | | | | |
 / /_| | | | | |_) | (_) | | |___| | |_| |
/____|_| |_|_|_.__/ \___/  |_____|_|\__,_|
                    </pre>
                    <div class="nameplate" id="cfg-display-name">{escape(display_name)}</div>
                    <div class="info-block">
                        <div class="info-row">
                            <span class="info-key">ROLE</span>
                            <span class="info-val" id="cfg-role">{escape(role_line)}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-key">LOCATION</span>
                            <span class="info-val" id="cfg-location">{escape(cfg.get('location') or '')}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-key">FOCUS</span>
                            <span class="info-val" id="cfg-focus">{focus}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-key">STATS</span>
                            <span class="info-val" id="cfg-stats">{stats}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-key">UPDATED</span>
                            <span class="info-val" id="cfg-updated">{escape(cfg.get('latestUpdate') or '')}</span>
                        </div>
                    </div>
                    <div class="bio-block" id="cfg-bio">{about_html}</div>
                    {recruitment_html}
                </div>
            </section>

            <section id="contact" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">cat ~/contact.json | jq .</span>
                </div>
                <div class="command-output">
                    <pre class="json-output" id="cfg-contact">{render_json_lines(contact_pairs)}</pre>
                </div>
            </section>

            <section id="news" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">tail -f ~/news.log</span>
                </div>
                <div class="command-output" id="cfg-news">{news_html}
                </div>
            </section>

            <section id="experience" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">cat ~/experience.yml</span>
                </div>
                <div class="command-output">
                    <pre class="yaml-output" id="cfg-experience">{experience_html}</pre>
                </div>
            </section>

            <section id="publications" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~/papers</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">ls selected --sort=year --desc</span>
                </div>
                <div class="command-output" id="cfg-publications">
                    <div class="publication-header">
                        <div class="paper-summary">Selected publications ({len(selected_publications)})</div>
                        <div class="paper-note" id="cfg-paper-note">{escape(cfg.get('paperNote') or '(* denotes corresponding author)')}</div>
                    </div>
                    <div class="ls-header">
                        <span class="ls-col ls-date">year</span>
                        <span class="ls-col ls-name">paper</span>
                    </div>{selected_publications_html}
                    <details class="publication-archive" id="full-publications">
                        <summary class="publication-archive-toggle">
                            <span>full list</span>
                            <span class="publication-archive-meta">{len(publications)} entries</span>
                        </summary>
                        <div class="publication-archive-body">
                            <div class="paper-summary" id="full-publication-list">Full publication list</div>
                            <div class="ls-header">
                                <span class="ls-col ls-date">year</span>
                                <span class="ls-col ls-name">paper</span>
                            </div>{publications_html}
                        </div>
                    </details>
                </div>
            </section>

            <section id="services" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">cat ~/services.md</span>
                </div>
                <div class="command-output" id="cfg-services">{services_html}
                </div>
            </section>

            <section id="teaching" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">cat ~/teaching.log</span>
                </div>
                <div class="command-output" id="cfg-teaching">{teaching_html}
                </div>
            </section>

            <section id="honors" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">cat ~/honors.log</span>
                </div>
                <div class="command-output" id="cfg-honors">{honors_html}
                </div>
            </section>

            <section id="misc" class="terminal-section">
                <div class="command-line">
                    <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                    <span class="typed-cmd">cat ~/misc.txt</span>
                </div>
                <div class="command-output" id="cfg-misc">{misc_html}
                </div>
            </section>

            <div class="terminal-prompt-line">
                <span class="prompt">{escape(prompt_text)}</span><span class="prompt-sep">:</span><span class="prompt-dir">~</span><span class="prompt-char">$</span>
                <span class="cursor">█</span>
            </div>

            <div class="clustrmaps-controls">
                <button type="button" class="clustrmaps-toggle" id="clustrmapsToggle" aria-controls="clustrmapsPanel" aria-expanded="false" data-map-src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=m&d=Qma8wy7SwXxSesyratpVG16wwYImbiSR7vB7lYh6lDs">
                    Show visitor map
                </button>
            </div>
            <div class="clustrmaps-container" id="clustrmapsPanel" hidden></div>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>
'''


def main() -> int:
    parser = argparse.ArgumentParser(description='Render a static index.html from config.js.')
    parser.add_argument('--check', action='store_true', help='Exit with status 1 when index.html is out of date.')
    args = parser.parse_args()

    rendered_html = render_html(load_config())
    if args.check:
        current_html = INDEX_PATH.read_text(encoding='utf-8') if INDEX_PATH.exists() else ''
        if current_html != rendered_html:
            print('index.html is out of date. Run tools/render_static_page.py to regenerate it.', file=sys.stderr)
            return 1
        return 0

    INDEX_PATH.write_text(rendered_html, encoding='utf-8')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())