// app/layout.tsx

import "keen-slider/keen-slider.min.css"; // ✅ Keen slider styles
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ✅ Your Tailwind or global CSS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archana Groups – Industrial Waste Handling & BioFuel Production",
  description:
    "Welcome to Archana Groups of Companies – Your reliable partner in industrial waste handling, logistics, and biofuel production. We empower industries with clean, efficient, and sustainable solutions.",
  keywords:
    "Archana Groups – Driving Industrial Transport with Care, Converting Waste into Clean Biomass Energy for a Sustainable Future.",
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
        <link rel="icon" type="image/png" href="/AG.png" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
