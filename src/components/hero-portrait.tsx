/**
 * Code-art self-portrait bleeding from the right edge of the hero. Pure
 * decoration: dark-theme only (the near-black source would fight the light
 * "paper" background), masked so it dissolves into `--background`, and
 * screen-blended so the amber glyphs glow instead of sitting as a hard photo.
 * Styling lives in globals.css (`.hero-portrait*`) — the mask uses multiple
 * gradients + compositing that don't read well as Tailwind arbitraries.
 */
export function HeroPortrait() {
  return (
    <div
      aria-hidden="true"
      className="hero-portrait fade-up pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[68%] max-w-xl select-none sm:w-[58%] dark:block"
      style={{ animationDelay: "0.15s" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
      <img
        src="/images/hero-portrait.jpg"
        alt=""
        aria-hidden="true"
        className="hero-portrait-img h-full w-full object-cover"
      />
    </div>
  );
}
