import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import "@/styles/globals.scss";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
