import type { Contact } from "@content/index";
import { ContactIcon } from "./contact-icon";

// One source for a contact link. The `external ? _blank / rel` logic and the
// three visual shapes used to be copy-pasted across header, mobile-nav, footer
// and the résumé page — this collapses them into a single variant-driven link.
type Variant = "icon" | "pill" | "text";

const STYLES: Record<Variant, string> = {
  // Round icon-only button (desktop header).
  icon: "border-border text-muted hover:border-accent hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
  // Bordered pill with icon + label (footer, mobile menu).
  pill: "border-border text-muted hover:border-accent hover:text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
  // Inline text link with icon (résumé header).
  text: "text-muted hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors",
};

export function ContactLink({
  contact,
  variant,
  onClick,
}: {
  contact: Contact;
  variant: Variant;
  onClick?: () => void;
}) {
  return (
    <a
      href={contact.href}
      target={contact.external ? "_blank" : undefined}
      rel={contact.external ? "noopener noreferrer" : undefined}
      aria-label={contact.label}
      title={variant === "icon" ? contact.label : undefined}
      onClick={onClick}
      className={STYLES[variant]}
    >
      <ContactIcon name={contact.icon} />
      {variant !== "icon" && contact.label}
    </a>
  );
}
