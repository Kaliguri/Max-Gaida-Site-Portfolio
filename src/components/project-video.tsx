"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/**
 * Project promo video: a poster trigger that opens a large lightbox (mirrors
 * Posleslovie's HeroVideoModal pattern) instead of a cramped inline player.
 * Default volume 50% — set imperatively, the `volume` attribute isn't a real
 * HTML attribute and is ignored by browsers.
 */
export function ProjectVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Смотреть видео: ${title}`}
        className="group border-border bg-background relative mt-4 block aspect-video w-full overflow-hidden rounded-lg border"
      >
        <video
          src={src}
          poster={poster}
          preload="none"
          muted
          playsInline
          tabIndex={-1}
          className="pointer-events-none h-full w-full object-cover"
        />
        <span className="bg-foreground/10 group-hover:bg-foreground/20 absolute inset-0 flex items-center justify-center transition-colors">
          <span className="bg-accent text-accent-foreground flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105">
            <PlayIcon className="ml-0.5 h-6 w-6" />
          </span>
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="border-border bg-surface relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
            >
              <div className="border-border flex items-center justify-between border-b px-5 py-4 sm:px-6">
                <p className="text-foreground text-sm font-medium">{title}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть"
                  className="border-border text-foreground hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                >
                  <CrossIcon />
                </button>
              </div>
              <div className="bg-background aspect-video w-full">
                <video
                  src={src}
                  controls
                  autoPlay
                  playsInline
                  onLoadedMetadata={(e) => {
                    e.currentTarget.volume = 0.5;
                  }}
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
