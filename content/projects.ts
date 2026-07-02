import { projectsSchema } from "./schema";

// Curated showcase. Order = docs/profile/projects.md (credibility → technical
// depth). Featured items are the first shelf; the rest are a compact "more"
// list. Links point at public store/live pages only (no GitHub repos here).
// `status: "educational"` items (Few Seconds, The Silent Eclipse) are program
// projects — the Projects section excludes them; they render under "Образование".
export const projects = projectsSchema.parse([
  {
    slug: "knock-on-the-coffin-lid",
    title: "Knock on the Coffin Lid",
    role: "Game Designer · RedBoon",
    description:
      "Коммерческая rogue-like в Steam с DLC. Делал контент на ScriptableObject (существа, карты, ивенты), провёл глобальный реворк всех ивентов, собрал новую локацию с уникальной механикой и достижения.",
    highlight: "Коммерческий релиз · Steam + DLC",
    image: "/images/projects/knock-on-the-coffin-lid/cover.jpg",
    links: [
      { label: "Steam", href: "https://store.steampowered.com/app/1232580/Knock_on_the_Coffin_Lid/" },
    ],
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
    image: "/images/projects/bloodlines-ui/cover.jpg",
    links: [
      { label: "Asset Store", href: "https://assetstore.unity.com/packages/slug/328721" },
      { label: "itch.io", href: "https://xgaida.itch.io/bloodlines-ui" },
    ],
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
    image: "/images/projects/few-seconds-many-deaths/cover.jpg",
    links: [
      {
        label: "Steam",
        href: "https://store.steampowered.com/app/3259720/Few_Seconds__Many_Deaths/",
      },
    ],
    status: "educational",
    featured: true,
    inShowcase: true,
    video: {
      src: "/videos/few-seconds-many-deaths-trailer.mp4",
      poster: "/videos/few-seconds-many-deaths-trailer.jpg",
      title: "Few Seconds, Many Deaths — Trailer",
    },
  },
  {
    slug: "rstudio-multiplayer",
    title: "Guardian Royale",
    role: "Unity Developer (C#) · R-Studio",
    description:
      "PvP-мультиплеер merge-стратегии в релизе на Google Play. Отвечал за нетворкинг: система лобби, матчмейкинг и геймплей 1×1 и кооператив на Photon и Netcode for GameObjects.",
    highlight: "P2P-мультиплеер в релизе · Google Play",
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.xp101.guardian.merge.strategy.pvp",
      },
    ],
    status: "released",
    featured: true,
  },
  {
    slug: "metalhead",
    title: "METALHEAD",
    role: "Лид команды · геймджем",
    description:
      "Игра с межвузовского геймджема «Ctrl + Shift + Create 2.0», где команда из трёх человек заняла первое место. Был лидом команды.",
    highlight: "1 место на межвузовском геймджеме среди студентов Москвы",
    image: "/images/projects/metalhead/cover.jpg",
    links: [{ label: "itch.io", href: "https://xgaida.itch.io/metalhead" }],
    status: "jam",
    featured: true,
  },
  {
    slug: "guildmaster",
    title: "Guildmaster",
    role: "Соло · Alebardium",
    description: "Автобаттлер в работе — проект-витрина паттернов и архитектуры игровых систем.",
    status: "in-progress",
  },
  {
    slug: "tint-exporter",
    title: "Tint Exporter",
    role: "Соло · Alebardium",
    description: "Плагин для Figma из серии собственных инструментов.",
    status: "released",
  },
  {
    slug: "bloodlines-ui-2",
    title: "Bloodlines UI 2.0",
    role: "Соло · Alebardium",
    description: "Новая версия UI-набора для Unity — в работе, релиз ориентировочно скоро.",
    status: "in-progress",
  },
  {
    slug: "posleslovie",
    title: "«Послесловие»",
    role: "Соло · веб",
    description:
      "Коммерческий сайт-визитка (лендинг). Заодно — эталон стека и тулинга для этого портфолио.",
    links: [{ label: "Сайт", href: "https://posleslovie.online/" }],
    status: "released",
  },
  {
    slug: "the-silent-eclipse",
    title: "The Silent Eclipse",
    role: "Команда · Московский Политех",
    description: "Игра на Unreal Engine 5 из проектной деятельности, с красивым промо-видео.",
    status: "educational",
    inShowcase: true,
    video: {
      src: "/videos/the-silent-eclipse-promo.mp4",
      poster: "/videos/the-silent-eclipse-promo.jpg",
      title: "The Silent Eclipse - Unreal Engine 5 - Trailer",
    },
  },
  {
    slug: "mospolyjam-3",
    title: "Parry This",
    role: "Команда · геймджем",
    description: "Игра с геймджема MosPolyJam (осень 2024), команда из двух человек.",
    links: [{ label: "itch.io", href: "https://xgaida.itch.io/parry-this" }],
    status: "jam",
  },
  {
    slug: "type-faster-mp",
    title: "TYPE FASTER",
    role: "Соло · геймджем",
    description: "Соло-игра с геймджема MosPolyJam (весна 2026).",
    links: [{ label: "itch.io", href: "https://xgaida.itch.io/type-faster" }],
    status: "jam",
  },
]);
