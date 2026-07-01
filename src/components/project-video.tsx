"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
    </svg>
  );
}

function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 5V4L8 9H4Z" />
      <path d="M17 8.5a5 5 0 0 1 0 7" />
    </svg>
  );
}

function MuteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 5V4L8 9H4Z" />
      <path d="m16 9 5 6M21 9l-5 6" />
    </svg>
  );
}

function FullscreenIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4" />
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

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Project promo video: a poster trigger that opens a large lightbox (mirrors
 * Posleslovie's HeroVideoModal pattern) instead of a cramped inline player.
 * The lightbox player uses custom controls (not the browser's native
 * `<video controls>` chrome) so the seek/volume bars pick up the site's
 * accent color instead of the browser default.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onFullscreenChange = () => setFullscreen(document.fullscreenElement !== null);
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [open]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  function seek(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrentTime(value);
  }

  function changeVolume(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function toggleFullscreen() {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void video.requestFullscreen();
  }

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 sm:px-6 sm:py-8"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="border-border bg-surface relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
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
                  ref={videoRef}
                  src={src}
                  autoPlay
                  playsInline
                  onClick={togglePlay}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => {
                    e.currentTarget.volume = 0.5;
                    setDuration(e.currentTarget.duration);
                  }}
                  className="h-full w-full"
                />
              </div>

              <div className="border-border bg-surface flex items-center gap-3 border-t px-4 py-3 sm:gap-4 sm:px-6">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Пауза" : "Воспроизвести"}
                  className="text-foreground hover:text-accent shrink-0 transition-colors"
                >
                  {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                </button>

                <span className="text-muted w-9 shrink-0 text-xs tabular-nums">
                  {formatTime(currentTime)}
                </span>

                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step="any"
                  value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="Перемотка"
                  className="h-1.5 flex-1 cursor-pointer accent-[var(--accent)]"
                />

                <span className="text-muted w-9 shrink-0 text-xs tabular-nums">
                  {formatTime(duration)}
                </span>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Включить звук" : "Выключить звук"}
                  className="text-foreground hover:text-accent hidden shrink-0 transition-colors sm:block"
                >
                  {muted || volume === 0 ? (
                    <MuteIcon className="h-5 w-5" />
                  ) : (
                    <VolumeIcon className="h-5 w-5" />
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  aria-label="Громкость"
                  className="hidden h-1.5 w-20 cursor-pointer accent-[var(--accent)] sm:block"
                />

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? "Выйти из полноэкранного режима" : "На весь экран"}
                  className="text-foreground hover:text-accent shrink-0 transition-colors"
                >
                  <FullscreenIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
