"use client";

import { useEffect } from "react";
import Head from "next/head"; // ✅ For SEO

import TransportNavigation from "./components/TransportNavigation";
import TransportHero from "./components/TransportHero";
import TransportServices from "./components/TransportServices";
import TransportTestimonials from "./components/TransportTestimonials";
import TransportWhyChoose from "./components/TransportWhyChoose";
import TransportGallery from "./components/TransportGallery";
import TransportPartners from "./components/TransportPartners";
import TransportContact from "./components/TransportContact";
import TransportFooter from "./components/TransportFooter";

export default function TransportPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-white scrollbar-red overflow-x-hidden">
      {/* ✅ SEO META TAGS */}
      <Head>
        <title>Archana Transport | Fly Ash & Red Mud Logistics in Odisha</title>
        <meta
          name="description"
          content="Archana Transport offers reliable and safe logistics services for fly ash, red mud, and industrial waste across Odisha including Rayagada, Koraput, and Jharsuguda."
        />
        <meta
          name="keywords"
          content="Fly Ash Transport, Red Mud Logistics, Odisha Transport Company, Hyva Bulker, Archana Transport, Rayagada, Koraput"
        />
        <meta name="author" content="Archana Transport" />
        <meta
          property="og:title"
          content="Archana Transport - Red Mud & Ash Specialists"
        />
        <meta
          property="og:description"
          content="Serving Odisha with industrial transport solutions focused on safety and reliability."
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://archanagroups.in/transport" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://archanagroups.in/transport" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {/* 🟢 Components */}
      <TransportNavigation />
      <TransportHero />
      <TransportServices />
      <TransportWhyChoose />
      <TransportGallery />
      <TransportPartners />
      <TransportContact />
      <TransportFooter />
    </main>
  );
}
