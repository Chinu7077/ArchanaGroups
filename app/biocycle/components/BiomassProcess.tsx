"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BiomassProcess({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const processSteps = [
    { step: "Waste", icon: "🌾" },
    { step: "Drying", icon: "☀️" },
    { step: "Crushing", icon: "⚙️" },
    { step: "Briquetting", icon: "🔧" },
    { step: "Packaging", icon: "📦" },
    { step: "Delivery", icon: "🚛" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${getAnimationClass(
            "process-header",
            "fade-up"
          )}`}
          data-animate
          id="process-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Biomass Waste to Energy – Our Process
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-3 lg:grid-cols-6 gap-6 ${getAnimationClass(
            "process-grid",
            "scale"
          )}`}
          data-animate
          id="process-grid"
        >
          {processSteps.map((process, index) => (
            <div key={index} className="text-center">
              <Card
                className="p-6 rounded-2xl shadow-lg border-0 bg-white mb-4 transition-all duration-500 hover:shadow-xl hover:scale-110"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-2 transition-transform duration-300 hover:scale-125">
                  {process.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{process.step}</h3>
              </Card>
              {index < processSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mx-auto hidden lg:block transition-all duration-300 hover:text-green-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
