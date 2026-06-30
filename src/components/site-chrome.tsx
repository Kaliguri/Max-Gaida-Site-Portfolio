import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { BackToTop } from "./back-to-top";

/**
 * Standard page shell: header, footer, back-to-top. Used by normal pages.
 * Print routes (PDF source) intentionally render WITHOUT this chrome.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
