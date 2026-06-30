import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";

// Static export: only pre-render locales we ship. EN is deferred — add "en"
// to generateStaticParams when EN content lands.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }];
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return children;
}
