# Бриф — сайт-портфолио Макса Гайды

## Цель

Персональный сайт-портфолио с двумя резюме (геймдизайнер и Unity-разработчик). Аудитория —
рекрутёры и студии, в том числе в РФ. Должен надёжно открываться, быстро грузиться, выглядеть
стильно и современно.

## Стек и инфраструктура

См. `CLAUDE.md` — здесь не дублируем. Ключевое: Next.js static export + GitHub Pages (хост-агностично,
переезд на РФ-хост позже — смена конфига).

## Страницы (v1)

1. Главная — hero, краткое позиционирование, переход к двум резюме, контакты.
2. Резюме — Game Designer.
3. Резюме — Unity Developer.

## Фичи

### Обязательно с первой версии

- Дизайн-система (code-first токены: CSS-переменные + Tailwind).
- Выбор языка и темы при заходе (по умолчанию — тёмная), сохранение в `localStorage`.
- Адаптив: телефон и ПК.
- Анимации: scroll-reveal, выдвижные блоки, hover; тяжёлый hero — GSAP. Уважать `prefers-reduced-motion`.
- Явная ссылка на Telegram, явное скачивание PDF-резюме.
- PDF-резюме в стиле сайта, две темы; selectable-текст → ATS-friendly.
- Два резюме с кросс-ссылкой «я также работаю как X».
- Стильное фото.
- Содержание слева, кнопка «наверх» снизу справа.
- SEO + social previews, Open Graph images, favicon / app-icons.
- 404, `sitemap.xml`, `robots.txt`.
- Contact fallback через email (`mailto:`, бэкенда нет).
- Project content template, «my role» labels, GitHub-ссылки у технических проектов.
- a11y-база, перф-бюджет (Lighthouse CI).

### Позже / опционально

- Аналитика. Важно: Cloudflare-фронтенд троттлится в РФ, поэтому CF Web Analytics не годится для
  РФ-аудитории. Прагматичный выбор — **Yandex Metrica** (RF-friendly) либо self-hosted Umami/Plausible.
- Видео с геймплеем (выдвижные блоки, lazy-load + poster).
- Отдельные страницы проектов.

## Рефы (Dribbble)

- Developer portfolio website — https://dribbble.com/shots/21064710-Developer-portfolio-website
- Developer's Portfolio Landing Page — https://dribbble.com/shots/16075179-Developer-s-Portfolio-Landing-Page
- Full AI Fintech Website — https://dribbble.com/shots/27314818-Full-AI-Fintech-Website
- Personal Portfolio CV/Resume Template — https://dribbble.com/shots/23919743-Personal-Portfolio-CV-Resume-Template
- Portfolio Website (меню сверху) — https://dribbble.com/shots/20481783-Portfolio-Website
- Portfolio Website (анимки) — https://dribbble.com/shots/24619466-Portfolio-Website
- Job Boarding for Developer (стиль) — https://dribbble.com/shots/27165754-Job-Boarding-for-Developer-Website
- AI Platform Hero Section (стиль + анимка) — https://dribbble.com/shots/27097442-AI-Platform-Hero-Section

## О Максе (источники)

- GitHub: https://github.com/Kaliguri
- Зрелые репо-референсы: Bloodlines-Dark-UI (Unity asset, эталон по агентским файлам),
  Posleslovie (Next.js сайт, эталон по стеку/тулингу), E-Magios-Core-Site.
