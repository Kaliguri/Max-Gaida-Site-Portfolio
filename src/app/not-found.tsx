import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-accent text-sm font-medium tracking-wide uppercase">404</p>
      <h1 className="text-foreground text-2xl font-semibold tracking-tight">Страница не найдена</h1>
      <p className="text-muted max-w-sm">Похоже, такой страницы нет. Вернёмся на главную.</p>
      <Link
        href={`/${SITE.defaultLocale}`}
        className="bg-accent text-accent-foreground hover:bg-accent-hover mt-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}
