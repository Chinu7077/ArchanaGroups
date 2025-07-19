import 'keen-slider/keen-slider.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import type React from 'react';
import { Suspense } from 'react';
import { Toaster } from '@/shared/components/ui/sonner';
import { TRPCProvider } from '@/shared/providers/trpc-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default:
      'Archana Groups – Biomass Fuel & Industrial Waste Handling in Odisha',
    template: '%s | Archana Groups',
  },
  description:
    'Welcome to Archana Groups – We produce biomass fuel from agricultural waste and handle industrial by-products like fly ash and red mud across Odisha.',
  keywords: [
    'Fly ash transport Odisha',
    'red mud logistics Jharsuguda',
    'biomass briquettes supplier',
    'biofuel company Odisha',
    'Archana Transport',
    'Archana BioCycle',
    'Hyva bulkers',
    'sustainable fuel',
  ],
  authors: [{ name: 'Archana Groups' }],
  robots: 'index, follow',
  generator: 'Next.js',
  metadataBase: new URL('https://archanagroups.in'),
  openGraph: {
    title:
      'Archana Groups – Biomass Fuel & Industrial Waste Handling in Odisha',
    description:
      'Welcome to Archana Groups – We produce biomass fuel from agricultural waste and handle industrial by-products like fly ash and red mud across Odisha.',
    url: 'https://archanagroups.in',
    siteName: 'Archana Groups',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Archana Groups - Sustainable Waste Management Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Archana Groups – Biomass Fuel & Industrial Waste Handling in Odisha',
    description:
      'Welcome to Archana Groups – We produce biomass fuel from agricultural waste and handle industrial by-products like fly ash and red mud across Odisha.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://archanagroups.in',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden scroll-smooth">
      <head>
        <link rel="canonical" href="https://archanagroups.in" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="Fly ash transport Odisha, red mud logistics Jharsuguda, biomass briquettes supplier, biofuel company Odisha, Archana Transport, Archana BioCycle, Hyva bulkers, sustainable fuel"
        />
      </head>
      <body
        className={`${inter.variable} overflow-x-hidden bg-gray-50 font-sans antialiased`}
      >
        <Suspense
          fallback={<div className="min-h-screen animate-pulse bg-gray-50" />}
        >
          <TRPCProvider>
            {children}
            <Toaster />
          </TRPCProvider>
        </Suspense>
      </body>
    </html>
  );
}
