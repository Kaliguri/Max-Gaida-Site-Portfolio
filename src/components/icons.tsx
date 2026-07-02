import type { ReactNode } from "react";

// Shared presentational icons. Before this, each file inlined its own SVGs and
// the close/cross glyph was duplicated verbatim in mobile-nav and project-video.
// `StrokeIcon` is the common 24-grid outline wrapper; fill-based player controls
// (play/pause/volume) stay local to project-video since they're not shared.

export function StrokeIcon({
  size = 24,
  strokeWidth = 2,
  className,
  children,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <StrokeIcon size={20}>
      <path d={direction === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"} />
    </StrokeIcon>
  );
}

export function ChevronUpIcon() {
  return (
    <StrokeIcon size={21}>
      <path d="m18 15-6-6-6 6" />
    </StrokeIcon>
  );
}

export function ArrowUpRightIcon() {
  return (
    <StrokeIcon size={12}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </StrokeIcon>
  );
}

export function CrossIcon({ size = 16 }: { size?: number }) {
  return (
    <StrokeIcon size={size}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </StrokeIcon>
  );
}

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <StrokeIcon size={22}>
      {open ? (
        <>
          <path d="M6 6 18 18" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </StrokeIcon>
  );
}
