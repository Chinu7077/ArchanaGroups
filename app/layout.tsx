// app/layout.tsx

import "keen-slider/keen-slider.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archana Groups – Fly Ash Transport & Biomass Fuel in Odisha",
  description:
    "Archana Groups provides industrial transport services for fly ash, red mud, and bulk materials across Odisha. Archana BioCycle converts agricultural waste into biomass briquettes and clean biofuel.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        {/* ✅ Favicon */}
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />

        {/* ✅ SEO Keywords */}
        <meta
          name="keywords"
          content="Fly ash transport Odisha, red mud logistics Jharsuguda, biomass briquettes supplier, biofuel company Odisha, Archana Transport, Archana BioCycle, Hyva bulkers, sustainable fuel"
        />
        
        {/* ✅ Author & Robots */}
        <meta name="author" content="Archana Groups" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
