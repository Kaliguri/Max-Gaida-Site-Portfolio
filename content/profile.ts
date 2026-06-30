import { profileSchema } from "./schema";

// Source of truth: docs/profile/*. Keep this in sync with that raw profile.
// Parsed at import — bad data breaks the build.
export const profile = profileSchema.parse({
  name: "Max Gaida",
  role: "Технический геймдизайнер",
  roleSub: "Unity / C# разработчик",
  lead: "Делаю игры на Unity и забочусь о том, как они ощущаются.",
  summary: [
    "В первую очередь — разработчик, связанный с геймдевом: Unity и C# основное, также Godot и UE5. Системный, аналитический склад: ценю архитектуру и паттерны, но помню, что код существует для задач продукта — и архитектурой можно осознанно жертвовать под задачу.",
    "Помимо геймдева — веб и UI/UX, с фокусом на эргономике и удобстве интерфейса. Привычка работать с «опытом пользователя» выросла из геймдизайна — отсюда и роль технического геймдизайнера: и разработчик, и GD одновременно.",
    "Активно и осознанно работаю с ИИ-инструментами (Cursor, Claude, Codex): архитектуру и ключевые решения держу на себе, реализацию отдаю ИИ. Это контроль над проектом, а не «вайбкодинг».",
  ],
  location: "Москва",
  availability: ["Релокация", "Удалёнка", "Гибрид"],
  grade: "Middle",
  education: {
    place: "Московский политехнический университет",
    program: "Программное обеспечение игровой компьютерной индустрии",
    year: 2026,
  },
  languages: [
    { name: "Русский", level: "родной" },
    { name: "Английский", level: "B2" },
  ],
  brand: {
    name: "Alebardium",
    note: "Личная мини-студия: ассеты, сайты, в планах — игра.",
  },
  contacts: [
    { label: "Telegram", href: "https://t.me/kaliguri", icon: "telegram", external: true },
    { label: "Email", href: "mailto:maxgaida.work@gmail.com", icon: "mail", external: false },
    { label: "GitHub", href: "https://github.com/Kaliguri", icon: "github", external: true },
  ],
});
