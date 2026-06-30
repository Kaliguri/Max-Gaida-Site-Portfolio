import { profileSchema } from "./schema";

// Source of truth: docs/profile/*. Keep this in sync with that raw profile.
// Parsed at import — bad data breaks the build.
export const profile = profileSchema.parse({
  name: "Max Gaida",
  headline: "Делаю игры на стыке кода, механик и опыта игрока",
  eyebrow: "Unity / C# · Game Design · UI/UX",
  lead: "Смотрю на игру как на цельную систему: код, геймдизайн, UI/UX, ощущения игрока и реальные ограничения разработки.",
  summary: [
    "Моя сильная сторона — находить решения, которые не просто хорошо звучат в идее, а реально реализуемы, работают в проекте и помогают довести игру до сильного результата.",
    "В основе — Unity и C#, есть опыт с Godot и UE5. Системный, аналитический склад: ценю архитектуру и паттерны, но помню, что код существует ради задачи — и архитектурой можно осознанно жертвовать под результат.",
    "Отдельно сильна грань UI/UX — там, где это про опыт: удобство, функциональность, эргономика, логичность, для игрока или пользователя сайта. Бонусом — понимание веб-разработки и собственные небольшие проекты (включая этот сайт).",
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
