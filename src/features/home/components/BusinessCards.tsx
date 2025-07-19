import { Truck, Bike } from 'lucide-react';
import Link from 'next/link';

export default function BusinessCards() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-5xl">
            Our Businesses
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Two distinct companies united by excellence, innovation, and
            commitment to quality service
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Archana Transport Card */}
          <Link href="/transport" className="group">
            <div className="transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 group-hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-red-600 to-black p-10 text-white">
                <Truck size={56} className="mb-6" />
                <h3 className="mb-4 text-3xl font-bold">Archana Transport</h3>
                <p className="text-lg text-red-100">
                  Heavy vehicle transport, mining logistics, and industrial
                  solutions
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-red-600"></span>
                    Heavy vehicle transportation
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-red-600"></span>
                    Mining & industrial logistics
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-red-600"></span>
                    Cargo & equipment solutions
                  </li>
                  <li className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-red-600"></span>
                    24/7 reliable service
                  </li>
                </ul>
                <div className="mt-8">
                  <span className="text-lg font-bold text-red-600 group-hover:text-red-800">
                    Explore Services →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Archana BioCycle Card */}
          <Link href="/biocycle" className="group">
            <div className="transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 group-hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-green-600 to-green-800 p-10 text-white">
                <Bike size={56} className="mb-6" />
                <h3 className="mb-4 text-3xl font-bold">Archana BioCycle</h3>
                <p className="text-lg text-green-100">
                  Sustainable mobility and eco-friendly transportation
                </p>
              </div>
              <div className="p-8">
                <div className="py-12 text-center">
                  <div className="mb-6 inline-block rounded-full bg-green-100 px-6 py-3 text-lg font-bold text-green-800">
                    🚴‍♂️ Coming Soon
                  </div>
                  <p className="text-lg font-medium text-gray-600">
                    Pedaling Towards a Greener Tomorrow
                  </p>
                  <p className="mt-2 text-gray-500">Launching Soon!</p>
                </div>
                <div className="mt-8">
                  <span className="text-lg font-bold text-green-600 group-hover:text-green-800">
                    Stay Tuned →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
