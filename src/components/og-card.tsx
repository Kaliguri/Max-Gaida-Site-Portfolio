import { OG_SIZE } from "@/lib/og";

type Stat = { value: string; label: string };

/**
 * Social preview card, screenshotted by `scripts/render-og.mjs` at exactly
 * OG_SIZE. Colours are hard-coded rather than taken from the theme tokens:
 * the card must look identical no matter which theme the rendering browser
 * happens to boot with. Type is sized for a thumbnail — a Telegram preview is
 * ~300px wide, so nothing below ~20px here survives.
 */
export function OgCard({
  eyebrow,
  title,
  subtitle,
  stats = [],
  facts = [],
  cover,
}: Readonly<{
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Short numeric proof points — rendered big. Values must stay ~10 chars. */
  stats?: readonly Stat[];
  /** Prose facts (role, engine, result). Rendered as a small one-line strip,
   *  because their values are phrases, not numbers, and blow up at stat size. */
  facts?: readonly Stat[];
  /** Project cover, laid in behind a heavy scrim so the text stays readable. */
  cover?: string;
}>) {
  return (
    <div
      style={{ width: OG_SIZE.width, height: OG_SIZE.height }}
      className="relative flex shrink-0 flex-col justify-between overflow-hidden bg-[#0c0a09] px-16 py-14 font-sans text-[#f5f4f2]"
    >
      {cover && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
          <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#0c0a09_46%,rgba(12,10,9,0.92)_66%,rgba(12,10,9,0.6)_100%)]" />
        </>
      )}

      {/* Warm glow echoing the site hero. */}
      <div className="absolute inset-0 bg-[radial-gradient(58%_46%_at_88%_-6%,rgba(245,165,36,0.22)_0%,transparent_70%)]" />
      {/* Accent rule down the left gutter — the site's amber signature. */}
      <div className="absolute top-14 bottom-14 left-0 w-1.5 rounded-r-full bg-[#f5a524]" />

      <header className="relative flex items-baseline justify-between">
        <p className="text-[26px] font-semibold tracking-[0.14em] text-[#f5a524] uppercase">
          {eyebrow}
        </p>
        <p className="text-[24px] text-[#a8a29e]">maxgaida.site</p>
      </header>

      <div className="relative">
        <h1 className="max-w-[900px] text-[62px] leading-[1.08] font-semibold tracking-tight text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-[860px] text-[28px] leading-snug text-[#a8a29e]">{subtitle}</p>
        )}
      </div>

      <footer className="relative flex items-end justify-between gap-10">
        {stats.length > 0 ? (
          <dl className="flex gap-12">
            {stats.map((s) => (
              <div key={s.label} className="w-[220px] shrink-0">
                <dt className="text-[40px] leading-none font-semibold text-[#f5a524]">{s.value}</dt>
                <dd className="mt-2.5 text-[20px] leading-snug text-[#a8a29e]">{s.label}</dd>
              </div>
            ))}
          </dl>
        ) : facts.length > 0 ? (
          <dl className="flex max-w-[840px] flex-wrap items-baseline gap-x-8 gap-y-2 text-[22px]">
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-2.5">
                <dt className="text-[#a8a29e]">{f.label}</dt>
                <dd className="font-medium text-[#f5a524]">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <span />
        )}
        <p className="shrink-0 text-[26px] font-medium text-[#f5f4f2]">Max Gaida</p>
      </footer>
    </div>
  );
}
