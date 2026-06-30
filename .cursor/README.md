# Cursor Notes

Проект ведётся и в Cursor, и в Claude Code. Главный контекст и правила — в `.cursor/rules/*.mdc` и корневом `CLAUDE.md`.

## Отключить co-author в коммитах

Чтобы Cursor не добавлял `Co-authored-by: Cursor <...>`:

- Cursor Settings (Ctrl/Cmd+Shift+J) → поиск "co-author" → выключить добавление co-author в коммиты.
- Репо-уровневая защита: git-hook `.githooks/commit-msg` вырезает любой co-author трейлер Cursor/Claude и строку "Generated with". Активируется один раз на машину: `git config core.hooksPath .githooks`.

## Дизайн

- Дизайн code-first по Dribbble-рефам (см. `docs/project-brief-ru.md`). Figma пока нет.
- Если подключим Figma — добавим Figma MCP и правило сверки, как в проекте Posleslovie.
