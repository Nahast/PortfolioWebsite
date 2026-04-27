import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Romain Jouffret — Portfolio",
  description: "Personal portfolio of Romain Jouffret.",
};

// Inlined theme-init script content.
// dangerouslySetInnerHTML opts out of React 19's script-resource hoisting
// so this is treated as a plain DOM node — it runs during SSR and is never
// touched again during client hydration, which is exactly what anti-FOUC needs.
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('rj-theme');document.documentElement.dataset.theme=s||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
