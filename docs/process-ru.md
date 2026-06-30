# Процесс создания — фазы

Принцип: видимый прогресс по фазам, коммит + пуш в конце каждой, ручной чек-лист. Живой статус —
в auto-memory, не здесь.

## Фаза 0 — Каркас агентов и репо (текущая)

- Агентские файлы (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, `.claude`), отключение co-author,
  доки в `docs/`, `.gitignore`, git-hook `.githooks/commit-msg`.
- Итог: репо готово к работе агентов, атрибуция Claude/Cursor отключена.

## Фаза 1 — Скаффолд проекта

- `create-next-app` (App Router, TS, Tailwind v4), статический экспорт, GitHub Pages Actions,
  `.nojekyll`, `basePath` из имени репо.
- Tooling: ESLint, Prettier, Vitest, Playwright, Lighthouse CI, Zod; скрипты `check` / `check:full`.
- Пустой деплой на GH Pages — проверить, что страница открывается.
- Чек: `npm run check` зелёный, сайт открывается по GH Pages URL.

## Фаза 2 — Дизайн-система и каркас layout

- Токены (цвета, типографика, spacing, радиусы) в CSS-переменных + Tailwind theme, тёмная/светлая.
- Переключатель темы (анти-flash скрипт), переключатель языка, i18n-роутинг `[lang]`.
- Базовые компоненты: header/nav (меню сверху), footer, кнопка «наверх», содержание слева.
- Оверлей выбора языка и темы при первом заходе.
- Чек: темы и языки переключаются, нет FOUC, адаптив ок.

## Фаза 3 — Контент-модель и главная

- Схемы `content/` (Zod): профиль, проекты, резюме — RU/EN.
- Главная: hero (по рефу AI Platform), позиционирование, превью двух резюме, контакты (TG, email), фото.
- Анимации hero + scroll-reveal.
- Чек: главная собрана на обоих языках, анимации уважают reduced-motion.

## Фаза 4 — Два резюме

- Шаблон резюме + наполнение Game Designer и Unity Developer из `content/`.
- Блок «я также работаю как X» с кросс-ссылкой; «my role» labels, GitHub-ссылки.
- Видео с геймплеем (выдвижные, lazy + poster).
- Чек: оба резюме на двух языках, ссылки и медиа работают.

## Фаза 5 — PDF-резюме

- Print-роуты `/[lang]/resume/[role]/print` в двух темах.
- Playwright-скрипт рендера в PDF, артефакты в `public/` или в релизы.
- Чек: PDF по ролям и темам, текст selectable, верстка корректна.

## Фаза 6 — SEO, OG, мета, иконки

- Per-page/locale метаданные, OG-картинки (Satori), favicon / app-icons, `sitemap.xml`, `robots.txt`, 404.
- Аналитика (Yandex Metrica — RF-friendly).
- Чек: OG-превью валидны, Lighthouse SEO/Best Practices в бюджете.

## Фаза 7 — Полировка и релиз

- a11y-проход, перф-бюджет, кросс-браузер/устройства, loading states для медиа.
- Финальный контент, обновить дату резюме.
- Чек: `check:full` зелёный, Lighthouse CI в бюджете, ручной кросс-девайс тест.
