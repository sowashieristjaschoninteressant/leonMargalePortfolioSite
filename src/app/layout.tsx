import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
    Space_Grotesk,
    IBM_Plex_Mono
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-main",
    subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500"],
});



export const metadata: Metadata = {
    title: "Leon Margale | Software Developer",
    description:
        "Portfolio of Leon Margale, a backend and systems-oriented software developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexMono.variable  } h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
