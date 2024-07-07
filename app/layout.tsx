import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { NextUiProvider } from "@/providers/nextui";

import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <NextUiProvider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </NextUiProvider>
      </body>
    </html>
  );
}
