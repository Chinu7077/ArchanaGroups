import { Truck, Bike, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BusinessSelection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Archana Groups of Companies
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl">
            Choose your business to explore our services and solutions
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          {/* Archana Transport Card */}
          <div className="group">
            <div className="transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 group-hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-red-600 to-black p-12 text-center text-white">
                <div className="bg-opacity-20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                  <Truck size={48} className="text-white" />
                </div>
                <h2 className="mb-4 text-3xl font-bold">Archana Transport</h2>
                <p className="text-lg text-red-100">Heavy Vehicle Solutions</p>
              </div>
              <div className="p-10">
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  Professional heavy vehicle transportation, mining logistics,
                  and industrial cargo solutions across India. Trusted by
                  leading companies for reliable and efficient transport
                  services.
                </p>
                <Link
                  href="/transport"
                  className="group flex w-full items-center justify-center space-x-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-red-700"
                >
                  <span>Explore Transport</span>
                  <ArrowRight
                    size={24}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Archana BioCycle Card */}
          <div className="group">
            <div className="transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 group-hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-12 text-center text-white">
                <div className="bg-opacity-20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                  <Bike size={48} className="text-white" />
                </div>
                <h2 className="mb-4 text-3xl font-bold">Archana BioCycle</h2>
                <p className="text-lg text-green-100">Sustainable Mobility</p>
              </div>
              <div className="p-10">
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Revolutionary sustainable mobility solutions combining
                  eco-friendly transportation with cutting-edge technology.
                  Pedaling towards a greener tomorrow.
                </p>
                <div className="mb-6 text-center">
                  <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
                    Coming Soon
                  </span>
                </div>
                <Link
                  href="/biocycle"
                  className="group flex w-full items-center justify-center space-x-3 rounded-xl bg-green-600 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-green-700"
                >
                  <span>Enter BioCycle</span>
                  <ArrowRight
                    size={24}
                    className="transition-transform group-hover:translate-x-1"
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
