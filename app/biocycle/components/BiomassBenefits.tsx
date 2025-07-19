"use client";

import { useState } from "react";
import {
  Zap,
  Shield,
  TrendingUp,
  TrendingDown,
  Recycle,
  Truck,
  Leaf,
  IndianRupee,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function BiomassBenefits({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    { icon: Zap, title: "High Thermal Value", color: "text-yellow-500" },
    { icon: Shield, title: "Lower Emissions", color: "text-green-500" },
    { icon: TrendingUp, title: "Longer Combustion", color: "text-blue-500" },
    { icon: IndianRupee, title: "Affordable Fuel", color: "text-purple-500" },
    { icon: TrendingDown, title: "Cost Efficient", color: "text-orange-500" },
    { icon: Recycle, title: "Made from Waste", color: "text-green-600" },
    { icon: Truck, title: "Easy Transport", color: "text-blue-600" },
    { icon: Leaf, title: "Eco-Friendly", color: "text-green-500" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${getAnimationClass(
            "benefits-header",
            "fade-up"
          )}`}
          data-animate
          id="benefits-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Use Biomass Briquettes?
          </h2>

          {/* Expandable Paragraph */}
          <p
            className={`text-left text-green-600 font-medium text-base md:text-lg leading-relaxed max-w-4xl mx-auto whitespace-pre-line transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-[2000px]" : "max-h-[160px] overflow-hidden"
            }`}
          >
            Biomass briquettes are an eco-friendly, sustainable, and
            cost-effective alternative to traditional fuels like coal and
            firewood. Made from compressed agricultural waste, sawdust, or
            other organic materials, they’re a game-changer for energy
            needs. Here’s why you should choose biomass briquettes:
            Eco-Friendly: Briquettes reduce carbon emissions and utilize
            renewable waste, helping combat climate change. High Efficiency:
            With high calorific value and low ash content, they burn cleaner
            and longer. Waste Reduction: Converts agricultural and
            industrial waste into valuable fuel, promoting a circular
            economy. Versatile Use: Perfect for industrial boilers, domestic
            heating, and power generation. Economic Recycling in Farming: In
            farming, large amounts of organic waste are generated, such as
            crop residues that are often burned or left to decompose.
            Biomass briquettes transform this waste into a valuable product:
            Turning Waste into Wealth: By collecting and compressing
            agricultural residues into briquettes, farmers can create a fuel
            source that can be used on-site or sold. This process, known as
            economic recycling, takes materials previously considered
            useless and converts them into an economically beneficial
            resource. By switching to biomass briquettes, you’re not just
            saving Rural economy —you’re saving the planet!
          </p>

          {/* Read More Button for All Screens */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm md:text-base text-green-700 underline hover:text-green-800 transition-all"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* Benefit Cards */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${getAnimationClass(
            "benefits-grid",
            "scale"
          )}`}
          data-animate
          id="benefits-grid"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-6 rounded-2xl shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-500 hover:scale-110"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon
                className={`w-12 h-12 ${feature.color} mx-auto mb-4 transition-all duration-300 hover:rotate-12`}
              />
              <h3 className="font-semibold text-gray-800">
                {feature.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
