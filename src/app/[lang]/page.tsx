import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/lib/site";

// Placeholder home — exercises the token system (amber on charcoal) in both
// themes. Real hero, content model, and animations land in Phase 3.
export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-border flex items-center justify-between border-b px-6 py-5 sm:px-10">
        <span className="text-foreground text-lg font-semibold tracking-tight">{SITE.name}</span>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-24 sm:px-10">
        <p className="text-accent text-sm font-medium tracking-wide uppercase">Портфолио</p>
        <h1 className="text-foreground text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
          Технический геймдизайнер
        </h1>
        <p className="text-muted max-w-xl text-lg leading-relaxed">
          Unity / C# разработчик и геймдизайнер в одном лице. Сайт в разработке — сейчас собирается
          дизайн-система и каркас.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <span className="bg-accent text-accent-foreground hover:bg-accent-hover inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-colors">
            Резюме скоро
          </span>
          <a
            href="https://t.me/kaliguri"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground hover:border-accent inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          >
            Telegram
          </a>
        </div>
      </main>

      <footer className="border-border text-muted border-t px-6 py-6 text-sm sm:px-10">
        {SITE.domain} · в разработке
      </footer>
    </div>
  );
}
