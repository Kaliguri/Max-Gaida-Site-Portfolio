import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { profile } from "@content/index";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const description = `${profile.headline}. ${profile.eyebrow}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "ru_RU",
    url: SITE.url,
    title: SITE.name,
    description,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description },
};

/**
 * Sets the theme class on <html> before first paint to avoid a flash of the
 * wrong theme. Dark is the default until the user picks one (stored in
 * localStorage). Kept tiny and dependency-free on purpose.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark";}document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.defaultLocale} suppressHydrationWarning className={`${onest.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
