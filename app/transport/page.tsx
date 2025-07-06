"use client";

import { useEffect } from "react";
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
    // Ensure page starts at the top when loaded
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-white scrollbar-red overflow-x-hidden">
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
