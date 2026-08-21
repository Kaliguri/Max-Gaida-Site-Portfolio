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
      {
        label: "Steam",
        href: "https://store.steampowered.com/app/1232580/Knock_on_the_Coffin_Lid/",
      },
    ],
    status: "released",
    featured: true,
    gallery: [
      {
        src: "/images/projects/knock-on-the-coffin-lid/gameplay-event.jpg",
        caption: "Ивенты — текстовые встречи с выборами и последствиями",
      },
      {
        src: "/images/projects/knock-on-the-coffin-lid/gameplay-combat.jpg",
        caption: "Пошаговые карточные бои",
      },
      {
        src: "/images/projects/knock-on-the-coffin-lid/gameplay-boss.jpg",
        caption: "Боссы и уникальные встречи",
      },
    ],
    caseStudy: {
      intro:
        "Коммерческая карточная rogue-like в Steam с DLC. Как гейм-дизайнер в RedBoon работал с контентом на ScriptableObject — существа, карты, ивенты, — провёл глобальный реворк всех событий, собрал новую локацию с собственной механикой и настроил достижения. Первый крупный коммерческий проект.",
      facts: [
        { label: "Роль", value: "Game Designer · RedBoon" },
        { label: "Тип", value: "Коммерческий релиз · Steam + DLC" },
        { label: "Движок", value: "Unity · C#" },
        { label: "Контент", value: "Data-driven (ScriptableObject)" },
        { label: "Вклад", value: "Реворк ивентов · новая локация · достижения" },
      ],
      sections: [
        {
          heading: "Что это за игра",
          body: [
            "Карточная rogue-like в мрачном фэнтези: игрок пробивается через встречи, события и боссов, собирая и прокачивая колоду. Коммерческий релиз в Steam с дополнением.",
          ],
          images: [
            {
              src: "/images/projects/knock-on-the-coffin-lid/gameplay-combat.jpg",
              caption: "Карточный бой",
            },
          ],
        },
        {
          heading: "Контент на ScriptableObject",
          body: [
            "Наполнял игру контентом через data-driven подход на ScriptableObject: существа, карты, события. Такая структура позволяет собирать и балансировать контент как данные, без правок кода под каждую сущность.",
          ],
        },
        {
          heading: "Глобальный реворк ивентов",
          body: [
            "Провёл сквозной реворк всех событий игры — текстовых встреч с выборами и последствиями. Приводил их к единой структуре и качеству по всему объёму контента.",
          ],
          images: [
            {
              src: "/images/projects/knock-on-the-coffin-lid/gameplay-event.jpg",
              caption: "Событие с выбором",
            },
          ],
        },
        {
          heading: "Новая локация и достижения",
          body: [
            "Собрал новую локацию с собственной уникальной механикой и настроил систему достижений игры.",
          ],
          images: [
            {
              src: "/images/projects/knock-on-the-coffin-lid/gameplay-boss.jpg",
              caption: "Встреча с боссом",
            },
          ],
        },
      ],
    },
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
    gallery: [
      {
        src: "/images/projects/bloodlines-ui/kit-progress-bars.webp",
        caption: "Полосы прогресса — линейные, сегментные, круговые",
      },
      {
        src: "/images/projects/bloodlines-ui/kit-buttons-icons.webp",
        caption: "Кнопки во всех состояниях и наборы иконок",
      },
      {
        src: "/images/projects/bloodlines-ui/proof-asset-store.png",
        caption: "Публикация в Unity Asset Store · 5.0",
      },
    ],
    caseStudy: {
      intro:
        "Собственный тёмный UI-набор для Unity — выпущен в Unity Asset Store и на itch.io под брендом Alebardium. Соло-продукт, доказывающий, что довожу вещи до релиза сам, на стыке разработки и UI/UX.",
      facts: [
        { label: "Роль", value: "Соло · Alebardium" },
        { label: "Тип", value: "UI-набор для Unity" },
        { label: "Платформы", value: "Unity Asset Store · itch.io" },
        { label: "Стиль", value: "Тёмный, gothic" },
        { label: "Рейтинг", value: "5.0 в Asset Store" },
      ],
      sections: [
        {
          heading: "Что это",
          body: [
            "Набор UI-элементов для Unity в тёмной готической стилистике: рамки, кнопки, иконки и полосы прогресса — готовые к вставке в проект. Задача — цельный, консистентный визуальный язык интерфейса из коробки.",
          ],
          images: [
            {
              src: "/images/projects/bloodlines-ui/kit-progress-bars.webp",
              caption: "Полосы прогресса набора",
            },
          ],
        },
        {
          heading: "Компоненты и состояния",
          body: [
            "Кнопки проработаны во всех состояниях — default, hover, active, disabled; наборы иконок; несколько типов полос прогресса (линейные, сегментные, круговые). Акцент на консистентности и удобстве интеграции — это про UI/UX, а не только про картинку.",
          ],
          images: [
            {
              src: "/images/projects/bloodlines-ui/kit-buttons-icons.webp",
              caption: "Кнопки и иконки — состояния",
            },
          ],
        },
        {
          heading: "Довёл до релиза сам",
          body: [
            "Сам оформил, упаковал и выпустил набор в Unity Asset Store и на itch.io под брендом Alebardium — с рейтингом 5.0 по отзывам. Полный цикл от идеи до опубликованного продукта в одиночку.",
          ],
          images: [
            {
              src: "/images/projects/bloodlines-ui/proof-asset-store.png",
              caption: "Страница в Asset Store",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "few-seconds-many-deaths",
    title: "Few Seconds, Many Deaths",
    role: "Лид и инициатор · Московский Политех",
    description:
      "Учебный проект со страницей в Steam. Вёл команду из 10 человек (тех-лид + PM) и держал на себе связку дисциплин: арт-дирекшн и дизайн персонажей, VFX, свет и 2D-нормали, кастомный пиксельный шейдер, боевые системы и локализацию. Освоил Steamworks и собрал реальную международную аудиторию.",
    blurb:
      "Учебный пошаговый рогалик со страницей в Steam — тимлид и весь визуально-системный слой.",
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
      loop: "/videos/few-seconds-many-deaths-trailer-loop.mp4",
      title: "Few Seconds, Many Deaths — Trailer",
    },
    gallery: [
      {
        src: "/images/projects/few-seconds-many-deaths/gameplay.jpg",
        caption: "Геймплей — пошаговые бои в подземелье",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/tech-shader-graph.jpg",
        caption: "Кастомный пиксельный шейдер (Shader Graph)",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/tech-normalmap-layer.jpg",
        caption: "2D normal maps — свет на спрайтах",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/tech-localization.jpg",
        caption: "Локализация EN/RU (Unity Localization)",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/design-combat-cardinalline.jpg",
        caption: "Дизайн боевых систем — логика линий атаки",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/design-style-guide.jpg",
        caption: "Арт-дирекшн — стайлгайд пиксель-арта",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/process-discord-pm.jpg",
        caption: "Ведение команды — недельные отчёты (PM)",
      },
      {
        src: "/images/projects/few-seconds-many-deaths/proof-steam-stats.jpg",
        caption: "Steam: ~77k показов, 27.8k визитов, 36% CTR",
      },
    ],
    caseStudy: {
      intro:
        "Учебный, но доведённый до публичной страницы в Steam пошаговый рогалик. Я вёл команду из 10 человек как тех-лид и проджект-менеджер и одновременно держал на себе визуальный и системный слой: арт-дирекшн, дизайн персонажей, VFX, свет и 2D-нормали, кастомный пиксельный шейдер, боевые системы и локализацию.",
      facts: [
        { label: "Роль", value: "Тех-лид · PM · арт-дирекшн · дизайн систем" },
        { label: "Команда", value: "10 человек" },
        { label: "Движок", value: "Unity · C#" },
        { label: "Платформа", value: "Steam (страница + Steamworks)" },
        { label: "Охват", value: "~77k показов · 27.8k визитов · 36% CTR" },
      ],
      videos: [
        {
          src: "/videos/few-seconds-many-deaths-normalmaps.mp4",
          poster: "/videos/few-seconds-many-deaths-normalmaps.jpg",
          loop: "/videos/few-seconds-many-deaths-normalmaps-loop.mp4",
          title: "2D normal maps — динамический свет на спрайтах",
        },
      ],
      sections: [
        {
          heading: "Что это за игра",
          body: [
            "Пошаговый рогалик в мрачном пиксельном сеттинге: игрок ведёт отряд героев по подземелью, планируя ходы на сетке. Проект вырос из учебной задачи в полноценную витрину со страницей в Steam и реальной международной аудиторией.",
          ],
          images: [
            {
              src: "/images/projects/few-seconds-many-deaths/gameplay.jpg",
              caption: "Пошаговый бой на сетке",
            },
          ],
        },
        {
          heading: "Роль и охват",
          body: [
            "Я был тех-лидом и проджект-менеджером команды из 10 человек: планирование, декомпозиция задач, недельные отчёты, сведение работы дизайнеров, художников и программистов в единый билд.",
            "Параллельно вёл визуальный и системный слой игры — то, что обычно размазано по нескольким людям, здесь держал на себе: от общего стиля до боевой математики.",
          ],
          images: [
            {
              src: "/images/projects/few-seconds-many-deaths/process-discord-pm.jpg",
              caption: "Недельные отчёты и координация команды",
            },
          ],
        },
        {
          heading: "Арт-дирекшн и дизайн персонажей",
          body: [
            "Отвечал за общий стиль и правила пиксель-арта: палитра, outline, пропорции, ограничение оттенков — собрал стайлгайд, по которому работала команда.",
            "Сам спрайты отрисовывал редко — моя зона это идея и дизайн образов персонажей: кто они, как читаются, какие силуэты и детали делают их узнаваемыми.",
          ],
          images: [
            {
              src: "/images/projects/few-seconds-many-deaths/design-style-guide.jpg",
              caption: "Стайлгайд пиксель-арта",
            },
          ],
        },
        {
          heading: "VFX, свет и 2D-нормали",
          body: [
            "Чтобы плоский пиксель-арт ожил, добавил динамический свет через карты нормалей, нарисованные под каждый тайл и спрайт.",
            "Написал кастомный пиксельный шейдер в Shader Graph, который приводит любые эффекты и текстуры к нужному разрешению пикселя — так VFX остаётся в едином стилизованном ключе, а не выбивается «гладкими» текстурами.",
          ],
          images: [
            {
              src: "/images/projects/few-seconds-many-deaths/tech-shader-graph.jpg",
              caption: "Пиксельный шейдер в Shader Graph",
            },
            {
              src: "/images/projects/few-seconds-many-deaths/tech-normalmap-layer.jpg",
              caption: "Слой 2D normal maps для света",
            },
          ],
        },
        {
          heading: "Техническая анимация",
          body: [
            "Персонажи собраны из независимых суб-анимаций, живущих отдельно от базового цикла: ядро голема Aegis, кот у Skeleton Priest, гало за Rifleman, фигуры вокруг Chess Master.",
            "Анимация стрельбы учитывает выстрелы подряд — разбита на фазы start / repeat / end, чтобы серия выстрелов читалась естественно, без рывков на стыках.",
          ],
        },
        {
          heading: "Боевые системы",
          body: [
            "Спроектировал логику зон атаки: методы вроде CardinalLine и DiagonalLine с настройкой ширины и дальности, с перегрузками под разные правила (строгая линия / все доступные стороны).",
            "Каждый метод описан диаграммами и заложен так, чтобы дизайнер мог собирать новые способности из готовых кирпичей, а не переписывать логику под каждую.",
          ],
          images: [
            {
              src: "/images/projects/few-seconds-many-deaths/design-combat-cardinalline.jpg",
              caption: "Логика линий атаки (CardinalLine)",
            },
          ],
        },
        {
          heading: "Локализация и Steam",
          body: [
            "Настроил локализацию на Unity Localization (EN/RU) и освоил Steamworks для публикации страницы.",
            "Результат для учебного проекта без маркетингового бюджета: ~77k показов, 27.8k визитов и 36% коэффициент переходов, аудитория из США, России, Франции и дальше — реальный международный охват.",
          ],
          images: [
            {
              src: "/images/projects/few-seconds-many-deaths/proof-steam-stats.jpg",
              caption: "Steam-аналитика страницы",
            },
          ],
        },
      ],
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
    gallery: [
      {
        src: "/images/projects/rstudio-multiplayer/store-1.jpg",
        caption: "Стратегические бои — выставляй и толкай юнитов",
      },
      {
        src: "/images/projects/rstudio-multiplayer/store-2.jpg",
        caption: "Real-time PvP-стратегия",
      },
      {
        src: "/images/projects/rstudio-multiplayer/store-3.jpg",
        caption: "От обороны к захвату",
      },
    ],
    caseStudy: {
      intro:
        "PvP-мультиплеер в жанре merge-стратегии, релиз на Google Play. Как Unity-разработчик в R-Studio отвечал за нетворкинг: систему лобби, матчмейкинг и синхронизацию геймплея в режимах 1×1 и кооператива.",
      facts: [
        { label: "Роль", value: "Unity Developer (C#) · R-Studio" },
        { label: "Тип", value: "Коммерческий релиз · Google Play" },
        { label: "Жанр", value: "Real-time PvP merge-стратегия" },
        { label: "Нетворкинг", value: "Photon · Netcode for GameObjects" },
        { label: "Режимы", value: "1×1 · кооператив" },
      ],
      sections: [
        {
          heading: "Что это",
          body: [
            "Мобильная real-time стратегия: игроки мёрджат и выставляют юнитов, толкают линию фронта и сходятся в PvP-боях. Коммерческий релиз на Google Play.",
          ],
          images: [
            {
              src: "/images/projects/rstudio-multiplayer/store-2.jpg",
              caption: "Real-time PvP",
            },
          ],
        },
        {
          heading: "Роль: сетевой код",
          body: [
            "Отвечал за нетворкинг: систему лобби, матчмейкинг и синхронизацию геймплея в режимах 1×1 и кооператива.",
            "Стек — Photon и Netcode for GameObjects. Задача — стабильный, честный по состоянию мультиплеер в реальном времени на мобильных сетях.",
          ],
          images: [
            {
              src: "/images/projects/rstudio-multiplayer/store-1.jpg",
              caption: "Бой в реальном времени",
            },
          ],
        },
        {
          heading: "Релиз",
          body: ["Проект вышел в релиз на Google Play."],
          images: [
            {
              src: "/images/projects/rstudio-multiplayer/store-3.jpg",
              caption: "Промо Google Play",
            },
          ],
        },
      ],
    },
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
    video: {
      src: "/videos/metalhead-gameplay.mp4",
      poster: "/videos/metalhead-gameplay.jpg",
      loop: "/videos/metalhead-gameplay-loop.mp4",
      title: "METALHEAD — Gameplay",
    },
    gallery: [
      {
        src: "/images/projects/metalhead/gameplay.png",
        caption: "Геймплей — survival-экшн на пиксель-арте",
      },
      {
        src: "/images/projects/metalhead/proof-award.jpg",
        caption: "1 место на «Ctrl + Shift + Create 2.0»",
      },
    ],
    caseStudy: {
      intro:
        "Игра с межвузовского геймджема «Ctrl + Shift + Create 2.0». Команда из трёх человек заняла первое место среди студентов Москвы — я был лидом команды.",
      facts: [
        { label: "Роль", value: "Лид команды" },
        { label: "Формат", value: "Межвузовский геймджем" },
        { label: "Команда", value: "3 человека" },
        { label: "Результат", value: "1 место" },
        { label: "Движок", value: "Unity" },
      ],
      sections: [
        {
          heading: "Джем и результат",
          body: [
            "«Ctrl + Shift + Create 2.0» — межвузовский геймджем среди студентов Москвы. Наша команда из трёх человек заняла первое место.",
          ],
          images: [
            {
              src: "/images/projects/metalhead/proof-award.jpg",
              caption: "Диплом за 1 место",
            },
          ],
        },
        {
          heading: "Геймплей",
          body: [
            "Динамичный survival-экшн на пиксель-арте: выживай под нарастающим натиском врагов, набирай уровни и держись как можно дольше.",
          ],
          images: [
            {
              src: "/images/projects/metalhead/gameplay.png",
              caption: "Выживание на арене",
            },
          ],
        },
        {
          heading: "Роль лида",
          body: [
            "Вёл команду: распределение задач, сборка воедино и доведение прототипа до играбельного состояния в сжатые сроки джема.",
          ],
        },
      ],
    },
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
      loop: "/videos/the-silent-eclipse-promo-loop.mp4",
      title: "The Silent Eclipse - Unreal Engine 5 - Trailer",
    },
  },
  {
    slug: "mospolyjam-3",
    title: "Parry This",
    role: "Команда · геймджем",
    description: "Игра с геймджема MosPolyJam (осень 2024), команда из двух человек.",
    blurb: "Игра с геймджема MosPolyJam, команда из двух человек.",
    links: [{ label: "itch.io", href: "https://xgaida.itch.io/parry-this" }],
    status: "jam",
    featured: true,
    video: {
      src: "/videos/parry-this-gameplay.mp4",
      poster: "/videos/parry-this-gameplay.jpg",
      loop: "/videos/parry-this-gameplay-loop.mp4",
      title: "Parry This — Gameplay",
    },
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
