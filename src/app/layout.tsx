import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Crosshair from "@/components/crosshair";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Romain Jouffret — Co-founder, CPO & Engineer";

export const metadata: Metadata = {
  metadataBase: new URL("https://romainjouffret.com"),
  title: TITLE,
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: TITLE, description: profile.description, siteName: profile.name },
  twitter: { card: "summary", title: TITLE, description: profile.description },
};

const PERSON_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.description,
  url: "https://romainjouffret.com",
  email: profile.email,
  sameAs: [profile.linkedin],
  worksFor: { "@type": "Organization", name: "Warp Laboratory, Inc." },
  alumniOf: { "@type": "CollegeOrUniversity", name: "EPITA" },
  address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA" },
}).replace(/</g, "\\u003c");

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
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PERSON_JSON_LD }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Crosshair />
        {children}
      </body>
    </html>
  );
}
