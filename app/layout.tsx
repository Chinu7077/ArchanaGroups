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
  generator: "v0.dev",
  metadataBase: new URL("https://archanagroups.in"),
  openGraph: {
    title: "Archana Groups – Sustainable Mobility Solutions",
    description:
      "We help move the world sustainably by transporting industrial by-products and producing biofuel from agricultural waste.",
    url: "https://archanagroups.in",
    siteName: "Archana Groups",
    images: [
      {
        url: "/og-cover.jpg", // Upload this image to your /public folder
        width: 1200,
        height: 630,
        alt: "Archana Groups OG Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archana Groups – Sustainable Mobility Solutions",
    description:
      "Transport, biomass fuel, fly ash and red mud handling with clean mobility.",
    images: ["/og-cover.jpg"],
    creator: "@archanagroups", // Optional
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
