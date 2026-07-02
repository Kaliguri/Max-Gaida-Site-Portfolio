"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronIcon, ChevronUpIcon, CrossIcon } from "@/components/icons";

type GalleryImage = { src: string; caption: string };

/**
 * Mini-case "разбор" gallery for an expanded Projects card. Collapsed by
 * default behind a toggle; expands into a caption grid whose thumbnails are
 * dimmed + slightly blurred until hover/focus (reads as intentional framing,
 * invites interaction) and open a keyboard-navigable lightbox on click.
 */
export function ProjectGallery({
  images,
  title,
  startOpen = false,
}: {
  images: GalleryImage[];
  title: string;
  /** Render already expanded (used on the case-study page where the gallery is
   *  primary content, not a collapsed teaser). */
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen);
  const [active, setActive] = useState<number | null>(null);

  const step = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + images.length) % images.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-accent hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        {open ? "Свернуть разбор" : `Показать разбор · ${images.length}`}
        <span className={`transition-transform ${open ? "" : "rotate-180"}`} aria-hidden="true">
          <ChevronUpIcon />
        </span>
      </button>

      {open && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Открыть: ${img.caption}`}
                className="group border-border bg-background hover:border-accent block w-full overflow-hidden rounded-lg border text-left transition-colors"
              >
                <span className="block aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="h-full w-full scale-105 object-cover blur-[3px] brightness-[.6] transition duration-300 will-change-transform group-hover:scale-100 group-hover:blur-[0px] group-hover:brightness-100 group-focus-visible:scale-100 group-focus-visible:blur-[0px] group-focus-visible:brightness-100 motion-reduce:transition-none"
                  />
                </span>
                <span className="text-muted group-hover:text-foreground block px-3 py-2.5 text-xs leading-snug transition-colors">
                  {img.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 sm:px-16"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — ${images[active].caption}`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Закрыть"
              className="border-border bg-surface text-foreground hover:border-accent hover:text-accent absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <CrossIcon />
            </button>

            {images.length > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Предыдущее"
                className="border-border bg-surface text-foreground hover:border-accent hover:text-accent absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border transition-colors sm:h-12 sm:w-12"
              >
                <ChevronIcon direction="left" />
              </button>
            )}

            <figure className="flex max-h-full flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
              <img
                src={images[active].src}
                alt={images[active].caption}
                className="border-border max-h-[80vh] w-auto max-w-full rounded-lg border object-contain"
              />
              <figcaption className="text-muted text-center text-sm">
                {images[active].caption}
                <span className="text-border"> · {active + 1}/{images.length}</span>
              </figcaption>
            </figure>

            {images.length > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Следующее"
                className="border-border bg-surface text-foreground hover:border-accent hover:text-accent absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border transition-colors sm:h-12 sm:w-12"
              >
                <ChevronIcon direction="right" />
              </button>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
