import { Truck, Bike, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BusinessSelection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Archana Groups of Companies
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Choose your business to explore our services and solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Archana Transport Card */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <div className="bg-gradient-to-r from-red-600 to-black p-12 text-white text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Archana Transport</h2>
                <p className="text-red-100 text-lg">Heavy Vehicle Solutions</p>
              </div>
              <div className="p-10">
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Professional heavy vehicle transportation, mining logistics,
                  and industrial cargo solutions across India. Trusted by
                  leading companies for reliable and efficient transport
                  services.
                </p>
                <Link
                  href="/transport"
                  className="w-full bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-3 group"
                >
                  <span>Explore Transport</span>
                  <ArrowRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Archana BioCycle Card */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-12 text-white text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bike size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Archana BioCycle</h2>
                <p className="text-green-100 text-lg">Sustainable Mobility</p>
              </div>
              <div className="p-10">
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Revolutionary sustainable mobility solutions combining
                  eco-friendly transportation with cutting-edge technology.
                  Pedaling towards a greener tomorrow.
                </p>
                <div className="text-center mb-6">
                  <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                    Coming Soon
                  </span>
                </div>
                <Link
                  href="/biocycle"
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-3 group"
                >
                  <span>Enter BioCycle</span>
                  <ArrowRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
