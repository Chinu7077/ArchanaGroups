// app/layout.tsx

import "keen-slider/keen-slider.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archana Groups – Biomass Fuel & Industrial Waste Handling in Odisha",
  description:
    "Welcome to Archana Groups – We produce biomass fuel from agricultural waste and handle industrial by-products like fly ash and red mud across Odisha.",
  keywords: [
    "Fly ash transport Odisha",
    "red mud logistics Jharsuguda",
    "biomass briquettes supplier",
    "biofuel company Odisha",
    "Archana Transport",
    "Archana BioCycle",
    "Hyva bulkers",
    "sustainable fuel",
  ],
  authors: [{ name: "Archana Groups" }],
  robots: "index, follow",
  generator: "Next.js",
  metadataBase: new URL("https://archanagroups.in"),
  openGraph: {
    title: "Archana Groups – Biomass Fuel & Industrial Waste Handling in Odisha",
    description:
      "Welcome to Archana Groups – We produce biomass fuel from agricultural waste and handle industrial by-products like fly ash and red mud across Odisha.",
    url: "https://archanagroups.in",
    siteName: "Archana Groups",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Archana Groups – Biomass Fuel & Industrial Waste Handling in Odisha",
    description:
      "Welcome to Archana Groups – We produce biomass fuel from agricultural waste and handle industrial by-products like fly ash and red mud across Odisha.",
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${inter.className} antialiased bg-gray-50 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
