"use client";

import { Zap, Shield } from "lucide-react";

export default function CleanEnergySection({
  getAnimationClass = () => "",
}: {
  getAnimationClass?: (id: string, type?: string) => string;
}) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={getAnimationClass("clean-energy-content", "fade-right")}
            data-animate
            id="clean-energy-content"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Transforming Waste into{" "}
                <span className="text-blue-600">Clean Energy</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Biomass briquettes and pellets are clean, renewable fuels made
                by compressing agricultural waste and other plant residues. At
                Archana BioCycle, we believe quality isn’t just about the end
                product — it's about the people, systems, and care that go into
                making it. To maintain top performance, we follow strict
                production standards to ensure our briquettes and pellets
                deliver high heat output with very low ash content, making them
                both efficient and eco-friendly.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2 transition-transform duration-300 hover:rotate-12" />
                  <p className="font-semibold text-gray-800">High Energy</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-2 transition-transform duration-300 hover:rotate-12" />
                  <p className="font-semibold text-gray-800">Low Emissions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className={getAnimationClass("clean-energy-visual", "fade-left")}
            data-animate
            id="clean-energy-visual"
          >
            <div className="w-full flex items-center justify-center">
              <img
                src="/ABC (F).png"
                alt="Clean Energy"
                className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1100px] h-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
