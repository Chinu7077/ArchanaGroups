"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SellRawMaterial({
  getAnimationClass = () => "",
  scrollToSection = () => {},
}: {
  getAnimationClass?: (id: string, type?: string) => string;
  scrollToSection?: (id: string) => void;
}) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center max-w-4xl mx-auto space-y-6 ${getAnimationClass(
            "raw-material",
            "fade-up"
          )}`}
          data-animate
          id="raw-material"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Want to Sell Raw Material?
          </h2>
          <p className="text-lg text-gray-600">
          We’re happy to do business with you! Partner with us to turn agricultural residues like husk, stalks, shells, or sawdust into clean, renewable fuel.

At Archana BioCycle, we offer fair pricing, reliable pickup, and long-term partnerships to help you earn from your unused waste. Let’s join hands to build a greener, more sustainable future — together.
          </p>
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
