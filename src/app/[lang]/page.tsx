// Placeholder home — exercises the token system (amber on charcoal) in both
// themes. Real hero, content model, and animations land in Phase 3.
export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-24 sm:px-10 sm:py-32">
      <p className="text-accent text-sm font-medium tracking-wide uppercase">Портфолио</p>
      <h1 className="text-foreground max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
        Технический геймдизайнер
      </h1>
      <p className="text-muted max-w-xl text-lg leading-relaxed">
        Unity / C# разработчик и геймдизайнер в одном лице. Сайт в разработке — сейчас собирается
        дизайн-система и каркас.
      </p>

      <div className="flex flex-wrap gap-4 pt-2">
        <a
          href="#contacts"
          className="bg-accent text-accent-foreground hover:bg-accent-hover inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors"
        >
          Связаться
        </a>
        <a
          href="https://t.me/kaliguri"
          target="_blank"
          rel="noopener noreferrer"
          className="border-border text-foreground hover:border-accent inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors"
        >
          Telegram
        </a>
      </div>
    </section>
  );
}
