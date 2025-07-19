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
          className={`max-w-5xl mx-auto space-y-12 ${getAnimationClass(
            "raw-material",
            "fade-up"
          )}`}
          data-animate
          id="raw-material"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center text-gray-800">
            Partner with Us: Sell Your Agricultural Waste
          </h2>

          <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
            <strong>Turn Your Waste into Wealth!</strong><br />
            At <span className="text-blue-600 font-semibold">Archana BioCycle</span>, we convert agricultural waste into eco-friendly biomass briquettes — a cleaner fuel for a greener tomorrow. Partner with us to sell materials like rice husks, bagasse, stalks, and more.
          </p>

          {/* Why Sell Section */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md space-y-5">
            <h3 className="text-2xl font-semibold text-gray-800">Why Sell to Us?</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              {[
                { label: "Earn", desc: "Get fair pricing for your agri-waste." },
                { label: "Go Green", desc: "Help support renewable energy." },
                { label: "No Hassle", desc: "Easy pickup & prompt payment." },
                { label: "Local Impact", desc: "Boost rural and farmer income." },
              ].map((item, index) => (
                <li key={index} className="md:flex md:items-start md:gap-2">
                  <span className="hidden md:inline">•</span>
                  <div className="relative pl-6 md:pl-0">
                    <span className="absolute left-0 top-1 md:hidden">•</span>
                    <span className="block md:inline font-semibold text-gray-800">
                      {item.label}:
                    </span>
                    <span className="block md:inline md:ml-1">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Buy Section */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md space-y-5">
            <h3 className="text-2xl font-semibold text-gray-800">What We Buy</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Rice husk</li>
              <li>Sugarcane bagasse</li>
              <li>Corn cobs & stalks</li>
              <li>Wheat straw</li>
              <li>Other crop residues</li>
            </ul>
          </div>

          {/* How It Works Section */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-md space-y-5">
            <h3 className="text-2xl font-semibold text-gray-800">How It Works</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              {[
                { label: "Contact Us", desc: "Share type, quantity & location." },
                { label: "Get Quote", desc: "Receive a fair offer." },
                { label: "Pickup & Pay", desc: "We handle logistics & pay you fast." },
              ].map((item, index) => (
                <li key={index} className="md:flex md:items-start md:gap-2">
                  <span className="hidden md:inline">•</span>
                  <div className="relative pl-6 md:pl-0">
                    <span className="absolute left-0 top-1 md:hidden">•</span>
                    <span className="block md:inline font-semibold text-gray-800">
                      {item.label}:
                    </span>
                    <span className="block md:inline md:ml-1">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center space-y-3">
            <p className="text-lg md:text-xl text-gray-800 font-medium">
              Let’s build a cleaner future — together!
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300 group"
            >
              Sell Your Waste Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
