"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** next-themes wrapper — adds the `dark` class to <html> (attribute="class"). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
