import { projectsSchema } from "./schema";

// Curated showcase. Order = docs/profile/projects.md (credibility → technical
// depth). Featured items are the first shelf; the rest are a compact "more"
// list. URLs only where a real public link exists (no invented links).
export const projects = projectsSchema.parse([
  {
    slug: "knock-on-the-coffin-lid",
    title: "Knock on the Coffin Lid",
    role: "Game Designer · RedBoon",
    description:
      "Коммерческая rogue-like в Steam с DLC. Делал контент на ScriptableObject (существа, карты, ивенты), провёл глобальный реворк всех ивентов, собрал новую локацию с уникальной механикой и достижения.",
    highlight: "Коммерческий релиз · Steam + DLC",
    tags: ["Unity", "C#", "ScriptableObject", "Game Design", "Баланс"],
    status: "released",
    featured: true,
  },
  {
    slug: "bloodlines-ui",
    title: "Bloodlines UI",
    role: "Соло · Alebardium",
    description:
      "Собственный тёмный UI-набор для Unity, выпущен в Unity Asset Store и на itch.io. Доказывает, что довожу продукты до релиза сам — связка dev и UI/UX.",
    highlight: "Свой продукт в Asset Store",
    tags: ["Unity", "C#", "UI/UX", "Asset"],
    links: [{ label: "GitHub", href: "https://github.com/Kaliguri/Bloodlines-Dark-UI" }],
    status: "released",
    featured: true,
  },
  {
    slug: "few-seconds-many-deaths",
    title: "Few Seconds, Many Deaths",
    role: "Лид и инициатор · Московский Политех",
    description:
      "Учебный проект со страницей в Steam. Вёл команду из 10 человек как тех-лид и проджект-менеджер, освоил Steamworks API и собрал реальную международную аудиторию.",
    highlight: "Лид команды 10 · ~77k показов в Steam",
    tags: ["Unity", "Steamworks API", "Тимлид"],
    links: [
      {
        label: "Steam",
        href: "https://store.steampowered.com/app/3259720/Few_Seconds__Many_Deaths/",
      },
      { label: "GitHub", href: "https://github.com/Kaliguri/FewSeconds-ManyDeaths-Unity" },
    ],
    status: "educational",
    featured: true,
  },
  {
    slug: "rstudio-multiplayer",
    title: "Мультиплеер (R-Studio)",
    role: "Unity Developer · R-Studio",
    description:
      "P2P-мультиплеер для нескольких игр: система лобби, матчмейкинг и рабочий геймплей для 1×1 и кооператива на Photon и Netcode for GameObjects.",
    highlight: "P2P-нетворкинг: лобби и матчмейкинг",
    tags: ["Unity", "Multiplayer", "Photon", "NGO"],
    status: "released",
    featured: true,
  },
  {
    slug: "metalhead",
    title: "METALHEAD",
    role: "Лид команды · геймджем",
    description:
      "Игра с межвузовского геймджема «Ctrl + Shift + Create 2.0», где команда из трёх человек заняла первое место. Был лидом команды.",
    highlight: "1 место на геймджеме",
    tags: ["Unity", "Game Jam", "Тимлид"],
    links: [{ label: "GitHub", href: "https://github.com/Kaliguri/METALHEAD" }],
    status: "jam",
    featured: true,
  },
  {
    slug: "guildmaster",
    title: "Guildmaster",
    role: "Соло · Alebardium",
    description: "Автобаттлер в работе — проект-витрина паттернов и архитектуры игровых систем.",
    tags: ["Unity", "C#", "Архитектура"],
    links: [{ label: "GitHub", href: "https://github.com/Kaliguri/Guildmaster-Autobattler" }],
    status: "in-progress",
  },
  {
    slug: "tint-exporter",
    title: "Tint Exporter",
    role: "Соло · Alebardium",
    description: "Плагин для Figma из серии собственных инструментов.",
    tags: ["Figma", "Плагин", "Инструмент"],
    links: [{ label: "GitHub", href: "https://github.com/Kaliguri/Alebardium-Tint-Exporter" }],
    status: "released",
  },
]);
