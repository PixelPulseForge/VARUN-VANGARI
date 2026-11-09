import type { Metadata } from "next";
import { ThemeProvider } from "../components/styles/ThemeProvider";
import { themeInitScript } from "../components/ui/ThemeScript";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Varun Vangari",
  description: "Full Stack Developer",

  icons: {
    icon: "../assets/favicon.png",
    shortcut: "/assets/favicon.ico",
    apple: "/assets/apple-icon.png",
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />

        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>

      <body className="bg-bg text-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}