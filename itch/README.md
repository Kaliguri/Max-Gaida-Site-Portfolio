# itch.io profile theme

Custom CSS that skins the [xgaida.itch.io](https://xgaida.itch.io) profile to
match the portfolio site's **dark theme** (warm amber `#f5a524` on charcoal
`#0c0a09`). Source: [`profile.css`](profile.css).

## How to apply / Как применить

1. itch.io → **Edit theme** (profile) → scroll to **Custom CSS**.
2. Paste the entire contents of [`profile.css`](profile.css) **inside** the
   `<style id="custom_css" type="text/css"> … </style>` tags itch provides.
3. **Save**, then open the profile **logged out** to verify (the logged-in
   editor preview wraps content in extra chrome and doesn't render 1:1).

RU: вставить содержимое `profile.css` внутрь тегов `<style id="custom_css">`,
Save, проверить профиль **в разлогине** — превью в редакторе врёт.

## Why it's built this way / Почему так

Based on the official
[itch.io CSS guide](https://itch.io/docs/creators/css-guide):

- **Overrides itch's theme variables** (`--itchio_link_color`,
  `--itchio_gray_back`, `--itchio_border_radius`, …) — the robust, update-safe
  path itch recommends. This is what recolors the purple title links.
- **Scoped to `#wrapper` with ID specificity** so it beats the built-in
  theme-editor rules (`.game_grid_widget .game_cell`, `.game_title a.title`) —
  plain single-class selectors lost to those (white cards / purple titles).
- **No `@import`, no `color-mix()`** — itch's sanitizer strips them. The web
  font (site uses Onest) is intentionally dropped for a system geometric-sans
  stack; glows use plain `rgba()`.

## Design tokens (mirror of the site's dark theme)

| Token        | Value     | Role                    |
| ------------ | --------- | ----------------------- |
| background   | `#0c0a09` | page canvas             |
| surface      | `#1c1917` | card                    |
| surface-2    | `#292524` | card hover              |
| foreground   | `#f5f4f2` | text                    |
| muted        | `#a8a29e` | secondary text          |
| border       | `#2a2522` | hairlines               |
| accent       | `#f5a524` | links, hover, buttons   |
| accent-hover | `#fbbf24` | hover accent            |

Kept in sync with `src/app/globals.css`. If the site tokens change, update both.

## Known limits

- itch.io requires **per-account CSS access** (already granted for this
  account). New empty accounts don't get it.
- Exact **Onest** font is not embedded (would need base64 or a reliable HTTPS
  host). If wanted later, base64-embed the woff2 via `@font-face`.
- itch may change class names on major page updates; re-check after big itch
  redesigns.
