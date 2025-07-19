"use client";

import { Card } from "@/components/ui/card";

export default function IndustriesServed({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  const industries = [
    { name: "Pharmaceuticals", icon: "💊" },
    { name: "FMCG", icon: "📦" },
    { name: "Brick Kilns", icon: "🧱" },
    { name: "Boilers", icon: "🏭" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 ${getAnimationClass(
            "industries-header",
            "fade-up"
          )}`}
          data-animate
          id="industries-header"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Industries We Serve
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${getAnimationClass(
            "industries-grid",
            "scale"
          )}`}
          data-animate
          id="industries-grid"
        >
          {industries.map((industry, index) => (
            <Card
              key={index}
              className="text-center p-8 rounded-2xl shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-500 hover:scale-110"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-125">
                {industry.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {industry.name}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
