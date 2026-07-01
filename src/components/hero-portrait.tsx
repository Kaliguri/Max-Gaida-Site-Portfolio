/**
 * Code-art self-portrait — the right column of the hero. Pure decoration and
 * dark-theme only (the near-black source would fight the light "paper" bg).
 *
 * Duotone treatment (see globals.css `.hero-portrait*`): the JPG renders as a
 * grayscale portrait so the *face stays legible* — that's the point, it should
 * read as Max — while an accent-colored overlay in `color` blend mode tints it
 * amber, tying it to the theme without dissolving the features (the earlier
 * luminance-mask approach erased the face). Edge masks feather it into the
 * background so it's a soft focal element, not a hard photo box. A one-shot
 * "decode" reveal resolves it from blur on load.
 */
export function HeroPortrait() {
  return (
    <div
      aria-hidden="true"
      className="hero-portrait hero-portrait-decode pointer-events-none hidden h-72 select-none lg:h-[420px] dark:block"
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
