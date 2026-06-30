import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.name,
  description: "Технический геймдизайнер · Unity / C# разработчик",
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
