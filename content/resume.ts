import { experiencesSchema, resumeRolesSchema } from "./schema";

// Source: docs/profile/experience.md + skills.md. Shared work history; each
// résumé role reframes the focus + skills around one facet of the bridge.
export const experience = experiencesSchema.parse([
  {
    company: "RedBoon",
    role: "Game Designer",
    period: "ноя 2023 — янв 2025 · 1 г 3 мес",
    bullets: [
      "Создание и поддержка контента на ScriptableObject (существа, карты, ивенты), реворк существующего.",
      "Глобальный реворк всех ивентов в игре; блок-схемы их работы и взаимного влияния.",
      "Новая локация с уникальной механикой для DLC «Nightmares of Millenis», новые достижения Steam.",
      "Работа с баг-репортами игроков и тестировщиков, правки и балансировка; совместная работа с художниками, программистами и аниматорами.",
    ],
    stack: ["Unity", "Git", "GitLab", "YouTrack", "Figma"],
  },
  {
    company: "R-Studio",
    role: "Unity Developer (C#)",
    period: "апр 2025 — май 2025 · 2 мес",
    bullets: [
      "MVP проектов разных жанров (стратегии, автобаттлеры, idle-RPG, tower defense) и их поддержка.",
      "P2P-мультиплеер для нескольких игр: лобби, матчмейкинг, геймплей 1×1 и кооператив (Photon, NGO).",
      "Архитектура на ScriptableObject и EventBus; оптимизация, Object Pool.",
      "Билды под платформы (Яндекс.Игры, Android, WebGL); реклама и метрики Яндекса.",
    ],
    stack: ["Unity", "C#", "SOLID", "EventBus", "ECS", "Photon", "NGO", "Object Pool", "Android"],
  },
]);

export const resumeRoles = resumeRolesSchema.parse([
  {
    slug: "unity-developer",
    title: "Unity Developer",
    focus:
      "Разработчик на Unity и C# с системным мышлением: архитектура, мультиплеер, оптимизация — плюс понимание геймдизайна, которое держит механики реализуемыми.",
    skills: [
      "C#, ООП, SOLID, паттерны",
      "Архитектура на ScriptableObject",
      "EventBus, ECS, Object Pool",
      "Мультиплеер: Photon, NGO, P2P",
      "Оптимизация и работа с физикой",
      "Android, WebGL, Яндекс.Игры, Steam",
      "Git, GitLab, Fork",
    ],
  },
  {
    slug: "game-designer",
    title: "Game Designer",
    focus:
      "Геймдизайнер с фокусом на опыт игрока и крепким пониманием тех. части: продумываю механики с учётом реализуемости и довожу контент до результата.",
    skills: [
      "Core GD, баланс",
      "Ивент-дизайн, блок-схемы систем",
      "Контент на ScriptableObject",
      "Игровая документация",
      "Плейтесты, баг-репорты, реворк контента",
      "UI/UX через опыт игрока",
    ],
  },
]);
