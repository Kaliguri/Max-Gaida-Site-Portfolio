# Соглашение о коммитах / Commit convention

Это репозиторий-портфолио — история коммитов публична и читается как часть впечатления о Максе.
Держим её чистой и профессиональной.

## Язык и стиль

- **Английский**, повелительное наклонение, subject в нижнем регистре, без точки в конце, ≤ 72 символа.
  - `add hero section` — да; `Added hero section.` / `добавил герой-секцию` — нет.

## Формат — Conventional Commits

```
type(scope): subject

[optional body — why, not what; перенос по 72 символам]
```

- **type** (обязательно): `feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` |
  `build` | `ci` | `chore`.
- **scope** (опционально): область изменения — например `home`, `resume`, `i18n`, `theme`,
  `content`, `pdf`, `ci`, `seo`.
- **subject**: суть изменения одной фразой.
- **body** (опционально): зачем сделано, контекст. Не пересказ диффа.

## Правила

- **Атомарность.** Один логический change на коммит. Не мешать рефакторинг с фичей.
- **`main` всегда деплоится.** GitHub Pages публикует из `main` — он обязан быть зелёным.
- **Ветки.** Нетривиальные фичи — короткоживущие ветки `feat/<name>` → мердж в `main`
  (squash). Мелкие docs/chore на раннем этапе — можно прямо в `main`.
- **Фазы.** Коммит + пуш в конце каждой фазы разработки; фаза закрывается ручным чек-листом
  (см. [`process-ru.md`](process-ru.md)).
- **Без трейлеров атрибуции.** Никаких `Co-Authored-By: Claude/Cursor` и строк «Generated with».
  Автор коммитов — Max Gaida. Enforced тремя способами: `.claude/settings.json`
  (`includeCoAuthoredBy: false`), настройка Cursor, git-hook `.githooks/commit-msg`.

## Примеры

```
chore: add gitignore for next.js static export
docs: add profile content source
feat(home): add hero section with scroll reveal
feat(i18n): scaffold [lang] route segment (ru only for now)
fix(theme): prevent flash of wrong theme on first paint
ci: render resume pdfs with playwright
```
