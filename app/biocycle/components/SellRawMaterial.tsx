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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto space-y-8 ${getAnimationClass(
            "raw-material",
            "fade-up"
          )}`}
          data-animate
          id="raw-material"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800">
            Partner with Us: Sell Your Agricultural Waste
          </h2>

          <p className="text-sm md:text-lg text-gray-600 text-center leading-relaxed">
            <strong>Turn Your Waste into Wealth!</strong><br />
            At <span className="text-blue-600 font-semibold">Archana BioCycle</span>, we convert agricultural waste into eco-friendly biomass briquettes — a cleaner fuel for a greener tomorrow. Partner with us to sell materials like rice husks, bagasse, stalks, and more.
          </p>

          {/* Why Sell Section */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm space-y-3">
            <h3 className="text-base md:text-xl font-semibold text-gray-700">
              Why Sell to Us?
            </h3>
            <ul className="list-disc list-inside text-xs md:text-base text-gray-600 space-y-1">
              <li><strong>Earn:</strong> Get fair pricing for your agri-waste.</li>
              <li><strong>Go Green:</strong> Help support renewable energy.</li>
              <li><strong>No Hassle:</strong> Easy pickup & prompt payment.</li>
              <li><strong>Local Impact:</strong> Boost rural and farmer income.</li>
            </ul>
          </div>

          {/* What We Buy Section */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm space-y-3">
            <h3 className="text-base md:text-xl font-semibold text-gray-700">
              What We Buy
            </h3>
            <ul className="list-disc list-inside text-xs md:text-base text-gray-600 space-y-1">
              <li>Rice husk</li>
              <li>Sugarcane bagasse</li>
              <li>Corn cobs & stalks</li>
              <li>Wheat straw</li>
              <li>Other crop residues</li>
            </ul>
          </div>

          {/* How It Works Section */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm space-y-3">
            <h3 className="text-base md:text-xl font-semibold text-gray-700">
              How It Works
            </h3>
            <ul className="list-disc list-inside text-xs md:text-base text-gray-600 space-y-1">
              <li><strong>Contact Us:</strong> Share type, quantity & location.</li>
              <li><strong>Get Quote:</strong> Receive a fair offer.</li>
              <li><strong>Pickup & Pay:</strong> We handle logistics & pay you fast.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center space-y-2">
            <p className="text-sm md:text-base text-gray-700 font-medium">
              Let’s build a cleaner future — together!
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm md:text-base shadow-md hover:scale-105 transition-transform duration-300 group"
            >
              Sell Your Waste Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
