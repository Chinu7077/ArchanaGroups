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
          className={`text-center max-w-4xl mx-auto space-y-10 ${getAnimationClass(
            "raw-material",
            "fade-up"
          )}`}
          data-animate
          id="raw-material"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Partner with Us: Sell Your Agricultural Waste
          </h2>

          <p className="text-lg text-gray-600">
            <strong>Turn Your Waste into Wealth!</strong><br />
            At <span className="text-blue-600 font-semibold">Archana BioCycle</span>, we transform agricultural waste into eco-friendly biomass briquettes, creating sustainable fuel for a greener future. We’re looking to partner with farmers, agricultural cooperatives, and local suppliers to purchase high-quality agricultural waste such as crop residues, rice husks, sugarcane bagasse, corn stalks, and more.
          </p>

          <div className="text-left bg-gray-50 p-6 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Why Sell to Us?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Earn Extra Income:</strong> Convert your agricultural waste into a profitable resource with competitive prices for your materials.</li>
              <li><strong>Support Sustainability:</strong> Contribute to a cleaner environment by supplying waste for renewable energy production.</li>
              <li><strong>Hassle-Free Process:</strong> We offer easy collection, transparent pricing, and timely payments.</li>
              <li><strong>Local Impact:</strong> Partner with a company committed to empowering farmers and boosting rural economies.</li>
            </ul>
          </div>

          <div className="text-left bg-gray-50 p-6 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">What We Buy</h3>
            <p className="text-gray-600">We accept a wide range of agricultural waste, including but not limited to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Rice husk</li>
              <li>Sugarcane bagasse</li>
              <li>Corn cobs and stalks</li>
              <li>Wheat straw</li>
              <li>Other crop residues</li>
            </ul>
          </div>

          <div className="text-left bg-gray-50 p-6 rounded-xl shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">How It Works</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Contact Us:</strong> Share details about your agricultural waste (type, quantity, and location).</li>
              <li><strong>Get a Quote:</strong> Receive a fair and competitive offer based on your supply.</li>
              <li><strong>Collection & Payment:</strong> We arrange pickup from your location and ensure prompt payment.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-lg text-gray-700 font-medium">
              Let’s build a sustainable future together!
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Sell Your Waste Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
