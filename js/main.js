// =============================================================
//  Разрабыч — рендер демо-проектов + мобильное меню
//  Подключается в index.html после projects/projects.js
//  (использует глобальную переменную PROJECTS).
// =============================================================

const ICONS = './icons';

function icon(name) {
  const body = name === 'navigation/arrow-right'
    ? '<path d="M5 12h14"/><path d="M15 16l4-4"/><path d="M15 8l4 4"/>'
    : '';
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

// =============================================================
//  Превью проекта (мокап браузера)
//  Цвета задаются полями accent / accentDark у проекта.
// =============================================================

function mock(project) {
  return `
    <div class="mock" style="--accent: ${project.accent}; --accent-dark: ${project.accentDark}">
      <div class="mock__bar">
        <span class="mock__dot mock__dot--red"></span>
        <span class="mock__dot mock__dot--yellow"></span>
        <span class="mock__dot mock__dot--green"></span>
        <span class="mock__url"></span>
      </div>
      <div class="mock__hero">
        <span class="mock__logo"></span>
        <span class="mock__title"></span>
        <span class="mock__sub"></span>
        <span class="mock__btn"></span>
      </div>
      <div class="mock__cards">
        <span class="mock__card"><span class="mock__card-img"></span><span class="mock__card-t"></span><span class="mock__card-p"></span></span>
        <span class="mock__card"><span class="mock__card-img"></span><span class="mock__card-t"></span><span class="mock__card-p"></span></span>
        <span class="mock__card"><span class="mock__card-img"></span><span class="mock__card-t"></span><span class="mock__card-p"></span></span>
      </div>
    </div>`;
}

function preview(project) {
  if (project.image) {
    return `<img src="${project.image}" alt="${project.title}" class="project__img" loading="lazy" />`;
  }
  return mock(project);
}

// =============================================================
//  Рендер карточек проектов
// =============================================================

function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container || typeof PROJECTS === 'undefined') return;

  container.innerHTML = PROJECTS.map((project) => {
    const hasDemo = project.demo && project.demo !== '#';
    const target = hasDemo ? ' target="_blank" rel="noopener"' : '';

    return `
      <article class="project">
        <a class="project__preview" href="${project.demo || '#'}" aria-label="${project.title}"${target}>
          ${preview(project)}
        </a>
        <div class="project__meta">
          <span class="project__type">${project.type}</span>
          <span class="project__demo">Демо</span>
        </div>
        <h3 class="project__title">${project.title}</h3>
        <p class="project__desc">${project.summary}</p>
        <a class="project__link" href="${project.demo || '#'}"${target}>
          Посмотреть проект ${icon('navigation/arrow-right')}
        </a>
      </article>`;
  }).join('');
}

// =============================================================
//  Мобильное меню
// =============================================================

function initMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (!navToggle || !siteNav) return;

  function closeMenu() {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (siteNav.classList.contains('is-open') && !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });
}

// =============================================================
//  Инициализация
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initMenu();
});
