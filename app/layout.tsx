// app/layout.tsx

import "keen-slider/keen-slider.min.css"; // ✅ Keen slider styles
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ✅ Your Tailwind or global CSS

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Archana Groups – Industrial Waste Handling & Biomass Fuel Production",
  description:
    "Gateway to Archana Transport and Archana BioCycle - Leading transport logistics and sustainable mobility solutions",
  keywords:
    "transport, logistics, mining, sustainable mobility, eco-friendly, Archana Group",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
